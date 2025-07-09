import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { products } from '@/components/ProductShowcase';
import { Button } from '@/components/ui/button';

type Category = 'all' | 'watch' | 'ring' | 'tie' | 'cufflinks' | 'bracelet' | 'pen';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set());
  
  // Get category from URL params
  const categoryParam = searchParams.get('category') as Category | null;
  
  // Update selected categories when URL changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories(new Set([categoryParam]));
    } else {
      setSelectedCategories(new Set());
    }
  }, [categoryParam]);
  
  // Filter products based on selected categories
  const filteredProducts = products.filter(product => {
    if (selectedCategories.size === 0) return true;
    return selectedCategories.has(product.category);
  });
  
  const categories: { value: Category; label: string }[] = [
    { value: 'watch', label: 'Timepieces' },
    { value: 'ring', label: 'Rings' },
    { value: 'tie', label: 'Ties' },
    { value: 'cufflinks', label: 'Cufflinks' },
    { value: 'bracelet', label: 'Bracelets' },
    { value: 'pen', label: 'Writing Instruments' },
  ];
  
  const toggleCategory = (category: Category) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
    
    // Update URL with the first selected category or remove the param if none selected
    if (newCategories.size > 0) {
      navigate(`/shop?category=${Array.from(newCategories)[0]}`, { replace: true });
    } else {
      navigate('/shop', { replace: true });
    }
  };
  
  const clearFilters = () => {
    setSelectedCategories(new Set());
    setPriceRange([0, 50000]);
    navigate('/shop', { replace: true });
  };

  return (
    <div className="min-h-screen bg-obsidian text-white overflow-hidden">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold">
            {categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)} Collection` : 'Shop All'}
          </h1>
          
          <div className="md:hidden">
            <Button
              variant="outline"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 border-brushed-steel text-brushed-steel hover:bg-brushed-steel/10"
            >
              <SlidersHorizontal size={18} />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile filter dialog */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              <div className="fixed inset-0 bg-black/25" onClick={() => setMobileFiltersOpen(false)} />
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-obsidian py-4 pb-12 shadow-xl border-l border-brushed-steel/20">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 hover:bg-charcoal/50"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                {/* Mobile Filters */}
                <div className="mt-4 border-t border-brushed-steel/20">
                  <div className="px-4 py-6">
                    <h3 className="font-medium mb-4">Categories</h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <div key={category.value} className="flex items-center">
                          <button
                            onClick={() => toggleCategory(category.value as Category)}
                            className={`flex-1 text-left py-2 px-3 rounded-md transition-colors ${
                              selectedCategories.has(category.value as Category)
                                ? 'bg-brushed-steel/20 text-brushed-steel'
                                : 'hover:bg-charcoal/50'
                            }`}
                          >
                            {category.label}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="px-4 py-6 border-t border-brushed-steel/20">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Price Range</h3>
                      <button
                        onClick={clearFilters}
                        className="text-sm text-brushed-steel hover:underline"
                      >
                        Clear all
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex-1">
                          <label htmlFor="min-price" className="block text-sm text-gray-400 mb-1">
                            Min
                          </label>
                          <div className="relative rounded-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-400">$</span>
                            </div>
                            <input
                              type="number"
                              id="min-price"
                              value={priceRange[0]}
                              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                              className="block w-full rounded-md border border-brushed-steel/30 bg-charcoal/50 pl-7 py-2 text-white focus:border-brushed-steel focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label htmlFor="max-price" className="block text-sm text-gray-400 mb-1">
                            Max
                          </label>
                          <div className="relative rounded-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-400">$</span>
                            </div>
                            <input
                              type="number"
                              id="max-price"
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                              className="block w-full rounded-md border border-brushed-steel/30 bg-charcoal/50 pl-7 py-2 text-white focus:border-brushed-steel focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Desktop Filters */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-brushed-steel hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.value} className="flex items-center">
                          <button
                            onClick={() => toggleCategory(category.value as Category)}
                            className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                              selectedCategories.has(category.value as Category)
                                ? 'bg-brushed-steel/20 text-brushed-steel'
                                : 'hover:bg-charcoal/50'
                            }`}
                          >
                            {category.label}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-brushed-steel/20">
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between space-x-4">
                        <div className="flex-1">
                          <label htmlFor="desktop-min-price" className="block text-sm text-gray-400 mb-1">
                            Min
                          </label>
                          <div className="relative rounded-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-400">$</span>
                            </div>
                            <input
                              type="number"
                              id="desktop-min-price"
                              value={priceRange[0]}
                              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                              className="block w-full rounded-md border border-brushed-steel/30 bg-charcoal/50 pl-7 py-2 text-white focus:border-brushed-steel focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <label htmlFor="desktop-max-price" className="block text-sm text-gray-400 mb-1">
                            Max
                          </label>
                          <div className="relative rounded-md">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-400">$</span>
                            </div>
                            <input
                              type="number"
                              id="desktop-max-price"
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                              className="block w-full rounded-md border border-brushed-steel/30 bg-charcoal/50 pl-7 py-2 text-white focus:border-brushed-steel focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-charcoal rounded-lg overflow-hidden transition-transform hover:scale-[1.02]"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg mb-1 group-hover:text-brushed-steel transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                      <p className="text-brushed-steel font-medium">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button
                  variant="outline"
                  className="border-brushed-steel text-brushed-steel hover:bg-brushed-steel/10"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
