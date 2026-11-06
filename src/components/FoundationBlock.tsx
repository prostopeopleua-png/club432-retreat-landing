"use client";

import { motion } from "framer-motion";
import { content as C } from "@/content";

/* «Фундамент знань»: чотири опори клубу.
   Спільний для головної і /metod-432. Тексти в content.ts (ключ foundation),
   підзаголовок сторінка може підмінити пропом. Рамка .glass розмиває фон
   лише на десктопі (globals.css), поява тільки через opacity і transform. */

const F = C.foundation;

const ico = "w-7 h-7 stroke-[1.4]";
const ICONS = [
  () => (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={ico}>
      <path d="M6 12c0-2 1.5-3.5 3-3.5S18 15.5 15 15.5 3 8.5 6 8.5 18 16 18 12" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={ico}>
      <path d="M12 3a6 6 0 0 0-6 6c0 2 1 3 1 5v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3c0-2 1-3 1-5a6 6 0 0 0-6-6Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0" strokeLinecap="round" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={ico}>
      <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={ico}>
      <circle cx="8.5" cy="10" r="5" /><circle cx="15.5" cy="10" r="5" /><path d="M12 14v6" strokeLinecap="round" />
    </svg>
  ),
];

const ease = [0.16, 1, 0.3, 1] as const;
function Rise({ i = 0, className, children }: { i?: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.75, delay: i * 0.07, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function FoundationBlock({
  subtitle = F.subtitle,
  center = false,
  sectionClassName = "section-pad",
}: {
  subtitle?: string;
  center?: boolean;
  sectionClassName?: string;
}) {
  const head = center ? "mx-auto text-center" : "";
  return (
    <section id="foundation" className={`${sectionClassName} relative`}>
      <div aria-hidden className="absolute inset-0 -z-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(109,90,230,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <Rise><p className={`text-[14px] text-white/60 ${center ? "text-center" : ""}`}>{F.caption}</p></Rise>
        <Rise i={1}>
          <h2 className={`font-display h-section mt-3 mb-4 max-w-3xl ${head}`}>
            {F.titleLine1}<br />{F.titleLead} <span className="grad-cosmic">{F.titleAccent}</span>
          </h2>
        </Rise>
        <Rise i={2}>
          <p className={`lede mb-14 ${head}`}>{subtitle}</p>
        </Rise>

        <div className="grid gap-5 sm:grid-cols-2">
          {F.items.map((f, i) => {
            const Icon = ICONS[i] ?? ICONS[0];
            return (
              <Rise key={f.title} i={i}>
                <div className="glass group flex h-full gap-5 rounded-3xl p-6 sm:p-7">
                  <div className="mt-1 shrink-0 text-[var(--c432-amber)] transition-transform duration-300 group-hover:scale-110"><Icon /></div>
                  <div>
                    <h3 className="text-xl font-semibold">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--c432-ink)]">{f.text}</p>
                  </div>
                </div>
              </Rise>
            );
          })}
        </div>
      </div>
    </section>
  );
}
