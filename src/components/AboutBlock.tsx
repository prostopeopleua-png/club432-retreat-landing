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

  // Завіса. Затемнює УСЮ сторінку — космос, мандалу, попередню секцію — поки
  // блок проходить екран. Через неї і виникає відчуття провалу в темряву,
  // а на виході вона так само плавно піднімається і сайт повертається.
  const veil = useTransform(scrollYProgress, [0, 0.26, 0.4, 0.72, 0.94], [0, 0.86, 0.94, 0.94, 0]);

  // Сам блок зʼявляється трохи пізніше за темряву: спершу гасне світло, потім
  // проступає обличчя.
  const opacity = useTransform(scrollYProgress, [0.12, 0.34, 0.76, 0.93], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.12, 0.34, 0.76, 0.93], [0.965, 1, 1, 0.985]);
  const lift = useTransform(scrollYProgress, [0.12, 0.34, 0.76, 0.93], [40, 0, 0, -22]);
  // фото дрейфує повільніше за блок — глибина
  const photoY = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.16, 1.1]);

  return (
    <div ref={ref} className="relative min-h-[100svh] w-full">
      {/* Завіса лежить поза трансформованим блоком — інакше position: fixed
          рахувався б від нього, а не від вікна. */}
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ opacity: veil }}
          className="pointer-events-none fixed inset-0 z-[15] bg-[#04050D]"
        />
      )}

      <motion.div
        style={reduced ? undefined : { opacity, scale, y: lift }}
        className="am relative z-[25] flex min-h-[100svh] w-full overflow-hidden"
      >
        <motion.div style={reduced ? undefined : { y: photoY, scale: photoScale }} className="absolute inset-0">
          <Image
            src="/photos/vadym-about.webp"
            alt={C.author.name}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "58% 24%" }}
          />
        </motion.div>

        {/* затемнення знизу — нижній край блоку перетікає у фон сторінки */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, #07081B 4%, rgba(7,8,27,0.74) 40%, rgba(7,8,27,0.30) 68%, rgba(7,8,27,0.60) 100%)",
          }}
        />
        <div
          aria-hidden
          className="am__aurora absolute inset-0"
          style={{ background: "radial-gradient(40% 50% at 18% 55%, rgba(239,128,24,0.22), transparent 72%)" }}
        />
        <div aria-hidden className="am__sweep" />

        <div className="relative mx-auto flex w-full max-w-[1500px] flex-col justify-end px-7 pb-14 pt-[27svh] md:px-[104px] md:pb-[9vh] md:pt-[30vh]">
          <div className="max-w-[820px]">
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
        </div>
      </motion.div>
    </div>
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
