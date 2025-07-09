
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  category: 'watch' | 'ring' | 'tie' | 'cufflinks' | 'bracelet' | 'pen';
};

export const products: Product[] = [
  // Watches
  {
    id: 1,
    name: 'SOVEREIGN CLASSIC',
    price: '$12,500',
    image: 'img/SOVEREIGN CLASSIC.jpg',
    description: 'Swiss automatic movement with 42mm rose gold case',
    category: 'watch'
  },
  {
    id: 2,
    name: 'IMPERIAL CHRONO',
    price: '$18,900',
    image: 'img/IMPERIAL CHRONO.jpg',
    description: 'Limited edition chronograph with titanium construction',
    category: 'watch'
  },
  {
    id: 3,
    name: 'DYNASTY ELITE',
    price: '$25,000',
    image: 'img/DYNASTY ELITE.jpg',
    description: 'Perpetual calendar with moon phase complications',
    category: 'watch'
  },
  
  // Rings
  {
    id: 4,
    name: 'PLATINUM SIGNET',
    price: '$8,500',
    image: 'img/PLATINUM SIGNET.jpg',
    description: 'Handcrafted platinum signet ring with family crest',
    category: 'ring'
  },
  {
    id: 5,
    name: 'ETERNITY BAND',
    price: '$12,000',
    image: 'img/ETERNITY BAND.jpg',
    description: 'Eternity band with channel-set diamonds',
    category: 'ring'
  },
  
  // Ties
  {
    id: 6,
    name: 'SILK SATIN TIE',
    price: '$295',
    image: 'img/SILK SATIN TIE.jpg',
    description: 'Hand-rolled Italian silk tie with hidden stitch',
    category: 'tie'
  },
  {
    id: 7,
    name: 'CASHMERE BOW TIE',
    price: '$395',
    image: 'img/CASHMERE BOW TIE.jpg',
    description: 'Self-tie cashmere bow tie in midnight blue',
    category: 'tie'
  },
  
  // Cufflinks
  {
    id: 8,
    name: 'OBSIDIAN CUFFLINKS',
    price: '$1,950',
    image: 'img/OBSIDIAN CUFFLINKS.jpg',
    description: '18k gold cufflinks with obsidian inlay',
    category: 'cufflinks'
  },
  {
    id: 9,
    name: 'ENAMEL CUFFLINKS',
    price: '$1,250',
    image: 'img/ENAMEL CUFFLINKS.jpg',
    description: 'Sterling silver with royal blue enamel',
    category: 'cufflinks'
  },
  
  // Bracelets
  {
    id: 10,
    name: 'GOLD LINK BRACELET',
    price: '$5,200',
    image: 'img/GOLD LINK BRACELET.jpg',
    description: '18k gold Cuban link bracelet with secure clasp',
    category: 'bracelet'
  },
  {
    id: 11,
    name: 'LEATHER CUFF',
    price: '$3,800',
    image: 'img/LEATHER CUFF.jpg',
    description: 'Hand-stitched Italian leather cuff with titanium hardware',
    category: 'bracelet'
  },
  
  // Pens
  {
    id: 12,
    name: 'FOUNTAIN PEN',
    price: '$3,200',
    image: 'img/FOUNTAIN PEN.jpg',
    description: '18k gold nib fountain pen with ebonite body',
    category: 'pen'
  },
  {
    id: 13,
    name: 'ROLLERBALL SET',
    price: '$2,800',
    image: 'img/ROLLERBALL SET.jpg',
    description: 'Matte black rollerball pen with palladium details',
    category: 'pen'
  }
];

export const ProductShowcase = () => {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'all' | Product['category']>('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleViewDetails = (productId: number) => {
    navigate(`/product/${productId}`);
  };  
    

  return (
    <section className="py-20 lg:py-32 bg-charcoal" id="timepieces">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            <span className="shimmer-text">FLAGSHIP</span> COLLECTION
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Each timepiece represents decades of horological expertise, 
            meticulously crafted for the discerning collector.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
            {[
              { value: 'all', label: 'ALL ITEMS' },
              { value: 'watch', label: 'TIMEPIECES' },
              { value: 'ring', label: 'RINGS' },
              { value: 'tie', label: 'TIES' },
              { value: 'cufflinks', label: 'CUFFLINKS' },
              { value: 'bracelet', label: 'BRACELETS' },
              { value: 'pen', label: 'WRITING INSTRUMENTS' },
            ].map(({ value, label }) => (
              <Button
                key={value}
                variant={selectedCategory === value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(value as any)}
                className={`whitespace-nowrap ${
                  selectedCategory === value
                    ? 'bg-brushed-steel text-obsidian'
                    : 'border-brushed-steel text-brushed-steel hover:bg-brushed-steel/10'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => handleViewDetails(product.id)}
            >
              <div className="relative overflow-hidden rounded-lg bg-obsidian cursor-pointer">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-obsidian/60 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-brushed-steel text-brushed-steel hover:bg-brushed-steel hover:text-obsidian"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(product.id);
                      }}
                    >
                      <Eye className="mr-2" size={20} />
                      VIEW DETAILS
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-brushed-steel transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-brushed-steel">
                      {product.price}
                    </span>
                    <ArrowRight 
                      className={`transition-transform duration-300 ${
                        hoveredProduct === product.id ? 'translate-x-2' : ''
                      }`} 
                      size={20} 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            variant="outline"
            className="border-brushed-steel text-brushed-steel hover:bg-brushed-steel hover:text-obsidian px-8 py-4"
            onClick={() => navigate('/shop?category=watch')}
          >
            VIEW ALL TIMEPIECES
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};
