
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, User, Heart, Package, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '@/contexts/CartWishlistContext';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cart, wishlist } = useCartWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const isHomePage = location.pathname === '/';
  // Only show section links on the home page
  const showSectionLinks = isHomePage;

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
          {showSectionLinks && (
            <div className="hidden md:flex items-center space-x-8">
              {['COLLECTIONS', 'EXCLUSIVE', 'HERITAGE'].map((section) => (
                <a 
                  key={section}
                  href={`#${section.toLowerCase()}`}
                  onClick={(e) => handleSectionClick(section.toLowerCase(), e)}
                  className="text-sm font-medium tracking-wide transition-colors hover:text-brushed-steel cursor-pointer"
                >
                  {section}
                </a>
              ))}
              <Link 
                to="/shop" 
                className="text-sm font-medium tracking-wide transition-colors hover:text-brushed-steel"
              >
                SHOP
              </Link>
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
            <div className="relative" ref={userMenuRef}>
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-1 p-2 hover:text-brushed-steel transition-colors"
              >
                <User size={20} />
                <ChevronDown size={16} className={`transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-charcoal border border-brushed-steel/20 rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/orders"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-white hover:bg-brushed-steel/10"
                  >
                    <Package size={16} className="mr-2" />
                    My Orders
                  </Link>
                  <button
                    className="w-full text-left flex items-center px-4 py-2 text-sm text-white hover:bg-brushed-steel/10"
                    onClick={() => {
                      // Handle sign out
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
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
              <div className="md:hidden mt-4 space-y-4">
                {showSectionLinks && (
                  <>
                    <a 
                      href="#collections" 
                      className="block px-4 py-2 text-sm font-medium hover:bg-charcoal/50 rounded-md"
                      onClick={(e) => {
                        handleSectionClick('collections', e);
                        setIsOpen(false);
                      }}
                    >
                      Collections
                    </a>
                    <a 
                      href="#heritage" 
                      className="block px-4 py-2 text-sm font-medium hover:bg-charcoal/50 rounded-md"
                      onClick={(e) => {
                        handleSectionClick('heritage', e);
                        setIsOpen(false);
                      }}
                    >
                      Heritage
                    </a>
                    <a 
                      href="#exclusive" 
                      className="block px-4 py-2 text-sm font-medium hover:bg-charcoal/50 rounded-md"
                      onClick={(e) => {
                        handleSectionClick('exclusive', e);
                        setIsOpen(false);
                      }}
                    >
                      Exclusive
                    </a>
                  </>
                )}
              </div>
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
