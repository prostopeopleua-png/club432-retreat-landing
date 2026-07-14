"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Inertial smooth-scroll wrapper (Lenis). Disabled when the user prefers
 * reduced motion. Native scroll stays intact, so Framer `useScroll` works.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Native scroll on touch/mobile — Lenis adds jank there; only enhance pointer devices.
    const touch = window.matchMedia("(hover: none) and (pointer: coarse)").matches || window.innerWidth < 900;
    if (touch) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
