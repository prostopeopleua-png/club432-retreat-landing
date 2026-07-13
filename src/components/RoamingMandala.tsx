"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The mandala flower — a burning, orbiting hero. Centred & facing us on the
 * first screen; as you scroll it drifts along a smooth circular orbit (no
 * corners, no edge-bounce), part of it spilling past the screen edge, always
 * keeping its face turned toward the centre. Desktop gets a full extruded 3D,
 * blurred-fire treatment; mobile gets a light single-layer version so the page
 * stays smooth.
 */
const N = 2;
const RX = 46;
const RY = 42;
const MAX_Y = 64;
const MAX_X = 46;
const LAYERS = 11;
const ZSTEP = 5.5;
const TWO_PI_N = Math.PI * 2 * N;

// radius/tilt envelope: ramps to full within the first ~14% of scroll so the
// very first move already reaches the edge like every later point.
function ramp(p: number) {
  const t = Math.min(1, p / 0.14);
  return t * t * (3 - 2 * t);
}

export default function RoamingMandala() {
  const { scrollYProgress } = useScroll();
  const [light, setLight] = useState(false);

  useEffect(() => {
    const m = window.matchMedia("(max-width: 820px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setLight(m);
  }, []);

  const left = useTransform(scrollYProgress, (p) => `${50 + RX * ramp(p) * Math.cos(p * TWO_PI_N)}%`);
  const top = useTransform(scrollYProgress, (p) => `${50 + RY * ramp(p) * Math.sin(p * TWO_PI_N)}%`);
  const rotateY = useTransform(scrollYProgress, (p) => -MAX_Y * ramp(p) * Math.cos(p * TWO_PI_N));
  const rotateX = useTransform(scrollYProgress, (p) => MAX_X * ramp(p) * Math.sin(p * TWO_PI_N));
  const scale = useTransform(scrollYProgress, (p) => 1 - 0.26 * ramp(p));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1000px" }} aria-hidden>
      <motion.div
        style={{ left, top, x: "-50%", y: "-50%", rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="absolute h-[min(80vmin,640px)] w-[min(80vmin,640px)]"
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", animation: "spinSlow 80s linear infinite" }}>
          {light ? (
            /* ── MOBILE / reduced-motion: single layer + cheap CSS fire glow ── */
            <>
              <div
                className="absolute inset-[3%] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,160,60,0.5) 0%, rgba(233,86,20,0.34) 38%, transparent 70%)",
                  animation: "emberPulse 4s ease-in-out infinite",
                }}
              />
              <Image src="/logo-mandala.svg" alt="" width={640} height={640} priority className="absolute inset-0 h-full w-full" style={{ filter: "drop-shadow(0 0 10px rgba(245,116,26,0.7))" }} />
            </>
          ) : (
            /* ── DESKTOP: extruded 3D bloom with blurred fire ── */
            <>
              <div className="absolute inset-0" style={{ transform: "translateZ(-34px)" }}>
                <div
                  className="absolute inset-[4%] rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,170,70,0.6) 0%, rgba(233,86,20,0.5) 34%, rgba(160,40,8,0.28) 58%, transparent 74%)",
                    filter: "blur(26px)",
                    animation: "emberPulse 4s ease-in-out infinite",
                  }}
                />
                <div className="absolute inset-0" style={{ filter: "blur(18px) brightness(1.35) saturate(1.2)", animation: "emberPulse 3s ease-in-out infinite" }}>
                  <Image src="/logo-mandala-fire.svg" alt="" width={640} height={640} className="h-full w-full" />
                </div>
              </div>
              <div
                className="absolute left-1/2 top-1/2 h-[26%] w-[26%] rounded-full"
                style={{
                  transform: "translate(-50%, -50%) translateZ(8px)",
                  background: "radial-gradient(circle, rgba(255,244,214,0.7), rgba(245,116,26,0.4) 42%, transparent 72%)",
                  animation: "flameFlicker 2.6s ease-in-out infinite",
                }}
              />
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
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
