
import { Palette, Gem, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BespokeServices = () => {
  const services = [
    {
      icon: Palette,
      title: 'CUSTOM DESIGN',
      description: 'Work with our designers to create your unique timepiece'
    },
    {
      icon: Gem,
      title: 'PRECIOUS STONES',
      description: 'Select from our collection of diamonds and rare gems'
    },
    {
      icon: Users,
      title: 'PERSONAL CONSULTATION',
      description: 'One-on-one sessions with our master craftsmen'
    },
    {
      icon: Phone,
      title: 'CONCIERGE SERVICE',
      description: '24/7 support for all your luxury timepiece needs'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            <span className="shimmer-text">BESPOKE</span> SERVICES
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create a timepiece as unique as you are. Our master craftsmen will 
            bring your vision to life with unparalleled attention to detail.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80"
              alt="Bespoke watchmaking process"
              className="rounded-lg shadow-2xl"
            />
          </div>
          
          <div>
            <h3 className="text-3xl font-serif font-bold mb-6">
              YOUR VISION, OUR CRAFT
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              From initial concept to final delivery, our bespoke service ensures 
              every element of your timepiece reflects your personal style and 
              preferences. Choose materials, complications, and finishing touches 
              that make your watch truly one-of-a-kind.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-brushed-steel rounded-full flex items-center justify-center">
                  <span className="text-obsidian font-bold text-sm">1</span>
                </div>
                <span className="text-gray-300">Initial consultation and design concept</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-brushed-steel rounded-full flex items-center justify-center">
                  <span className="text-obsidian font-bold text-sm">2</span>
                </div>
                <span className="text-gray-300">Material selection and 3D modeling</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-brushed-steel rounded-full flex items-center justify-center">
                  <span className="text-obsidian font-bold text-sm">3</span>
                </div>
                <span className="text-gray-300">Master craftsmanship and assembly</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-brushed-steel rounded-full flex items-center justify-center">
                  <span className="text-obsidian font-bold text-sm">4</span>
                </div>
                <span className="text-gray-300">Final inspection and delivery</span>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-brushed-steel text-obsidian hover:bg-pale-steel px-8"
            >
              START YOUR BESPOKE JOURNEY
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-effect p-8 rounded-lg text-center group hover:border-brushed-steel transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brushed-steel transition-colors duration-300">
                <service.icon 
                  className="text-brushed-steel group-hover:text-obsidian transition-colors duration-300" 
                  size={32} 
                />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-4 group-hover:text-brushed-steel transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
