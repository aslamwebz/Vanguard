
import { HeroSection } from '../components/HeroSection';
import { Navigation } from '../components/Navigation';
import { ProductShowcase } from '../components/ProductShowcase';
import { CraftedToEndure } from '../components/CraftedToEndure';
import { HeritageSection } from '../components/HeritageSection';
import { ExclusiveCollections } from '../components/ExclusiveCollections';
import { BespokeServices } from '../components/BespokeServices';
import { LegacySection } from '../components/LegacySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { NewsletterSection } from '../components/NewsletterSection';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-obsidian text-white overflow-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <ProductShowcase />
        <CraftedToEndure />
        <HeritageSection />
        <ExclusiveCollections />
        <BespokeServices />
        <LegacySection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
