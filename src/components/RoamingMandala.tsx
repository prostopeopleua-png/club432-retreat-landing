"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The mandala flower — a burning, living, three-dimensional hero that orbits
 * the screen. Centred & facing us on the first screen; as you scroll it drifts
 * along a smooth circular orbit (no corners, no edge-bounce), part of it
 * spilling past the screen edge, always keeping its face turned toward the
 * centre and its "back" to the edge. It spins gently in-plane and burns.
 */
const N = 2; // orbits over the full page scroll
const RX = 42; // horizontal orbit radius (vw %) — large, lets it spill off-edge
const RY = 40; // vertical orbit radius (vh %)
const MAX_Y = 62; // max face-turn around Y (deg)
const MAX_X = 44; // max face-turn around X (deg)
const LAYERS = 11; // stacked copies → thickness
const ZSTEP = 5.5; // px between layers → visible depth when tilted

const TWO_PI_N = Math.PI * 2 * N;

export default function RoamingMandala() {
  const { scrollYProgress } = useScroll();

  // sin(p·π) envelope → 0 at both ends (centred, facing us) and 1 mid-page.
  const left = useTransform(scrollYProgress, (p) => `${50 + RX * Math.sin(p * Math.PI) * Math.cos(p * TWO_PI_N)}%`);
  const top = useTransform(scrollYProgress, (p) => `${50 + RY * Math.sin(p * Math.PI) * Math.sin(p * TWO_PI_N)}%`);
  // rotation tracks the offset so the face always points back to centre.
  const rotateY = useTransform(scrollYProgress, (p) => -MAX_Y * Math.sin(p * Math.PI) * Math.cos(p * TWO_PI_N));
  const rotateX = useTransform(scrollYProgress, (p) => MAX_X * Math.sin(p * Math.PI) * Math.sin(p * TWO_PI_N));
  const scale = useTransform(scrollYProgress, (p) => 1 - 0.28 * Math.sin(p * Math.PI));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1000px" }} aria-hidden>
      <motion.div
        style={{ left, top, x: "-50%", y: "-50%", rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="absolute h-[min(78vmin,640px)] w-[min(78vmin,640px)]"
      >
        {/* idle in-plane spin (doesn't change which face we see) */}
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", animation: "spinSlow 80s linear infinite" }}>
          {/* ── FIRE (sits behind the flower, at depth) ── */}
          <div className="absolute inset-0" style={{ transform: "translateZ(-34px)" }}>
            {/* bright flame body filling the bloom */}
            <div
              className="absolute inset-[4%] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,170,70,0.6) 0%, rgba(233,86,20,0.5) 34%, rgba(160,40,8,0.28) 58%, transparent 74%)",
                filter: "blur(26px)",
                animation: "emberPulse 4s ease-in-out infinite",
              }}
            />
            {/* flame-shaped bloom (the fire mandala, blurred & flickering) */}
            <div className="absolute inset-0" style={{ filter: "blur(18px) brightness(1.35) saturate(1.2)", animation: "emberPulse 3s ease-in-out infinite" }}>
              <Image src="/logo-mandala-fire.svg" alt="" width={640} height={640} className="h-full w-full" />
            </div>
          </div>

          {/* burning core */}
          <div
            className="absolute left-1/2 top-1/2 h-[26%] w-[26%] rounded-full"
            style={{
              transform: "translate(-50%, -50%) translateZ(8px)",
              background: "radial-gradient(circle, rgba(255,244,214,0.7), rgba(245,116,26,0.4) 42%, transparent 72%)",
              animation: "flameFlicker 2.6s ease-in-out infinite",
            }}
          />

          {/* ── EXTRUDED FLOWER — original gold→violet colour, thick body, glowing edges ── */}
          {Array.from({ length: LAYERS }).map((_, i) => {
            const z = (i - (LAYERS - 1) / 2) * ZSTEP;
            const front = i === LAYERS - 1;
            const back = i === 0;
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
                  opacity: front ? 1 : back ? 0.85 : 0.7,
                  filter: front
                    ? "drop-shadow(0 0 8px rgba(255,190,90,0.9)) drop-shadow(0 0 20px rgba(245,116,26,0.8)) drop-shadow(0 0 44px rgba(210,60,10,0.55))"
                    : `brightness(${0.5 + i * 0.03}) drop-shadow(0 0 4px rgba(245,116,26,0.5))`,
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
