import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Props: product (from data/products.js), index (for stagger delay)
 */
export default function ProductCard({ product, index = 0 }) {
  const [imgErr, setImgErr] = useState(false);
  const delays = ["", "delay-100", "delay-200", "delay-300", "delay-400"];
  const delay  = delays[index % delays.length];

  return (
    <Link
      to={`/products/${product.id}`}
      className={`reveal ${delay} group flex flex-col bg-dark-900 border border-white/10 rounded-xl overflow-hidden hover:-translate-y-2 hover:border-white/25 transition-all duration-300 shadow-lg hover:shadow-2xl`}
    >
      {/* colour accent top bar */}
      <div
        className="h-1 w-full group-hover:h-1.5 transition-all duration-300 flex-shrink-0"
        style={{ backgroundColor: product.accentColor }}
      />

      {/* ── Image area ── */}
      <div className="relative flex-shrink-0 h-52 flex items-center justify-center overflow-hidden bg-dark-800">
        {/* subtle radial glow */}
        <div
          className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at 55% 45%, ${product.accentColor}, transparent 70%)` }}
        />

        {/* Pro Series badge */}
        <span className="absolute top-3 right-3 z-10 bg-brand-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
          {product.badge}
        </span>

        {/* Real product image — fallback to text name if broken */}
        {product.image && !imgErr ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgErr(true)}
            className="relative z-10 h-44 w-auto object-contain drop-shadow-2xl
                       group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          /* Fallback: text graphic */
          <div className="text-center z-10 px-4 select-none">
            <p
              className="font-display text-5xl leading-none group-hover:scale-105 transition-transform duration-300"
              style={{ color: product.accentColor }}
            >
              {product.name.toUpperCase()}
            </p>
            <p className="text-dark-400 text-xs uppercase tracking-wider mt-1">{product.category}</p>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-2xl text-white leading-none mb-0.5">{product.name}</h3>
        <p className="text-dark-400 text-xs uppercase tracking-wider mb-4">{product.category}</p>

        {/* Stats strip – only for non-tablet products */}
        {product.category !== "Tablets Capsule" ? (
          <div className="grid grid-cols-3 gap-1 text-center py-3 border-y border-white/10 mb-4">
            {[
              { label: "Protein",  val: product.protein  },
              { label: "Calories", val: product.calories },
              { label: "BCAA",     val: product.bcaa     },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-display text-lg leading-none" style={{ color: product.accentColor }}>{s.val}</p>
                <p className="text-dark-400 text-[10px] uppercase tracking-wide mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        ) : (
          /* Tablet/capsule: show packing + MRP */
          <div className="flex items-center justify-between py-3 border-y border-white/10 mb-4">
            {product.packing && (
              <div>
                <p className="font-display text-lg leading-none" style={{ color: product.accentColor }}>{product.packing}</p>
                <p className="text-dark-400 text-[10px] uppercase tracking-wide mt-0.5">Packing</p>
              </div>
            )}
            {product.mrp && (
              <div className="text-right">
                <p className="font-display text-lg leading-none text-brand-400">{product.mrp}</p>
                <p className="text-dark-400 text-[10px] uppercase tracking-wide mt-0.5">MRP</p>
              </div>
            )}
          </div>
        )}

        {/* Flavours (only if product has them) */}
        {product.flavors?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-5">
            {product.flavors.slice(0, 3).map((f) => (
              <span key={f} className="text-[10px] text-dark-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          className="mt-auto flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 group-hover:text-brand-400"
          style={{ color: product.accentColor }}
        >
          View Details
          <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
