"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The mandala flower as the page's travelling hero — a burning 3D bloom.
 * Centre on the first screen, then driven by scroll it journeys corner to
 * corner, tilting in 3D (rotateX/Y) so its extruded thickness reads as volume,
 * while its petals burn with a flickering fire — energy centres alight on the
 * subtle level. Fixed layer, behind content, above the cosmic backdrop.
 */
const STOPS = [0, 0.2, 0.4, 0.6, 0.8, 1];
const LAYERS = 8; // stacked copies → real depth when the flower tilts

export default function RoamingMandala() {
  const { scrollYProgress } = useScroll();

  const left = useTransform(scrollYProgress, STOPS, ["50%", "78%", "22%", "78%", "22%", "50%"]);
  const top = useTransform(scrollYProgress, STOPS, ["46%", "72%", "28%", "28%", "72%", "46%"]);
  const rotateY = useTransform(scrollYProgress, STOPS, [0, 52, -46, 42, -50, 0]);
  const rotateX = useTransform(scrollYProgress, STOPS, [16, -26, 30, -22, 28, 16]);
  const scale = useTransform(scrollYProgress, STOPS, [1, 0.62, 0.55, 0.62, 0.55, 1]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1100px" }} aria-hidden>
      <motion.div
        style={{ left, top, x: "-50%", y: "-50%", rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className="absolute h-[min(74vmin,620px)] w-[min(74vmin,620px)]"
      >
        {/* idle spin lives on an inner wrapper so it doesn't fight the scroll-driven 3D tilt */}
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", animation: "spinSlow 75s linear infinite" }}>
          {/* soft fire bloom behind the bloom */}
          <div
            className="absolute inset-0"
            style={{ transform: "translateZ(-34px)", filter: "blur(30px)", animation: "flameFlicker 4s ease-in-out infinite" }}
          >
            <Image src="/logo-mandala-fire.svg" alt="" width={620} height={620} className="h-full w-full" />
          </div>

          {/* burning core */}
          <div
            className="absolute left-1/2 top-1/2 h-1/4 w-1/4 rounded-full"
            style={{
              transform: "translate(-50%, -50%) translateZ(6px)",
              background: "radial-gradient(circle, rgba(255,238,196,0.62), rgba(245,116,26,0.32) 45%, transparent 72%)",
              animation: "flameFlicker 2.6s ease-in-out infinite",
            }}
          />

          {/* extruded flower — front layer crisp & glowing, back layers dim → thickness */}
          {Array.from({ length: LAYERS }).map((_, i) => {
            const z = (i - (LAYERS - 1) / 2) * 3.2;
            const front = i === LAYERS - 1;
            return (
              <Image
                key={i}
                src="/logo-mandala-fire.svg"
                alt=""
                width={620}
                height={620}
                priority={front}
                className="absolute inset-0 h-full w-full"
                style={{
                  transform: `translateZ(${z}px)`,
                  opacity: front ? 1 : 0.5,
                  filter: front
                    ? "drop-shadow(0 0 15px rgba(245,116,26,0.8)) drop-shadow(0 0 30px rgba(255,184,66,0.5))"
                    : "brightness(0.55)",
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
