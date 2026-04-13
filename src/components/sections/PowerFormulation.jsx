import React, { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "../common/Button";
import SectionTitle from "../common/SectionTitle";

const CHECKS = [
  "No Banned Substances",
  "Quality Raw Material Sourcing",
  "Certified Manufacturing",
  "Transparent Labeling",
  "Rigorous Quality Testing",
  "Continuous R&D Innovation",
];

export default function PowerFormulation() {
  const [athleteErr, setAthleteErr] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left – Athlete image ── */}
          <div className="reveal relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* orange glow behind athlete */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(249,115,22,0.18),transparent_65%)]" />

              {!athleteErr ? (
                <img
                  src="/images/hero-athlete.png"
                  alt="Caalburn Athlete"
                  onError={() => setAthleteErr(true)}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                />
              ) : (
                /* Fallback stat card */
                <div className="bg-dark-900 rounded-2xl overflow-hidden p-12 text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(249,115,22,0.15),transparent_65%)]" />
                  <p className="font-display text-8xl text-brand-500 relative">10+</p>
                  <p className="font-display text-3xl text-white relative mt-1">Years of Excellence</p>
                  <p className="text-dark-300 text-sm relative mt-3 max-w-xs mx-auto">
                    Trusted by athletes and fitness enthusiasts across India
                  </p>
                </div>
              )}
            </div>

            {/* floating accent circles */}
            <div className="absolute -top-5 -left-5 w-20 h-20 rounded-full bg-brand-500/20 blur-sm pointer-events-none" />
            <div className="absolute -bottom-5 -right-5 w-32 h-32 rounded-full bg-brand-500/10 blur-sm pointer-events-none" />
          </div>

          {/* ── Right – copy ── */}
          <div className="reveal delay-200">
            <SectionTitle
              eyebrow="About Caalburn"
              heading="A Power Packed Formulation"
              sub="Caalburn sets the standard in the nutritional supplement industry by demanding truth in labeling, ingredient safety and product potency."
            />

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {CHECKS.map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <CheckCircle size={16} className="text-brand-500 flex-shrink-0" />
                  <span className="text-dark-600 text-sm font-medium">{c}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button to="/about" size="lg">
                About Us <ArrowRight size={15} className="ml-2" />
              </Button>
              <Button to="/products" variant="outline" size="lg">
                Our Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
