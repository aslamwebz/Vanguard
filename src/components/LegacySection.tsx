
export const LegacySection = () => {
  return (
    <section className="py-20 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src="img/THE LEGACY.jpg"
              alt="Luxury watch heritage and craftsmanship"
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8">
              THE <span className="shimmer-text">LEGACY</span>
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-brushed-steel">
                  1847 - The Beginning
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Founded in the heart of Geneva, Vanguard & Co. began as a small 
                  atelier dedicated to creating exceptional timepieces for European nobility.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-brushed-steel">
                  Swiss Tradition
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Four generations of master watchmakers have passed down the secrets of 
                  precision engineering, ensuring each timepiece meets our exacting standards.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-brushed-steel">
                  Modern Innovation
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Today, we blend traditional craftsmanship with cutting-edge technology, 
                  creating watches that honor our heritage while embracing the future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
