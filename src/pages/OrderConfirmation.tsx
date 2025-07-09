import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Clock, Truck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCartWishlist } from '@/contexts/CartWishlistContext';

export const OrderConfirmation = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrder } = useCartWishlist();
  
  const order = orderId ? getOrder(orderId) : null;
  
  if (!order) {
    return (
      <div className="min-h-screen bg-obsidian text-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            We couldn't find the order you're looking for.
          </p>
          <Button asChild className="bg-white text-obsidian hover:bg-gray-100">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getStatusIcon = () => {
    switch (order.status) {
      case 'processing':
        return <Clock className="h-6 w-6 text-brushed-steel" />;
      case 'shipped':
        return <Truck className="h-6 w-6 text-brushed-steel" />;
      case 'delivered':
        return <CheckCircle className="h-6 w-6 text-brushed-steel" />;
      default:
        return null;
    }
  };
  
  const getStatusText = () => {
    switch (order.status) {
      case 'processing':
        return 'Your order is being processed';
      case 'shipped':
        return 'Your order is on the way';
      case 'delivered':
        return 'Order delivered';
      default:
        return 'Order status unknown';
    }
  };
  
  const getNextSteps = () => {
    switch (order.status) {
      case 'processing':
        return 'We\'ve received your order and are preparing it for shipment. You\'ll receive a confirmation email when your order ships.';
      case 'shipped':
        return 'Your order is on its way. Expected delivery date will be updated soon.';
      case 'delivered':
        return 'Your order has been delivered. We hope you love your purchase!';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Order Confirmation Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-charcoal/50 border border-brushed-steel/30 mb-6">
              <CheckCircle className="h-10 w-10 text-brushed-steel" />
            </div>
            <h1 className="text-3xl font-serif font-bold mb-3">Order Confirmed</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Thank you for your order, {order.shippingAddress.fullName.split(' ')[0]}! We'll send you a shipping confirmation once your item(s) are on the way.
            </p>
            <p className="text-brushed-steel text-sm mt-3 font-medium tracking-wide">
              Order #{order.id} • {formatDate(order.date)}
            </p>
          </div>
          {/* Order Status */}
          <div className="bg-charcoal/50 border border-brushed-steel/20 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <h2 className="text-xl font-medium">
                  {order.status === 'processing' && 'Order Processing'}
                  {order.status === 'shipped' && 'On the Way'}
                  {order.status === 'delivered' && 'Order Delivered'}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-brushed-steel/10 text-brushed-steel border border-brushed-steel/20">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="space-y-1 text-gray-300">
              {order.status === 'processing' && (
                <p>We've received your order and are preparing it for shipment.</p>
              )}
              {order.status === 'shipped' && order.trackingNumber && (
                <p>Your order is on its way. Track your shipment with #{order.trackingNumber}.</p>
              )}
              {order.status === 'delivered' && (
                <p>Your order was delivered on {formatDate(order.date)}.</p>
              )}
            </div>
          </div>
          {/* Order Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-200">Shipping Address</h3>
              <div className="bg-charcoal/50 border border-brushed-steel/20 rounded-lg p-6">
                <p className="font-medium text-white">{order.shippingAddress.fullName}</p>
                <p className="text-gray-300">{order.shippingAddress.address}</p>
                <p className="text-gray-300">
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p className="text-gray-300">{order.shippingAddress.country}</p>
              </div>
            </div>
            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-200">Payment Method</h3>
              <div className="bg-charcoal/50 border border-brushed-steel/20 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-brushed-steel" />
                  <div>
                    <p className="font-medium text-white">
                      {order.paymentMethod === 'credit' ? 'Credit Card' : 'PayPal'}
                    </p>
                    {order.paymentMethod === 'credit' && order.cardLast4 && (
                      <p className="text-gray-300 text-sm">
                        •••• •••• •••• {order.cardLast4}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Order Items */}
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-4 text-gray-200">Order Items</h3>
            <div className="border border-brushed-steel/20 rounded-lg overflow-hidden">
              {order.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`p-4 flex items-center justify-between transition-colors ${index < order.items.length - 1 ? "border-b border-brushed-steel/10" : ""}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-charcoal/70 rounded-md overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">
                      ${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-400">${item.price} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button 
              asChild 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/40"
            >
              <Link to="/shop">Continue Shopping</Link>
            </Button>
            <Button 
              asChild 
              className="bg-white text-obsidian hover:bg-gray-100 transition-colors"
            >
              <Link to="/orders">View Order History</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
