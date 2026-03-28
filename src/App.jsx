import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar  from "./components/layout/Navbar";
import Footer  from "./components/layout/Footer";

import Home          from "./pages/Home";
import About         from "./pages/About";
import Products      from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Gallery       from "./pages/Gallery";
import Contact       from "./pages/Contact";

/* scroll to top on every navigation */
function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"              element={<Home />}          />
            <Route path="/about"         element={<About />}         />
            <Route path="/products"      element={<Products />}      />
            <Route path="/products/:id"  element={<ProductDetail />} />
            <Route path="/gallery"       element={<Gallery />}       />
            <Route path="/contact"       element={<Contact />}       />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
