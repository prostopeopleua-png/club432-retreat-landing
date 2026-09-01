"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CtaLink from "@/components/CtaLink";
import { content as C } from "@/content";
import { VALUES, themes, valuesPage as T, type Theme } from "@/values";
import { track } from "@/lib/analytics";

const NEED = 10;

export default function ValuesTest() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [picked, setPicked] = useState<Set<string>>(new Set());

  const toggle = (v: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });

  const pool = step === 2 ? VALUES.filter((x) => picked.has(x.v)) : VALUES;

  // Дві теми, навколо яких зібралася десятка.
  const top = useMemo(() => {
    if (step !== 3) return [] as Theme[];
    const count = new Map<Theme, number>();
    VALUES.filter((x) => picked.has(x.v)).forEach((x) =>
      count.set(x.theme, (count.get(x.theme) ?? 0) + 1),
    );
    return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([t]) => t);
  }, [step, picked]);

  return (
    <div className="mx-auto w-full max-w-4xl px-5">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <Slide key="intro">
            <div className="eyebrow-line mb-6">{T.eyebrow}</div>
            <h1 className="font-display h-section mb-6 text-center">{T.heading}</h1>
            <p className="mx-auto max-w-2xl text-center text-[15px] leading-relaxed text-[var(--c432-ink)]">
              {T.intro}
            </p>
            <div className="mt-10 flex justify-center">
              <button
                className="btn-cta cursor-pointer"
                onClick={() => {
                  track("values_test_start");
                  setStep(1);
                }}
              >
                {T.startCta}
              </button>
            </div>
          </Slide>
        )}

        {(step === 1 || step === 2) && (
          <Slide key={`step${step}`}>
            <h2 className="font-display mb-3 text-center text-[clamp(1.5rem,3vw,2.1rem)] font-semibold">
              {step === 1 ? T.step1.title : T.step2.title}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-center text-[15px] text-white/55">
              {step === 1 ? T.step1.hint : T.step2.hint}
            </p>

            <div className="flex flex-wrap justify-center gap-2.5">
              {pool.map(({ v }) => {
                const on = picked.has(v);
                return (
                  <button
                    key={v}
                    onClick={() => toggle(v)}
                    aria-pressed={on}
                    className={`rounded-full border px-4 py-2.5 text-[14px] transition-colors duration-200 ${
                      on
                        ? "border-[var(--c432-amber)]/70 bg-[var(--c432-amber)]/15 text-white"
                        : "border-white/12 text-[var(--c432-ink)] hover:border-white/30"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>

            <div className="sticky bottom-4 mt-10 flex flex-col items-center gap-3">
              <div className="text-sm text-white/55">
                {step === 1
                  ? `обрано ${picked.size}, треба щонайменше ${NEED}`
                  : `лишилось ${picked.size} із ${NEED}`}
              </div>
              <button
                disabled={step === 1 ? picked.size < NEED : picked.size !== NEED}
                onClick={() => {
                  if (step === 1) setStep(2);
                  else {
                    track("values_test_complete", { picked: picked.size });
                    setStep(3);
                  }
                }}
                className="btn-cta cursor-pointer disabled:cursor-not-allowed disabled:opacity-35"
              >
                {step === 1 ? T.step1.next : T.step2.next}
              </button>
            </div>
          </Slide>
        )}

        {step === 3 && (
          <Slide key="result">
            <h2 className="font-display h-section mb-4 text-center">{T.result.heading}</h2>
            <p className="mx-auto mb-9 max-w-xl text-center text-[var(--c432-ink)]">{T.result.lead}</p>

            <div className="mb-14 flex flex-wrap justify-center gap-2.5">
              {VALUES.filter((x) => picked.has(x.v)).map(({ v }) => (
                <span
                  key={v}
                  className="rounded-full border border-[var(--c432-amber)]/60 bg-[var(--c432-amber)]/12 px-4 py-2.5 text-[14px] text-white"
                >
                  {v}
                </span>
              ))}
            </div>

            <div className="eyebrow-line mb-8">{T.result.themesLead}</div>
            <div className="grid gap-5 md:grid-cols-2">
              {top.map((t) => (
                <div key={t} className="frost p-7">
                  <h3 className="grad-text text-2xl font-semibold">{themes[t].name}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--c432-ink)]">{themes[t].about}</p>

                  <div className="hairline my-6" />
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                    {T.result.questionsLead}
                  </div>
                  <ul className="mt-3 space-y-3">
                    {themes[t].questions.map((q) => (
                      <li key={q} className="text-[14px] leading-relaxed text-white/70">«{q}»</li>
                    ))}
                  </ul>

                  <div className="hairline my-6" />
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--c432-amber)]">
                    {T.result.lessonsLead}
                  </div>
                  <ul className="mt-3 space-y-2">
                    {themes[t].lessons.map((l) => (
                      <li key={l} className="flex gap-2.5 text-[14px] leading-relaxed text-[var(--c432-ink)]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--c432-amber)]/70" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="frost mt-10 p-8 text-center sm:p-10">
              <h3 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold">{T.result.ctaTitle}</h3>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--c432-ink)]">
                {T.result.ctaText}
              </p>
              <CtaLink href={C.botUrl} location="values_test" className="btn-cta mt-8 cursor-pointer">
                {T.result.cta}
              </CtaLink>
              <p className="mt-4 text-xs text-white/40">{C.ctaNote}</p>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setPicked(new Set());
                  setStep(0);
                }}
                className="text-sm text-white/45 underline-offset-4 transition-colors hover:text-[var(--c432-amber)]"
              >
                {T.result.restart}
              </button>
            </div>
          </Slide>
        )}
      </AnimatePresence>
    </div>
  );
}

function Slide({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
