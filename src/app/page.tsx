"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CosmicBackground from "@/components/CosmicBackground";
import RoamingMandala from "@/components/RoamingMandala";
import CtaLink from "@/components/CtaLink";
import { content as C } from "@/content";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

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
        <nav className="frost flex w-full max-w-5xl items-center justify-between rounded-full py-2.5 pl-3 pr-3 sm:pl-5">
          <a href="#top" className="flex items-center gap-2.5">
            <Image src="/logo-mandala-white.svg" alt={C.nav.brand} width={32} height={32} className="drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
            <span className="font-display text-lg font-semibold tracking-wide">{C.nav.brand}</span>
          </a>
          <CtaLink href={BOT} location="nav" className="btn-cta cursor-pointer !px-6 !py-3 !text-[13px]">
            {C.nav.cta}
          </CtaLink>
        </nav>
      </header>

      <main id="top" className="relative z-10">
        {/* ══ HERO ══ */}
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Eyebrow>{C.hero.eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display wordmark relative text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[1.06] tracking-tight pb-[0.14em] [filter:drop-shadow(0_2px_10px_rgba(7,8,27,0.9))_drop-shadow(0_0_28px_rgba(7,8,27,0.7))]"
          >
            {C.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.32 }}
            className="mx-auto mt-7 max-w-2xl text-[clamp(1.05rem,1.7vw,1.35rem)] leading-relaxed text-white/85 [text-shadow:0_1px_16px_rgba(7,8,27,0.95)]"
          >
            {C.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <CtaLink href={BOT} location="hero" className="btn-cta cursor-pointer">{C.hero.ctaPrimary}</CtaLink>
            <a href="#what" className="btn-ghost">{C.hero.ctaSecondary}</a>
          </motion.div>
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

        {/* ══ AUTHOR ══ */}
        <section className="sect mx-auto max-w-5xl px-5">
          <div className="grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="frost frost-hover mx-auto w-full max-w-sm overflow-hidden rounded-[1.75rem] p-3">
                <div
                  className="relative aspect-[3/4] overflow-hidden rounded-[1.4rem]"
                  style={{ background: "radial-gradient(circle at 50% 26%, rgba(253,209,111,0.18), rgba(20,22,52,0.55) 64%)" }}
                >
                  <Image src="/photos/vadym.png" alt={C.author.name} fill sizes="(max-width: 768px) 90vw, 380px" className="object-cover object-top" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4" style={{ background: "linear-gradient(to top, rgba(13,14,45,0.85), transparent)" }} />
                </div>
              </div>
            </Reveal>
            <Reveal i={1}>
              <div>
                <Eyebrow>{C.author.eyebrow}</Eyebrow>
                <h2 className="font-display text-4xl font-semibold md:text-5xl">{C.author.name}</h2>
                <p className="mt-5 text-[clamp(1.05rem,1.6vw,1.3rem)] leading-relaxed text-[var(--c432-ink)]">{C.author.quote}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/55">{C.author.bio}</p>
                <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                  {C.author.stats.map((s) => (
                    <div key={s.label} className="frost p-4 text-center">
                      <div className="font-display text-3xl text-[var(--c432-amber)]">{s.value}</div>
                      <div className="mt-1 text-[11px] leading-tight text-white/45">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
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
                <p className="mt-5 text-xs uppercase tracking-[0.18em] text-[var(--c432-amber)]/70">{C.pricing.cancelNote}</p>
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
              <CtaLink href={BOT} location="footer" className="transition-colors hover:text-[var(--c432-amber)]">{C.footer.linkBot}</CtaLink>
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
