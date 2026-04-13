import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { NAV_PRODUCT_GROUPS } from "../../data/products";

/* ── Top-level nav links ── */
const TOP_LINKS = [
  { label: "Home",    to: "/",        exact: true },
  { label: "Gallery", to: "/gallery"              },
  { label: "About",   to: "/about"                },
  { label: "Contact", to: "/contact"              },
  // { label: "Verify",  to: "/contact"              },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [desktopDrop,    setDesktopDrop]    = useState(false); // products mega menu open
  const [activeGroup,    setActiveGroup]    = useState(null);  // hovered group index
  const [mobileProdOpen, setMobileProdOpen] = useState(false);
  const [mobileGroupIdx, setMobileGroupIdx] = useState(null);

  const megaRef   = useRef(null);
  const location  = useLocation();

  /* close everything on route change */
  useEffect(() => {
    setMobileOpen(false);
    setDesktopDrop(false);
    setActiveGroup(null);
    setMobileProdOpen(false);
    setMobileGroupIdx(null);
  }, [location]);

  /* scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* set first group active when mega opens */
  useEffect(() => {
    if (desktopDrop && activeGroup === null) setActiveGroup(0);
  }, [desktopDrop, activeGroup]);

  const linkCls = ({ isActive }) =>
    `px-3 py-2 text-xs font-bold uppercase tracking-widest rounded transition-colors duration-200 ${
      isActive ? "bg-brand-500 text-white" : "text-dark-100 hover:text-brand-400"
    }`;

  const isProductsActive = location.pathname.startsWith("/products");

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-900 shadow-2xl shadow-black/60" : "bg-dark-900/95 backdrop-blur-sm"
      }`}
    >
      {/* ── Main bar ── */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none flex-shrink-0">
          <span className="font-display text-2xl tracking-widest text-white">
            <span className="text-brand-500">CAAL</span>BURN
          </span>
          {/* <span className="hidden sm:block text-[10px] text-dark-300 uppercase tracking-[.3em] font-semibold">
            Nutrition
          </span> */}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">

          {/* Home */}
          <NavLink to="/" end className={linkCls}>Home</NavLink>

          {/* Products – mega dropdown trigger */}
          <div
            className="relative"
            onMouseEnter={() => setDesktopDrop(true)}
            onMouseLeave={() => { setDesktopDrop(false); setActiveGroup(null); }}
            ref={megaRef}
          >
            <button
              className={`flex items-center gap-1 px-3 py-2 text-xs font-bold uppercase tracking-widest rounded transition-colors duration-200 ${
                isProductsActive ? "bg-brand-500 text-white" : "text-dark-100 hover:text-brand-400"
              }`}
            >
              Products
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${desktopDrop ? "rotate-180" : ""}`}
              />
            </button>

            {/* ── Mega menu ── */}
            {desktopDrop && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-2 w-[600px] z-50">
                <div className="bg-dark-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden flex">

                  {/* Left: category list */}
                  <div className="w-48 flex-shrink-0 border-r border-white/10 py-2">
                    {NAV_PRODUCT_GROUPS.map((grp, idx) => (
                      <button
                        key={grp.label}
                        onMouseEnter={() => setActiveGroup(idx)}
                        onClick={() => setActiveGroup(idx)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 ${
                          activeGroup === idx
                            ? "bg-brand-500 text-white"
                            : "text-dark-200 hover:bg-white/5 hover:text-brand-400"
                        }`}
                      >
                        {grp.label}
                        <ChevronRight size={12} />
                      </button>
                    ))}
                  </div>

                  {/* Right: product list for active group */}
                  <div className="flex-1 py-3 px-2">
                    {activeGroup !== null && (
                      <>
                        <p className="text-brand-500 text-[10px] font-bold uppercase tracking-[.3em] px-3 mb-2">
                          {NAV_PRODUCT_GROUPS[activeGroup].label}
                        </p>
                        <div className="grid grid-cols-2 gap-0.5">
                          {NAV_PRODUCT_GROUPS[activeGroup].children.map((child) => (
                            <Link
                              key={child.id}
                              to={`/products/${child.id}`}
                              className="block px-3 py-2 text-xs text-dark-200 hover:text-white hover:bg-white/5 rounded uppercase tracking-wide transition-colors duration-150"
                            >
                              {child.label}
                            </Link>
                          ))}
                          {/* "View All" link at bottom */}
                          <Link
                            to={`/products?cat=${encodeURIComponent(NAV_PRODUCT_GROUPS[activeGroup].catKey)}`}
                            className="col-span-2 mt-1 px-3 py-2 text-[10px] font-bold text-brand-400 hover:text-brand-300 uppercase tracking-widest transition-colors"
                          >
                            View All {NAV_PRODUCT_GROUPS[activeGroup].label} →
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Rest of links */}
          {TOP_LINKS.filter((l) => l.label !== "Home").map((link) => (
            <NavLink key={link.label} to={link.to} className={linkCls}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 flex-shrink-0"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={`md:hidden bg-dark-800 border-t border-white/10 overflow-y-auto transition-all duration-300 ${
          mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">

          {/* Home */}
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-4 py-3 text-xs font-bold uppercase tracking-widest rounded transition-colors ${
                isActive ? "bg-brand-500 text-white" : "text-dark-200 hover:text-brand-400 hover:bg-white/5"
              }`
            }
          >
            Home
          </NavLink>

          {/* Products accordion */}
          <div>
            <button
              onClick={() => setMobileProdOpen((o) => !o)}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest rounded transition-colors ${
                isProductsActive ? "bg-brand-500 text-white" : "text-dark-200 hover:text-brand-400 hover:bg-white/5"
              }`}
            >
              Products
              <ChevronDown size={14} className={`transition-transform ${mobileProdOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileProdOpen && (
              <div className="ml-4 mt-1 border-l-2 border-brand-500/40 pl-3 space-y-1">
                {NAV_PRODUCT_GROUPS.map((grp, idx) => (
                  <div key={grp.label}>
                    <button
                      onClick={() => setMobileGroupIdx(mobileGroupIdx === idx ? null : idx)}
                      className="w-full flex items-center justify-between py-2 text-[11px] font-bold uppercase tracking-wider text-dark-300 hover:text-brand-400 transition-colors"
                    >
                      {grp.label}
                      <ChevronDown
                        size={11}
                        className={`transition-transform ${mobileGroupIdx === idx ? "rotate-180" : ""}`}
                      />
                    </button>

                    {mobileGroupIdx === idx && (
                      <div className="ml-3 space-y-0.5 border-l border-white/10 pl-3 mb-2">
                        {grp.children.map((child) => (
                          <Link
                            key={child.id}
                            to={`/products/${child.id}`}
                            className="block py-1.5 text-[11px] text-dark-400 hover:text-brand-400 uppercase tracking-wide transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                        <Link
                          to={`/products?cat=${encodeURIComponent(grp.catKey)}`}
                          className="block py-1.5 text-[10px] text-brand-500 font-bold uppercase tracking-wider"
                        >
                          View All →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rest of nav links */}
          {TOP_LINKS.filter((l) => l.label !== "Home").map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-3 text-xs font-bold uppercase tracking-widest rounded transition-colors ${
                  isActive ? "bg-brand-500 text-white" : "text-dark-200 hover:text-brand-400 hover:bg-white/5"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
