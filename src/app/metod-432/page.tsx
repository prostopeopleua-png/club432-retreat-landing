"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

const ResonanceCanvas = dynamic(
  () => import("@/components/three/ResonanceCanvas"),
  { ssr: false }
);

const SUBSCRIBE_HREF = "https://t.me/prosto_mindful_bot";

/* ─────────────────────────  motion helpers  ───────────────────────── */
const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
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
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow mb-5">{children}</span>;
}

/* ─────────────────────────────  icons  ────────────────────────────── */
const ico = "w-7 h-7 stroke-[1.4]";
const IconInfinity = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={ico}>
    <path d="M6 12c0-2 1.5-3.5 3-3.5S18 15.5 15 15.5 3 8.5 6 8.5 18 16 18 12" strokeLinecap="round" />
  </svg>
);
const IconMind = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={ico}>
    <path d="M12 3a6 6 0 0 0-6 6c0 2 1 3 1 5v3a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-3c0-2 1-3 1-5a6 6 0 0 0-6-6Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0" strokeLinecap="round" />
  </svg>
);
const IconSymbol = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={ico}>
    <path d="M12 2 4 7v10l8 5 8-5V7l-8-5Z" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3.5" />
  </svg>
);
const IconConfluence = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={ico}>
    <circle cx="8.5" cy="10" r="5" /><circle cx="15.5" cy="10" r="5" /><path d="M12 14v6" strokeLinecap="round" />
  </svg>
);

/* ─────────────────────────────  data  ─────────────────────────────── */
const LEVELS = [
  { n: "01", t: "Тіло", s: "Матеріальний рівень", d: "Фізичне, енергія, дія у світі. Основа, яку неможливо ігнорувати.", c: "#EF8018" },
  { n: "02", t: "Психіка", s: "Психічний рівень", d: "Емоції та думки. Те, де народжуються твої гойдалки — і твоя ясність.", c: "#FDD16F" },
  { n: "03", t: "Дух", s: "Духовний рівень", d: "Душа та дух. Джерело сенсу, з якого все починається і куди все веде.", c: "#8B7BFF" },
];

const FOUNDATION = [
  { icon: <IconInfinity />, t: "Позачасова Мудрість", d: "Універсальне вчення в основі всіх традицій: еволюція свідомості, звʼязок Душі та особистості, роль людини у Всесвіті." },
  { icon: <IconMind />, t: "Психологія — наукова та езотерична", d: "Поєднуємо дослідження розуму й поведінки з наукою про Душу: духовні закони та внутрішній екзистенційний досвід." },
  { icon: <IconSymbol />, t: "Філософія та Символізм", d: "Вічні питання буття та мова Всесвіту, де видимий світ — відображення глибинних істин." },
  { icon: <IconConfluence />, t: "Інтеграція джерел", d: "Веди, Бхаґавад-Ґіта, Християнство, Буддизм і Стоїцизм — спільна істина, яка працює в реальному житті." },
];

const ARCHETYPES = [
  { t: "Шукач", d: "Відчуваєш більше потенціалу, ніж проявлено. Хочеш глибше розкрити свою Душу та призначення." },
  { t: "Провідник", d: "Психолог, коуч, наставник. Шукаєш глибину, щоб давати клієнтам більше — і джерело власного відновлення." },
  { t: "Творець", d: "Будуєш бізнес і проєкти зі стану спокою, а не стресу. Потрібна ясність і розуміння причин та наслідків." },
];

/* ═══════════════════════════════  page  ═══════════════════════════════ */
export default function Metod432Page() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  return (
    <SmoothScroll>
      <main className="relative overflow-hidden bg-[var(--c432-bg)] text-white">
        {/* ══ HERO ══ */}
        <section ref={heroRef} className="relative grain flex min-h-[100svh] items-center justify-center">
          <motion.div style={{ scale: canvasScale }} className="absolute inset-0 z-0">
            <ResonanceCanvas />
          </motion.div>
          <div className="vignette pointer-events-none absolute inset-0 z-[1]" />
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: "radial-gradient(46% 44% at 50% 48%, rgba(7,8,27,0.68), transparent 74%)" }}
          />

          <motion.div
            style={{ y: yText, opacity: heroOpacity, textShadow: "0 2px 34px rgba(7,8,27,0.6)" }}
            className="relative z-[2] mx-auto max-w-4xl px-5 text-center"
          >
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Eyebrow>Цілісна система свідомого життя</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display h-mega"
            >
              <span className="block text-white/90">Метод</span>
              <span className="grad-cosmic block">432</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="lede mx-auto mt-7 text-center"
            >
              Налаштуй себе на частоту, де життя звучить чисто. Духовність, психологія
              та реальне життя — в одній системі внутрішньої опори й свідомих змін.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a href={SUBSCRIBE_HREF} target="_blank" rel="noopener noreferrer" className="btn-cta cursor-pointer">
                Стати учасником
              </a>
              <a href="#what" className="cursor-pointer text-sm tracking-wide text-white/60 underline-offset-4 transition-colors hover:text-[var(--c432-amber)]">
                Що таке 432 ↓
              </a>
            </motion.div>
          </motion.div>

          <div className="absolute bottom-8 left-1/2 z-[2] hidden -translate-x-1/2 sm:block">
            <div className="h-10 w-6 rounded-full border border-white/20 p-1.5">
              <span className="mx-auto block h-2 w-1 rounded-full bg-[var(--c432-amber)]" style={{ animation: "scrollCue 1.8s ease-in-out infinite" }} />
            </div>
          </div>
        </section>

        {/* ══ WHAT IS 432 ══ */}
        <section id="what" className="section-pad relative mx-auto max-w-5xl px-5">
          <Reveal><Eyebrow>Частота гармонії</Eyebrow></Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section max-w-4xl">
              432 — це <span className="grad-text">налаштування</span>, а не число
            </h2>
          </Reveal>
          <Reveal i={2}>
            <p className="lede mt-7">
              Розстроєний інструмент звучить фальшиво, навіть якщо ноти правильні. З людиною так само.
              «432» — про стан, у якому тіло, розум і душа звучать в унісон. Метод дає систему,
              яка повертає цей унісон у будь-якій життєвій ситуації — не вірою, а розумінням законів.
            </p>
          </Reveal>

          {/* resonance rings */}
          <div className="pointer-events-none relative mx-auto mt-16 flex h-56 items-center justify-center">
            {[0, 1, 2, 3].map((r) => (
              <motion.span
                key={r}
                className="absolute rounded-full border border-[var(--c432-amber)]/30"
                style={{ width: 90 + r * 90, height: 90 + r * 90 }}
                animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.5, 0.15] }}
                transition={{ duration: 3.2, repeat: Infinity, delay: r * 0.4, ease: "easeInOut" }}
              />
            ))}
            <span className="font-display text-3xl text-[var(--c432-amber)]">432</span>
          </div>
        </section>

        {/* ══ THREE LEVELS ══ */}
        <section id="levels" className="section-pad relative mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>Людина — це єдність трьох рівнів</Eyebrow></Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mb-14 max-w-3xl">
              Щоб вирішити проблему, треба бачити <span className="grad-text">всі три рівні</span>
            </h2>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {LEVELS.map((l, i) => (
              <Reveal key={l.t} i={i}>
                <div className="glass grain group relative h-full overflow-hidden rounded-3xl p-8">
                  <span className="num-badge">{l.n}</span>
                  <div className="mt-6 h-px w-12" style={{ background: l.c }} />
                  <h3 className="mt-5 text-2xl font-semibold" style={{ color: l.c }}>{l.t}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">{l.s}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--c432-ink)]">{l.d}</p>
                  <div
                    className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-25 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: l.c }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FOUNDATION ══ */}
        <section id="foundation" className="section-pad relative">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(109,90,230,0.12),transparent)]" />
          <div className="relative mx-auto max-w-6xl px-5">
            <Reveal><Eyebrow>Фундамент знань</Eyebrow></Reveal>
            <Reveal i={1}>
              <h2 className="font-display h-section mb-4 max-w-3xl">
                Ми не сповідуємо жодну релігію.<br />Ми обʼєднуємо <span className="grad-cosmic">науку й духовну мудрість</span>
              </h2>
            </Reveal>
            <Reveal i={2}>
              <p className="lede mb-14">Чотири опори, на яких стоїть кожна лекція та практика методу.</p>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2">
              {FOUNDATION.map((f, i) => (
                <Reveal key={f.t} i={i}>
                  <div className="glass group flex h-full gap-5 rounded-3xl p-7">
                    <div className="mt-1 shrink-0 text-[var(--c432-amber)] transition-transform duration-300 group-hover:scale-110">{f.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{f.t}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[var(--c432-ink)]">{f.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TRANSFORMATION ══ */}
        <section id="transform" className="section-pad relative mx-auto max-w-5xl px-5 text-center">
          <Reveal><Eyebrow>Навіщо ти тут</Eyebrow></Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mx-auto max-w-3xl">
              Від внутрішнього хаосу — до <span className="grad-text">ясності</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 text-left sm:grid-cols-2">
            {[
              ["Внутрішній хаос", "Цілісна система, що розкладає все по поличках."],
              ["Емоційні гойдалки", "Вищий рівень свідомості замість внутрішньої війни."],
              ["Скляна стеля", "Розчиняєш старі страхи й програми, що блокують ріст."],
              ["Втрата сенсів", "Інструменти, щоб лишатись свідомим у будь-якій ситуації."],
            ].map(([a, b], i) => (
              <Reveal key={a} i={i}>
                <div className="glass flex h-full items-start gap-4 rounded-2xl p-6">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--c432-orange)]" style={{ animation: "dotPulse 2.4s ease-in-out infinite" }} />
                  <p className="text-[15px] leading-relaxed"><span className="font-semibold text-white">{a}.</span> <span className="text-[var(--c432-ink)]">{b}</span></p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ AUTHOR ══ */}
        <section id="author" className="section-pad relative mx-auto max-w-5xl px-5">
          <div className="glass grain grid items-center gap-10 overflow-hidden rounded-[2rem] p-8 md:grid-cols-[1fr_1.3fr] md:p-12">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[var(--c432-bg-lift)]">
                <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_25%,rgba(253,209,111,0.18),transparent)]" />
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  <span className="font-display text-[7rem] leading-none text-white/[0.06]">ВШ</span>
                </div>
              </div>
            </Reveal>
            <Reveal i={1}>
              <div>
                <Eyebrow>Автор і ведучий</Eyebrow>
                <h2 className="font-display text-4xl font-semibold">Вадим Шпильчук</h2>
                <p className="lede mt-5">
                  «Навчаю розуміти себе як духовну істоту, а світ — як єдиний механізм,
                  де все повʼязано між собою».
                </p>
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[["4+", "роки з людьми"], ["1000+", "годин практики"], ["3", "рівні глибини"]].map(([n, l]) => (
                    <div key={l}>
                      <div className="font-display text-3xl text-[var(--c432-amber)]">{n}</div>
                      <div className="mt-1 text-xs leading-tight text-white/45">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ WHO — community proof ══ */}
        <section className="section-pad relative mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>Хто тут знаходить свою силу</Eyebrow></Reveal>
          <Reveal i={1}>
            <h2 className="font-display h-section mb-14 max-w-3xl">Спільнота однодумців, які рухаються в один бік</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {ARCHETYPES.map((a, i) => (
              <Reveal key={a.t} i={i}>
                <div className="glass h-full rounded-3xl p-8">
                  <h3 className="grad-text text-2xl font-semibold uppercase tracking-wide">{a.t}</h3>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{a.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ JOIN CTA ══ */}
        <section id="join" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_50%,rgba(239,128,24,0.16),transparent_70%)]" />
          <div className="relative mx-auto max-w-4xl px-5 py-28 text-center md:py-40">
            <Reveal>
              <h2 className="font-display h-section mx-auto max-w-3xl">
                Готовий звучати <span className="grad-cosmic">в унісон</span> із собою?
              </h2>
            </Reveal>
            <Reveal i={1}>
              <p className="lede mx-auto mt-6 text-center">
                Приєднуйся до Клубу 432 — щомісячні глибинні лекції, живі розбори з Вадимом,
                бібліотека знань за 4 роки та щоденні практики у спільноті.
              </p>
            </Reveal>
            <Reveal i={2}>
              <div className="mt-10 flex flex-col items-center gap-4">
                <a href={SUBSCRIBE_HREF} target="_blank" rel="noopener noreferrer" className="btn-cta cursor-pointer">Стати учасником Клубу 432</a>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Вівторок і четвер · 19:00 · записи назавжди</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </SmoothScroll>
  );
}
