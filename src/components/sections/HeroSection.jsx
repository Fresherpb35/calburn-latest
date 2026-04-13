import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../common/Button";
import { PRODUCTS } from "../../data/products";

const SLIDES = [
  {
    headline : "FUEL YOUR",
    sub      : "BODY FITNESS",
    body     : "Premium quality nutritional supplements for serious athletes and fitness enthusiasts.",
    cta      : "Shop Now",
    ctaLink  : "/products",
    bg       : "/images/bg-1.jpg",
  },
  {
    headline : "RECONSTRUCT",
    sub      : "YOURSELF",
    body     : "Science-backed formulas scientifically designed for maximum gains and elite performance.",
    cta      : "Explore Products",
    ctaLink  : "/products",
    bg       : "/images/bg-2.jpg",
  },
];

/* 4 featured product tiles shown in the hero */
const FEATURED_IDS = ["transformer", "masculus-mass", "hulk", "whey-protein"];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [imgBgError, setImgBgError] = useState({});

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[active];
  const featuredProducts = FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <section className="relative min-h-screen flex items-center bg-dark-900 overflow-hidden">

      {/* ── Background image (slides) ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
        >
          {!imgBgError[i] ? (
            <img
              src={s.bg}
              alt=""
              onError={() => setImgBgError((e) => ({ ...e, [i]: true }))}
              className="w-full h-full object-cover object-center"
            />
          ) : (
            /* Fallback dark gradient */
            <div className="w-full h-full bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
          )}
          {/* dark overlay so text remains readable */}
          <div className="absolute inset-0 bg-dark-900/70" />
        </div>
      ))}

      {/* subtle orange grid on top */}
      <div
        className="absolute inset-0 opacity-[.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.6) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left – text */}
          <div>
           <p className="text-brand-500 text-xs font-bold uppercase tracking-[.4em] mb-2">
  Caalburn
</p>

<p className="text-white/70 text-sm mb-4 tracking-wide">
  Changed the name, not the trust
</p>

            <div key={active} className="animate-fade-up">
              <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl text-white leading-none">
                {slide.headline}
              </h1>
              <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl text-brand-500 leading-none mb-6">
                {slide.sub}
              </h1>
              <p className="text-dark-200 text-lg max-w-md mb-8 leading-relaxed">{slide.body}</p>
              <div className="flex flex-wrap gap-4">
                <Button to={slide.ctaLink} size="xl">
                  {slide.cta} <ArrowRight size={17} className="ml-2" />
                </Button>
                <Button to="/about" variant="outline" size="xl">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Slide dots */}
            <div className="flex gap-2 mt-10">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-brand-500" : "w-3 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right – featured product image tiles */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {featuredProducts.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="group relative bg-dark-800/80 border border-white/10 rounded-xl p-4
                           hover:border-white/30 hover:-translate-y-1 transition-all duration-300
                           overflow-hidden flex flex-col items-center"
              >
                {/* glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle, ${p.accentColor}, transparent 70%)` }}
                />
                {/* product image */}
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="relative z-10 h-28 w-auto object-contain drop-shadow-xl
                               group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div
                    className="relative z-10 h-28 flex items-center justify-center font-display text-3xl"
                    style={{ color: p.accentColor }}
                  >
                    {p.name.toUpperCase()}
                  </div>
                )}
                {/* labels */}
                <div className="relative z-10 text-center mt-2">
                  <p className="font-display text-xl text-white leading-none" style={{ color: p.accentColor }}>
                    {p.name}
                  </p>
                  <p className="text-dark-400 text-[10px] uppercase tracking-wide">{p.category}</p>
                </div>
                {/* accent bottom bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 group-hover:h-1 transition-all duration-300"
                  style={{ backgroundColor: p.accentColor }}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom white wave */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 56L1440 0V56H0Z" />
      </svg>
    </section>
  );
}
