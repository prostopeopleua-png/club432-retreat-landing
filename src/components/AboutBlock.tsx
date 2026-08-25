"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import CtaLink from "@/components/CtaLink";
import { content as C } from "@/content";

/**
 * Блок «Автор та ведучий».
 *
 * Поява і зникнення привʼязані до скролу, а не до таймера: блок піднімається
 * назустріч, тримається, поки читаєш, і плавно відступає в космос, коли йде з
 * екрана. Фото при цьому повільно дрейфує — той самий рух, що в мандали.
 *
 * Мобільна продуктивність: рухаємо тільки transform і opacity. Промінь світла
 * має filter: blur, тому на телефоні він вимкнений (див. globals.css).
 */
export default function AboutBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // зʼявляється → тримається → відступає
  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.78, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.16, 0.78, 1], [0.955, 1, 1, 0.975]);
  const lift = useTransform(scrollYProgress, [0, 0.16, 0.78, 1], [44, 0, 0, -26]);
  // фото дрейфує повільніше за блок — глибина
  const photoY = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.16, 1.1]);

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { opacity, scale, y: lift }}
      className="am relative overflow-hidden rounded-[28px] md:rounded-[32px]"
    >
      <motion.div style={reduced ? undefined : { y: photoY, scale: photoScale }} className="absolute inset-0">
        <Image
          src="/photos/vadym-about.webp"
          alt={C.author.name}
          fill
          sizes="(max-width: 900px) 100vw, 1400px"
          className="object-cover"
          style={{ objectPosition: "58% 24%" }}
        />
      </motion.div>

      {/* затемнення знизу — саме воно розчиняє нижній край блоку у фоні сторінки */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, #07081B 6%, rgba(7,8,27,0.74) 42%, rgba(7,8,27,0.30) 70%, rgba(7,8,27,0.55) 100%)",
        }}
      />
      <div
        aria-hidden
        className="am__aurora absolute inset-0"
        style={{ background: "radial-gradient(40% 50% at 18% 55%, rgba(239,128,24,0.22), transparent 72%)" }}
      />
      <div aria-hidden className="am__sweep" />

      <div className="relative flex h-full max-w-[820px] flex-col justify-end px-7 pb-14 pt-[300px] md:px-[104px] md:pb-[88px] md:pt-0">
        <Eyebrow>{C.author.eyebrow}</Eyebrow>

        {/* Імʼя береться з content.ts; градієнтом підсвічується останнє слово,
            тому редагування тексту не ламає верстку. */}
        <h2 className="mt-5 text-[clamp(2.6rem,6.2vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
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

        <p className="mt-6 max-w-[46ch] text-[clamp(1.05rem,1.5vw,1.32rem)] font-light leading-relaxed text-white/85">
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
      </div>
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[12px] uppercase tracking-[0.22em] text-[var(--c432-amber)]">{children}</div>
  );
}

/** Цифри набігають один раз, коли блок доходить до екрана.
 *  Стартове значення — фінальне, тому в HTML і без JS стоять правильні числа.
 *  З нуля анімуємо лише тоді, коли блок ще НЕ у вʼюпорті: інакше людина, що
 *  зайшла одразу сюди, побачила б, як цифри стрибають назад. */
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
        if (!armed.current) return; // вже було видно — лишаємо фінальні числа

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
    <div ref={ref} className="mt-11 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
      {C.author.stats.map((s) => {
        const target = parseInt(s.value.replace(/\D/g, ""), 10);
        const suffix = s.value.replace(/[\d\s]/g, "");
        const shown = Number.isFinite(target) ? Math.round(target * p) + suffix : s.value;
        return (
          <div key={s.label} className="border-t border-[rgba(253,209,111,0.28)] pt-4 md:max-w-[200px]">
            <div className="grad-text text-[clamp(1.9rem,3.2vw,2.5rem)] font-semibold tracking-[-0.02em] tabular-nums">
              {shown}
            </div>
            <div className="mt-2 text-[13px] leading-snug text-white/55">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}
