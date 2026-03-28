import React from "react";
import { Phone } from "lucide-react";
import Button from "../common/Button";

export default function ContactCta() {
  return (
    <section className="bg-dark-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="reveal text-center md:text-left">
            <h2 className="font-display text-4xl sm:text-5xl text-white leading-none mb-2">
              Have A Question?
            </h2>
            <p className="text-dark-300 text-base">
              Our team is here to help you reach your fitness goals.
            </p>
          </div>
          <div className="reveal delay-200 flex flex-wrap gap-4 justify-center">
            <Button to="/contact" size="lg">
              Contact Us
            </Button>
            <Button href="tel:+919598753567" variant="outline" size="lg">
              <Phone size={15} className="mr-2" /> Call Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
