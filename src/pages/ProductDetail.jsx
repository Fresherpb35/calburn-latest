import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, Package, Tag } from "lucide-react";

import useReveal      from "../hooks/useReveal";
import { PRODUCTS }   from "../data/products";
import NutritionTable from "../components/common/NutritionTable";
import ProductCard    from "../components/common/ProductCard";
import Button         from "../components/common/Button";

const TABS = ["overview"];

export default function ProductDetail() {
  const { id } = useParams();
  useReveal();

  const product = PRODUCTS.find((p) => p.id === id);
  const related = PRODUCTS.filter((p) => p.id !== id && p.category === product?.category).slice(0, 3)
    .concat(PRODUCTS.filter((p) => p.id !== id && p.category !== product?.category))
    .slice(0, 3);

  const [activeTab, setActiveTab] = useState("overview");

  /* ── 404 ── */
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white pt-24 px-4 text-center">
        <p className="font-display text-6xl text-dark-200 mb-4">Product Not Found</p>
        <Button to="/products" size="lg"><ArrowLeft size={15} className="mr-2" />Back to Products</Button>
      </div>
    );
  }

  const isTabletCapsule = product.category === "Tablets Capsule";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-dark-900 pt-28 pb-16 overflow-hidden min-h-[420px]">
        {/* glow */}
        <div
          className="absolute inset-0 opacity-[.14]"
          style={{ background: `radial-gradient(ellipse at 60% 40%, ${product.accentColor}, transparent 65%)` }}
        />
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(249,115,22,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.5) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* breadcrumb */}
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-dark-300 hover:text-brand-400 text-xs uppercase tracking-widest font-bold mb-8 transition-colors"
          >
            <ArrowLeft size={13} /> All Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Product image */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* glow behind image */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl opacity-30 scale-75"
                  style={{ backgroundColor: product.accentColor }}
                />
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="relative z-10 w-64 sm:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl
                               hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-dark-800 border border-white/10 flex flex-col items-center justify-center text-center p-8 shadow-2xl">
                    <span className="font-display text-5xl sm:text-6xl leading-none" style={{ color: product.accentColor }}>
                      {product.name.toUpperCase()}
                    </span>
                    <span className="text-dark-400 text-xs uppercase tracking-wider mt-2">{product.category}</span>
                  </div>
                )}
                {/* Badge overlay */}
                <span className="absolute top-3 right-3 z-20 bg-brand-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {product.badge}
                </span>
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-brand-500 text-xs font-bold uppercase tracking-[.35em] mb-1">{product.category}</p>
              <h1 className="font-display text-5xl sm:text-7xl text-white leading-none mb-2">{product.name}</h1>
              <p className="text-dark-300 text-base mb-5 italic">{product.tagline}</p>

              {/* ── Tablet/Capsule: show Packing + MRP ── */}
              {isTabletCapsule ? (
                <div className="flex flex-wrap gap-6 mb-6">
                  {product.packing && (
                    <div className="flex items-center gap-2">
                      <Package size={16} className="text-brand-500" />
                      <div>
                        <p className="text-brand-400 text-xs font-bold uppercase tracking-wide">Packing</p>
                        <p className="text-white text-lg font-bold">{product.packing}</p>
                      </div>
                    </div>
                  )}
                  {product.mrp && (
                    <div className="flex items-center gap-2">
                      <Tag size={16} className="text-brand-500" />
                      <div>
                        <p className="text-brand-400 text-xs font-bold uppercase tracking-wide">M.R.P.</p>
                        <p className="text-white text-lg font-bold">{product.mrp}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* ── Protein/Gainer: show stats ── */
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: "Protein",      val: product.protein     },
                    { label: "Calories",     val: product.calories    },
                    { label: "Carbs",        val: product.carbs       },
                    { label: "BCAA",         val: product.bcaa        },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-white/5 border border-white/10 rounded-lg p-3 text-center"
                    >
                      <p className="font-display text-2xl leading-none" style={{ color: product.accentColor }}>
                        {s.val}
                      </p>
                      <p className="text-dark-400 text-[10px] uppercase tracking-wide mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Flavors */}
              {product.flavors.length > 0 && (
                <div className="mb-3">
                  <span className="text-dark-300 text-xs uppercase tracking-widest font-bold">Flavors: </span>
                  {product.flavors.map((f) => (
                    <span key={f} className="inline-block text-xs text-dark-300 border border-white/15 px-2 py-0.5 rounded-full mr-1.5 mb-1">
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {/* Sizes */}
              <div className="mb-6">
                <span className="text-dark-300 text-xs uppercase tracking-widest font-bold">
                  {isTabletCapsule ? "Available: " : "Available in: "}
                </span>
                {product.sizes.map((s) => (
                  <span key={s} className="inline-block text-xs text-dark-300 border border-white/15 px-2 py-0.5 rounded-full mr-1.5 mb-1">
                    {s}
                  </span>
                ))}
              </div>

              <Button to="/contact" size="lg">Enquire Now</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab bar ── */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-5 sm:px-8 py-4 text-xs font-bold uppercase tracking-widest border-b-2 whitespace-nowrap transition-colors duration-200 ${
                  activeTab === t
                    ? "border-brand-500 text-brand-500"
                    : "border-transparent text-dark-400 hover:text-dark-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

              {/* Description + when to take */}
              <div className="reveal">
                <h2 className="font-display text-4xl text-dark-900 mb-4">What is {product.name}?</h2>
                <p className="text-dark-500 leading-relaxed mb-8">{product.description}</p>

                <h3 className="font-display text-3xl text-dark-900 mb-4">When Should I Take It?</h3>
                <div className="space-y-4">
                  {product.whenToTake.map((w) => (
                    <div key={w.label} className="border-l-2 border-brand-500 pl-4">
                      <p className="font-bold text-dark-900 uppercase tracking-wide text-sm mb-0.5">{w.label}</p>
                      <p className="text-dark-500 text-sm leading-relaxed">{w.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="reveal delay-200">
                <h3 className="font-display text-4xl text-dark-900 mb-6">Beyond The Basics</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((f) => (
                    <div
                      key={f.title}
                      className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Check size={13} className="text-brand-500 flex-shrink-0" />
                        <p className="font-bold text-sm uppercase tracking-wide" style={{ color: product.accentColor }}>
                          {f.title}
                        </p>
                      </div>
                      <p className="text-dark-500 text-sm leading-relaxed">{f.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NUTRITION */}
          {activeTab === "nutrition" && (
            <div className="reveal max-w-4xl mx-auto">
              <h2 className="font-display text-4xl text-dark-900 mb-8 text-center">Nutritional Information</h2>
              <NutritionTable rows={product.nutritionRows} servingLabel={`Per ${product.servingSize}`} />
            </div>
          )}

          {/* USAGE */}
          {activeTab === "usage" && (
            <div className="reveal max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl text-dark-900 mb-6">Suggested Usage</h2>
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-8 mb-8">
                <p className="text-dark-700 leading-relaxed">{product.suggestedUsage}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="font-bold text-dark-900 text-sm uppercase tracking-wide mb-2">Available Sizes</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <span key={s} className="text-sm font-semibold text-dark-700 bg-white border border-gray-200 px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
                {product.flavors.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-bold text-dark-900 text-sm uppercase tracking-wide mb-2">Available Flavors</p>
                    <div className="flex flex-wrap gap-2">
                      {product.flavors.map((f) => (
                        <span key={f} className="text-sm font-semibold text-dark-700 bg-white border border-gray-200 px-3 py-1 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                )}
                {isTabletCapsule && product.packing && (
                  <div className="bg-gray-50 rounded-xl p-5">
                    <p className="font-bold text-dark-900 text-sm uppercase tracking-wide mb-2">Packing</p>
                    <p className="text-dark-700 font-semibold">{product.packing}</p>
                  </div>
                )}
                {isTabletCapsule && product.mrp && (
                  <div className="bg-brand-50 border border-brand-200 rounded-xl p-5">
                    <p className="font-bold text-brand-600 text-sm uppercase tracking-wide mb-2">M.R.P.</p>
                    <p className="text-brand-700 text-2xl font-bold">{product.mrp}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-dark-900 mb-8 reveal">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
