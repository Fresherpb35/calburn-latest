import React from "react";

/**
 * Props
 *  eyebrow  : small label above the heading
 *  heading  : main headline (font-display)
 *  sub      : paragraph below heading
 *  center   : center-align everything
 *  light    : white text (for dark backgrounds)
 *  className: extra classes on wrapper
 */
export default function SectionTitle({
  eyebrow,
  heading,
  sub,
  center  = false,
  light   = false,
  className = "",
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""} ${className}`}>
      {eyebrow && (
        <p
          className={`text-xs font-bold uppercase tracking-[.3em] mb-2 ${
            light ? "text-brand-400" : "text-brand-500"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display leading-none text-4xl sm:text-5xl lg:text-6xl ${
          light ? "text-white" : "text-dark-900"
        }`}
      >
        {heading}
      </h2>
      {sub && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            center ? "mx-auto" : ""
          } max-w-2xl ${light ? "text-dark-200" : "text-dark-400"}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
