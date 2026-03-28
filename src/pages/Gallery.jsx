import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, X, Grid, List } from "lucide-react";

import useReveal            from "../hooks/useReveal";
import { PRODUCTS, NAV_PRODUCT_GROUPS, CATEGORIES } from "../data/products";

const VIDEOS = [
  { id: 1, title: "Calburn Transformer – Product Overview", duration: "0:32", color: "#f97316" },
  { id: 2, title: "Masculus Mass – Gain Series",            duration: "0:42", color: "#eab308" },
  { id: 3, title: "Isopure Whey – Pure Performance",        duration: "0:34", color: "#10b981" },
];

export default function Gallery() {
  useReveal();
  const [filterCat,  setFilterCat]  = useState("All");
  const [lightbox,   setLightbox]   = useState(null);
  const [viewMode,   setViewMode]   = useState("grid"); // "grid" | "list"
  const [imgErrors,  setImgErrors]  = useState({});

  const filtered =
    filterCat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filterCat);

  return (
    <>
      {/* ── Hero banner matching screenshots ── */}
      <section className="relative min-h-[340px] bg-dark-900 flex items-end overflow-hidden pt-16">
        {/* dark overlay */}
        <div className="absolute inset-0 bg-dark-900/70" />
        {/* grid texture */}
        <div
          className="absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.5) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* orange glow left */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_20%_50%,rgba(249,115,22,0.1),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <p className="text-brand-500 text-xs font-bold uppercase tracking-[.35em] mb-2">Calburn Nutrition</p>
          <h1 className="font-display text-6xl sm:text-8xl text-white leading-none mb-4">GALLERY</h1>
          {/* breadcrumb */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest">
            <Link to="/" className="text-white hover:text-brand-400 font-bold transition-colors">Home</Link>
            <span className="text-dark-400">/</span>
            <span className="text-brand-500 font-bold">Gallery</span>
          </div>
        </div>

        {/* diagonal bottom cut */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" fill="white" preserveAspectRatio="none">
          <path d="M0 40L1440 0V40H0Z" />
        </svg>
      </section>

      {/* ── Category filter bar ── */}
      <section className="bg-white pt-10 pb-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-full transition-all duration-200 ${
                    filterCat === cat
                      ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                      : "bg-gray-100 text-dark-500 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 flex-shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-white shadow text-brand-500" : "text-dark-400 hover:text-dark-700"}`}
                aria-label="Grid view"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-white shadow text-brand-500" : "text-dark-400 hover:text-dark-700"}`}
                aria-label="List view"
              >
                <List size={15} />
              </button>
            </div>
          </div>

          <p className="text-dark-400 text-xs mt-3">
            Showing <strong className="text-dark-800">{filtered.length}</strong> products
            {filterCat !== "All" && ` in "${filterCat}"`}
          </p>
        </div>
      </section>

      {/* ── Product Grid / List ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {viewMode === "grid" ? (
            /* GRID VIEW */
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filtered.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className={`reveal delay-${Math.min(i % 5, 4) * 100} group relative overflow-hidden rounded-xl bg-dark-900 aspect-square flex flex-col justify-end hover:scale-[1.03] transition-transform duration-300`}
                >
                  {/* glow */}
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at 50% 40%, ${p.accentColor}, transparent 70%)` }}
                  />
                  {/* real product image */}
                  {p.image && !imgErrors[p.id] ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      onError={() => setImgErrors((e) => ({ ...e, [p.id]: true }))}
                      className="absolute inset-0 w-full h-full object-contain p-3
                                 group-hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                    />
                  ) : null}
                  {/* gradient overlay for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-transparent" />
                  {/* badge */}
                  <span className="absolute top-2 right-2 bg-brand-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide z-10">
                    {p.badge}
                  </span>
                  {/* name */}
                  <div className="relative z-10 p-3">
                    <p className="font-display text-xl sm:text-2xl leading-none" style={{ color: p.accentColor }}>
                      {p.name.toUpperCase()}
                    </p>
                    <p className="text-dark-300 text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5">{p.category}</p>
                  </div>
                  {/* bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 group-hover:h-1 transition-all duration-300"
                    style={{ backgroundColor: p.accentColor }}
                  />
                </Link>
              ))}
            </div>
          ) : (
            /* LIST VIEW */
            <div className="space-y-3">
              {filtered.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className={`reveal delay-${Math.min(i % 4, 3) * 100} group flex items-center gap-5 bg-dark-900 border border-white/10 rounded-xl p-4 hover:border-white/25 hover:-translate-x-1 transition-all duration-300`}
                >
                  {/* colour swatch */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-display text-lg"
                    style={{ backgroundColor: p.accentColor + "22", border: `2px solid ${p.accentColor}` }}
                  >
                    <span style={{ color: p.accentColor }}>{p.name[0]}</span>
                  </div>
                  {/* info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-xl text-white leading-none truncate" style={{ color: p.accentColor }}>
                      {p.name}
                    </p>
                    <p className="text-dark-400 text-xs uppercase tracking-wide mt-0.5">{p.category}</p>
                  </div>
                  {/* stats */}
                  <div className="hidden sm:flex items-center gap-6 text-center flex-shrink-0">
                    {!["Tablets Capsule"].includes(p.category) && (
                      <>
                        <div>
                          <p className="font-display text-lg text-white leading-none">{p.protein}</p>
                          <p className="text-dark-500 text-[10px] uppercase">Protein</p>
                        </div>
                        <div>
                          <p className="font-display text-lg text-white leading-none">{p.calories}</p>
                          <p className="text-dark-500 text-[10px] uppercase">Cal</p>
                        </div>
                      </>
                    )}
                    {p.mrp && (
                      <div>
                        <p className="font-display text-lg text-brand-400 leading-none">{p.mrp}</p>
                        <p className="text-dark-500 text-[10px] uppercase">MRP</p>
                      </div>
                    )}
                  </div>
                  {/* arrow */}
                  <div
                    className="text-xs font-bold uppercase tracking-wider flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200"
                    style={{ color: p.accentColor }}
                  >
                    →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Category quick-links (mirroring screenshot sub-menus) ── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-500 text-xs font-bold uppercase tracking-[.3em] mb-2 text-center reveal">Browse By Category</p>
          <h2 className="font-display text-4xl sm:text-5xl text-dark-900 text-center mb-10 reveal">Product Categories</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAV_PRODUCT_GROUPS.map((grp, gi) => (
              <div key={grp.label} className={`reveal delay-${Math.min(gi, 4) * 100} bg-dark-900 rounded-2xl overflow-hidden`}>
                {/* header */}
                <div className="bg-brand-500 px-5 py-3">
                  <h3 className="font-display text-xl text-white uppercase tracking-wider">{grp.label}</h3>
                </div>
                {/* product list */}
                <ul className="p-3 space-y-0.5">
                  {grp.children.map((child) => {
                    const prod = PRODUCTS.find((p) => p.id === child.id);
                    return (
                      <li key={child.id}>
                        <Link
                          to={`/products/${child.id}`}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-white/5 transition-colors duration-150 group"
                        >
                          <span className="text-sm font-semibold uppercase tracking-wide">{child.label}</span>
                          {prod?.mrp && (
                            <span className="text-brand-400 text-xs font-bold">{prod.mrp}</span>
                          )}
                          <span className="text-dark-500 group-hover:text-brand-400 text-sm transition-colors">→</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {/* footer link */}
                <div className="px-5 pb-4">
                  <Link
                    to={`/products?cat=${encodeURIComponent(grp.catKey)}`}
                    className="text-xs text-brand-500 font-bold uppercase tracking-widest hover:text-brand-400 transition-colors"
                  >
                    View All {grp.label} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Section ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-500 text-xs font-bold uppercase tracking-[.3em] mb-2 text-center reveal">Watch</p>
          <h2 className="font-display text-4xl sm:text-5xl text-dark-900 text-center mb-10 reveal">Product Videos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((v, i) => (
              <div
                key={v.id}
                onClick={() => setLightbox(v.id)}
                className={`reveal delay-${i * 100} group relative overflow-hidden rounded-xl bg-dark-900 aspect-video flex items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform duration-300 shadow-lg`}
              >
                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: v.color }} />
                <div className="absolute inset-0 bg-dark-900/50 group-hover:bg-dark-900/30 transition-colors duration-300" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/10 border-2 border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand-500/80 group-hover:border-brand-500 transition-all duration-300">
                    <Play size={22} className="text-white fill-white ml-0.5" />
                  </div>
                  <p className="text-white text-sm font-semibold text-center px-6 leading-snug">{v.title}</p>
                  <p className="text-dark-300 text-xs">{v.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative bg-dark-900 rounded-2xl overflow-hidden w-full max-w-3xl aspect-video flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center text-white px-8">
              <Play size={48} className="text-brand-500 mx-auto mb-4" />
              <p className="font-display text-3xl mb-2">{VIDEOS.find((v) => v.id === lightbox)?.title}</p>
              <p className="text-dark-400 text-sm">Video placeholder — replace with a &lt;video&gt; tag or YouTube iframe.</p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
