"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import CosmicBackground from "@/components/CosmicBackground";
import SmoothScroll from "@/components/SmoothScroll";
import type { Presentation } from "./content/types";

/* ─────────────────────────  motion helpers  ───────────────────────── */
const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Reveal({
  children,
  i = 0,
  className,
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow-line mb-7">{children}</span>;
}

function StageTag({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-center gap-3">
      <span className="grad-cosmic font-display text-2xl font-semibold">Етап {n}</span>
      <span className="h-px w-10 bg-gradient-to-r from-[#FDD16F]/50 to-transparent" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/* ─────────────────────────────  page  ─────────────────────────────── */
const GOLD_RING =
  "inset 0 1px 1px rgba(216,236,248,0.14), 0 24px 40px rgba(4,5,15,0.5), 0 0 0 1px rgba(253,209,111,0.28)";

function Dot() {
  return <span className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FDD16F]" />;
}

export default function VedennyaClient({ p }: { p: Presentation }) {
  const twoPackages = p.packages.items.length === 2;
  return (
    <SmoothScroll>
      <CosmicBackground />

      {/* NAV — мінімальний маркер, без пунктів меню (це презентація) */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <a
          href="#top"
          className="frost flex items-center gap-2.5 rounded-full py-2.5 pl-3 pr-5"
        >
          <Image
            src="/logo-mandala-white.svg"
            alt="Клуб 432"
            width={30}
            height={30}
            className="shrink-0 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
          />
          <span className="font-display whitespace-nowrap text-lg font-semibold tracking-wide">
            Клуб 432
          </span>
        </a>
      </header>

      <main id="top" className="relative z-10">
        {/* ══ HERO ══ */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
          <div className="grid-overlay pointer-events-none absolute inset-0 -z-10" />
          <div className="rise-in">
            <span className="eyebrow-line mb-8">{p.hero.eyebrow}</span>
          </div>
          <h1 className="rise-in rise-d1 font-display wordmark text-[clamp(2.8rem,9vw,6.5rem)] font-semibold leading-[1.02] tracking-tight pb-[0.12em] [filter:drop-shadow(0_2px_10px_rgba(7,8,27,0.9))]">
            {p.hero.title[0]}
            <br />
            {p.hero.title[1]}
          </h1>
          <p className="rise-in rise-d2 mx-auto mt-8 max-w-2xl text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-white/85 [text-shadow:0_1px_16px_rgba(7,8,27,0.95)]">
            {p.hero.lede}
          </p>
          <p className="rise-in rise-d3 mt-9 text-[13px] tracking-[0.15em] uppercase text-white/45 [text-shadow:0_1px_12px_rgba(7,8,27,0.95)]">
            {p.hero.meta}
          </p>
          <div className="rise-in rise-d3 mt-14 h-9 w-[1px] bg-gradient-to-b from-[#FDD16F]/60 to-transparent" />
        </section>

        {/* ══ ДЗЕРКАЛО ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <Eyebrow>{p.mirror.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl text-center">
              {p.mirror.title}
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mx-auto mt-6 mb-16 text-center">{p.mirror.lede}</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {p.mirror.questions.map((q, i) => (
              <Reveal key={q} i={i % 2}>
                <div className="frost frost-hover flex h-full items-start gap-5 p-8">
                  <span className="num-badge shrink-0 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-2 text-[1.05rem] leading-relaxed text-white/85">
                    {q}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ЩО ЗМІНЮЄТЬСЯ (необовʼязково) ══ */}
        {p.goals && (
          <section className="sect mx-auto max-w-6xl px-5">
            <Reveal>
              <Eyebrow>{p.goals.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="font-display h-section mx-auto max-w-3xl text-center">
                {p.goals.title}
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="lede mx-auto mt-6 mb-16 text-center">{p.goals.lede}</p>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {p.goals.items.map((g, i) => (
                <Reveal key={g.t} i={i % 2}>
                  <div className="frost frost-hover flex h-full flex-col p-8">
                    <h3 className="grad-text text-xl font-semibold">{g.t}</h3>
                    <div className="hairline my-5" />
                    <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                      {g.d}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ══ ПЕРШИЙ КРОК (необовʼязково) ══ */}
        {p.firstStep && (
          <section className="sect mx-auto max-w-4xl px-5">
            <Reveal>
              <Eyebrow>{p.firstStep.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="font-display h-section mx-auto max-w-3xl text-center">
                {p.firstStep.title}
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="lede mx-auto mt-6 mb-12 text-center">{p.firstStep.lede}</p>
            </Reveal>
            <Reveal i={2}>
              <div className="frost p-8 md:p-10" style={{ boxShadow: GOLD_RING }}>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {p.firstStep.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--c432-ink)]"
                    >
                      <Dot />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>
        )}

        {/* ══ ОБІЦЯНКА: гнучке і незмінне (необовʼязково) ══ */}
        {p.promise && (
          <section className="sect mx-auto max-w-5xl px-5">
            <Reveal>
              <Eyebrow>{p.promise.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="font-display h-section mx-auto max-w-3xl text-center">
                {p.promise.title}
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="lede mx-auto mt-6 mb-14 text-center">{p.promise.lede}</p>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              <Reveal>
                <div className="frost flex h-full flex-col p-8">
                  <h3 className="text-xl font-semibold text-white">{p.promise.flexTitle}</h3>
                  <div className="hairline my-5" />
                  <ul className="flex flex-col gap-3">
                    {p.promise.flex.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--c432-ink)]"
                      >
                        <Dot />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal i={1}>
                <div className="frost flex h-full flex-col p-8" style={{ boxShadow: GOLD_RING }}>
                  <h3 className="grad-cosmic font-display text-2xl font-semibold">
                    {p.promise.fixedTitle}
                  </h3>
                  <div className="hairline my-5" />
                  <p className="text-[15.5px] leading-relaxed text-white/85">
                    {p.promise.fixedText}
                  </p>
                </div>
              </Reveal>
            </div>
          </section>
        )}

        {/* ══ ЧОМУ ІНДИВІДУАЛЬНО ══ */}
        <section className="sect mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <Eyebrow>{p.why.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl">{p.why.title}</h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mx-auto mt-7">{p.why.lede}</p>
          </Reveal>
        </section>

        {/* ══ КОНФІДЕНЦІЙНІСТЬ (необовʼязково) ══ */}
        {p.privacy && (
          <section className="sect mx-auto max-w-4xl px-5">
            <Reveal>
              <Eyebrow>{p.privacy.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal i={1}>
              <h2 className="font-display h-section mx-auto max-w-3xl text-center">
                {p.privacy.title}
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="lede mx-auto mt-6 mb-12 text-center">{p.privacy.lede}</p>
            </Reveal>
            <Reveal i={2}>
              <div className="frost p-8 md:p-10" style={{ boxShadow: GOLD_RING }}>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {p.privacy.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-[var(--c432-ink)]"
                    >
                      <Dot />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </section>
        )}

        {/* ══ ТРИ ЕТАПИ (огляд) ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <Eyebrow>Шлях</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">
              Три етапи трансформації
            </h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {p.stages.map((s, i) => (
              <Reveal key={s.n} i={i}>
                <div className="frost frost-hover flex h-full flex-col p-8">
                  <span className="num-badge leading-none">{s.n}</span>
                  <h3 className="grad-cosmic mt-3 text-2xl font-semibold">{s.t}</h3>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ЕТАП 1 · ДІАГНОСТИКА ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-center">
              <StageTag n="01">Діагностика</StageTag>
            </div>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl text-center">
              {p.diag.title}
            </h2>
          </Reveal>

          {/* база — профіль */}
          <Reveal i={2}>
            <div className="frost mx-auto mt-12 max-w-3xl p-8 md:p-10">
              <span className="eyebrow mb-3">Для кожного</span>
              <h3 className="font-display text-2xl font-semibold text-white">
                {p.diag.baseTitle}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--c432-ink)]">
                {p.diag.baseText}
              </p>
            </div>
          </Reveal>

          <Reveal i={2}>
            <p className="lede mx-auto mt-14 mb-10 text-center">{p.diag.choiceLede}</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {p.diag.methods.map((d, i) => (
              <Reveal key={d.t} i={i}>
                <div className="frost frost-hover flex h-full flex-col p-8">
                  <span className="text-4xl">{d.icon}</span>
                  <h3 className="grad-text mt-5 text-xl font-semibold">{d.t}</h3>
                  <span className="eyebrow mt-2">{d.meta}</span>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                    {d.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ЕТАП 2 · НАВЧАННЯ ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal>
            <div className="text-center">
              <StageTag n="02">Навчання</StageTag>
            </div>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl text-center">
              {p.learn.title}
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mx-auto mt-6 mb-16 text-center">{p.learn.lede}</p>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {p.learn.tools.map((t, i) => (
              <Reveal key={t.n} i={i % 2}>
                <div className="frost frost-hover flex h-full flex-col p-8">
                  <div className="flex items-center gap-4">
                    <span className="num-badge leading-none">{t.n}</span>
                    <h3 className="text-xl font-semibold text-white">{t.t}</h3>
                  </div>
                  <div className="hairline my-5" />
                  <ul className="flex flex-col gap-3">
                    {t.pts.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--c432-ink)]"
                      >
                        <Dot />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Запуск практики — тиждень щоденних ранків разом */}
          <Reveal i={1}>
            <div className="frost mt-5 p-8 md:p-12">
              <div className="flex items-center gap-4">
                <span className="num-badge leading-none">{p.launch.n}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {p.launch.title}
                  </h3>
                  <span className="eyebrow mt-1">{p.launch.eyebrow}</span>
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[var(--c432-ink)]">
                {p.launch.text}
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {p.launch.steps.map((s, i) => (
                  <div key={s.t} className="glass rounded-2xl p-6">
                    <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#FDD16F]/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className="grad-text mt-2 text-lg font-semibold">{s.t}</h4>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--c432-ink)]">
                      {s.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Затвор — фінальна ініціація (виділений блок) */}
          <Reveal i={1}>
            <div className="frost mt-5 p-8 md:p-12" style={{ boxShadow: GOLD_RING }}>
              <div className="flex items-center gap-4">
                <span className="num-badge leading-none">{p.retreat.n}</span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {p.retreat.title}
                  </h3>
                  <span className="eyebrow mt-1">{p.retreat.eyebrow}</span>
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[var(--c432-ink)]">
                {p.retreat.text}
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3 md:grid-cols-5">
                {p.retreat.levels.map((r) => (
                  <div key={r.t} className="rounded-2xl bg-white/[0.04] p-5 text-center ring-1 ring-white/10">
                    <h4 className="grad-text text-base font-semibold">{r.t}</h4>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[var(--c432-ink)]">
                      {r.d}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-10 mb-6 text-center text-[13px] uppercase tracking-[0.2em] text-white/40">
                {p.retreat.scienceTitle}
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {p.retreat.science.map((s) => (
                  <div key={s.t} className="glass rounded-2xl p-6">
                    <h4 className="text-base font-semibold text-white">{s.t}</h4>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--c432-ink)]">
                      {s.d}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ ЕТАП 3 · ТОЧКА В ══ */}
        <section className="sect mx-auto max-w-5xl px-5">
          <Reveal>
            <div className="text-center">
              <StageTag n="03">Точка В</StageTag>
            </div>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl text-center">
              {p.exit.title}
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mx-auto mt-6 mb-14 text-center">{p.exit.lede}</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {p.exit.items.map((e, i) => (
              <Reveal key={e.t} i={i}>
                <div className="frost frost-hover flex h-full flex-col p-8">
                  <span className="text-4xl">{e.icon}</span>
                  <h3 className="grad-text mt-5 text-xl font-semibold">{e.t}</h3>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                    {e.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ПАКЕТИ ══ */}
        <section className={`sect mx-auto px-5 ${twoPackages ? "max-w-4xl" : "max-w-6xl"}`}>
          <Reveal>
            <Eyebrow>Формати</Eyebrow>
          </Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto mb-16 max-w-3xl text-center">
              {p.packages.title}
            </h2>
          </Reveal>
          <div className={`grid gap-5 ${twoPackages ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
            {p.packages.items.map((pk, i) => (
              <Reveal key={pk.name} i={i}>
                <div
                  className={`frost frost-hover flex h-full flex-col p-8 ${
                    pk.ring === "gold"
                      ? "ring-1 ring-[#FDD16F]/40"
                      : pk.ring === "violet"
                        ? "ring-1 ring-[#8B7BFF]/40"
                        : ""
                  }`}
                >
                  {pk.badge ? (
                    <span
                      className={`mb-3 text-[11px] font-medium uppercase tracking-[0.24em] ${
                        pk.ring === "violet" ? "text-[#8B7BFF]" : "text-[#FDD16F]"
                      }`}
                    >
                      {pk.badge}
                    </span>
                  ) : (
                    <span className="mb-3 h-[15px]" />
                  )}
                  <h3 className="font-display text-2xl font-semibold text-white">
                    {pk.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="grad-cosmic font-display text-4xl font-semibold">
                      {pk.price}
                    </span>
                  </div>
                  <span className="mt-1 text-[13px] text-white/50">{pk.term}</span>
                  <div className="hairline my-6" />
                  <ul className="flex flex-col gap-3">
                    {pk.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--c432-ink)]"
                      >
                        <Dot />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ ТИХИЙ ФІНАЛ (без кнопки) ══ */}
        <section className="sect mx-auto max-w-2xl px-5 pb-40 text-center">
          <Reveal>
            <h2 className="font-display wordmark text-[clamp(2.4rem,7vw,4.5rem)] font-semibold leading-[1.05]">
              {p.finale.title}
            </h2>
          </Reveal>
          <Reveal i={1}>
            <p className="lede mx-auto mt-8">{p.finale.text}</p>
          </Reveal>
          <Reveal i={2}>
            <div className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-[#FDD16F]/50 to-transparent" />
          </Reveal>
        </section>
      </main>
    </SmoothScroll>
  );
}
