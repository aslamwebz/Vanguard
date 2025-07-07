
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'James Morrison',
    title: 'CEO, Morrison Holdings',
    content: 'The attention to detail is extraordinary. My Sovereign Classic has become my signature piece.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Alexander Chen',
    title: 'Investment Banker',
    content: 'Unparalleled craftsmanship. The Imperial Chrono is a masterpiece of precision and elegance.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Marcus Wellington',
    title: 'Art Collector',
    content: 'Each Vanguard timepiece is a work of art. The Dynasty Elite exceeded all my expectations.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-32 luxury-gradient">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6">
            <span className="shimmer-text">DISTINGUISHED</span> CLIENTELE
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trusted by leaders, collectors, and connoisseurs worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass-effect p-8 rounded-lg animate-fade-in hover:border-brushed-steel/40 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Quote className="text-brushed-steel mb-6" size={32} />
              
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-brushed-steel fill-current" size={16} />
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
