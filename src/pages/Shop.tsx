import { ProductShowcase } from '@/components/ProductShowcase';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const Shop = () => {
  return (
    <div className="min-h-screen bg-obsidian text-white overflow-hidden">
      <Navigation />
      <main>
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
