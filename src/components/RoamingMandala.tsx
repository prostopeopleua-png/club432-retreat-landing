"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The mandala flower — a burning, orbiting hero. Centred & facing us on the
 * first screen; as you scroll it drifts along a smooth circular orbit, always
 * keeping its face toward the centre. Movement is done with GPU transforms
 * (translate/rotate), never layout props, so it stays smooth on mobile.
 */
const N = 2;
const RX = 46; // horizontal orbit radius (% of viewport width)
const RY = 42; // vertical orbit radius (% of viewport height)
const MAX_Y = 64;
const MAX_X = 46;
const LAYERS = 6;
const ZSTEP = 5;
const TWO_PI_N = Math.PI * 2 * N;

function ramp(p: number) {
  const t = Math.min(1, p / 0.14);
  return t * t * (3 - 2 * t);
}
const vw = () => (typeof window !== "undefined" ? window.innerWidth : 1200);
const vh = () => (typeof window !== "undefined" ? window.innerHeight : 800);

export default function RoamingMandala() {
  const { scrollYProgress } = useScroll();
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(
      window.matchMedia("(max-width: 820px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  // GPU transforms (translate in px), NOT left/top — avoids per-frame layout.
  const x = useTransform(scrollYProgress, (p) => (vw() * RX) / 100 * ramp(p) * Math.cos(p * TWO_PI_N));
  const y = useTransform(scrollYProgress, (p) => (vh() * RY) / 100 * ramp(p) * Math.sin(p * TWO_PI_N));
  const rotateY = useTransform(scrollYProgress, (p) => -MAX_Y * ramp(p) * Math.cos(p * TWO_PI_N));
  const rotateX = useTransform(scrollYProgress, (p) => MAX_X * ramp(p) * Math.sin(p * TWO_PI_N));
  const scale = useTransform(scrollYProgress, (p) => 1 - 0.26 * ramp(p));

  const layers = light ? 1 : LAYERS;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1000px" }} aria-hidden>
      {/* static centred anchor */}
      <div className="absolute left-1/2 top-1/2 h-[min(80vmin,640px)] w-[min(80vmin,640px)] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          style={{ x, y, rotateX, rotateY, scale, transformStyle: "preserve-3d", willChange: "transform", backfaceVisibility: "hidden" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d", animation: "spinSlow 80s linear infinite" }}
          >
            {/* fire glow — cheap CSS radial */}
            <div
              className="absolute inset-[3%] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,170,70,0.55) 0%, rgba(233,86,20,0.42) 36%, rgba(150,38,8,0.2) 60%, transparent 74%)",
                animation: light ? undefined : "emberPulse 4s ease-in-out infinite",
              }}
            />
            {/* burning core */}
            <div
              className="absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,244,214,0.68), rgba(245,116,26,0.38) 44%, transparent 72%)",
                animation: light ? undefined : "flameFlicker 2.8s ease-in-out infinite",
              }}
            />
            {/* extruded flower — original gold→violet colour, glowing edges */}
            {Array.from({ length: layers }).map((_, i) => {
              const z = layers === 1 ? 0 : (i - (layers - 1) / 2) * ZSTEP;
              const front = i === layers - 1;
              return (
                <Image
                  key={i}
                  src="/logo-mandala.svg"
                  alt=""
                  width={640}
                  height={640}
                  priority={front}
                  className="absolute inset-0 h-full w-full"
                  style={{
                    transform: `translateZ(${z}px)`,
                    opacity: front ? 1 : 0.62,
                    filter: front
                      ? "drop-shadow(0 0 10px rgba(255,160,60,0.85)) drop-shadow(0 0 26px rgba(233,86,20,0.6))"
                      : `brightness(${0.55 + i * 0.05})`,
                    animation: front && !light ? "flameFlicker 3s ease-in-out infinite" : undefined,
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
