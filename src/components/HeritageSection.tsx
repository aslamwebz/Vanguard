
import { Crown, Shield, Award, Clock } from 'lucide-react';

export const HeritageSection = () => {
  const achievements = [
    {
      icon: Crown,
      title: 'ROYAL HERITAGE',
      description: 'Crafting timepieces for royalty since 1895'
    },
    {
      icon: Shield,
      title: 'LIFETIME WARRANTY',
      description: 'Every piece backed by our eternal guarantee'
    },
    {
      icon: Award,
      title: 'MASTER ARTISANS',
      description: 'Hand-selected craftsmen with decades of experience'
    },
    {
      icon: Clock,
      title: 'PRECISION MOVEMENT',
      description: 'Swiss-made mechanisms with ±2 seconds accuracy'
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-obsidian">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-8">
              A <span className="shimmer-text">CENTURY</span> OF EXCELLENCE
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Since 1895, Vanguard & Co. has stood at the pinnacle of horological 
              achievement. Our master craftsmen, working from the heart of Switzerland, 
              have created timepieces for emperors, presidents, and visionaries.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Each Vanguard timepiece is a testament to our unwavering commitment 
              to perfection. From the precision-cut sapphire crystals to the 
              hand-finished gold cases, every detail is meticulously crafted 
              to last generations.
            </p>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-brushed-steel">128</div>
                <div className="text-sm text-gray-400">YEARS OF HERITAGE</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brushed-steel">50K+</div>
                <div className="text-sm text-gray-400">TIMEPIECES CRAFTED</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brushed-steel">12</div>
                <div className="text-sm text-gray-400">MASTER CRAFTSMEN</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80"
              alt="Master craftsman at work"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/50 to-transparent rounded-lg"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 bg-charcoal rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brushed-steel transition-colors duration-300">
                <achievement.icon 
                  className="text-brushed-steel group-hover:text-obsidian transition-colors duration-300"
                  size={32} 
                />
              </div>
              <h3 className="text-lg font-serif font-semibold mb-3 group-hover:text-brushed-steel transition-colors">
                {achievement.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
