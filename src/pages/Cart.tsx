import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCartWishlist } from '@/contexts/CartWishlistContext';
import { CheckoutForm } from '@/components/CheckoutForm';
import { StripePaymentForm } from '@/components/StripePaymentForm';

// Initialize Stripe with publishable key from environment variables
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');

const Cart = () => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { 
    cart, 
    removeFromCart, 
    updateQuantity,
    addToWishlist,
    isInWishlist,
    getCartTotal,
    getCartItemCount,
    clearCart
  } = useCartWishlist();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 15 : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  // In a real app, you would create the payment intent when the user starts checkout
  useEffect(() => {
    if (isCheckingOut && cart.length > 0) {
      const createPaymentIntent = async () => {
        try {
          setLoading(true);
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: Math.round(total * 100) }), // Convert to cents
          });
          
          const data = await response.json();
          setClientSecret(data.clientSecret);
        } catch (err) {
          console.error('Error creating payment intent:', err);
          setError('Failed to initialize payment. Please try again.');
        } finally {
          setLoading(false);
        }
      };

      createPaymentIntent();
    }
  }, [isCheckingOut, cart.length, total]);

  const handlePaymentSuccess = (paymentIntent: any) => {
    setPaymentSuccess(true);
    clearCart();
    // In a real app, you would redirect to an order confirmation page
    setTimeout(() => {
      navigate('/order-confirmation/' + paymentIntent.id);
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackToCart = () => {
    setIsCheckingOut(false);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-obsidian text-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <div className="bg-charcoal/50 border border-brushed-steel/20 rounded-lg p-12 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-charcoal/70 rounded-full flex items-center justify-center mx-auto mb-6 border border-brushed-steel/30">
              <CheckCircle className="h-8 w-8 text-brushed-steel" />
            </div>
            <h1 className="text-2xl font-serif font-bold mb-3">Payment Successful!</h1>
            <p className="text-gray-300 mb-8">
              Thank you for your purchase. Your order is being processed and you'll receive a confirmation email shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-obsidian hover:bg-gray-100">
                <Link to="/orders">View Orders</Link>
              </Button>
              <Button asChild variant="outline" className="border-brushed-steel/30 text-white hover:bg-charcoal/50">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (cart.length === 0 && !isCheckingOut) {
    return (
      <div className="min-h-screen bg-obsidian text-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <ShoppingBag size={64} className="mx-auto text-brushed-steel mb-6" />
          <h1 className="text-3xl font-serif font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button 
            onClick={() => navigate('/shop')}
            className="bg-brushed-steel text-obsidian hover:bg-pale-steel"
          >
            Continue Shopping
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  // If checking out, show the checkout form
  if (isCheckingOut) {
    return (
      <div className="min-h-screen bg-obsidian text-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <Button 
            variant="ghost" 
            onClick={handleBackToCart}
            className="text-brushed-steel hover:bg-brushed-steel/10 mb-8 pl-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          
          <h1 className="text-3xl font-serif font-bold mb-12">Checkout</h1>
          
          <CheckoutForm onBack={handleBackToCart} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-serif font-bold mb-12 text-center">Your Shopping Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 pb-6 border-b border-brushed-steel/20">
                <div className="w-full sm:w-40 h-40 bg-charcoal rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-medium">{item.name}</h3>
                      <p className="text-brushed-steel">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center border border-brushed-steel/30 rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-brushed-steel hover:bg-brushed-steel/10"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-brushed-steel hover:bg-brushed-steel/10"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-medium">{item.price}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-400">
                          {formatPrice(parseFloat(item.price.replace(/[^0-9.-]+/g, '')))} each
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {!isInWishlist(item.id) && (
                    <button 
                      onClick={() => {
                        addToWishlist(item);
                        removeFromCart(item.id);
                      }}
                      className="mt-4 text-sm text-brushed-steel hover:underline"
                    >
                      Move to Wishlist
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="bg-charcoal/50 p-6 rounded-lg h-fit sticky top-6">
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping > 0 ? formatPrice(shipping) : 'Free'}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              
              <div className="border-t border-brushed-steel/20 my-4 pt-4">
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-brushed-steel text-obsidian hover:bg-pale-steel py-6 text-lg"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                PROCEED TO CHECKOUT
              </Button>
              
              <p className="text-center text-sm text-gray-400">
                or{' '}
                <button 
                  onClick={() => navigate('/shop')}
                  className="text-brushed-steel hover:underline"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
