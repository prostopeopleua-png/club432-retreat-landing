"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/**
 * The "awakening being" — a glossy figure that roams across the cosmos as you
 * scroll: centre / front on the hero, then drifting corner to corner
 * (bottom-right, top-left, top-right, bottom-left, back to centre) while its
 * head turns to face us at changing angles (video scrubbed) and the whole form
 * tilts in pseudo-3D. Fixed layer, behind content, above the cosmic backdrop.
 */
const STOPS = [0, 0.2, 0.4, 0.6, 0.8, 1];

export default function RoamingFigure() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  const { scrollYProgress } = useScroll();

  const left = useTransform(scrollYProgress, STOPS, ["50%", "76%", "24%", "76%", "24%", "50%"]);
  const top = useTransform(scrollYProgress, STOPS, ["48%", "70%", "30%", "30%", "70%", "48%"]);
  const rotateY = useTransform(scrollYProgress, STOPS, [0, 34, -30, 26, -34, 0]);
  const rotateZ = useTransform(scrollYProgress, STOPS, [0, 6, -7, 5, -6, 0]);
  const scale = useTransform(scrollYProgress, STOPS, [0.95, 0.62, 0.56, 0.62, 0.56, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0.55, 0.62, 0.62, 0.5]);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    const v = videoRef.current;
    if (!v) return;
    const mobile = window.innerWidth < 1024;
    if (mobile || r) {
      v.muted = true;
      v.loop = true;
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, []);

  // Desktop: scrub the head angle (profile↔front) from scroll position.
  // Coalesce seeks to one per animation frame so scrolling stays smooth.
  const seeking = useRef(false);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    if (reduced || window.innerWidth < 1024) return;
    const seq = [1, 0.3, 0.8, 0.2, 0.7, 1]; // fraction of duration at each stop → varied angles
    const n = seq.length - 1;
    const x = Math.min(0.999, Math.max(0, p)) * n;
    const i = Math.floor(x);
    const f = x - i;
    const target = (seq[i] + (seq[i + 1] - seq[i]) * f) * v.duration;
    if (seeking.current) return;
    seeking.current = true;
    requestAnimationFrame(() => {
      try {
        v.currentTime = target;
      } catch {
        /* seek not ready */
      }
      seeking.current = false;
    });
  });

  const mask = "radial-gradient(ellipse 40% 52% at 70% 42%, #000 24%, rgba(0,0,0,0.4) 48%, transparent 64%)";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1300px" }} aria-hidden>
      <motion.div
        style={{ left, top, x: "-50%", y: "-50%", rotateY, rotateZ, scale, opacity, transformStyle: "preserve-3d" }}
        className="absolute aspect-video w-[min(84vmin,760px)]"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="h-full w-full object-cover"
          style={{ WebkitMaskImage: mask, maskImage: mask, filter: "brightness(0.8) contrast(1.06) saturate(1.12)" }}
        >
          <source src="/hero-figure.webm" type="video/webm" />
          <source src="/hero-figure.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
}
