"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const activities = [
  {
    icon: "🧘",
    title: "Групова йога та медитація",
    desc: "Щоранку практикуємо ментальну йогу на усвідомлення кожної дії та медитуємо на звільнення від обмежень.",
    detail: "Практика допомагає налаштувати тіло і розум на день. Щовечора — вечірнє коло для інтеграції досвіду.",
  },
  {
    icon: "🎲",
    title: "Ліла — дзеркало життя",
    desc: "Трансформаційна гра, що допомагає глибше розібратися у своєму житті, побачити причини труднощів і знайти вихід.",
    detail: "Давня індійська гра пізнання себе. Кожен хід — це урок. Кожна клітинка — це стан свідомості.",
  },
  {
    icon: "🃏",
    title: "МАК терапія",
    desc: "Діалог із собою через символи та образи. Метафоричні асоціативні карти розкривають те, що ховається глибоко.",
    detail: "Потужний інструмент для роботи з підсвідомістю. Не потребує жодного досвіду.",
  },
  {
    icon: "📿",
    title: "Духовні вчення",
    desc: "Щоранку та щовечора проводимо просвітницькі лекції та даємо структуровані відповіді простою мовою.",
    detail: "Вадим 4+ роки передає давні знання в сучасному контексті. Жодної догматики — тільки практичне розуміння.",
  },
  {
    icon: "🔥",
    title: "Цвяхостояння",
    desc: "Практика, що не залишає байдужим нікого. Безпрограшне рішення перевірити себе на стійкість.",
    detail: "Підготовка + практика під керівництвом. Дає відчуття сили і контролю над власним тілом і розумом.",
  },
  {
    icon: "💎",
    title: "Церемонія кристалохілінгу",
    desc: "Найпрактичніший спосіб знайти свій талісман, який підсилить твою енергію та захистить від впливу.",
    detail: "Діана — майстриня кристалохілінгу. Ти підеш зі своїм каменем, зарядженим під час ретриту.",
  },
  {
    icon: "🏔",
    title: "Активності та відпочинок",
    desc: "Побувати в Карпатах і не відпочити? Ні, ми хоч і їдемо задля навчання — відпочивати в гарних місцях святе!",
    detail: "Походи в гори, басейн, сауна, вільний час у с. Яблуниця з видом на Петрос та Говерлу.",
  },
];

export default function Program() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="program" className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      {/* Ambient glow top */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(253,209,111,0.04) 0%, transparent 55%)"
      }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.p
          className="eyebrow text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        >
          Програма
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,0.3,1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2"
          style={{ lineHeight: 1.1 }}
        >
          Що будемо <span className="grad-text">робити</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-center text-sm mb-10 sm:mb-12"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Натисни на будь-який пункт щоб дізнатись більше
        </motion.p>

        <div className="flex flex-col gap-2.5 sm:gap-3">
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16,1,0.3,1] }}
              whileHover={{ scale: open === i ? 1 : 1.005 }}
              className="rounded-2xl overflow-hidden cursor-pointer"
              style={{
                background: open === i ? "#1E2048" : "#15173A",
                border: open === i
                  ? "1px solid rgba(253,209,111,0.35)"
                  : "1px solid rgba(255,255,255,0.07)",
                transition: "background 0.3s, border-color 0.3s",
                boxShadow: open === i ? "0 0 30px rgba(253,209,111,0.06)" : "none",
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="px-4 sm:px-5 py-4 flex items-center gap-3 sm:gap-4">
                <div
                  className="flex-shrink-0 w-10 sm:w-11 h-10 sm:h-11 rounded-xl flex items-center justify-center text-xl sm:text-2xl"
                  style={{
                    background: open === i ? "rgba(239,128,24,0.15)" : "rgba(255,255,255,0.06)",
                    transition: "background 0.3s",
                  }}
                >
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm sm:text-base leading-tight" style={{ color: open === i ? "#FDD16F" : "#fff", transition: "color 0.3s" }}>
                    {a.title}
                  </h3>
                  <p className="text-xs mt-1 leading-relaxed hidden sm:block" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {a.desc}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm"
                  style={{
                    background: open === i ? "rgba(239,128,24,0.2)" : "rgba(255,255,255,0.06)",
                    color: open === i ? "#EF8018" : "rgba(255,255,255,0.35)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s, background 0.3s, color 0.3s",
                  }}
                >
                  +
                </div>
              </div>

              {/* Mobile description */}
              <div className="px-4 pb-3 sm:hidden" style={{ display: open === i ? "none" : undefined }}>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {a.desc}
                </p>
              </div>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className="px-4 sm:px-5 pb-5 text-sm leading-relaxed"
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        borderTop: "1px solid rgba(253,209,111,0.1)",
                        paddingTop: 14,
                      }}
                    >
                      {a.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seamless fade → Schedule (#15173A) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #15173A)", zIndex: 4 }}
      />
    </section>
  );
}
