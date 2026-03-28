import React from "react";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "../../data/products";
import ProductCard from "../common/ProductCard";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";

export default function HomeFeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Our Products"
          heading="Premium Supplements"
          sub="Scientifically formulated for serious athletes. Each product is quality-tested and free from banned substances."
          center
          className="reveal"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.slice(0, 3).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <Button to="/products" size="lg" variant="outline">
            View All Products <ArrowRight size={15} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
