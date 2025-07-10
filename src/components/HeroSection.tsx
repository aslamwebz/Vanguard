
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(12, 12, 12, 0.4), rgba(12, 12, 12, 0.6)), url('https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=2000&q=80')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/70" />
      
      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-4xl mx-auto px-4 py-24 sm:py-32">
        <div className="animate-fade-in space-y-6 sm:space-y-8">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight">
            <span className="block mb-1 sm:mb-2">TIME.</span>
            <span className="shimmer-text">REFINED.</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed tracking-wide px-2">
            Discover the perfect harmony of Swiss precision and contemporary elegance. 
            Each timepiece tells a story of uncompromising craftsmanship.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
            <Button 
              size="lg" 
              className="bg-brushed-steel text-obsidian hover:bg-pale-steel font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg tracking-wide transition-all duration-300 hover:scale-105 w-full sm:w-auto"
            >
              EXPLORE COLLECTION
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            <button className="flex items-center justify-center gap-2 sm:gap-3 text-white hover:text-brushed-steel transition-colors group w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white group-hover:border-brushed-steel flex items-center justify-center transition-colors flex-shrink-0">
                <Play size={14} className="ml-0.5" />
              </div>
              <span className="font-medium text-sm sm:text-base tracking-wide">WATCH STORY</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-0.5 h-2 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};
