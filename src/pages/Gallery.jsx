import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, X, ChevronRight } from "lucide-react";

import useReveal from "../hooks/useReveal";
import { PRODUCTS, NAV_PRODUCT_GROUPS, CATEGORIES } from "../data/products";

/* Video data and VideoCard + Lightbox functions remain exactly the same */
const VIDEOS = [
  {
    id: 1,
    title: "Caalburn Transformer – Product Overview",
    duration: "0:32",
    color: "#f97316",
    src: "/images/caalburn.mp4",
  },
  {
    id: 2,
    title: "Masculus Mass – Gain Series",
    duration: "0:42",
    color: "#eab308",
    src: "/images/caalburn1.mp4",
  },
  {
    id: 3,
    title: "Isopure Whey – Pure Performance",
    duration: "0:34",
    color: "#10b981",
    src: "/images/caalburn2.mp4",
  },
];

function VideoCard({ v, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(v.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`reveal delay-${index * 100} group relative overflow-hidden rounded-2xl bg-white border border-gray-100 aspect-video flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl`}
      style={{
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.35s cubic-bezier(.25,.8,.25,1)",
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${v.color}30 0%, transparent 70%)`,
          opacity: hovered ? 0.6 : 0.25,
        }}
      />

      <span className="absolute top-3 left-3 z-20 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full tracking-widest">
        {v.duration}
      </span>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: hovered ? v.color : "rgba(255,255,255,0.9)",
            border: `2px solid ${hovered ? v.color : "#e5e5e5"}`,
            transform: hovered ? "scale(1.12)" : "scale(1)",
            boxShadow: hovered ? `0 0 30px ${v.color}88` : "none",
          }}
        >
          <Play size={22} className="text-white fill-white ml-1" />
        </div>
        <p className="text-dark-900 text-sm font-semibold text-center px-8 leading-snug">
          {v.title}
        </p>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 transition-all duration-300"
        style={{
          height: hovered ? "4px" : "2px",
          backgroundColor: v.color,
        }}
      />
    </div>
  );
}

function Lightbox({ videoId, videos, onClose }) {
  const videoRef = useRef(null);
  const video = videos.find((v) => v.id === videoId);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
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
        </video>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 z-10"
        >
          <X size={18} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-4 pointer-events-none">
          <p className="text-white font-semibold text-sm sm:text-base">{video.title}</p>
          <p className="text-gray-400 text-xs mt-0.5">{video.duration}</p>
        </div>
      </div>
    </div>
  );
}

/* Main Gallery Component */
export default function Gallery() {
  useReveal();

  const [filterCat, setFilterCat] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  const filtered =
    filterCat === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === filterCat);

  const handleImgError = (id) =>
    setImgErrors((e) => ({ ...e, [id]: true }));

  return (
    <>
      {/* Hero Banner - unchanged */}
      <section className="relative min-h-[320px] sm:min-h-[380px] bg-dark-900 flex items-end overflow-hidden pt-16">
        {/* ... same as before ... */}
        <div className="absolute inset-0 bg-dark-900/70" />
        <div
          className="absolute inset-0 opacity-[.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(249,115,22,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.5) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        {/* radial gradients and content remain same */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full">
          <p className="text-brand-500 text-[10px] sm:text-xs font-bold uppercase tracking-[.35em] mb-2">
            Caalburn
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-5">
            GALLERY
          </h1>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] uppercase tracking-widest">
            <Link to="/" className="text-white/70 hover:text-brand-400 font-bold transition-colors">
              Home
            </Link>
            <ChevronRight size={12} className="text-dark-500" />
            <span className="text-brand-500 font-bold">Gallery</span>
          </nav>
        </div>

        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 40" fill="white" preserveAspectRatio="none">
          <path d="M0 40L1440 0V40H0Z" />
        </svg>
      </section>

      {/* Category Filter Bar - unchanged */}
      <section className="bg-white pt-8 pb-5 border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 ${
                  filterCat === cat
                    ? "bg-brand-500 text-white shadow-md shadow-brand-500/30"
                    : "bg-gray-100 text-dark-500 hover:bg-gray-200"
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

      {/* Product Grid - BIGGER IMAGES */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-dark-400 text-sm mb-4">No products in this category.</p>
              <button
                onClick={() => setFilterCat("All")}
                className="px-5 py-2 bg-brand-500 text-white text-sm font-bold rounded-full hover:bg-brand-600 transition-colors"
              >
                Show All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {filtered.map((p, i) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className={`reveal delay-${Math.min(i % 5, 4) * 100} group relative overflow-hidden rounded-2xl bg-white border border-gray-100 aspect-square flex flex-col justify-end hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300`}
                >
                  {/* Subtle Glow */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-15 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${p.accentColor || "#f97316"}40, transparent 70%)`,
                    }}
                  />

                  {/* BIGGER Product Image Container */}
                  <div className="absolute inset-0 flex items-center justify-center p-4 bg-white">
                    {p.image && !imgErrors[p.id] ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        onError={() => handleImgError(p.id)}
                        className="w-[92%] h-[92%] object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                      />
                    ) : (
                      <div className="flex items-center justify-center text-center">
                        <span
                          className="font-display text-8xl"
                          style={{ color: p.accentColor || "#f97316", opacity: 0.25 }}
                        >
                          {p.name ? p.name[0] : "?"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Gradient - Slightly reduced height so more image shows */}
                  <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-black/85 via-black/50 to-transparent" />

                  {/* Badge */}
                  {p.badge && (
                    <span className="absolute top-3 right-3 bg-brand-500 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wide z-10">
                      {p.badge}
                    </span>
                  )}

                  {/* Product Info */}
                  <div className="relative z-10 p-4 sm:p-5">
                    <p
                      className="font-display text-lg sm:text-xl leading-none text-white"
                      style={{ color: p.accentColor || "#f97316" }}
                    >
                      {p.name.toUpperCase()}
                    </p>
                    <p className="text-white/75 text-xs sm:text-sm uppercase tracking-wider mt-1">
                      {p.category}
                    </p>
                    {p.mrp && (
                      <p className="text-brand-400 text-xs font-bold mt-2">{p.mrp}</p>
                    )}
                  </div>

                  {/* Accent Bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 group-hover:h-1 transition-all duration-300"
                    style={{ backgroundColor: p.accentColor || "#f97316" }}
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Quick Links - Kept mostly same (dark theme is fine here) */}
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
                <div className="bg-brand-500 px-5 py-3 flex items-center justify-between">
                  <h3 className="font-display text-lg sm:text-xl text-white uppercase tracking-wider">
                    {grp.label}
                  </h3>
                  <span className="text-white/60 text-xs font-bold">
                    {grp.children.length} items
                  </span>
                </div>

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

      {/* Video Section */}
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

      {/* Lightbox */}
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