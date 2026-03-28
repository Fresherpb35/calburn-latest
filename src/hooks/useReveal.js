import { useEffect } from "react";

/**
 * Attaches an IntersectionObserver to every element with class "reveal"
 * and adds "visible" when it enters the viewport.
 * Call this hook once per page (top-level component).
 */
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target); // fire once
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
