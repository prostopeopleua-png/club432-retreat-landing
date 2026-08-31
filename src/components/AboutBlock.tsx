"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CtaLink from "@/components/CtaLink";
import { content as C } from "@/content";

/**
 * Блок «Автор та ведучий».
 *
 * У блоку НЕМАЄ власного фону. Темряву дає завіса на все вікно, тому немає ні
 * прямокутника, ні країв, ні стиків із сусідніми секціями — раніше саме край
 * блоку читався світлою смугою внизу.
 *
 * Фото — не фон, а фігура: знімок обрізаний по постаті й розчинений в альфу з
 * лівого боку та знизу. Через це нічого не ріжеться при будь-якій пропорції
 * вікна, чого неможливо було досягти розтягуванням через object-fit: cover.
 */
export default function AboutBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Завіса гасить сторінку ДО ПОВНОЇ непрозорості й тримає її такою весь час,
  // поки видно фігуру. Це принципово: підкладка фото зафарбована рівно цим
  // кольором (#040510), тож поки завіса суцільна — краю знімка не існує.
  // Раніше вона зупинялась на 0.95, колір фону «плавав» разом зі скролом і на
  // десктопі проступав прямокутник.
  const veil = useTransform(scrollYProgress, [0, 0.2, 0.3, 0.87, 0.99], [0, 0.85, 1, 1, 0]);

  // Фігура живе строго всередині вікна, де завіса вже суцільна.
  const figureOpacity = useTransform(scrollYProgress, [0.3, 0.46, 0.8, 0.87], [0, 1, 1, 0]);
  const figureY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const figureScale = useTransform(scrollYProgress, [0.3, 0.55, 0.87], [1.05, 1, 1.03]);

  const textOpacity = useTransform(scrollYProgress, [0.36, 0.52, 0.8, 0.87], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.36, 0.52, 0.8, 0.87], [30, 0, 0, -18]);

  return (
    <div ref={ref} className="relative min-h-[100svh] w-full">
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ opacity: veil }}
          className="pointer-events-none fixed inset-0 z-[15] bg-[#040510]"
        />
      )}

      {/* Тепле сяйво. Зміщене праворуч від центру фігури: коли воно згасало
          рівно на її краю, воно цей край і підсвічувало. Тепер градієнт
          переходить через межу, а не впирається в неї. */}
      <div
        aria-hidden
        className="am__aurora pointer-events-none absolute inset-0 z-[20]"
        style={{ background: "radial-gradient(46% 52% at 46% 50%, rgba(239,128,24,0.19), transparent 72%)" }}
      />

      {/* ПОСТАТЬ */}
      <motion.div
        style={reduced ? undefined : { opacity: figureOpacity, y: figureY, scale: figureScale }}
        className="pointer-events-none absolute inset-x-0 top-0 z-[22] flex justify-center md:inset-x-auto md:left-0 md:top-[-4svh] md:-translate-x-[7%]"
      >
        <Image
          src="/photos/vadym-figure.webp"
          alt={C.author.name}
          width={1100}
          height={1300}
          sizes="(max-width: 768px) 100vw, 90vh"
          priority={false}
          className="h-auto w-full max-w-none select-none md:h-[112svh] md:w-auto"
        />
      </motion.div>

      {/* ТЕКСТ */}
      <motion.div
        style={reduced ? undefined : { opacity: textOpacity, y: textY }}
        className="relative z-[25] mx-auto flex min-h-[100svh] w-full max-w-[1500px] flex-col justify-end px-7 pb-14 pt-[54svh] md:items-end md:justify-center md:px-[104px] md:pb-0 md:pt-0"
      >
        <div className="max-w-[640px] md:w-[46%] md:min-w-[440px]">
          <div className="text-[12px] uppercase tracking-[0.22em] text-[var(--c432-amber)]">
            {C.author.eyebrow}
          </div>

          {/* Імʼя береться з content.ts; градієнтом підсвічується останнє слово. */}
          <h2 className="mt-5 text-[clamp(2.5rem,5.6vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
            {(() => {
              const parts = C.author.name.trim().split(/\s+/);
              const accent = parts.pop();
              return (
                <>
                  {parts.join(" ")} <span className="grad-text">{accent}</span>
                </>
              );
            })()}
          </h2>

          <p className="mt-6 max-w-[42ch] text-[clamp(1.02rem,1.4vw,1.28rem)] font-light leading-relaxed text-white/85">
            {C.author.quote}
          </p>

          <Stats />

          <CtaLink
            href={C.botUrl}
            location="author"
            className="btn-cta mt-10 self-start !px-9 !py-[18px] !text-[15px]"
          >
            {C.pricing.cta}
          </CtaLink>
          <p className="mt-4 text-xs text-white/40">{C.ctaNote}</p>
        </div>
      </motion.div>
    </div>
  );
}

/** Цифри набігають один раз, коли блок доходить до екрана.
 *  Стартове значення — фінальне, тому в HTML і без JS стоять правильні числа. */
function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [p, setP] = useState(1);
  const armed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (reduced || !el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) {
          if (!armed.current) {
            armed.current = true;
            setP(0);
          }
          return;
        }
        io.disconnect();
        if (!armed.current) return;
        const t0 = performance.now();
        const tick = () => {
          const raw = Math.min(1, (performance.now() - t0) / 1600);
          setP(1 - Math.pow(1 - raw, 3));
          if (raw < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
      {C.author.stats.map((s) => {
        const target = parseInt(s.value.replace(/\D/g, ""), 10);
        const suffix = s.value.replace(/[\d\s]/g, "");
        const shown = Number.isFinite(target) ? Math.round(target * p) + suffix : s.value;
        return (
          <div key={s.label} className="border-t border-[rgba(253,209,111,0.28)] pt-4 md:max-w-[180px]">
            <div className="grad-text text-[clamp(1.8rem,3vw,2.35rem)] font-semibold tracking-[-0.02em] tabular-nums">
              {shown}
            </div>
            <div className="mt-2 text-[13px] leading-snug text-white/55">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
