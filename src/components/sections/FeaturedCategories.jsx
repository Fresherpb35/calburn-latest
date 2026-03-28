import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "../../data/products";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";

export default function FeaturedCategories() {
  const [imgErrors, setImgErrors] = useState({});

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Our Range"
          heading="Featured Categories"
          center
          className="reveal"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {PRODUCTS.map((p, i) => (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className={`reveal delay-${Math.min(i % 5, 4) * 100} group relative overflow-hidden rounded-xl bg-dark-900 aspect-square flex flex-col justify-end`}
            >
              {/* glow */}
              <div
                className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 50% 40%, ${p.accentColor}, transparent 70%)` }}
              />

              {/* real product image centered */}
              {p.image && !imgErrors[p.id] ? (
                <img
                  src={p.image}
                  alt={p.name}
                  onError={() => setImgErrors((e) => ({ ...e, [p.id]: true }))}
                  className="absolute inset-0 w-full h-full object-contain object-center p-4
                             group-hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                />
              ) : null}

              {/* dark gradient at bottom for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />

              {/* text */}
              <div className="relative z-10 p-3">
                <p
                  className="font-display text-xl sm:text-2xl leading-none"
                  style={{ color: p.accentColor }}
                >
                  {p.name.toUpperCase()}
                </p>
                <p className="text-dark-300 text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5">
                  {p.category}
                </p>
              </div>

              {/* accent bottom bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 group-hover:h-1 transition-all duration-300"
                style={{ backgroundColor: p.accentColor }}
              />
            </Link>
          ))}
        </div>

        <div className="text-center reveal">
          <Button to="/products" size="lg">
            View All Products <ArrowRight size={15} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
