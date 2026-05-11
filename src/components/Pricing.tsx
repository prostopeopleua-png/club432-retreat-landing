"use client";
import { motion } from "framer-motion";

const included = [
  "Проживання 5 днів / 4 ночі у шале Seven Hills",
  "Духовні вчення двічі на день",
  "Ранкові медитації та йога",
  "Трансформаційна гра Ліла",
  "Цвяхостояння / цвяхоходіння",
  "МАК-терапія",
  "Церемонія кристалохілінгу",
  "Доступ до запису всіх занять",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 40%, rgba(239,128,24,0.07) 0%, transparent 55%)"
      }} />

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.p
          className="eyebrow text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        >
          Вартість
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,0.3,1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12"
          style={{ lineHeight: 1.1 }}
        >
          Що <span className="grad-text">входить</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16,1,0.3,1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "#15173A",
            border: "1px solid rgba(253,209,111,0.2)",
            boxShadow: "0 0 80px rgba(253,209,111,0.06), 0 24px 80px rgba(0,0,0,0.45)",
          }}
        >
          {/* Price */}
          <div className="text-center px-6 sm:px-8 pt-8 sm:pt-10 pb-7 sm:pb-8" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold grad-text mb-1">19 800</div>
            <div className="text-base mb-5" style={{ color: "rgba(255,255,255,0.45)" }}>грн</div>
            <div
              className="inline-block px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium"
              style={{ background: "rgba(239,128,24,0.1)", color: "#FDD16F", border: "1px solid rgba(239,128,24,0.22)" }}
            >
              Можлива оплата частинами · 4 850 грн × 4 місяці
            </div>
          </div>

          {/* Checklist */}
          <div className="px-6 sm:px-8 py-5 sm:py-6">
            <ul className="flex flex-col gap-2.5 sm:gap-3 mb-7 sm:mb-8">
              {included.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.035, ease: [0.16,1,0.3,1] }}
                  className="flex items-center gap-3 text-xs sm:text-sm"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: "rgba(253,209,111,0.15)", color: "#FDD16F" }}
                  >
                    ✓
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>

            <a
              href="https://secure.wayforpay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              style={{ width: "100%", display: "flex" }}
            >
              Забронювати місце
            </a>
            <p className="mt-4 text-xs text-center" style={{ color: "rgba(255,255,255,0.28)" }}>
              Оплата через WayForPay · Безпечно · Завдаток для бронювання
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="text-xs text-center mt-5"
          style={{ color: "rgba(255,255,255,0.28)" }}
        >
          Місць обмежена кількість. Ретрит проводиться у малих групах.
        </motion.p>
      </div>
    </section>
  );
}
