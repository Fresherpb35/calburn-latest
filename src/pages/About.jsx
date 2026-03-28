import React from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Shield, Award, Target, Zap } from "lucide-react";

import useReveal    from "../hooks/useReveal";
import PageHero     from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import StatsBar     from "../components/common/StatsBar";
import CtaBanner    from "../components/sections/CtaBanner";
import Button       from "../components/common/Button";

const VALUES = [
  { icon: Shield, title: "Truthful",  body: "Always Be Truthful And Honest In Every Aspect Of Business.",  color: "#f97316" },
  { icon: Award,  title: "Give Back", body: "Give Back To The People To Whom You Owe Your Success.",        color: "#ea580c" },
  { icon: Target, title: "Goal",      body: "It's Our Goal To Make The Big Idea Bigger.",                   color: "#f97316" },
  { icon: Zap,    title: "Mission",   body: 'Our Mission Is Not Complete Until The Customer Says "Wow".',   color: "#ea580c" },
];

const COMMITMENTS = [
  "No Banned Substances",
  "Quality Raw Material Sourcing",
  "Certified Manufacturing",
  "Transparent Labeling",
  "Rigorous Quality Testing",
  "Continuous R&D Innovation",
  "Direct-to-Consumer Pricing",
  "10+ Years of Expertise",
];

export default function About() {
  useReveal();

  return (
    <>
      <PageHero
        eyebrow="Calburn Nutrition"
        title="About Us"
        subtitle="Setting the standard in the nutritional supplement industry through truth, quality, and cutting-edge science."
      />

      {/* ── Our Story ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div className="reveal">
              <SectionTitle eyebrow="Our Story" heading="Calburn Nutrition" />
              <div className="space-y-4 text-dark-500 leading-relaxed text-[15px]">
                <p>
                  Calburn Nutrition sets the standard in the nutritional supplement industry by demanding
                  truth in labeling, ingredient safety and product potency, all while remaining on the
                  cutting-edge of nutritional science.
                </p>
                <p>
                  As our company has grown over the years, so has our commitment to Living Well. In line
                  with our corporate mission, we are dedicated to continuously researching, developing,
                  patenting, producing, and globally marketing the most effective diet and sports supplements
                  to assist you in achieving your personal fitness goals.
                </p>
                <p>
                  From scientific research and new product discovery to the manufacturing and packaging
                  processes, Calburn Nutrition takes pride in our rigorous approach to ensuring quality.
                  Our commitment to quality extends to our interactions with you in our stores and after
                  you buy our products.
                </p>
                <p>
                  We subject our raw material to thorough quality checks to ensure that they are absolutely
                  free of banned substances.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/products" size="lg">
                  Explore Products <ArrowRight size={15} className="ml-2" />
                </Button>
                <Button to="/contact" variant="outline" size="lg">
                  Contact Us
                </Button>
              </div>
            </div>

            <div className="reveal delay-200">
              <div className="bg-dark-900 rounded-2xl p-8 text-white">
                <h3 className="font-display text-3xl text-brand-500 mb-6">Our Commitments</h3>
                <ul className="space-y-3">
                  {COMMITMENTS.map((c) => (
                    <li key={c} className="flex items-center gap-3">
                      <CheckCircle size={16} className="text-brand-500 flex-shrink-0" />
                      <span className="text-dark-200 text-sm font-medium">{c}</span>
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-8 pt-6 border-t border-white/10 text-dark-400 text-sm italic leading-relaxed">
                  "For more than a decade, Calburn Nutrition has been a brand name synonymous with
                  premium-quality and top-of-the-line sports nutritional products."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="What Drives Us"
            heading="The Core Values Unite And Remind Us What Is Important"
            center
            className="reveal"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className={`reveal delay-${i * 100} bg-white rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: v.color }}
                >
                  <v.icon size={24} className="text-white" />
                </div>
                <h3 className="font-display text-2xl text-dark-900 mb-2">{v.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Orange CTA Banner ── */}
      <CtaBanner slim />

      {/* ── Stats ── */}
      <StatsBar />

      {/* ── Welcome to Our Gym ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="reveal relative flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(249,115,22,0.18),transparent_65%)]" />
                <img
                  src="/images/hero-man.png"
                  alt="Calburn Athlete"
                  onError={(e) => { e.target.style.display='none'; }}
                  className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            <div className="reveal delay-200">
              <SectionTitle
                eyebrow="About Calburn Nutrition"
                heading={"Welcome\nTo Our Gym"}
              />
              <div className="space-y-4 text-dark-500 text-sm leading-relaxed">
                <p>
                  Our objective is to offer the highest quality products at the lowest possible prices. We
                  have quality checks in place throughout the whole of our production process, to ensure we
                  have top quality products which are the best.
                </p>
                <p>
                  At Calburn Nutrition, we guarantee authenticity of our sports nutritional supplements.
                  Therefore we meticulously verify products at every possible customer touch point. We
                  randomly assess the quality of our products available in the market.
                </p>
                <p>
                  Our team philosophy is that every product will be a formulation that we, as former
                  professional athletes, believe in and use every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
