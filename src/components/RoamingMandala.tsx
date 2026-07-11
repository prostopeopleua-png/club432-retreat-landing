"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The mandala flower — a burning, living hero that orbits the screen.
 *
 * On the first screen we see its "face" (front, centred). As you scroll it
 * drifts along a smooth circular orbit (no sharp corners, no edge-bounce),
 * always keeping its face turned toward the centre of the screen and its
 * "back" to the edge. It spins gently in-plane and burns with a flickering
 * fire while keeping its original gold→violet colour.
 *
 * Fixed layer, behind content, above the cosmic backdrop.
 */
const N = 2; // orbits over the full page scroll
const RX = 28; // horizontal orbit radius (vw %)
const RY = 24; // vertical orbit radius (vh %)
const MAX_Y = 44; // max face-turn around Y (deg)
const MAX_X = 30; // max face-turn around X (deg)
const LAYERS = 8;

const TWO_PI_N = Math.PI * 2 * N;

export default function RoamingMandala() {
  const { scrollYProgress } = useScroll();

  // sin(p·π) envelope → 0 at both ends (centred, facing us) and 1 mid-page.
  const left = useTransform(scrollYProgress, (p) => `${50 + RX * Math.sin(p * Math.PI) * Math.cos(p * TWO_PI_N)}%`);
  const top = useTransform(scrollYProgress, (p) => `${50 + RY * Math.sin(p * Math.PI) * Math.sin(p * TWO_PI_N)}%`);
  // rotation tracks the offset so the face always points back to centre.
  const rotateY = useTransform(scrollYProgress, (p) => -MAX_Y * Math.sin(p * Math.PI) * Math.cos(p * TWO_PI_N));
  const rotateX = useTransform(scrollYProgress, (p) => MAX_X * Math.sin(p * Math.PI) * Math.sin(p * TWO_PI_N));
  const scale = useTransform(scrollYProgress, (p) => 1 - 0.34 * Math.sin(p * Math.PI));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1100px" }} aria-hidden>
      <motion.div
        style={{ left, top, x: "-50%", y: "-50%", rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="absolute h-[min(74vmin,620px)] w-[min(74vmin,620px)]"
      >
        {/* idle in-plane spin (doesn't change which face we see) */}
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", animation: "spinSlow 80s linear infinite" }}>
          {/* burning fire halo (orange bloom behind, additive, pulsing like flames) */}
          <div
            className="absolute inset-0"
            style={{ filter: "blur(34px) brightness(1.25)", mixBlendMode: "screen", animation: "flamePulse 4s ease-in-out infinite" }}
          >
            <Image src="/logo-mandala-fire.svg" alt="" width={620} height={620} className="h-full w-full" />
          </div>
          <div
            className="absolute inset-0"
            style={{ transform: "translateZ(-16px)", filter: "blur(14px)", mixBlendMode: "screen", opacity: 0.8, animation: "flameFlicker 2.4s ease-in-out infinite" }}
          >
            <Image src="/logo-mandala-fire.svg" alt="" width={620} height={620} className="h-full w-full" />
          </div>

          {/* burning core */}
          <div
            className="absolute left-1/2 top-1/2 h-1/4 w-1/4 rounded-full"
            style={{
              transform: "translate(-50%, -50%) translateZ(6px)",
              background: "radial-gradient(circle, rgba(255,238,196,0.6), rgba(245,116,26,0.3) 45%, transparent 72%)",
              animation: "flameFlicker 2.6s ease-in-out infinite",
            }}
          />

          {/* extruded flower — ORIGINAL gold→violet colour, front layer glowing with fire */}
          {Array.from({ length: LAYERS }).map((_, i) => {
            const z = (i - (LAYERS - 1) / 2) * 3.2;
            const front = i === LAYERS - 1;
            return (
              <Image
                key={i}
                src="/logo-mandala.svg"
                alt=""
                width={620}
                height={620}
                priority={front}
                className="absolute inset-0 h-full w-full"
                style={{
                  transform: `translateZ(${z}px)`,
                  opacity: front ? 1 : 0.5,
                  filter: front
                    ? "drop-shadow(0 0 8px rgba(255,190,90,0.9)) drop-shadow(0 0 20px rgba(245,116,26,0.75)) drop-shadow(0 0 42px rgba(210,60,10,0.55))"
                    : "brightness(0.6)",
                  animation: front ? "flameFlicker 3s ease-in-out infinite" : undefined,
                }}
              />
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
