
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '@/contexts/CartWishlistContext';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cart, wishlist } = useCartWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const hideSectionLinks = ['/cart', '/wishlist'].includes(location.pathname);

  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    if (!isHomePage) {
      e.preventDefault();
      navigate('/');
      // Scroll to section after a short delay to allow the page to load
      setTimeout(() => {
        const element = document.getElementById(sectionId.toLowerCase());
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      e.preventDefault();
      const element = document.getElementById(sectionId.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'glass-effect' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-2xl lg:text-3xl font-serif font-bold tracking-wider">
                <span className="shimmer-text">VANGUARD</span>
                <span className="text-white"> & CO.</span>
              </h1>
            </a>
          </div>

          {/* Desktop Navigation - Section Links */}
          {!hideSectionLinks && (
            <div className="hidden md:flex items-center space-x-8">
              {['TIMEPIECES', 'EXCLUSIVE', 'HERITAGE', 'CONTACT'].map((section) => (
                <a 
                  key={section}
                  href={`#${section.toLowerCase()}`}
                  onClick={(e) => handleSectionClick(section.toLowerCase(), e)}
                  className={`text-sm font-medium tracking-wide transition-colors ${
                    isHomePage 
                      ? 'hover:text-brushed-steel cursor-pointer' 
                      : 'text-gray-400 cursor-default hover:text-gray-400'
                  }`}
                >
                  {section}
                </a>
              ))}
            </div>
          )}

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/wishlist" className="p-2 hover:text-brushed-steel transition-colors relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brushed-steel text-obsidian text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 hover:text-brushed-steel transition-colors relative">
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brushed-steel text-obsidian text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>
            <button className="p-2 hover:text-brushed-steel transition-colors">
              <User size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:text-brushed-steel transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass-effect border-t border-brushed-steel/20">
            <div className="px-6 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {!hideSectionLinks && (
                <div className="space-y-6">
                  {['TIMEPIECES', 'EXCLUSIVE', 'HERITAGE', 'CONTACT'].map((section) => (
                  <a 
                    key={section}
                    href={`#${section.toLowerCase()}`}
                    onClick={(e) => {
                      if (!isHomePage) {
                        e.preventDefault();
                        navigate('/');
                        // Scroll to section after a short delay to allow the page to load
                        setTimeout(() => {
                          const element = document.getElementById(section.toLowerCase());
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      } else {
                        e.preventDefault();
                        const element = document.getElementById(section.toLowerCase());
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                          setIsOpen(false);
                        }
                      }
                    }}
                    className={`block text-lg font-medium tracking-wide transition-colors ${
                      isHomePage 
                        ? 'hover:text-brushed-steel cursor-pointer' 
                        : 'text-gray-400 cursor-default hover:text-gray-400'
                    }`}
                  >
                    {section}
                  </a>
                ))}
                </div>
              )}
              <div className="flex items-center space-x-4 pt-4 border-t border-brushed-steel/20">
                <Link 
                  to="/wishlist" 
                  className="p-2 hover:text-brushed-steel transition-colors relative"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart size={20} />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brushed-steel text-obsidian text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/cart" 
                  className="p-2 hover:text-brushed-steel transition-colors relative"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag size={20} />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brushed-steel text-obsidian text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Link>
                <button className="p-2 hover:text-brushed-steel transition-colors">
                  <User size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
