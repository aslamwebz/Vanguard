
import { ArrowRight, Star, Zap, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';

const collections = [
  {
    id: 1,
    name: 'BLACK DIAMOND SERIES',
    subtitle: 'Limited to 50 pieces worldwide',
    price: 'Starting at $85,000',
    image: 'https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=800&q=80',
    icon: Diamond,
    features: ['Black Diamond Dial', 'Platinum Case', 'Hand-Engraved Movement']
  },
  {
    id: 2,
    name: 'LIGHTNING COLLECTION',
    subtitle: 'Speed meets elegance',
    price: 'Starting at $45,000',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&w=800&q=80',
    icon: Zap,
    features: ['Racing-Inspired Design', 'Carbon Fiber Elements', 'Chronograph Function']
  },
  {
    id: 3,
    name: 'CELESTIAL MASTERS',
    subtitle: 'Astronomical complications',
    price: 'Starting at $125,000',
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=800&q=80',
    icon: Star,
    features: ['Moon Phase Display', 'Star Chart Dial', 'Celestial Navigation']
  }
];

export const ExclusiveCollections = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-charcoal to-obsidian" id="exclusive">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            EXCLUSIVE <span className="shimmer-text">COLLECTIONS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Exceptional timepieces reserved for the most discerning collectors. 
            Each collection tells a unique story of innovation and artistry.
          </p>
        </div>

        <div className="space-y-16">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`grid lg:grid-cols-2 gap-12 items-center animate-slide-up ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-brushed-steel rounded-full flex items-center justify-center">
                    <collection.icon className="text-obsidian" size={24} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold">{collection.name}</h3>
                    <p className="text-brushed-steel font-medium">{collection.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-4xl font-bold text-brushed-steel mb-6">
                  {collection.price}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {collection.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-brushed-steel rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  size="lg"
                  className="bg-brushed-steel text-obsidian hover:bg-pale-steel px-8"
                >
                  DISCOVER COLLECTION
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <div className="relative group">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
