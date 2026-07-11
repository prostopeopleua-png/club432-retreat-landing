"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * The mandala flower as the page's travelling hero. Centre on the first
 * screen, then — driven by scroll — it journeys corner to corner
 * (bottom-right → top-left → top-right → bottom-left → back to centre),
 * tilting in 3D and turning, while glowing with a soft mystical fire — a
 * visualization of energy centres burning on the subtle level.
 * Fixed layer, behind content, above the cosmic backdrop.
 */
const STOPS = [0, 0.2, 0.4, 0.6, 0.8, 1];

export default function RoamingMandala() {
  const { scrollYProgress } = useScroll();

  const left = useTransform(scrollYProgress, STOPS, ["50%", "78%", "22%", "78%", "22%", "50%"]);
  const top = useTransform(scrollYProgress, STOPS, ["46%", "72%", "28%", "28%", "72%", "46%"]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 200]); // slow overall turn on top of the idle spin
  const rotateY = useTransform(scrollYProgress, STOPS, [0, 48, -42, 38, -46, 0]); // 3D face turn
  const rotateX = useTransform(scrollYProgress, STOPS, [14, -22, 26, -18, 24, 14]); // 3D pitch
  const scale = useTransform(scrollYProgress, STOPS, [1, 0.62, 0.55, 0.62, 0.55, 1]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ perspective: "1200px" }} aria-hidden>
      <motion.div
        style={{ left, top, x: "-50%", y: "-50%", rotateX, rotateY, rotateZ, scale, transformStyle: "preserve-3d" }}
        className="absolute h-[min(74vmin,620px)] w-[min(74vmin,620px)]"
      >
        {/* mystical fire aura */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(239,128,24,0.26) 0%, rgba(253,209,111,0.12) 42%, transparent 68%)",
            animation: "fireGlow 5s ease-in-out infinite",
          }}
        />
        {/* bright burning core */}
        <div
          className="absolute left-1/2 top-1/2 h-1/5 w-1/5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,236,190,0.33), rgba(239,128,24,0.14) 55%, transparent 75%)",
            animation: "fireGlow 3.4s ease-in-out infinite",
          }}
        />
        {/* the spinning mandala */}
        <Image
          src="/logo-mandala.svg"
          alt=""
          width={620}
          height={620}
          priority
          className="absolute inset-0 h-full w-full"
          style={{
            animation: "spinSlow 70s linear infinite",
            filter:
              "drop-shadow(0 0 24px rgba(239,128,24,0.5)) drop-shadow(0 0 9px rgba(253,209,111,0.65))",
          }}
        />
      </motion.div>
    </div>
  );
}
