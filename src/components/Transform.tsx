"use client";
import { motion } from "framer-motion";

const items = [
  { from: "Хаос у голові",       to: "Ясність і фокус" },
  { from: "Відчуття тягаря",     to: "Легкість і сила" },
  { from: "Незрозумілі страхи",  to: "Розуміння себе" },
  { from: "Самотність у натовпі",to: "Справжня спільнота" },
  { from: "Жити на автопілоті",  to: "Усвідомлене життя" },
];

export default function Transform() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#15173A" }}>
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(239,128,24,0.07) 0%, transparent 60%)"
      }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p
          className="eyebrow text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        >
          Трансформація
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,0.3,1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12"
          style={{ lineHeight: 1.1 }}
        >
          Ти прийдеш <span className="grad-text">одним</span> —<br />
          повернешся <span className="grad-text">іншим</span>
        </motion.h2>

        <div className="flex flex-col gap-2.5 sm:gap-3">
          {items.map(({ from, to }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16,1,0.3,1] }}
              whileHover={{
                scale: 1.015,
                borderColor: "rgba(253,209,111,0.28)",
                backgroundColor: "rgba(255,255,255,0.065)",
              }}
              className="flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl cursor-default"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "background 0.25s, border-color 0.25s",
              }}
            >
              <span className="flex-1 text-right text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.38)" }}>
                {from}
              </span>
              <motion.div
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
                style={{ background: "rgba(239,128,24,0.15)", color: "#EF8018" }}
                whileHover={{ scale: 1.2, backgroundColor: "rgba(239,128,24,0.3)" }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.div>
              <span className="flex-1 text-sm sm:text-base font-semibold" style={{ color: "#FDD16F" }}>
                {to}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seamless fade → Program (#0D0E2D) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }}
      />
    </section>
  );
}
