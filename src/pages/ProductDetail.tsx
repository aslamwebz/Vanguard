import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, Check, X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCartWishlist } from '@/contexts/CartWishlistContext';
import { useState } from 'react';

// Import the Product type and products data from ProductShowcase
import { Product, products } from '@/components/ProductShowcase';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    isInWishlist,
  } = useCartWishlist();
  
  // Find the product by ID
  const product = products.find(p => p.id === Number(id));
  
  const [quantity, setQuantity] = useState(1);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowAddedToCart(true);
      // Hide the success message after 3 seconds
      setTimeout(() => setShowAddedToCart(false), 3000);
    }
  };
  
  const toggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-obsidian text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/shop')} className="bg-brushed-steel text-obsidian hover:bg-pale-steel">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 text-brushed-steel hover:bg-brushed-steel/10"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back to Collection
        </Button>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="bg-charcoal rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <span className="text-brushed-steel text-sm font-medium tracking-widest uppercase">
              {product.category}
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold mt-2 mb-4">
              {product.name}
            </h1>
            
            <p className="text-2xl font-bold text-brushed-steel mb-6">
              {product.price}
            </p>
            
            <p className="text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-2">
                <span className="text-gray-300">Quantity:</span>
                <div className="flex items-center border border-brushed-steel/30 rounded-md">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="px-3 py-2 text-brushed-steel hover:bg-brushed-steel/10"
                    disabled={quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="px-3 py-2 text-brushed-steel hover:bg-brushed-steel/10"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleAddToCart}
                  className="bg-brushed-steel text-obsidian hover:bg-pale-steel font-semibold px-8 py-6 text-lg tracking-wide transition-all duration-300 flex-1"
                >
                  {isInCart(product.id) ? (
                    <>
                      <Check className="mr-2" size={20} />
                      ADDED TO CART
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="mr-2" size={20} />
                      ADD TO CART
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={toggleWishlist}
                  className={`border-brushed-steel ${
                    isInWishlist(product.id) 
                      ? 'text-brushed-steel bg-brushed-steel/10' 
                      : 'text-brushed-steel hover:bg-brushed-steel/10'
                  } font-semibold px-8 py-6 text-lg tracking-wide transition-all duration-300`}
                >
                  {isInWishlist(product.id) ? (
                    <>
                      <X className="mr-2" size={20} />
                      REMOVE FROM WISHLIST
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2" size={20} />
                      ADD TO WISHLIST
                    </>
                  )}
                </Button>
              </div>
              
              {showAddedToCart && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-3 rounded-md flex items-center gap-2">
                  <Check size={18} />
                  <span>Added to cart successfully!</span>
                </div>
              )}
            </div>
            
            <div className="mt-12 pt-8 border-t border-brushed-steel/20">
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Handcrafted with premium materials</li>
                <li>• Includes certificate of authenticity</li>
                <li>• Worldwide shipping available</li>
                <li>• 2-year international warranty</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Export as default to match the import in App.tsx
export default ProductDetail;
