
import { ArrowRight, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const NewsletterSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-charcoal" id="contact">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Crown className="text-brushed-steel mx-auto mb-6" size={48} />
          <h2 className="text-4xl lg:text-5xl font-serif font-bold mb-6">
            JOIN THE <span className="shimmer-text">VIP CLUB</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Gain exclusive access to limited editions, private events, and early releases. 
            Experience luxury before anyone else.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Your email address"
              className="bg-obsidian border-gray-600 text-white placeholder-gray-400 focus:border-brushed-steel"
            />
            <Button className="bg-brushed-steel text-obsidian hover:bg-pale-steel px-6">
              <ArrowRight size={20} />
            </Button>
          </div>
          
          <p className="text-sm text-gray-400">
            By joining, you agree to receive exclusive communications from Vanguard & Co. 
            Unsubscribe at any time.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-700">
          <div>
            <div className="text-2xl font-bold text-brushed-steel mb-2">FIRST ACCESS</div>
            <div className="text-gray-400">To limited editions and new releases</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brushed-steel mb-2">PRIVATE EVENTS</div>
            <div className="text-gray-400">Exclusive showings and collector gatherings</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brushed-steel mb-2">VIP PRICING</div>
            <div className="text-gray-400">Special rates and member-only discounts</div>
          </div>
        </div>
      </div>
    </section>
  );
};
