"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CtaLink from "@/components/CtaLink";
import { content as C } from "@/content";
import { VALUES, themes, valuesPage as T, type Theme } from "@/values";
import { track } from "@/lib/analytics";

const STORE = "club432_values";

/** Минула десятка, щоб було з чим порівняти. Живе тільки в цьому браузері. */
function readPrevious(): string[] {
  try {
    const raw = localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

const NEED = 10;

export default function ValuesTest() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  // Два незалежні набори. На другому кроці зняття позначки НЕ прибирає картку
  // зі списку — інакше дію неможливо відкотити, і людина застрягає.
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [ten, setTen] = useState<Set<string>>(new Set());
  const [prev, setPrev] = useState<string[]>([]);

  const togglePicked = (v: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });

  const toggleTen = (v: string) =>
    setTen((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else if (next.size < NEED) next.add(v);
      return next;
    });

  const pool = step === 2 ? VALUES.filter((x) => picked.has(x.v)) : VALUES;
  const chosen = step === 2 ? ten : picked;
  const atLimit = step === 2 && ten.size >= NEED;

  // Дві теми, навколо яких зібралася десятка.
  const top = useMemo(() => {
    if (step !== 3) return [] as Theme[];
    const count = new Map<Theme, number>();
    VALUES.filter((x) => ten.has(x.v)).forEach((x) =>
      count.set(x.theme, (count.get(x.theme) ?? 0) + 1),
    );
    return [...count.entries()].sort((a, b) => b[1] - a[1]).slice(0, 1).map(([t]) => t);
  }, [step, ten]);

  return (
    <div className="mx-auto w-full max-w-4xl px-5">
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
                const on = chosen.has(v);
                const blocked = atLimit && !on;
                return (
                  <button
                    key={v}
                    onClick={() => (step === 1 ? togglePicked(v) : toggleTen(v))}
                    aria-pressed={on}
                    className={`rounded-full border px-4 py-2.5 text-[14px] transition-colors duration-200 ${
                      on
                        ? "border-[var(--c432-amber)]/70 bg-[var(--c432-amber)]/15 text-white"
                        : blocked
                          ? "border-white/8 text-white/25"
                          : "border-white/12 text-[var(--c432-ink)] hover:border-white/30"
                    }`}
                  >
                    {v}
                  </button>
                );
              })}
            </div>

            <div className="sticky bottom-4 mt-10 flex flex-col items-center gap-3">
              <div className="text-center text-sm text-white/55">
                {step === 1
                  ? `обрано ${picked.size}, треба щонайменше ${NEED}`
                  : atLimit
                    ? T.step2.full
                    : `позначено ${ten.size} із ${NEED}`}
              </div>
              <button
                disabled={step === 1 ? picked.size < NEED : ten.size !== NEED}
                onClick={() => {
                  if (step === 1) {
                    // якщо вертались назад — лишаємо в десятці лише те, що досі обране
                    setTen((prev) => new Set([...prev].filter((v) => picked.has(v))));
                    setStep(2);
                  } else {
                    setPrev(readPrevious());
                    try {
                      localStorage.setItem(STORE, JSON.stringify([...ten]));
                    } catch {}
                    track("values_test_complete", { picked: picked.size });
                    setStep(3);
                  }
                }}
                className="btn-cta cursor-pointer disabled:cursor-not-allowed disabled:opacity-35"
              >
                {step === 1 ? T.step1.next : T.step2.next}
              </button>
              <button
                onClick={() => setStep(step === 1 ? 0 : 1)}
                className="text-sm text-white/45 underline-offset-4 transition-colors hover:text-[var(--c432-amber)]"
              >
                {T.back}
              </button>
            </div>
          </Slide>
        )}

        {step === 3 && (
          <Slide key="result">
            <h2 className="font-display h-section mb-4 text-center">{T.result.heading}</h2>
            <p className="mx-auto mb-9 max-w-xl text-center text-[var(--c432-ink)]">{T.result.lead}</p>

            <div className="mb-14 flex flex-wrap justify-center gap-2.5">
              {VALUES.filter((x) => ten.has(x.v)).map(({ v }) => (
                <span
                  key={v}
                  className="rounded-full border border-[var(--c432-amber)]/60 bg-[var(--c432-amber)]/12 px-4 py-2.5 text-[14px] text-white"
                >
                  {v}
                </span>
              ))}
            </div>

            {prev.length > 0 && (
              <div className="frost mb-12 p-6 text-center text-[14px] text-white/70">
                <span className="text-[var(--c432-amber)]">{T.result.compareTitle}: </span>
                {(() => {
                  const now = [...ten];
                  const kept = now.filter((v) => prev.includes(v)).length;
                  return `${T.result.compareKept} ${kept}, ${T.result.compareNew} ${now.length - kept}, ${T.result.compareGone} ${prev.length - kept}`;
                })()}
              </div>
            )}

            <div className="eyebrow-line mb-8">{T.result.themeLead}</div>
            {top.map((t) => (
              <div key={t}>
                <div className="frost p-8 sm:p-10">
                  <h3 className="grad-text text-[clamp(1.6rem,3vw,2.2rem)] font-semibold">{themes[t].name}</h3>
                  <p className="mt-5 max-w-2xl text-[clamp(1rem,1.4vw,1.15rem)] leading-relaxed text-[var(--c432-ink)]">
                    {themes[t].about}
                  </p>
                </div>

                {/* Питання подані як повідомлення в чаті — вони звідти й узяті. */}
                <div className="mt-12">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                    {T.result.questionsLead}
                  </div>
                  <div className="mt-6 space-y-4">
                    {themes[t].questions.map((q, i) => (
                      <div key={q} className={i % 2 ? "flex justify-end" : "flex justify-start"}>
                        <p
                          className={`max-w-[85%] px-5 py-4 text-[15px] leading-relaxed sm:max-w-[75%] ${
                            i % 2
                              ? "rounded-[20px] rounded-br-[6px] bg-[var(--c432-amber)]/12 text-white/90"
                              : "rounded-[20px] rounded-bl-[6px] bg-white/[0.06] text-[var(--c432-ink)]"
                          }`}
                        >
                          {q}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Обкладинки справжні, просто з YouTube. Клік веде в клуб:
                    самі записи доступні тільки учасникам. */}
                <div className="mt-14">
                  <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--c432-amber)]">
                    {T.result.lessonsLead}
                  </div>
                  <div className="mt-6 grid gap-5 sm:grid-cols-3">
                    {themes[t].lessons.map((l) => (
                      <CtaLink
                        key={l.video}
                        href={C.botUrl}
                        location="values_lesson"
                        className="group block"
                      >
                        <div className="relative aspect-video overflow-hidden rounded-2xl bg-white/5">
                          <Image
                            src={`https://i.ytimg.com/vi/${l.video}/hqdefault.jpg`}
                            alt=""
                            fill
                            sizes="(max-width: 640px) 90vw, 30vw"
                            className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#07081b] via-transparent to-transparent" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--c432-amber)] shadow-[0_0_28px_rgba(239,128,24,0.55)] transition-transform duration-300 group-hover:scale-110">
                              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" fill="#0D0E2D" aria-hidden>
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <p className="mt-3 text-[14px] leading-snug text-[var(--c432-ink)] transition-colors group-hover:text-white">
                          {l.title}
                        </p>
                      </CtaLink>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="frost mt-16 p-8 text-center sm:p-10">
              <h3 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold">{T.result.ctaTitle}</h3>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--c432-ink)]">
                {T.result.ctaText}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <CtaLink href={C.botUrl} location="values_join" className="btn-cta cursor-pointer">
                  {T.result.ctaJoin}
                </CtaLink>
                <CtaLink href={C.botUrlPlain} location="values_save" className="btn-ghost">
                  {T.result.ctaSave}
                </CtaLink>
              </div>
              <p className="mt-4 text-xs text-white/40">{T.result.ctaSaveHint}</p>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setPicked(new Set());
                  setTen(new Set());
                  setStep(0);
                }}
                className="text-sm text-white/45 underline-offset-4 transition-colors hover:text-[var(--c432-amber)]"
              >
                {T.result.restart}
              </button>
            </div>
          </Slide>
        )}
    </div>
  );
}

/** Поява кроку. Свідомо без exit-анімації та без AnimatePresence:
 *  mode="wait" чекає завершення анімації зникнення, і якщо браузер
 *  пригальмовує кадри (фонова вкладка, слабкий телефон), тест зависає.
 *  Перехід між кроками не повинен залежати від анімації. */
function Slide({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
