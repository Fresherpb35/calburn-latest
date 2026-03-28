import React from "react";
import useReveal from "../hooks/useReveal";

import HeroSection          from "../components/sections/HeroSection";
import FeaturedCategories   from "../components/sections/FeaturedCategories";
import CtaBanner            from "../components/sections/CtaBanner";
import StatsBar             from "../components/common/StatsBar";
import ValuesSection        from "../components/sections/ValuesSection";
import PowerFormulation     from "../components/sections/PowerFormulation";
import HomeFeaturedProducts from "../components/sections/HomeFeaturedProducts";
import ContactCta           from "../components/sections/ContactCta";

export default function Home() {
  useReveal();

  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <CtaBanner />
      <StatsBar />
      <ValuesSection />
      <PowerFormulation />
      <HomeFeaturedProducts />
      <ContactCta />
    </>
  );
}
