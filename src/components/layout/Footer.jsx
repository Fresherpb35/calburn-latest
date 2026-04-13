import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { NAV_PRODUCT_GROUPS } from "../../data/products";

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ── Brand + About ── */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-3xl tracking-widest">
                <span className="text-brand-500">CAAL</span>BURN
              </span>
            </Link>
            <h4 className="text-[11px] font-bold uppercase tracking-[.25em] text-dark-300 mb-3">About Us</h4>
            <p className="text-dark-300 text-sm leading-relaxed">
              Caalburn sets the standard in the nutritional supplement industry by demanding truth in labeling, ingredient safety and product potency.
            </p>
            <p className="text-dark-400 text-sm mt-2">
              Our objective is to offer the highest quality products at the lowest possible prices.
            </p>

            {/* ── Manufacturing Information ── */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-[11px] font-bold uppercase tracking-[.25em] text-dark-300 mb-3">Manufactured By</h4>
              <p className="text-dark-300 text-sm leading-relaxed">
                Prokartt India Industries Pvt. Ltd.<br />
                Khasra No. 1036, Mauza Central Hope Town,<br />
                Camp Road, Selaqui, Dehradun – 248197
              </p>
              <p className="text-dark-400 text-xs mt-2">
                FSSAI Lic. No.: 12625999000137
              </p>
            </div>
          </div>

          {/* ── Popular Products ── */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[.25em] text-dark-300 mb-4">Popular Products</h4>
            <ul className="space-y-2">
              {NAV_PRODUCT_GROUPS.slice(0, 2).flatMap((g) => g.children).slice(0, 6).map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.id}`}
                    className="group flex items-center gap-2 text-sm text-dark-300 hover:text-brand-400 transition-colors duration-200"
                  >
                    <span className="block w-1 h-1 rounded-full bg-brand-500 group-hover:w-2 transition-all duration-200" />
                    {p.label}
                  </Link>
                </li>
              ))}
              {NAV_PRODUCT_GROUPS.slice(2).flatMap((g) => g.children).slice(0, 3).map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.id}`}
                    className="group flex items-center gap-2 text-sm text-dark-300 hover:text-brand-400 transition-colors duration-200"
                  >
                    <span className="block w-1 h-1 rounded-full bg-brand-500 group-hover:w-2 transition-all duration-200" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[.25em] text-dark-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home",    to: "/"        },
                { label: "Products",to: "/products"},
                { label: "Gallery", to: "/gallery" },
                { label: "About",   to: "/about"   },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-dark-300 hover:text-brand-400 transition-colors duration-200 uppercase tracking-wide"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[.25em] text-dark-300 mb-4">Have A Question?</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <p className="text-dark-300 text-sm leading-snug">
                  Corp. Off.: 105, 1st Floor,<br />
                  Sai Shradha CHS, Goregaon West,<br />
                  Mumbai - 400062
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-brand-500 flex-shrink-0" />
                <a href="tel:+919598753567" className="text-dark-300 hover:text-brand-400 text-sm transition-colors">
                  +91 95987 53567, +91 83185 44070
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-brand-500 flex-shrink-0" />
                <a href="mailto:info@Caalburnnutrition.com" className="text-dark-300 hover:text-brand-400 text-sm transition-colors break-all">
                  info@Caalburnnutrition.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-dark-400 text-xs">
            Copyright © 2026 Caalburn • All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}