"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/**
 * The glossy figure as a persistent, semi-transparent "companion" that roams
 * the viewport on scroll (centre → corners → centre) and tilts in pseudo-3D,
 * floating between the fixed cosmos and the page content.
 */
export default function RoamingFigure() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  // roam path across the page
  const stops = [0, 0.2, 0.42, 0.62, 0.82, 1];
  const x = useTransform(scrollYProgress, stops, ["0vw", "27vw", "-27vw", "26vw", "-26vw", "0vw"]);
  const y = useTransform(scrollYProgress, stops, ["0vh", "24vh", "-18vh", "-18vh", "24vh", "2vh"]);
  const rotateY = useTransform(scrollYProgress, stops, [6, 34, -30, 26, -26, 6]);
  const rotateZ = useTransform(scrollYProgress, stops, [0, 5, -5, 4, -4, 0]);
  const scale = useTransform(scrollYProgress, stops, [1, 0.72, 0.66, 0.66, 0.72, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.06, 0.2, 0.9, 1], [0.34, 0.32, 0.24, 0.24, 0.12]);

  // subtle scroll-linked head angle (within the clip's own turn range)
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const video = videoRef.current;
    if (!video || !video.duration || Number.isNaN(video.duration)) return;
    // front-facing at top (clip end), oscillating as you scroll
    const phase = 0.5 + 0.5 * Math.cos(v * Math.PI * 4); // 1 → 0 → 1 …
    video.currentTime = Math.min(video.duration - 0.05, phase * video.duration);
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // seed first frame (front) once metadata is ready
    const seed = () => {
      if (video.duration) video.currentTime = video.duration - 0.05;
    };
    if (video.readyState >= 1) seed();
    else video.addEventListener("loadedmetadata", seed, { once: true });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] hidden items-center justify-center overflow-hidden md:flex" style={{ perspective: 1400 }}>
      <motion.div
        style={{ x, y, rotateY, rotateZ, scale, opacity, transformStyle: "preserve-3d" }}
        className="relative h-[76vh] w-[48vw] max-w-[560px]"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="roam-video h-full w-full object-cover object-right"
          style={{ filter: "brightness(0.9) contrast(1.05) saturate(1.1)" }}
        >
          <source src="/hero-figure.webm" type="video/webm" />
          <source src="/hero-figure.mp4" type="video/mp4" />
        </video>
      </motion.div>
    </div>
  );
}
