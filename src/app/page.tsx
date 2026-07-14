"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CosmicBackground from "@/components/CosmicBackground";
import RoamingMandala from "@/components/RoamingMandala";

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
  { icon: Icons.lecture, t: "Розкладаю по поличках", d: "Щомісяця беремо одну фундаментальну тему й розбираємо її до дна — з боку психології та духовних законів. Замість хаосу інформації — цілісна картина, яка нарешті складається." },
  { icon: Icons.live, t: "Твій запит — наживо", d: "Приносиш свою ситуацію — і ми розбираємо її разом зі мною в прямому ефірі. Ти йдеш не з відповіддю «взагалі», а з вектором саме для себе." },
  { icon: Icons.library, t: "Відповідь завжди під рукою", d: "Сотні годин лекцій за 4 роки — твоя психологічна аптечка. У складний момент відкриваєш і знаходиш опору, а не гортаєш чужі поради." },
  { icon: Icons.practice, t: "Щоб не випадати в рутину", d: "Короткі щоденні практики й фокус уваги в чаті тримають тебе у свідомому стані щодня, а не лише під час ефіру." },
  { icon: Icons.community, t: "Ти більше не сам", d: "Оточення, де можна бути справжнім: поділитися інсайтом, отримати підтримку й рухатись поруч із тими, хто теж обрав глибину." },
];

const FORMAT = [
  { icon: Icons.calendar, t: "Регулярність", d: "Вівторок і четвер о 19:00. 8 онлайн-зустрічей із Вадимом на місяць — стабільність, що формує звичку." },
  { icon: Icons.clock, t: "Тривалість", d: "До 1,5 години концентрованої глибини: 60–70 хв лекція та відповіді, 10–15 хв медитація або практика." },
  { icon: Icons.infinity, t: "Записи назавжди", d: "Не встиг на ефір? Запис зʼявляється в додатку вже за годину. Дивись, коли зручно, зі смартфона." },
];

const WHO = [
  { t: "Шукач", d: "Ти чуєш поклик до глибини. Втомився від поверхневих порад і шукаєш цілісну картину — хто ти, навіщо ти, і як жити з цього знання." },
  { t: "Провідник", d: "Ти вже ведеш інших — психолог, коуч, наставник. Але щоб давати більше, спершу треба наповнюватись самому. Тут — твоє джерело сили." },
  { t: "Творець", d: "Ти будуєш справу й хочеш робити це зі стану ясності, а не вигорання. Щоб рішення йшли зсередини, а не зі страху." },
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
      <RoamingMandala />

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
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Eyebrow>Спільнота свідомого життя</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display wordmark relative text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[1.06] tracking-tight pb-[0.14em] [filter:drop-shadow(0_2px_10px_rgba(7,8,27,0.9))_drop-shadow(0_0_28px_rgba(7,8,27,0.7))]"
          >
            Клуб 432
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.32 }}
            className="mx-auto mt-7 max-w-2xl text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-white/85 [text-shadow:0_1px_16px_rgba(7,8,27,0.95)]"
          >
            Ти відчуваєш, що всередині значно більше, ніж проявлено. Клуб 432 дає систему,
            щоб це розкрити: глибинна психологія та духовні закони, живі зустрічі з Вадимом
            і спільнота, у якій ти нарешті не сам.
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
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">Впізнаєш себе бодай в одному?</h2></Reveal>
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
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-4 max-w-3xl text-center">Один клуб замість десятків розрізнених курсів</h2></Reveal>
          <Reveal i={2}><p className="mx-auto mb-14 max-w-xl text-center text-[var(--c432-ink)]">Знання, практика й жива підтримка в одному місці — усе, щоб залишатись свідомим навіть тоді, коли життя хитає.</p></Reveal>
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
              {/* photo framed in a frosted-glass card, like the other cards */}
              <div className="frost frost-hover mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] p-3">
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem]"
                  style={{ background: "radial-gradient(circle at 50% 26%, rgba(253,209,111,0.18), rgba(20,22,52,0.55) 64%)" }}
                >
                  <Image
                    src="/photos/vadym.png"
                    alt="Вадим Шпильчук — засновник Клубу 432"
                    fill
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="object-cover object-top"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4" style={{ background: "linear-gradient(to top, rgba(13,14,45,0.85), transparent)" }} />
                </div>
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

        {/* ══ JOIN / PRICING ══ */}
        <section id="join" className="sect mx-auto max-w-2xl px-5">
          <Reveal><Eyebrow>Приєднатися</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section text-center">Стати учасником Клубу 432</h2></Reveal>
          <Reveal i={2}><p className="mx-auto mb-12 mt-4 max-w-xl text-center text-[var(--c432-ink)]">Набір відкрито! Твій місяць участі починається з моменту оплати.</p></Reveal>

          <Reveal i={3}>
            <div className="frost relative mx-auto max-w-md overflow-hidden rounded-[2rem] p-8 text-center sm:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "radial-gradient(75% 60% at 50% 0%, rgba(239,128,24,0.16), transparent 68%)" }} />
              <div className="relative">
                <h3 className="grad-text text-2xl font-semibold">Учасник клубу</h3>
                <p className="mt-4 text-white/45">Цінність: <span className="line-through">5 000 грн</span></p>
                <div className="mt-2 font-display text-5xl font-semibold text-[var(--c432-amber)]">
                  25&nbsp;€ <span className="text-2xl font-normal text-white/55">/ міс</span>
                </div>
                <p className="mt-1 text-sm text-white/45">(≈ 1&nbsp;200 грн)</p>

                <div className="hairline my-7" />

                <ul className="space-y-4 text-left">
                  {[
                    <>Доступ до всіх живих ефірів (8/міс)</>,
                    <>Участь у розборах з Вадимом</>,
                    <><span className="font-semibold text-white">Бонус:</span> доступ до Бази Знань за 4 роки</>,
                    <>Закритий чат та оточення</>,
                    <>Щоденні практики та налаштування</>,
                    <>Автоматична щомісячна підписка для зручності</>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--c432-amber)]">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#0D0E2D" strokeWidth="3.2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{item}</span>
                    </li>
                  ))}
                </ul>

                <a href={BOT} target="_blank" rel="noopener noreferrer" className="btn-cta mt-9 w-full cursor-pointer">Стати учасником</a>
                <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--c432-amber)]/70">✳ Можна скасувати будь-якої миті</p>
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
