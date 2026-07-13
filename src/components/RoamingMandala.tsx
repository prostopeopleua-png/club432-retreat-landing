"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The mandala flower — a burning, orbiting hero. Centred & facing us on the
 * first screen; as you scroll it drifts along a smooth circular orbit (no
 * corners, no edge-bounce), part of it spilling past the screen edge, always
 * keeping its face turned toward the centre.
 *
 * Kept deliberately light: the fire is a cheap CSS radial glow (no heavy
 * blurred-SVG layers) so backdrop-filter cards/header don't flicker, and mobile
 * drops the extrusion entirely.
 */
const N = 2;
const RX = 46;
const RY = 42;
const MAX_Y = 64;
const MAX_X = 46;
const LAYERS = 6;
const ZSTEP = 5;
const TWO_PI_N = Math.PI * 2 * N;

function ramp(p: number) {
  const t = Math.min(1, p / 0.14);
  return t * t * (3 - 2 * t);
}

export default function RoamingMandala() {
  const { scrollYProgress } = useScroll();
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(
      window.matchMedia("(max-width: 820px)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const left = useTransform(scrollYProgress, (p) => `${50 + RX * ramp(p) * Math.cos(p * TWO_PI_N)}%`);
  const top = useTransform(scrollYProgress, (p) => `${50 + RY * ramp(p) * Math.sin(p * TWO_PI_N)}%`);
  const rotateY = useTransform(scrollYProgress, (p) => -MAX_Y * ramp(p) * Math.cos(p * TWO_PI_N));
  const rotateX = useTransform(scrollYProgress, (p) => MAX_X * ramp(p) * Math.sin(p * TWO_PI_N));
  const scale = useTransform(scrollYProgress, (p) => 1 - 0.26 * ramp(p));

  const layers = light ? 1 : LAYERS;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1000px" }} aria-hidden>
      <motion.div
        style={{
          left,
          top,
          x: "-50%",
          y: "-50%",
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        className="absolute h-[min(80vmin,640px)] w-[min(80vmin,640px)]"
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", animation: "spinSlow 80s linear infinite" }}>
          {/* fire glow — pure CSS radial, cheap; shows through the petals like flame */}
          <div
            className="absolute inset-[3%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,170,70,0.55) 0%, rgba(233,86,20,0.42) 36%, rgba(150,38,8,0.2) 60%, transparent 74%)",
              transform: "translateZ(-16px)",
              animation: "emberPulse 4s ease-in-out infinite",
            }}
          />
          {/* burning core */}
          <div
            className="absolute left-1/2 top-1/2 h-[24%] w-[24%] rounded-full"
            style={{
              transform: "translate(-50%, -50%) translateZ(6px)",
              background: "radial-gradient(circle, rgba(255,244,214,0.68), rgba(245,116,26,0.38) 44%, transparent 72%)",
              animation: "flameFlicker 2.8s ease-in-out infinite",
            }}
          />
          {/* extruded flower — original gold→violet, glowing edges */}
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
