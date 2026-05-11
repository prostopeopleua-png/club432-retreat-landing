"use client";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section
      className="relative py-24 sm:py-28 md:py-32 px-5 sm:px-6 text-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0D0E2D 0%, #07081B 100%)" }}
    >
      {/* Animated glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 50% 0%, rgba(239,128,24,0.2) 0%, transparent 55%),
            radial-gradient(ellipse at 30% 100%, rgba(253,209,111,0.08) 0%, transparent 50%)
          `,
          animation: "auroraFloat 10s ease-in-out infinite",
        }} />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.p
          className="eyebrow mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        >
          12–16 Червня 2026 · Карпати
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,0.3,1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5"
          style={{ lineHeight: 1.05 }}
        >
          Місця <span className="grad-text">обмежені</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16,1,0.3,1] }}
          className="text-sm sm:text-base mb-10 max-w-sm mx-auto"
          style={{ color: "rgba(255,255,255,0.52)", lineHeight: 1.7 }}
        >
          Ретрит проводиться у малій групі для глибокого занурення.
          Не чекай — місця забираються швидко.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.24, ease: [0.16,1,0.3,1] }}
        >
          <a href="#pricing" className="btn-cta">
            Забронювати місце — 19 800 грн
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-14 sm:mt-16 pt-7 sm:pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
            © 2026 Клуб 432 · club432.com
          </p>
        </motion.div>
      </div>
    </section>
  );
}
