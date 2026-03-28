import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import useReveal            from "../hooks/useReveal";
import PageHero             from "../components/common/PageHero";
import ProductCard          from "../components/common/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function Products() {
  const { search } = useLocation();
  const [active, setActive] = useState("All");
  useReveal();

  /* read ?cat= query param from navbar links */
  useEffect(() => {
    const cat = new URLSearchParams(search).get("cat");
    if (cat && CATEGORIES.includes(cat)) setActive(cat);
    else setActive("All");
  }, [search]);

  const filtered =
    active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="Calburn Nutrition"
        title="Our Products"
        subtitle="Premium quality supplements scientifically formulated for serious athletes and fitness enthusiasts."
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter tabs – scrollable on mobile */}
          <div className="overflow-x-auto pb-2 mb-8 reveal">
            <div className="flex gap-2 min-w-max sm:flex-wrap sm:min-w-0 sm:justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 text-xs font-bold uppercase tracking-widest rounded-full whitespace-nowrap transition-all duration-200 ${
                    active === cat
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/30"
                      : "bg-gray-100 text-dark-500 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="text-dark-400 text-sm mb-6 reveal">
            Showing <strong className="text-dark-800">{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""}
            {active !== "All" && ` in "${active}"`}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 reveal">
              <p className="font-display text-4xl text-dark-200 mb-4">No Products Found</p>
              <button onClick={() => setActive("All")} className="text-brand-500 font-semibold hover:underline">
                View all products
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
