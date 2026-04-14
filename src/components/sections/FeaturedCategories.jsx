import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "../../data/products";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";

export default function FeaturedCategories() {
  const [imgErrors, setImgErrors] = useState({});

  const featuredProducts = useMemo(() => {
    return PRODUCTS.slice(0, 4);
  }, []);

  console.log("Featured Products:", featuredProducts.length, featuredProducts);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Our Range"
          heading="Featured Categories"
          center
          className="reveal"
        />

        {/* Larger Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {featuredProducts.map((p, i) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className={`reveal delay-${Math.min(i % 5, 4) * 100} group relative overflow-hidden rounded-3xl 
                         bg-white border border-gray-100 aspect-square flex flex-col justify-end 
                         hover:scale-[1.04] transition-all duration-300 shadow-xl hover:shadow-2xl`}
            >
              {/* Subtle Glow */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 50% 35%, ${p.accentColor || "#f97316"}, transparent 70%)`,
                }}
              />

              {/* Product Image */}
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                {p.image && !imgErrors[p.id] ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    onError={() => {
                      console.log(`Image failed for ${p.name}`);
                      setImgErrors((e) => ({ ...e, [p.id]: true }));
                    }}
                    className="w-[85%] h-[85%] object-contain object-center 
                               group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  /* Clean Fallback */
                  <div className="text-center">
                    <span
                      className="font-display text-8xl block mb-3"
                      style={{ color: p.accentColor || "#f97316" }}
                    >
                      {p.name ? p.name[0] : "?"}
                    </span>
                    <p className="text-gray-800 text-sm font-medium px-4">
                      {p.name || "Product"}
                    </p>
                  </div>
                )}
              </div>

              {/* Gradient Overlay - Only at the bottom */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

              {/* Product Info */}
              <div className="relative z-10 p-6 sm:p-8">
                <p
                  className="font-display text-3xl sm:text-4xl leading-none tracking-tighter text-white"
                  style={{ color: p.accentColor || "#f97316" }}
                >
                  {p.name ? p.name.toUpperCase() : "PRODUCT"}
                </p>
                <p className="text-white/80 text-sm uppercase tracking-widest mt-3">
                  {p.category || "Category"}
                </p>
              </div>

              {/* Accent Bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1.5 group-hover:h-2.5 transition-all duration-300"
                style={{ backgroundColor: p.accentColor || "#f97316" }}
              />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center reveal">
          <Button to="/products" size="lg">
            View All Products <ArrowRight size={15} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}