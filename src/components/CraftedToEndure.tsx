
import { Award, Shield, Clock, Gem } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Swiss Excellence',
    description: 'Certified chronometers meeting the highest precision standards'
  },
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    description: 'Comprehensive protection for your investment in timeless craftsmanship'
  },
  {
    icon: Clock,
    title: 'Heritage Movement',
    description: 'In-house calibers developed through generations of expertise'
  },
  {
    icon: Gem,
    title: 'Precious Materials',
    description: '18k gold, sapphire crystal, and ethically sourced diamonds'
  }
];

export const CraftedToEndure = () => {
  return (
    <section className="py-20 lg:py-32 luxury-gradient">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8">
              CRAFTED TO <span className="shimmer-text">ENDURE</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Every Vanguard & Co. timepiece is a testament to uncompromising quality. 
              From the initial sketch to the final polish, each watch undergoes over 
              200 individual quality checks by master craftsmen.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brushed-steel/10 rounded-lg flex items-center justify-center group-hover:bg-brushed-steel/20 transition-colors">
                      <feature.icon className="text-brushed-steel" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-brushed-steel transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="img/CRAFTED TO ENDURE.jpg"
                alt="Luxury watch craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-8 glass-effect p-6 rounded-lg max-w-xs">
              <div className="text-3xl font-bold text-brushed-steel mb-2">200+</div>
              <div className="text-sm text-gray-300">Quality checks per timepiece</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
