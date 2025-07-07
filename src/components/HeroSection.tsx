
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.4), rgba(12, 12, 12, 0.6)), url('https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=2000&q=80')`
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight">
            <span className="block mb-2">TIME.</span>
            <span className="shimmer-text">REFINED.</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide">
            Discover the perfect harmony of Swiss precision and contemporary elegance. 
            Each timepiece tells a story of uncompromising craftsmanship.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#timepieces"
              className="inline-flex items-center justify-center bg-brushed-steel text-obsidian hover:bg-pale-steel font-semibold px-8 py-4 text-lg tracking-wide transition-all duration-300 hover:scale-105 rounded-md group"
            >
              EXPLORE THE COLLECTION
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            
            <Link
              to="/shop"
              className="flex items-center gap-3 text-white hover:text-brushed-steel transition-colors group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-white group-hover:border-brushed-steel flex items-center justify-center transition-colors">
                <ShoppingBag size={16} className="ml-0.5" />
              </div>
              <span className="font-medium tracking-wide">SHOP NOW</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
