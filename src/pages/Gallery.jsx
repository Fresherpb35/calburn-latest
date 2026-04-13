import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, X, ChevronRight } from "lucide-react";

import useReveal from "../hooks/useReveal";
import { PRODUCTS, NAV_PRODUCT_GROUPS, CATEGORIES } from "../data/products";

/* ─── Video data ─────────────────────────────────────────────────────────── */
const VIDEOS = [
  {
    id: 1,
    title: "Caalburn Transformer – Product Overview",
    duration: "0:32",
    color: "#f97316",
    src: "/images/Caalburn.mp4",
  },
  {
    id: 2,
    title: "Masculus Mass – Gain Series",
    duration: "0:42",
    color: "#eab308",
    src: "/images/Caalburn1.mp4",
  },
  {
    id: 3,
    title: "Isopure Whey – Pure Performance",
    duration: "0:34",
    color: "#10b981",
    src: "/images/Caalburn2.mp4",
  },
];

/* ─── Video card ─────────────────────────────────────────────────────────── */
function VideoCard({ v, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(v.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`reveal delay-${index * 100} group relative overflow-hidden rounded-2xl bg-dark-900 aspect-video flex items-center justify-center cursor-pointer shadow-xl`}
      style={{
        transform: hovered ? "scale(1.025)" : "scale(1)",
        transition: "transform 0.35s cubic-bezier(.25,.8,.25,1)",
      }}
    >
      {/* Colour wash */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${v.color}55 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.35,
        }}
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-dark-900 transition-opacity duration-300"
        style={{ opacity: hovered ? 0.3 : 0.55 }}
      />

      {/* Duration pill */}
      <span className="absolute top-3 left-3 z-20 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest">
        {v.duration}
      </span>

      {/* Play button */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? v.color : "rgba(255,255,255,0.12)",
            border: `2px solid ${hovered ? v.color : "rgba(255,255,255,0.5)"}`,
            transform: hovered ? "scale(1.12)" : "scale(1)",
            boxShadow: hovered ? `0 0 30px ${v.color}88` : "none",
          }}
        >
          <Play size={22} className="text-white fill-white ml-1" />
        </div>
        <p className="text-white text-sm font-semibold text-center px-8 leading-snug drop-shadow-lg">
          {v.title}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 transition-all duration-300"
        style={{
          height: hovered ? "3px" : "2px",
          backgroundColor: v.color,
        }}
      />
    </div>
  );
}

/* ─── Lightbox ───────────────────────────────────────────────────────────── */
function Lightbox({ videoId, videos, onClose }) {
  const videoRef = useRef(null);
  const video = videos.find((v) => v.id === videoId);

  /* Close on Escape */
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      {/* Glow behind player */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${video.color}22 0%, transparent 60%)`,
        }}
      />

      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ aspectRatio: "16/9", border: `2px solid ${video.color}33` }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain bg-black"
        >
          <source src={video.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10"
          aria-label="Close video"
        >
          <X size={18} />
        </button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4 pointer-events-none">
          <p className="text-white font-semibold text-sm sm:text-base leading-snug">{video.title}</p>
          <p className="text-gray-400 text-xs mt-0.5">{video.duration}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Gallery page ───────────────────────────────────────────────────────── */
export default function Gallery() {
  useReveal();

  const [filterCat, setFilterCat] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  /* Filtered products */
  const filtered =
    filterCat === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filterCat);

  const handleImgError = (id) =>
    setImgErrors((e) => ({ ...e, [id]: true }));

  return (
    <>
      {/* ── Hero banner ── */}
      <section className="relative min-h-[320px] sm:min-h-[380px] bg-dark-900 flex items-end overflow-hidden pt-16">
        <div className="absolute inset-0 bg-dark-900/70" />
        <div
          className="absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.5) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(ellipse_at_20%_50%,rgba(249,115,22,0.15),transparent_60%)]" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_80%_30%,rgba(249,115,22,0.05),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-brand-500 text-[10px] sm:text-xs font-bold uppercase tracking-[.35em] mb-2">
            Caalburn
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-5">
            GALLERY
          </h1>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[11px] uppercase tracking-widest"
          >
            <Link
              to="/"
              className="text-white/70 hover:text-brand-400 font-bold transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={12} className="text-dark-500" />
            <span className="text-brand-500 font-bold">Gallery</span>
          </nav>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 40"
          fill="white"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 40L1440 0V40H0Z" />
        </svg>
      </section>

      {/* ── Category filter bar ── */}
      <section className="bg-white pt-8 pb-5 border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category chips — horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                aria-pressed={filterCat === cat}
                className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest rounded-full transition-all duration-200 ${
                  filterCat === cat
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                    : "bg-gray-100 text-dark-500 hover:bg-gray-200 active:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-dark-400 text-xs mt-3">
            Showing <strong className="text-dark-800">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {filterCat !== "All" && ` in "${filterCat}"`}
          </p>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-dark-400 text-sm mb-4">No products in this category.</p>
              <button
                onClick={() => setFilterCat("All")}
                className="px-5 py-2 bg-brand-500 text-white text-sm font-bold rounded-full hover:bg-brand-600 transition-colors"
              >
                Show All
              </button>
            </div>
          )}

          {/* Grid */}
          {filtered.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {filtered.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className={`reveal delay-${Math.min(i % 5, 4) * 100} group relative overflow-hidden rounded-xl bg-dark-900 aspect-square flex flex-col justify-end`}
                  style={{ transition: "transform 0.3s cubic-bezier(.25,.8,.25,1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${p.accentColor}, transparent 70%)`,
                    }}
                  />

                  {/* Product image */}
                  {p.image && !imgErrors[p.id] ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      onError={() => handleImgError(p.id)}
                      className="absolute inset-0 w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300 drop-shadow-xl"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <span
                        className="font-display text-5xl sm:text-7xl select-none"
                        style={{ color: p.accentColor, opacity: 0.18 }}
                      >
                        {p.name[0]}
                      </span>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/20 to-transparent" />

                  {/* Badge */}
                  {p.badge && (
                    <span className="absolute top-2 right-2 bg-brand-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide z-10">
                      {p.badge}
                    </span>
                  )}

                  {/* Name */}
                  <div className="relative z-10 p-3">
                    <p
                      className="font-display text-base sm:text-xl lg:text-2xl leading-none"
                      style={{ color: p.accentColor }}
                    >
                      {p.name.toUpperCase()}
                    </p>
                    <p className="text-dark-300 text-[8px] sm:text-[10px] uppercase tracking-wider mt-0.5">
                      {p.category}
                    </p>
                    {p.mrp && (
                      <p className="text-brand-400 text-[10px] font-bold mt-1">{p.mrp}</p>
                    )}
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 group-hover:h-[3px] transition-all duration-300"
                    style={{ backgroundColor: p.accentColor }}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Category quick-links ── */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-500 text-[10px] sm:text-xs font-bold uppercase tracking-[.3em] mb-2 text-center reveal">
            Browse By Category
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-dark-900 text-center mb-8 sm:mb-10 reveal">
            Product Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {NAV_PRODUCT_GROUPS.map((grp, gi) => (
              <div
                key={grp.label}
                className={`reveal delay-${Math.min(gi, 4) * 100} bg-dark-900 rounded-2xl overflow-hidden flex flex-col`}
              >
                {/* Header */}
                <div className="bg-brand-500 px-5 py-3 flex items-center justify-between">
                  <h3 className="font-display text-lg sm:text-xl text-white uppercase tracking-wider">
                    {grp.label}
                  </h3>
                  <span className="text-white/60 text-xs font-bold">
                    {grp.children.length} items
                  </span>
                </div>

                {/* Product list */}
                <ul className="p-2 sm:p-3 space-y-0.5 flex-1">
                  {grp.children.map((child) => {
                    const prod = PRODUCTS.find((p) => p.id === child.id);
                    return (
                      <li key={child.id}>
                        <Link
                          to={`/products/${child.id}`}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors duration-150 group"
                        >
                          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide flex-1 truncate pr-2">
                            {child.label}
                          </span>
                          {prod?.mrp && (
                            <span className="text-brand-400 text-xs font-bold flex-shrink-0 mr-2">
                              {prod.mrp}
                            </span>
                          )}
                          <ChevronRight
                            size={14}
                            className="text-dark-500 group-hover:text-brand-400 flex-shrink-0 group-hover:translate-x-0.5 transition-all duration-200"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Footer link */}
                <div className="px-5 pb-4 pt-2 border-t border-white/5">
                  <Link
                    to={`/products?cat=${encodeURIComponent(grp.catKey)}`}
                    className="text-[11px] text-brand-500 font-bold uppercase tracking-widest hover:text-brand-400 transition-colors flex items-center gap-1"
                  >
                    View All {grp.label}
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Video Section ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-brand-500 text-[10px] sm:text-xs font-bold uppercase tracking-[.3em] mb-2 text-center reveal">
            Watch
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-dark-900 text-center mb-8 sm:mb-10 reveal">
            Product Videos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {VIDEOS.map((v, i) => (
              <VideoCard key={v.id} v={v} index={i} onClick={setLightbox} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          videoId={lightbox}
          videos={VIDEOS}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
}