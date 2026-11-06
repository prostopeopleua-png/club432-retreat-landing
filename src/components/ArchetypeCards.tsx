"use client";

import { motion } from "framer-motion";

/* Три картки «Шукач / Провідник / Творець».
   Спільні для головної і /metod-432: розмітка одна, тексти й колір назви
   передає сторінка. Рамка .glass розмиває фон лише на десктопі (globals.css),
   поява тільки через opacity і transform. */

export type Archetype = { title: string; text: string };

export default function ArchetypeCards({
  items,
  titleClassName = "font-display text-2xl font-semibold text-[var(--c432-amber)]",
}: {
  items: readonly Archetype[];
  titleClassName?: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {items.map((a, i) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass h-full rounded-3xl p-6 md:p-8">
            <h3 className={titleClassName}>{a.title}</h3>
            <div className="hairline my-4 md:my-5" />
            <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{a.text}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
