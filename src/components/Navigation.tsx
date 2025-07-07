
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
            <h1 className="text-2xl lg:text-3xl font-serif font-bold tracking-wider">
              <span className="shimmer-text">VANGUARD</span>
              <span className="text-white"> & CO.</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-medium tracking-wide hover:text-brushed-steel transition-colors">
              TIMEPIECES
            </a>
            <a href="#" className="text-sm font-medium tracking-wide hover:text-brushed-steel transition-colors">
              ACCESSORIES
            </a>
            <a href="#" className="text-sm font-medium tracking-wide hover:text-brushed-steel transition-colors">
              HERITAGE
            </a>
            <a href="#" className="text-sm font-medium tracking-wide hover:text-brushed-steel transition-colors">
              CONTACT
            </a>
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:text-brushed-steel transition-colors">
              <User size={20} />
            </button>
            <button className="p-2 hover:text-brushed-steel transition-colors">
              <ShoppingBag size={20} />
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
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-brushed-steel transition-colors">
                TIMEPIECES
              </a>
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-brushed-steel transition-colors">
                ACCESSORIES
              </a>
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-brushed-steel transition-colors">
                HERITAGE
              </a>
              <a href="#" className="block text-lg font-medium tracking-wide hover:text-brushed-steel transition-colors">
                CONTACT
              </a>
              <div className="flex items-center space-x-4 pt-4 border-t border-brushed-steel/20">
                <button className="p-2 hover:text-brushed-steel transition-colors">
                  <User size={20} />
                </button>
                <button className="p-2 hover:text-brushed-steel transition-colors">
                  <ShoppingBag size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
