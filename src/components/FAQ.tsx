"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "Де ми будемо проживати?", a: "У затишних шале комплексу Seven Hills у с. Яблуниця з панорамним видом на Петрос та Говерлу. Поряд — басейн, сауна, ресторани. Вся група живе на одній території." },
  { q: "Як дістатись до локації?", a: "Яблуниця знаходиться приблизно за 4 години від Львова та 6 годин від Києва. Ми організуємо трансфер або надамо інструкцію по доїзду самостійно." },
  { q: "Харчування включено?", a: "Харчування не включено у вартість — поряд з комплексом є ресторани та магазини. Такий формат дає більше свободи у виборі." },
  { q: "Чи є оплата частинами?", a: "Так. Можлива оплата частинами на 4 місяці — 4 850 грн × 4. Для старту достатньо внести завдаток." },
  { q: "Яке повернення завдатку?", a: "Завдаток повертається у разі скасування більш ніж за 30 днів до початку ретриту. Пізніше — завдаток не повертається, але місце можна передати іншій людині." },
  { q: "Чи можна взяти дитину або тварину?", a: "Ретрит проходить у форматі повного занурення. Для найкращого ефекту від практик та поваги до інших учасників — без дітей та домашніх улюбленців." },
  { q: "Чи є досвід духовних практик обов'язковим?", a: "Ні. Ретрит підходить для всіх — від початківців до тих, хто вже має практику. Вадим адаптує подачу під рівень групи." },
  { q: "Які правила ретриту?", a: "Без алкоголю, наркотиків та психотропних речовин. Без парфумів під час практик. Зручний одяг без відволікаючих деталей. Це духовне місце — поважаємо простір разом." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(253,209,111,0.04) 0%, transparent 55%)"
      }} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.p
          className="eyebrow text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        >
          FAQ
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,0.3,1] }}
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-10"
          style={{ lineHeight: 1.1 }}
        >
          Поширені <span className="grad-text">запитання</span>
        </motion.h2>

        <div className="flex flex-col gap-2">
          {faqs.map(({ q, a }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: [0.16,1,0.3,1] }}
              className="rounded-xl overflow-hidden"
              style={{
                background: open === i ? "#15173A" : "rgba(255,255,255,0.03)",
                border: open === i ? "1px solid rgba(253,209,111,0.22)" : "1px solid rgba(255,255,255,0.06)",
                transition: "background 0.25s, border-color 0.25s",
              }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-sm font-medium" style={{ color: open === i ? "#fff" : "rgba(255,255,255,0.82)" }}>
                  {q}
                </span>
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm"
                  style={{
                    background: open === i ? "rgba(239,128,24,0.2)" : "rgba(255,255,255,0.06)",
                    color: open === i ? "#EF8018" : "rgba(255,255,255,0.38)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s, background 0.25s, color 0.25s",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16,1,0.3,1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-4 sm:px-5 pb-5 text-xs sm:text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.58)" }}
                    >
                      {a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
