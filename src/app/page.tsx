"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CosmicBackground from "@/components/CosmicBackground";
import RoamingMandala from "@/components/RoamingMandala";
import CtaLink from "@/components/CtaLink";
import AboutBlock from "@/components/AboutBlock";
import IntroVideo from "@/components/IntroVideo";
import PricingViewTracker from "@/components/PricingViewTracker";
import SiteHeader from "@/components/SiteHeader";
import HeroVoices from "@/components/HeroVoices";
import { content as C } from "@/content";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { trackBotLinkClick } from "@/lib/analytics";

const BOT = C.botUrl;

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
/* ───────────────── icons (line-art) — text lives in src/content.ts ───────────────── */
const IC = "h-6 w-6 stroke-[1.5]";
const Icons = [
  () => (<svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={IC}><path d="M4 5h16v11H4z" strokeLinejoin="round"/><path d="M8 20h8M12 16v4" strokeLinecap="round"/><path d="M8 9h8M8 12h5" strokeLinecap="round"/></svg>),
  () => (<svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={IC}><circle cx="12" cy="12" r="3"/><path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11M4 4a12 12 0 0 0 0 16M20 4a12 12 0 0 1 0 16" strokeLinecap="round"/></svg>),
  () => (<svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={IC}><path d="M5 4h5v16H5zM10 4h5l3 15-5 1z" strokeLinejoin="round"/></svg>),
  () => (<svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={IC}><path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round"/><circle cx="12" cy="12" r="4"/></svg>),
  () => (<svg viewBox="0 0 24 24" aria-hidden fill="none" stroke="currentColor" className={IC}><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 19a5 5 0 0 1 10 0M13 19a5 5 0 0 1 8-3.5" strokeLinecap="round"/></svg>),
];


/* ───────── structured data (FAQ + підписка) для Google ───────── */
const pageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: C.faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "Product",
      "@id": `${SITE_URL}#membership`,
      name: `${SITE_NAME} — ${C.pricing.planName}`,
      description: C.features.subtitle,
      brand: { "@type": "Brand", name: SITE_NAME },
      url: `${SITE_URL}#join`,
      offers: {
        "@type": "Offer",
        price: "25",
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: C.botUrl,
        category: "Subscription",
      },
    },
  ],
};


/* ───────── відгук як повідомлення в чаті ───────── */
// Колір імені береться з індексу, а не випадково: інакше сервер і браузер
// намалювали б різні кольори й React лаявся б на розбіжність розмітки.
const NAME_TONE = ["text-[var(--c432-amber)]", "text-[var(--c432-violet-2)]", "text-[#8FD2C4]"];
const MONO_TONE = ["bg-[var(--c432-amber)]/18", "bg-[var(--c432-violet-2)]/20", "bg-[#8FD2C4]/18"];

type Voice = { quote: string; name: string; accent?: string; context: string };

function Message({ v, i }: { v: Voice; i: number }) {
  const tone = i % NAME_TONE.length;
  // Ключовий результат виділяємо: людина сканує відгуки, а не читає.
  const at = v.accent ? v.quote.indexOf(v.accent) : -1;
  return (
    <figure className="grid grid-cols-[auto_1fr] items-start gap-x-3">
      <span aria-hidden className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] font-semibold ${MONO_TONE[tone]} ${NAME_TONE[tone]}`}>
        {v.name.slice(0, 1)}
      </span>
      <div className="min-w-0 flex-1">
        <div className="bubble">
          <div className={`text-[14px] font-semibold ${NAME_TONE[tone]}`}>{v.name}</div>
          <blockquote className="mt-1.5 text-[15px] leading-relaxed text-[var(--c432-ink)]">
            {at < 0 ? v.quote : (
              <>
                {v.quote.slice(0, at)}
                <strong className="font-semibold text-white">{v.accent}</strong>
                {v.quote.slice(at + (v.accent as string).length)}
              </>
            )}
          </blockquote>
        </div>
      </div>
      <figcaption className="col-start-2 mt-2 pl-1 text-[13px] text-white/45">{v.context}</figcaption>
    </figure>
  );
}

function QLine({ q }: { q: string }) {
  return (
    <li className="border-b border-white/10 py-5 text-[15px] leading-relaxed text-[var(--c432-ink)]">
      {q}
    </li>
  );
}

/* ═══════════════════════════ page ═══════════════════════════ */
export default function Home() {
  // Голоси: три на видноті, решта під розкриттям. Текст лишається в розмітці,
  // тож пошук і AI-відповіді його бачать, а телефон не гортає зайві екрани.
  const voicesLead = C.voices.items.slice(0, 3);
  const voicesRest = C.voices.items.slice(3);
  const qLead = C.questions.items.slice(0, 10);
  const qRest = C.questions.items.slice(10);

  return (
    <SmoothScroll>
      <MotionConfig reducedMotion="user">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <CosmicBackground />
      <RoamingMandala />

      {/* NAV: прихована на першому екрані, з'являється, коли герой пішов з в'юпорту */}
      <SiteHeader heroId="hero" botUrl={BOT} />

      <main id="top" className="relative z-10">
        {/* Ловить прокрутку до блоку з ціною → ViewContent у Meta. Нічого не малює. */}
        <PricingViewTracker targetId="join" />

        {/* ══ HERO ══
            Поява першого екрана на чистому CSS, БЕЗ framer-motion: інакше на
            повільному телефоні людина кілька секунд дивиться в порожній екран.
            Від 1024px дві колонки: зліва текст і кнопки, справа голоси учасників.
            На телефоні голоси стоять горизонтальною стрічкою під кнопками. */}
        <section id="hero" className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-x-12 px-5 pb-14 pt-10 sm:pt-16 lg:min-h-[100svh] lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:px-10 lg:py-16">
          <div className="min-w-0">
            <p className="rise-in inline-block rounded-full border border-white/20 bg-[rgba(7,8,27,0.55)] px-4 py-1.5 text-[13px] leading-snug text-white/80 sm:text-[14px]">
              {C.hero.pill}
            </p>
            <h1 className="rise-in rise-d1 font-display mt-6 text-[clamp(2.6rem,4.9vw,5.4rem)] font-semibold leading-[1.02] tracking-tight text-white [text-shadow:0_2px_24px_rgba(7,8,27,0.9)] sm:mt-7">
              {C.hero.titleMain}{" "}
              <em className="font-normal italic text-[var(--c432-amber)]">{C.hero.titleAccent}</em>
            </h1>
            <p className="rise-in rise-d2 mt-5 max-w-xl text-[17px] leading-relaxed text-white/75 [text-shadow:0_1px_16px_rgba(7,8,27,0.95)] sm:mt-7 sm:text-[20px]">
              {C.hero.subtitle}
            </p>
            <div className="rise-in rise-d3 mt-7 flex flex-col items-stretch gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
              <CtaLink href={BOT} location="hero" className="btn-cta cursor-pointer">{C.hero.ctaPrimary}</CtaLink>
              <a href="/tsinnosti" className="btn-ghost">{C.hero.ctaSecondary}</a>
            </div>
            {/* Власна підкладка: рядок лежить на світлих пелюстках мандали,
                і без неї контраст падає нижче норми. */}
            <p className="rise-in rise-d3 mt-5 inline-block rounded-full bg-[rgba(7,8,27,0.72)] px-5 py-2 text-[13px] text-white/80">
              {C.hero.priceLine}
            </p>
          </div>
          <div className="rise-in rise-d3 mt-10 min-w-0 lg:mt-0">
            <HeroVoices />
          </div>
        </section>

        {/* ══ VIDEO + ЩО МИ РОБИМО ══
            Десктоп: відео зліва (~55%), текст справа, по верху відео.
            Телефон: заголовок, відео на всю ширину, потім текст. */}
        <section id="video" className="sect mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-x-14 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)]">
            <Reveal className="lg:hidden">
              <h2 className="font-display mb-7 text-[clamp(2.2rem,8vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
                {C.video.title}<br /><em className="font-normal italic text-[var(--c432-amber)]">{C.video.titleAccent}</em>
              </h2>
            </Reveal>
            <Reveal i={1} className="lg:sticky lg:top-28">
              <div className="video-glow">
                <IntroVideo />
              </div>
            </Reveal>
            <div className="mt-10 lg:mt-0">
              <Reveal>
                <h2 className="font-display hidden text-[clamp(2.5rem,3.6vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-white lg:block">
                  {C.video.title}<br /><em className="font-normal italic text-[var(--c432-amber)]">{C.video.titleAccent}</em>
                </h2>
              </Reveal>
              <Reveal i={1}>
                <p className="font-display text-[clamp(1.5rem,2.2vw,1.85rem)] leading-[1.25] text-white/95 lg:mt-7">{C.video.lead}</p>
              </Reveal>
              <Reveal i={2}>
                <p className="mt-5 text-[17px] leading-relaxed text-[var(--c432-ink)] lg:text-[18px]">{C.video.intro}</p>
              </Reveal>
              <Reveal i={3}>
                <p className="mt-8 text-[15px] font-semibold text-[var(--c432-amber)]/90">{C.video.listIntro}</p>
                <ul className="mt-3">
                  {C.video.list.map((li) => (
                    <li key={li} className="flex gap-3 border-t border-[rgba(253,209,111,0.15)] py-3.5 text-[17px] leading-snug text-white/85">
                      <span aria-hidden className="mt-[0.15em] text-[13px] text-[var(--c432-amber)]">✦</span>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal i={4}>
                <p className="font-display mt-8 border-t border-[rgba(253,209,111,0.15)] pt-7 text-[clamp(1.6rem,2.3vw,2.1rem)] leading-[1.2] text-white">
                  {C.video.finale} <em className="italic text-[var(--c432-amber)]">{C.video.finaleAccent}</em>
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ PAIN + ДЛЯ КОГО ══
            Архетипи були окремою секцією з трьох карток на 1150px. Вони
            відповідають на те саме питання, що й біль («це про мене?»), тож
            стоять тут трьома рядками одразу після нього. */}
        <section id="what" className="sect mx-auto max-w-4xl px-5">
          <Reveal><h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">{C.pain.heading}</h2></Reveal>
          <ol className="relative space-y-7 border-l border-white/10 pl-7 sm:pl-9">
            {C.pain.steps.map((st, i) => (
              <Reveal key={st.when} i={i}>
                <li className="relative">
                  <span aria-hidden className="absolute -left-[35px] top-2 h-2 w-2 rounded-full bg-[var(--c432-amber)]/70 sm:-left-[43px]" />
                  <div className="text-[14px] font-semibold text-[var(--c432-amber)]/90">{st.when}</div>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--c432-ink)]">{st.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal i={5}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-[clamp(1.02rem,1.5vw,1.2rem)] leading-relaxed text-white/85">
              {C.pain.outro}
            </p>
          </Reveal>

          <Reveal i={6}>
            <h3 className="font-display mt-20 mb-8 text-center text-[clamp(1.4rem,2.6vw,2rem)] font-semibold">{C.who.heading}</h3>
            <ul className="mx-auto max-w-2xl divide-y divide-white/10 rounded-3xl bg-[rgba(9,10,30,0.62)] px-6 sm:px-8">
              {C.who.items.map((w) => (
                <li key={w.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-6">
                  <span className="shrink-0 font-semibold text-[var(--c432-amber)] sm:w-32">{w.title}</span>
                  <span className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{w.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Тонка смуга до безкоштовного тесту — саме тут, де людина впізнала
              себе, але ще не готова платити. */}
          <Reveal i={7}>
            <div className="frost mt-14 flex flex-col items-center gap-5 p-7 text-center sm:flex-row sm:justify-between sm:p-8 sm:text-left">
              <div>
                <div className="font-display text-xl font-semibold">{C.testTeaser.heading}</div>
                <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[var(--c432-ink)]">{C.testTeaser.text}</p>
              </div>
              <a href="/tsinnosti" className="btn-ghost shrink-0">{C.testTeaser.cta}</a>
            </div>
          </Reveal>
        </section>

        {/* ══ AUTHOR ══
            На весь екран, без полів і рамок. Сторінка навколо гасне (завіса
            всередині AboutBlock). z-60 — вище за фіксовану шапку (z-50), щоб
            завіса гасила і її теж: інакше над чорнотою висіла б яскрава
            кнопка й ефект порожнечі розсипався. */}
        <section className="relative z-[60] min-h-[100svh] w-full">
          <AboutBlock />
        </section>

        {/* ══ ЩО ВСЕРЕДИНІ ══
            Тут раніше було три окремі секції (можливості, формат, перший
            місяць) на 5200px. Усі три відповідають на одне питання, тож
            зібрані в одну: користь, ритм, перший місяць. */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal><h2 className="font-display h-section mx-auto mb-4 max-w-3xl text-center text-balance">{C.features.heading}</h2></Reveal>
          <Reveal i={1}><p className="mx-auto mb-14 max-w-xl text-center text-[var(--c432-ink)]">{C.features.subtitle}</p></Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {C.features.items.map((f, i) => {
              const Icon = Icons[i] ?? Icons[0];
              return (
                <Reveal key={f.title} i={Math.min(i, 3)}>
                  <div className="frost frost-hover flex h-full flex-col p-7">
                    {/* Іконка в рядок із заголовком, а не над ним: та сама
                        інформація на 60px менше висоти в кожній картці. */}
                    <div className="flex items-center gap-3">
                      <span className="text-[var(--c432-amber)]"><Icon /></span>
                      <h3 className="text-lg font-semibold">{f.title}</h3>
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--c432-ink)]">{f.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Формат — рядком, без карток: це три факти, а не три ідеї. */}
          <Reveal i={4}>
            <dl className="mt-10 grid gap-x-8 gap-y-6 rounded-3xl bg-[rgba(9,10,30,0.62)] px-6 py-8 sm:grid-cols-3 sm:px-8">
              {C.format.items.map((f) => (
                <div key={f.title}>
                  <dt className="font-semibold text-[var(--c432-amber)]">{f.title}</dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-[var(--c432-ink)]">{f.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Перший місяць — компактною смугою 01–04. */}
          <Reveal i={5}>
            <h3 className="font-display mt-16 text-center text-[clamp(1.4rem,2.6vw,2rem)] font-semibold">{C.month.heading}</h3>
            <p className="mx-auto mt-3 mb-10 max-w-xl text-center text-[15px] text-[var(--c432-ink)]">{C.month.subtitle}</p>
            <ol className="grid gap-x-8 gap-y-7 rounded-3xl bg-[rgba(9,10,30,0.62)] p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
              {C.month.items.map((m) => (
                <li key={m.week} className="border-t border-[var(--c432-amber)]/25 pt-4">
                  <div className="font-display text-2xl leading-none text-[var(--c432-amber)]/50 tabular-nums">{m.week}</div>
                  <h4 className="mt-2 font-semibold">{m.title}</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--c432-ink)]">{m.text}</p>
                </li>
              ))}
            </ol>
            <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-white/70">{C.month.note}</p>
          </Reveal>

          <Reveal i={6}>
            <div className="mt-12 text-center">
              <a href="/metod-432" className="inline-block text-sm text-[var(--c432-amber)]/85 underline-offset-4 transition-colors hover:text-[var(--c432-amber)] hover:underline">
                {C.features.deeperLink}
              </a>
            </div>
          </Reveal>
        </section>

        {/* ══ JOIN / ЦІНА ══
            Переїхала з 87% глибини сюди. За 25 € не треба вмовляти десять
            екранів; докази й заперечення працюють далі, вже зі знанням ціни.
            Поруч — чесний список «кому тут буде погано»: сказане просто біля
            кнопки оплати воно додає довіри більше, ніж окремою секцією. */}
        <section id="join" className="sect mx-auto max-w-6xl px-5">
          <Reveal><h2 className="font-display h-section text-center text-balance">{C.pricing.heading}</h2></Reveal>
          <Reveal i={1}><p className="mx-auto mb-14 mt-4 max-w-xl text-center text-[var(--c432-ink)]">{C.pricing.subtitle}</p></Reveal>

          <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <Reveal i={2} className="order-1">
              <div className="frost relative mx-auto max-w-md overflow-hidden rounded-[2rem] p-8 text-center sm:p-10">
                <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "radial-gradient(75% 60% at 50% 0%, rgba(239,128,24,0.16), transparent 68%)" }} />
                <div className="relative">
                  <h3 className="grad-text text-2xl font-semibold">{C.pricing.planName}</h3>
                  <p className="mt-4 text-white/45">{C.pricing.valueLabel} <span className="line-through">{C.pricing.valueOld}</span></p>
                  <div className="mt-2 font-display text-5xl font-semibold text-[var(--c432-amber)] tabular-nums">
                    {C.pricing.price} <span className="text-2xl font-normal text-white/55">{C.pricing.priceUnit}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/55">{C.pricing.priceNote}</p>

                  <div className="hairline my-7" />

                  <ul className="space-y-4 text-left">
                    {C.pricing.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--c432-amber)]">
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#0D0E2D" strokeWidth="3.2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <span className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                          {b.startsWith("Бонус:") ? (<><span className="font-semibold text-white">Бонус:</span>{b.slice(6)}</>) : b}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <CtaLink href={BOT} location="pricing" className="btn-cta mt-9 w-full cursor-pointer">{C.pricing.cta}</CtaLink>
                  <p className="mt-4 text-xs text-white/55">{C.ctaNote}</p>
                  <p className="mt-3 text-xs text-[var(--c432-amber)]/80">{C.pricing.cancelNote}</p>
                </div>
              </div>
            </Reveal>

            <Reveal i={3} className="order-2 lg:order-none">
              <h3 className="font-display text-[clamp(1.4rem,2.6vw,2rem)] font-semibold">{C.notFor.heading}</h3>
              <ul className="mt-7 space-y-5">
                {C.notFor.items.map((t, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-white/25" />
                    <span className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[15px] text-white/55">{C.notFor.outro}</p>
            </Reveal>
          </div>
        </section>

        {/* ══ VOICES — відгуки як те, чим вони є: повідомлення учасників ══
            Були вісім однакових карток на 4000px, які читались як один довгий
            блок. Тепер це стрічка повідомлень: три на видноті, решта під
            розкриттям. Жодних вигаданих аватарів і часу — тільки імʼя,
            як його підписує сам Telegram, і текст. */}
        <section className="sect mx-auto max-w-3xl px-5">
          <Reveal><h2 className="font-display h-section mx-auto mb-4 max-w-3xl text-center text-balance">{C.voices.heading}</h2></Reveal>
          <Reveal i={1}><p className="mx-auto mb-3 max-w-xl text-center text-[var(--c432-ink)]">{C.voices.subtitle}</p></Reveal>
          <Reveal i={2}><p className="mx-auto mb-12 max-w-xl text-center text-[13px] text-white/45">{C.voices.note}</p></Reveal>

          <div className="space-y-6">
            {voicesLead.map((v, i) => <Reveal key={i} i={Math.min(i, 3)}><Message v={v} i={i} /></Reveal>)}
          </div>

          <Reveal i={4}>
            <details className="group mt-6">
              <summary className="btn-ghost mx-auto w-fit list-none marker:content-['']">
                <span className="group-open:hidden">{C.voices.moreLabel}</span>
                <span className="hidden group-open:inline">Згорнути</span>
              </summary>
              <div className="mt-6 space-y-6">
                {voicesRest.map((v, i) => <Message key={i} v={v} i={i + 3} />)}
              </div>
            </details>
          </Reveal>

          <Reveal i={5}>
            <blockquote className="mx-auto mt-14 max-w-2xl text-center">
              <p className="font-display text-[clamp(1.15rem,2vw,1.5rem)] leading-relaxed text-white/85">
                «{C.voices.pullQuote}»
              </p>
              <footer className="mt-4 text-sm text-[var(--c432-amber)]/80">{C.voices.pullAuthor}</footer>
            </blockquote>
          </Reveal>
        </section>

        {/* ══ QUESTIONS ══
            Було 24 картки на 4100px. Стало десять щільним списком, решта під
            розкриттям: картка навколо кожного рядка нічого не додавала. */}
        <section className="sect mx-auto max-w-5xl px-5">
          <Reveal><h2 className="font-display h-section mx-auto mb-4 max-w-3xl text-center text-balance">{C.questions.heading}</h2></Reveal>
          <Reveal i={1}><p className="mx-auto mb-12 max-w-xl text-center text-[var(--c432-ink)]">{C.questions.subtitle}</p></Reveal>

          <Reveal i={2}>
            <ul className="grid gap-x-10 rounded-3xl bg-[rgba(9,10,30,0.62)] px-6 sm:grid-cols-2 sm:px-8">
              {qLead.map((q, i) => <QLine key={i} q={q} />)}
            </ul>
          </Reveal>

          <Reveal i={3}>
            <details className="group mt-8">
              <summary className="btn-ghost mx-auto w-fit list-none marker:content-['']">
                <span className="group-open:hidden">{C.questions.moreLabel}</span>
                <span className="hidden group-open:inline">Згорнути</span>
              </summary>
              <ul className="mt-6 grid gap-x-10 rounded-3xl bg-[rgba(9,10,30,0.62)] px-6 sm:grid-cols-2 sm:px-8">
                {qRest.map((q, i) => <QLine key={i} q={q} />)}
              </ul>
            </details>
          </Reveal>

          <Reveal i={4}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] text-white/60">{C.questions.outro}</p>
          </Reveal>
        </section>

        {/* ══ FAQ ══ Ввібрав блок «міфи»: це були ті самі заперечення. */}
        <section className="sect mx-auto max-w-3xl px-5">
          <Reveal><h2 className="font-display h-section mb-12 text-center text-balance">{C.faq.heading}</h2></Reveal>
          <div className="space-y-4">
            {C.faq.items.map((item, i) => (
              <Reveal key={item.q} i={Math.min(i, 4)}>
                <details className="frost group px-6 py-5 [&_summary]:cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 text-[17px] font-semibold marker:content-['']">
                    {item.q}
                    <span aria-hidden className="text-2xl text-[var(--c432-amber)] transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--c432-ink)]">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>

          {/* Остання кнопка: людина дочитала заперечення, це точка рішення. */}
          <Reveal i={5}>
            <div className="mt-14 text-center">
              <CtaLink href={BOT} location="faq" className="btn-cta cursor-pointer">{C.pricing.cta}</CtaLink>
              <p className="mt-4 text-[13px] text-white/55">{C.hero.priceLine}</p>
            </div>
          </Reveal>
        </section>

        {/* ══ FOOTER ══ */}
        <footer className="sect mx-auto max-w-6xl px-5 pb-16">
          <div className="hairline mb-12" />
          <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-3">
              <Image src="/logo-mandala-white.svg" alt={C.footer.brand} width={42} height={42} className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" />
              <div>
                <div className="font-display text-lg font-semibold">{C.footer.brand}</div>
                <div className="text-xs text-white/40">{C.footer.tagline}</div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/55">
              <a href="/metod-432" className="transition-colors hover:text-[var(--c432-amber)]">{C.footer.linkMetod}</a>
              <a href={C.botUrlPlain} target="_blank" rel="noopener noreferrer" onClick={() => trackBotLinkClick("footer")} className="transition-colors hover:text-[var(--c432-amber)]">{C.footer.linkBot}</a>
              <a href="/oferta" className="transition-colors hover:text-[var(--c432-amber)]">{C.footer.linkOferta}</a>
              <a href="/privacy-policy" className="transition-colors hover:text-[var(--c432-amber)]">{C.footer.linkPrivacy}</a>
            </div>
          </div>
          <p className="mt-10 text-center text-xs text-white/30">© {new Date().getFullYear()} {C.footer.brand} · {C.footer.legal}</p>
        </footer>
      </main>
      </MotionConfig>
    </SmoothScroll>
  );
}
