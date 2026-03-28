import React from "react";

const STATS = [
  { value: "100%", label: "Quality Tested"    },
  { value: "5+",   label: "Products"          },
  { value: "10+",  label: "Years Experience"  },
  { value: "50K+", label: "Happy Customers"   },
];

export default function StatsBar() {
  return (
    <div className="bg-brand-500 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-display text-4xl sm:text-5xl text-white leading-none">{s.value}</p>
              <p className="text-white/80 text-xs uppercase tracking-widest font-semibold mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
