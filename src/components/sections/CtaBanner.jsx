import React from "react";

/**
 * The orange "#RECONSTRUCTYOURSELF" full-width banner.
 * Props: slim (bool) — renders a smaller version without the hashtag copy
 */
export default function CtaBanner({ slim = false }) {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* bg */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg,#f97316 0%,#c2410c 100%)" }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.08) 10px,rgba(255,255,255,.08) 11px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {!slim && (
          <p className="text-white/80 text-xs font-bold uppercase tracking-[.35em] mb-3 reveal">
            It's Time To
          </p>
        )}

        <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-6 reveal">
          {slim ? "A PERFECT PRODUCT FOR YOU" : "#RECONSTRUCTYOURSELF"}
        </h2>

        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 reveal delay-100">
          A perfect product for Gym-goers, Body builders, Cross-Fit athletes, Endurance runners and Fitness freaks.
        </p>

        {/* activity icons */}
        <div className="flex justify-center gap-6 sm:gap-10 text-4xl reveal delay-200">
          {["🏃", "🏋️", "🚴", "🧘", "🏊"].map((e) => (
            <span key={e} className="drop-shadow-lg">{e}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
