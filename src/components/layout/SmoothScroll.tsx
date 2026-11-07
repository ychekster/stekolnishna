"use client";

/**
 * Inertial smooth scrolling for the whole site (Lenis), mounted once in the root layout.
 *
 * Lenis drives the native window scroll, so sticky elements, scroll listeners and
 * scroll-snap carousels keep working. Touch devices keep their native scrolling (Lenis
 * default), and `prefers-reduced-motion` turns smoothing off (Lenis default too).
 * Elements with their own vertical scroll (the mobile menu) opt out via
 * `data-lenis-prevent`.
 */
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      // How fast the page catches up with the wheel (0–1). Lenis default 0.1 felt too
      // floaty to the user; 0.2 keeps the glide but stops sooner.
      lerp: 0.2,
      // Same-page anchor links (`#form` on the homepage) glide instead of jumping. Lenis
      // honours the CSS `scroll-padding-top`, so they land below the sticky header.
      anchors: true,
      // Following a link to another page must not carry the old page's momentum.
      stopInertiaOnNavigate: true,
      allowNestedScroll: true,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
