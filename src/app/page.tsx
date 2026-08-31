"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CosmicBackground from "@/components/CosmicBackground";
import RoamingMandala from "@/components/RoamingMandala";
import CtaLink from "@/components/CtaLink";
import AboutBlock from "@/components/AboutBlock";
import PricingViewTracker from "@/components/PricingViewTracker";
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
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow-line mb-6">{children}</div>;
}

/* ───────────────── icons (line-art) — text lives in src/content.ts ───────────────── */
const IC = "h-6 w-6 stroke-[1.5]";
const Icons = [
  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><path d="M4 5h16v11H4z" strokeLinejoin="round"/><path d="M8 20h8M12 16v4" strokeLinecap="round"/><path d="M8 9h8M8 12h5" strokeLinecap="round"/></svg>),
  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><circle cx="12" cy="12" r="3"/><path d="M6.5 6.5a8 8 0 0 0 0 11M17.5 6.5a8 8 0 0 1 0 11M4 4a12 12 0 0 0 0 16M20 4a12 12 0 0 1 0 16" strokeLinecap="round"/></svg>),
  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><path d="M5 4h5v16H5zM10 4h5l3 15-5 1z" strokeLinejoin="round"/></svg>),
  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeLinecap="round"/><circle cx="12" cy="12" r="4"/></svg>),
  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M3 19a5 5 0 0 1 10 0M13 19a5 5 0 0 1 8-3.5" strokeLinecap="round"/></svg>),
];
const FormatIcons = [
  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M9 3v4M15 3v4" strokeLinecap="round"/></svg>),
  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2" strokeLinecap="round"/></svg>),
  () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={IC}><path d="M6 12c0-2 1.5-3.5 3-3.5S18 15.5 15 15.5 3 8.5 6 8.5 18 16 18 12" strokeLinecap="round"/></svg>),
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

/* ═══════════════════════════ page ═══════════════════════════ */
export default function Home() {
  return (
    <SmoothScroll>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <CosmicBackground />
      <RoamingMandala />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <nav className="frost flex w-full max-w-5xl items-center justify-between gap-3 rounded-full py-2.5 pl-3 pr-3 sm:pl-5">
          <a href="#top" className="flex items-center gap-2.5">
            <Image src="/logo-mandala-white.svg" alt={C.nav.brand} width={32} height={32} className="shrink-0 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
            <span className="font-display whitespace-nowrap text-lg font-semibold tracking-wide">{C.nav.brand}</span>
          </a>
          <CtaLink href={BOT} location="nav" className="btn-cta cursor-pointer !px-4 !py-2.5 !text-[11px] sm:!px-6 sm:!py-3 sm:!text-[13px]">
            {C.nav.cta}
          </CtaLink>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        {/* Ловить прокрутку до блоку з ціною → ViewContent у Meta. Нічого не малює. */}
        <PricingViewTracker targetId="join" />

        {/* ══ HERO ══ */}
        {/* Поява першого екрана — на чистому CSS, БЕЗ framer-motion.
            Раніше заголовок і кнопки мали opacity:0 в HTML і проявлялись лише
            після завантаження React. На повільному телефоні людина кілька
            секунд дивилась у порожній екран. CSS-анімація стартує одразу. */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
          <div className="rise-in">
            <Eyebrow>{C.hero.eyebrow}</Eyebrow>
          </div>
          <h1 className="rise-in rise-d1 font-display wordmark relative text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[1.06] tracking-tight pb-[0.14em] [filter:drop-shadow(0_2px_10px_rgba(7,8,27,0.9))_drop-shadow(0_0_28px_rgba(7,8,27,0.7))]">
            {C.hero.title}
          </h1>
          <p className="rise-in rise-d2 mx-auto mt-7 max-w-2xl text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-white/85 [text-shadow:0_1px_16px_rgba(7,8,27,0.95)]">
            {C.hero.subtitle}
          </p>
          <p className="rise-in rise-d3 mt-8 text-[13px] tracking-wide text-white/55 [text-shadow:0_1px_12px_rgba(7,8,27,0.95)]">
            {C.hero.facts}
          </p>
          <div className="rise-in rise-d3 mt-7 flex flex-col items-center gap-4 sm:flex-row">
            <CtaLink href={BOT} location="hero" className="btn-cta cursor-pointer">{C.hero.ctaPrimary}</CtaLink>
            <a href="#what" className="btn-ghost">{C.hero.ctaSecondary}</a>
          </div>
          <p className="rise-in rise-d3 mt-5 text-xs text-white/40 [text-shadow:0_1px_12px_rgba(7,8,27,0.95)]">
            {C.ctaNote}
          </p>
        </section>

        {/* ══ PAIN — петля, у якій людина крутиться ══ */}
        <section className="sect mx-auto max-w-4xl px-5">
          <Reveal><Eyebrow>{C.pain.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">{C.pain.heading}</h2></Reveal>
          <ol className="relative space-y-7 border-l border-white/10 pl-7 sm:pl-9">
            {C.pain.steps.map((st, i) => (
              <Reveal key={st.when} i={i}>
                <li className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[35px] top-2 h-2 w-2 rounded-full bg-[var(--c432-amber)]/70 sm:-left-[43px]"
                  />
                  <div className="text-[13px] uppercase tracking-[0.16em] text-[var(--c432-amber)]/80">{st.when}</div>
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
        </section>

        {/* ══ WHO ══ */}
        <section id="what" className="sect mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>{C.who.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">{C.who.heading}</h2></Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {C.who.items.map((w, i) => (
              <Reveal key={w.title} i={i}>
                <div className="frost frost-hover h-full p-8">
                  <h3 className="grad-text text-2xl font-semibold uppercase tracking-wide">{w.title}</h3>
                  <div className="hairline my-5" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ VOICES — відгуки учасників ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>{C.voices.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-4 max-w-3xl text-center">{C.voices.heading}</h2></Reveal>
          <Reveal i={2}><p className="mx-auto mb-14 max-w-xl text-center text-[var(--c432-ink)]">{C.voices.subtitle}</p></Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            {C.voices.items.map((v, i) => (
              <Reveal key={v.name} i={i}>
                <figure className="frost frost-hover flex h-full flex-col p-7 sm:p-8">
                  <svg viewBox="0 0 24 24" aria-hidden className="mb-4 h-7 w-7 shrink-0 fill-[var(--c432-amber)]/25">
                    <path d="M9.5 5C6.5 6.6 4.6 9.4 4.6 12.9c0 3.2 1.9 5.1 4.3 5.1 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.9.1-1 .1.3-1.6 1.9-3.5 3.5-4.5L9.5 5Zm9.1 0c-3 1.6-4.9 4.4-4.9 7.9 0 3.2 1.9 5.1 4.3 5.1 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.9.1-1 .1.3-1.6 1.9-3.5 3.5-4.5L18.6 5Z" />
                  </svg>
                  <blockquote className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                    {(() => {
                      // Ключовий результат виділяємо: людина сканує відгуки, а не читає.
                      const i = v.accent ? v.quote.indexOf(v.accent) : -1;
                      if (i < 0) return v.quote;
                      return (
                        <>
                          {v.quote.slice(0, i)}
                          <strong className="font-semibold text-white">{v.accent}</strong>
                          {v.quote.slice(i + v.accent.length)}
                        </>
                      );
                    })()}
                  </blockquote>
                  <figcaption className="mt-auto pt-6">
                    <div className="hairline mb-4" />
                    <span className="font-semibold text-white">{v.name}</span>
                    <span className="text-sm text-white/45"> · {v.context}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal i={4}>
            <blockquote className="mx-auto mt-12 max-w-2xl text-center">
              <p className="font-display text-[clamp(1.15rem,2vw,1.5rem)] leading-relaxed text-white/85">
                «{C.voices.pullQuote}»
              </p>
              <footer className="mt-4 text-sm text-[var(--c432-amber)]/70">{C.voices.pullAuthor}</footer>
            </blockquote>
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

        {/* ══ FEATURES ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>{C.features.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-4 max-w-3xl text-center">{C.features.heading}</h2></Reveal>
          <Reveal i={2}><p className="mx-auto mb-14 max-w-xl text-center text-[var(--c432-ink)]">{C.features.subtitle}</p></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {C.features.items.map((f, i) => {
              const Icon = Icons[i] ?? Icons[0];
              return (
                <Reveal key={f.title} i={i}>
                  <div className="frost frost-hover group flex h-full flex-col p-7">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full text-[var(--c432-amber)]" style={{ background: "rgba(253,209,111,0.08)", boxShadow: "inset 0 0 0 1px rgba(253,209,111,0.18)" }}>
                      <Icon />
                    </div>
                    <h3 className="text-xl font-semibold">{f.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--c432-ink)]">{f.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal i={5}>
            <div className="mt-10 text-center">
              <a
                href="/metod-432"
                className="group inline-flex items-center gap-2 text-sm tracking-wide text-[var(--c432-amber)]/85 transition-colors hover:text-[var(--c432-amber)]"
              >
                {C.features.deeperLink}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </section>

        {/* ══ FORMAT ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>{C.format.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">{C.format.heading}</h2></Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {C.format.items.map((f, i) => {
              const Icon = FormatIcons[i] ?? FormatIcons[0];
              return (
                <Reveal key={f.title} i={i}>
                  <div className="frost h-full p-8">
                    <div className="mb-5 text-[var(--c432-amber)]"><Icon /></div>
                    <h3 className="text-xl font-semibold">{f.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--c432-ink)]">{f.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ══ MONTH — як проходить місяць ══ */}
        <section className="sect mx-auto max-w-6xl px-5">
          <Reveal><Eyebrow>{C.month.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-4 max-w-3xl text-center">{C.month.heading}</h2></Reveal>
          <Reveal i={2}><p className="mx-auto mb-14 max-w-xl text-center text-[var(--c432-ink)]">{C.month.subtitle}</p></Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {C.month.items.map((m, i) => (
              <Reveal key={m.week} i={i}>
                <div className="frost frost-hover flex h-full flex-col p-7">
                  <div className="font-display text-4xl leading-none text-[var(--c432-amber)]/45">{m.week}</div>
                  <h3 className="mt-4 text-xl font-semibold">{m.title}</h3>
                  <div className="hairline my-4" />
                  <p className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal i={4}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-white/75">{C.month.note}</p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-white/55">{C.month.outro}</p>
          </Reveal>
        </section>

        {/* ══ MYTHS — заперечення знімаємо до ціни ══ */}
        <section className="sect mx-auto max-w-5xl px-5">
          <Reveal><Eyebrow>{C.myths.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mx-auto mb-14 max-w-3xl text-center">{C.myths.heading}</h2></Reveal>
          <div className="space-y-4">
            {C.myths.items.map((m, i) => (
              <Reveal key={m.myth} i={i}>
                <div className="frost grid gap-5 p-7 md:grid-cols-[0.85fr_1.15fr] md:gap-9 md:p-8">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-white/35">Міф</div>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/55 line-through decoration-white/25">{m.myth}</p>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--c432-amber)]">Як насправді</div>
                    <p className="mt-3 text-[15px] leading-relaxed text-[var(--c432-ink)]">{m.truth}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══ NOT FOR — чесна дискваліфікація ══ */}
        <section className="sect mx-auto max-w-3xl px-5">
          <Reveal><Eyebrow>{C.notFor.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mb-12 text-center">{C.notFor.heading}</h2></Reveal>
          <ul className="space-y-5">
            {C.notFor.items.map((t, i) => (
              <Reveal key={i} i={i}>
                <li className="flex items-start gap-4">
                  <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-white/25" />
                  <span className="text-[15px] leading-relaxed text-[var(--c432-ink)]">{t}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal i={5}>
            <p className="mt-10 text-center text-[15px] text-white/55">{C.notFor.outro}</p>
          </Reveal>
        </section>

        {/* ══ JOIN / PRICING ══ */}
        <section id="join" className="sect mx-auto max-w-2xl px-5">
          <Reveal><Eyebrow>{C.pricing.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section text-center">{C.pricing.heading}</h2></Reveal>
          <Reveal i={2}><p className="mx-auto mb-12 mt-4 max-w-xl text-center text-[var(--c432-ink)]">{C.pricing.subtitle}</p></Reveal>

          <Reveal i={3}>
            <div className="frost relative mx-auto max-w-md overflow-hidden rounded-[2rem] p-8 text-center sm:p-10">
              <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: "radial-gradient(75% 60% at 50% 0%, rgba(239,128,24,0.16), transparent 68%)" }} />
              <div className="relative">
                <h3 className="grad-text text-2xl font-semibold">{C.pricing.planName}</h3>
                <p className="mt-4 text-white/45">{C.pricing.valueLabel} <span className="line-through">{C.pricing.valueOld}</span></p>
                <div className="mt-2 font-display text-5xl font-semibold text-[var(--c432-amber)]">
                  {C.pricing.price} <span className="text-2xl font-normal text-white/55">{C.pricing.priceUnit}</span>
                </div>
                <p className="mt-1 text-sm text-white/45">{C.pricing.priceNote}</p>

                <div className="hairline my-7" />

                <ul className="space-y-4 text-left">
                  {C.pricing.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--c432-amber)]">
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="#0D0E2D" strokeWidth="3.2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className="text-[15px] leading-relaxed text-[var(--c432-ink)]">
                        {b.startsWith("Бонус:") ? (<><span className="font-semibold text-white">Бонус:</span>{b.slice(6)}</>) : b}
                      </span>
                    </li>
                  ))}
                </ul>

                <CtaLink href={BOT} location="pricing" className="btn-cta mt-9 w-full cursor-pointer">{C.pricing.cta}</CtaLink>
                <p className="mt-4 text-xs text-white/40">{C.ctaNote}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-[var(--c432-amber)]/70">{C.pricing.cancelNote}</p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ══ FAQ ══ */}
        <section className="sect mx-auto max-w-3xl px-5">
          <Reveal><Eyebrow>{C.faq.eyebrow}</Eyebrow></Reveal>
          <Reveal i={1}><h2 className="font-display h-section mb-12 text-center">{C.faq.heading}</h2></Reveal>
          <div className="space-y-4">
            {C.faq.items.map((item, i) => (
              <Reveal key={item.q} i={i}>
                <details className="frost group p-6 [&_summary]:cursor-pointer">
                  <summary className="flex items-center justify-between gap-4 text-lg font-semibold marker:content-['']">
                    {item.q}
                    <span className="text-2xl text-[var(--c432-amber)] transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-[15px] leading-relaxed text-[var(--c432-ink)]">{item.a}</p>
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
    </SmoothScroll>
  );
}
