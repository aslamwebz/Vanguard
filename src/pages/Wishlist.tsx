import { useNavigate } from 'react-router-dom';
import { Heart, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCartWishlist } from '@/contexts/CartWishlistContext';

const Wishlist = () => {
  const { 
    wishlist, 
    removeFromWishlist, 
    addToCart,
    isInCart
  } = useCartWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian text-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <Heart size={64} className="mx-auto text-brushed-steel mb-6" />
          <h1 className="text-3xl font-serif font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Save items you love to your wishlist to keep track of them later.
          </p>
          <Button 
            onClick={() => navigate('/shop')}
            className="bg-brushed-steel text-obsidian hover:bg-pale-steel"
          >
            Start Shopping
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif font-bold">Your Wishlist</h1>
          <p className="text-gray-300">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map((item) => (
            <div key={item.id} className="group relative">
              <div className="aspect-square bg-charcoal rounded-lg overflow-hidden mb-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <Button 
                    variant="outline"
                    className="w-full border-brushed-steel text-brushed-steel hover:bg-brushed-steel/10"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-brushed-steel">{item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-gray-400 hover:text-white p-1 -mr-2"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mt-4">
                {isInCart(item.id) ? (
                  <Button 
                    variant="outline" 
                    className="w-full border-brushed-steel text-brushed-steel hover:bg-brushed-steel/10"
                    onClick={() => navigate('/cart')}
                  >
                    View in Cart
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-brushed-steel text-obsidian hover:bg-pale-steel"
                    onClick={() => {
                      addToCart(item);
                      removeFromWishlist(item.id);
                    }}
                  >
                    <ShoppingBag size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            variant="outline"
            className="border-brushed-steel text-brushed-steel hover:bg-brushed-steel/10"
            onClick={() => navigate('/shop')}
          >
            <ArrowRight className="mr-2" size={18} />
            Continue Shopping
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
