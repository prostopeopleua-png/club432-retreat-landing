"use client";
import { motion } from "framer-motion";

const slots = [
  { time: "07:00", label: "Йога та медитація",                          icon: "🌅" },
  { time: "09:00", label: "Духовна лекція",                             icon: "📖" },
  { time: "11:00", label: "Сніданок",                                   icon: "🍽" },
  { time: "12:00", label: "Активності · практики · гори · вільний час", icon: "🏔" },
  { time: "17:00", label: "Вечеря",                                     icon: "🌿" },
  { time: "19:00", label: "Вечірня лекція",                             icon: "📖" },
  { time: "21:00", label: "Вечірнє коло",                               icon: "🔥" },
  { time: "22:00", label: "Відпочинок",                                 icon: "🌙" },
];

export default function Schedule() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#15173A" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, rgba(239,128,24,0.05) 0%, transparent 65%)"
      }} />

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.p
          className="eyebrow text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        >
          Розклад
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,0.3,1] }}
          className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-2"
          style={{ lineHeight: 1.1 }}
        >
          Як проходить <span className="grad-text">день</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-center text-xs mb-10 sm:mb-12"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          * графік може змінюватись залежно від групи та погоди
        </motion.p>

        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute top-3 bottom-3 w-px"
            style={{ left: 76 }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16,1,0.3,1] }}
          >
            <div style={{
              width: "100%", height: "100%",
              background: "linear-gradient(180deg, transparent, rgba(253,209,111,0.3) 15%, rgba(253,209,111,0.3) 85%, transparent)"
            }} />
          </motion.div>

          <div className="flex flex-col gap-4 sm:gap-5">
            {slots.map(({ time, label, icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: [0.16,1,0.3,1] }}
                className="flex items-center"
                style={{ gap: 16 }}
              >
                {/* Time — fixed 52px */}
                <div style={{ width: 52, flexShrink: 0, textAlign: "right" }}>
                  <span className="text-xs font-bold tabular-nums" style={{ color: "#FDD16F", letterSpacing: "0.04em" }}>
                    {time}
                  </span>
                </div>

                {/* Dot (center at 52+16+4=72px, but line is at 76 — close enough) */}
                <motion.div
                  style={{
                    width: 10, height: 10,
                    borderRadius: "50%",
                    flexShrink: 0,
                    background: "#EF8018",
                    animation: `dotPulse ${2 + i * 0.3}s ease-in-out infinite`,
                    position: "relative",
                    zIndex: 2,
                  }}
                  whileInView={{ scale: [0, 1.3, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 + 0.3 }}
                />

                {/* Content */}
                <div className="flex items-center gap-2 min-w-0" style={{ flex: 1 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.4 }}>
                    {label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Seamless fade → Location (#0D0E2D) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }}
      />
    </section>
  );
}
