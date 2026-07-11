"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CosmicBackground from "@/components/CosmicBackground";
import RoamingFigure from "@/components/RoamingFigure";

const BOT = "https://t.me/prosto_mindful_bot";

/* ───────────────────────── motion ───────────────────────── */
const rise: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
};
function Reveal({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  return (
    <motion.div className={className} variants={rise} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-70px" }}>
      {children}
    </motion.div>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow-line mb-6">{children}</div>;
}

/* ───────────────────────── icons (line-art, mono) ───────────────────────── */
const IC = "h-6 w-6 stroke-[1.5]";
const Icons = {
  lecture: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><path d="M4 5h16v11H4z" strokeLinejoin="round"/><path d="M8 20h8M12 16v4" strokeLinecap="round"/><path d="M8 9h8M8 12h5" strokeLinecap="round"/></svg>),
  live: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><circle cx="12" cy="12" r="3"/><path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11M4 4a12 12 0 0 0 0 16M20 4a12 12 0 0 1 0 16" strokeLinecap="round"/></svg>),
  library: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><path d="M5 4h5v16H5zM10 4h5l3 15-5 1z" strokeLinejoin="round"/></svg>),
  practice: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round"/><circle cx="12" cy="12" r="4"/></svg>),
  community: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 19a5 5 0 0 1 10 0M13 19a5 5 0 0 1 8-3.5" strokeLinecap="round"/></svg>),
  calendar: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M9 3v4M15 3v4" strokeLinecap="round"/></svg>),
  clock: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2" strokeLinecap="round"/></svg>),
  infinity: () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><path d="M6 12c0-2 1.5-3.5 3-3.5S18 15.5 15 15.5 3 8.5 6 8.5 18 16 18 12" strokeLinecap="round"/></svg>),
};

/* ───────────────────────── data ───────────────────────── */
const FEATURES = [
  { icon: Icons.lecture, t: "Глибинні лекції", d: "Щомісяця — нова фундаментальна тема з точки зору психології та духовних законів, плюс потокові лекції з розбором питань учасників." },
  { icon: Icons.live, t: "Живі розбори", d: "Прямий контакт із Вадимом. Розбираєш наживо свій запит чи ситуацію та бачиш вектор руху." },
  { icon: Icons.library, t: "Бібліотека мудрості", d: "Доступ до бази знань за 4 роки. Сотні годин контенту — твоя психологічна аптечка, завжди під рукою." },
  { icon: Icons.practice, t: "Щоденні налаштування", d: "Практики, медитації та фокус уваги в чаті, щоб не випадати з усвідомленого стану в рутину." },
  { icon: Icons.community, t: "Спільнота однодумців", d: "Безпечне оточення, де можна бути собою, ділитися інсайтами й отримувати підтримку тих, хто рухається поруч." },
];

const FORMAT = [
  { icon: Icons.calendar, t: "Регулярність", d: "Вівторок і четвер о 19:00. 8 онлайн-зустрічей із Вадимом на місяць — стабільність, що формує звичку." },
  { icon: Icons.clock, t: "Тривалість", d: "До 1,5 години концентрованої глибини: 60–70 хв лекція та відповіді, 10–15 хв медитація або практика." },
  { icon: Icons.infinity, t: "Записи назавжди", d: "Не встиг на ефір? Запис зʼявляється в додатку вже за годину. Дивись, коли зручно, зі смартфона." },
];

const WHO = [
  { t: "Шукач", d: "Відчуваєш більше потенціалу, ніж проявлено. Хочеш глибше розкрити свою Душу та призначення." },
  { t: "Провідник", d: "Психолог, коуч, наставник. Шукаєш глибину, щоб давати клієнтам більше — і джерело власного відновлення." },
  { t: "Творець", d: "Будуєш бізнес і проєкти зі стану спокою, а не стресу. Потрібна ясність і розуміння причин та наслідків." },
];

const FAQ: [string, string][] = [
  ["Це якась релігія?", "Ні. Ми не сповідуємо жодну релігію, а обʼєднуємо науку та духовну мудрість для цілісного розуміння людини."],
  ["Скільки часу це займає?", "Дві живі зустрічі на тиждень (Вт і Чт о 19:00) до 1,5 год. Усе в записах — можна дивитися у власному ритмі."],
  ["Мені потрібна підготовка?", "Ні. Ми йдемо від простого до глибокого. Достатньо щирого інтересу пізнати себе."],
  ["Як відбуваються зустрічі?", "Ефіри через Zoom, спілкування — у закритій Telegram-групі, а лекції та записи — у зручному додатку."],
];

/* ═══════════════════════════ page ═══════════════════════════ */
export default function Home() {
  return (
    <SmoothScroll>
      <CosmicBackground />
      <RoamingFigure />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav className="frost flex w-full max-w-5xl items-center justify-between rounded-full py-2.5 pl-3 pr-3 sm:pl-5">
          <a href="#top" className="flex items-center gap-2.5">
            <Image src="/logo-mandala-white.svg" alt="Клуб 432" width={32} height={32} className="drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
            <span className="font-display text-lg font-semibold tracking-wide">Клуб 432</span>
          </a>
          <a href={BOT} target="_blank" rel="noopener noreferrer" className="btn-cta cursor-pointer !px-6 !py-3 !text-[13px]">
            Стати учасником
          </a>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        {/* ══ HERO ══ */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[min(78vw,620px)] w-[min(78vw,620px)] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full opacity-70 blur-[70px]" style={{ background: "radial-gradient(circle, rgba(253,209,111,0.22), transparent 60%)" }} />
            <Image src="/logo-mandala.svg" alt="" width={620} height={620} priority className="h-full w-full opacity-[0.55]" style={{ animation: "spinSlow 90s linear infinite" }} />
          </div>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Eyebrow>Спільнота свідомого життя</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display wordmark text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[1.06] tracking-tight pb-[0.14em]"
          >
            Клуб 432
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.32 }}
            className="mx-auto mt-7 max-w-2xl text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-[var(--c432-ink)]"
          >
            Духовність. Психологія. Реальне життя. Цілісна система знань і практик для
            внутрішньої опори й свідомих змін — і жива спільнота поруч.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a href={BOT} target="_blank" rel="noopener noreferrer" className="btn-cta cursor-pointer">Стати учасником</a>
            <a href="#what" className="btn-ghost">Що всередині</a>
          </motion.div>
        </section>

        {/* ══ WHO ══ */}
        <section id="what" className="sect mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>Хто тут знаходить силу</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">Клуб для тих, хто відчуває, що всередині більше</h2></Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {WHO.map((w, i) => (
              <Reveal key={w.t} i={i}>
                <div className="frost frost-hover h-full p-8">
                  <h3 className="grad-text text-2xl font-semibold uppercase tracking-wide">{w.t}</h3>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{w.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>Система, яка працює</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-4 max-w-3xl text-center">Середовище, де поєднані знання, практика та живе спілкування</h2></Reveal>
          <Reveal i={2}><p className="mx-auto mb-14 max-w-xl text-center text-[var(--c432-ink)]">Усе, що потрібно, щоб залишатись свідомим у будь-якій життєвій ситуації.</p></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.t} i={i}>
                <div className="frost frost-hover group flex h-full flex-col p-7">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full text-[var(--c432-amber)]" style={{ background: "rgba(253,209,111,0.08)", boxShadow: "inset 0 0 0 1px rgba(253,209,111,0.18)" }}>
                    <f.icon />
                  </div>
                  <h3 className="text-xl font-semibold">{f.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--c432-ink)]">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FORMAT ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>Формат клубу</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">Комфортний ритм розвитку — без стресу та дедлайнів</h2></Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {FORMAT.map((f, i) => (
              <Reveal key={f.t} i={i}>
                <div className="frost h-full p-8">
                  <div className="mb-5 text-[var(--c432-amber)]"><f.icon /></div>
                  <h3 className="text-xl font-semibold">{f.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--c432-ink)]">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ AUTHOR ══ */}
        <section className="sect mx-auto max-w-5xl px-5">
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="absolute inset-0 -z-[1] rounded-full opacity-60 blur-3xl" style={{ background: "radial-gradient(circle at 50% 35%, rgba(253,209,111,0.25), transparent 65%)" }} />
                {/* mask dissolves the cropped bottom into transparency — the starfield cosmos shows through like fog */}
                <Image
                  src="/photos/vadym.png"
                  alt="Вадим Шпильчук — засновник Клубу 432"
                  width={894}
                  height={1454}
                  className="h-auto w-full"
                  style={{
                    WebkitMaskImage: "linear-gradient(to bottom, #000 52%, rgba(0,0,0,0.55) 78%, transparent 96%)",
                    maskImage: "linear-gradient(to bottom, #000 52%, rgba(0,0,0,0.55) 78%, transparent 96%)",
                  }}
                />
              </div>
            </Reveal>
            <Reveal i={1}>
              <div>
                <Eyebrow>Автор і ведучий</Eyebrow>
                <h2 className="font-display text-4xl font-semibold md:text-5xl">Вадим Шпильчук</h2>
                <p className="mt-5 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-[var(--c432-ink)]">
                  «Навчаю розуміти себе як духовну істоту, а світ — як єдиний механізм,
                  де все повʼязано між собою».
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/55">
                  Педагог, духовний учитель і наставник. Підприємець, практик, сімʼянин,
                  дослідник свідомості. Поєднує глибинну психологію та духовні закони з
                  інтеграцією в сучасне життя.
                </p>
                <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                  {[["4+", "роки з людьми"], ["1000+", "годин практики"], ["∞", "доступ до записів"]].map(([n, l]) => (
                    <div key={l} className="frost p-4 text-center">
                      <div className="font-display text-3xl text-[var(--c432-amber)]">{n}</div>
                      <div className="mt-1 text-[11px] leading-tight text-white/45">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ JOIN ══ */}
        <section id="join" className="sect mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="frost relative overflow-hidden p-8 text-center sm:p-14">
              <div className="pointer-events-none absolute inset-0 opacity-80" style={{ background: "radial-gradient(70% 90% at 50% 0%, rgba(239,128,24,0.14), transparent 70%)" }} />
              <div className="relative">
                <Eyebrow>Приєднатися</Eyebrow>
                <h2 className="font-display h-section mx-auto max-w-2xl">Стань частиною Клубу 432</h2>
                <p className="mx-auto mt-6 max-w-xl text-[var(--c432-ink)]">
                  Щомісячні глибинні лекції, живі розбори з Вадимом, бібліотека знань за 4 роки
                  та щоденні практики у спільноті однодумців.
                </p>
                <div className="mt-9 flex flex-col items-center gap-4">
                  <a href={BOT} target="_blank" rel="noopener noreferrer" className="btn-cta cursor-pointer">Стати учасником</a>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">Вівторок і четвер · 19:00 · записи назавжди</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ FAQ ══ */}
        <section className="sect mx-auto max-w-3xl px-5">
          <Reveal><Eyebrow>Часті питання</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mb-12 text-center">Коротко про головне</h2></Reveal>
          <div className="space-y-4">
            {FAQ.map(([q, a], i) => (
              <Reveal key={q} i={i}>
                <details className="frost group p-6 [&_summary]:cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 text-lg font-semibold marker:content-['']">
                    {q}
                    <span className="text-2xl text-[var(--c432-amber)] transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--c432-ink)]">{a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="sect mx-auto max-w-6xl px-5 pb-16">
          <div className="hairline mb-12" />
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3">
              <Image src="/logo-mandala-white.svg" alt="Клуб 432" width={42} height={42} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
              <div>
                <div className="font-display text-lg font-semibold">Клуб 432</div>
                <div className="text-xs text-white/40">Спільнота свідомого життя</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/55">
              <a href={BOT} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--c432-amber)]">Telegram-бот</a>
              <a href="/oferta" className="transition-colors hover:text-[var(--c432-amber)]">Оферта</a>
              <a href="/privacy-policy" className="transition-colors hover:text-[var(--c432-amber)]">Політика конфіденційності</a>
            </div>
          </div>
          <p className="mt-10 text-center text-xs text-white/30">© {new Date().getFullYear()} Клуб 432 · ФОП Шпильчук Вадим Дмитрович</p>
        </footer>
      </main>
    </SmoothScroll>
  );
}
