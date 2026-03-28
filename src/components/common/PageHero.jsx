import React from "react";

/**
 * Full-width dark hero banner used on inner pages.
 * Props: eyebrow, title, subtitle
 */
export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="relative bg-dark-900 pt-32 pb-20 overflow-hidden">
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(249,115,22,.6) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* orange glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(249,115,22,0.12),transparent_65%)]" />
      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {eyebrow && (
          <p className="text-brand-500 text-xs font-bold uppercase tracking-[.35em] mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-white leading-none mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-dark-300 text-base sm:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
