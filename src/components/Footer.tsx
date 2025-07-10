
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-obsidian border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold mb-4 tracking-wider">
              <span className="shimmer-text">VANGUARD</span>
              <span className="text-white"> & CO.</span>
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              Swiss heritage meets contemporary excellence. Creating exceptional timepieces 
              for the discerning collector since 1847.
            </p>
            
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center hover:bg-brushed-steel hover:text-obsidian transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center hover:bg-brushed-steel hover:text-obsidian transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-charcoal rounded-full flex items-center justify-center hover:bg-brushed-steel hover:text-obsidian transition-all">
                <Twitter size={18} />
              </a>
            </div>
          </div>
          
          {/* Collections */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brushed-steel">COLLECTIONS</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-serif">Sovereign Classic</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-serif">Imperial Chrono</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-serif">Dynasty Elite</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-serif">Limited Editions</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-brushed-steel">CONTACT</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={16} />
                <span className="text-sm">Geneva, Switzerland</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={16} />
                <span className="text-sm">+41 22 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={16} />
                <span className="text-sm">contact@vanguardco.ch</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm font-serif">
            © 2025 Em@Webzone. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm font-serif">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
