"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Star = { w: number; h: number; left: number; top: number; opacity: number; dur: number; delay: number };

function Countdown() {
  const [diff, setDiff] = useState<number | null>(null);
  useEffect(() => {
    const target = new Date("2026-06-12T09:00:00").getTime();
    const tick = () => setDiff(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (diff === null) return null;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex gap-4 sm:gap-8 justify-center">
      {[{ v: d, l: "Днів" }, { v: h, l: "Годин" }, { v: m, l: "Хв" }, { v: s, l: "Сек" }].map(({ v, l }, i) => (
        <div key={l} className="flex flex-col items-center">
          <motion.span
            key={`${l}-${v}`}
            initial={{ y: -8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, delay: i * 0.03 }}
            className="text-3xl sm:text-4xl md:text-5xl tabular-nums"
            style={{ color: "#FDD16F", fontWeight: 700, lineHeight: 1.1 }}
          >
            {pad(v)}
          </motion.span>
          <span className="text-[10px] sm:text-xs mt-1 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

function Stars() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 70 }, () => ({
      w: Math.random() * 2.5 + 0.5,
      h: Math.random() * 2.5 + 0.5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.1,
      dur: 2.5 + Math.random() * 4,
      delay: Math.random() * 4,
    })));
  }, []);
  return (
    <>
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: s.w, height: s.h,
            left: `${s.left}%`, top: `${s.top}%`,
            background: i % 5 === 0 ? "#fff" : "#FDD16F",
            opacity: s.opacity,
            animation: `starPulse ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const auroraY = useTransform(scrollY, [0, 600], [0, -80]);
  const contentY = useTransform(scrollY, [0, 600], [0, 40]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #07081B 0%, #0D0E2D 55%, #15173A 100%)" }}
    >
      {/* Aurora — parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: auroraY, animation: "auroraFloat 12s ease-in-out infinite" }}
      >
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 28% 18%, rgba(239,128,24,0.22) 0%, transparent 55%),
            radial-gradient(ellipse at 75% 78%, rgba(169,58,184,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 52% 52%, rgba(253,209,111,0.08) 0%, transparent 65%)
          `
        }} />
      </motion.div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Stars />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto w-full"
        style={{ y: contentY, opacity }}
      >
        <motion.span
          className="eyebrow mb-5 sm:mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}
        >
          Клуб 432 · Карпати · 12–16 червня 2026
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16,1,0.3,1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-5 sm:mb-6"
          style={{ fontWeight: 700, lineHeight: 1.0, letterSpacing: "-0.02em" }}
        >
          <span className="block text-white">П&apos;ять днів,</span>
          <span className="block grad-text">що змінять все</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42, ease: [0.16,1,0.3,1] }}
          className="text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-xl mx-auto"
          style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.68 }}
        >
          Духовні практики, езотерична психологія та глибоке перезавантаження
          в серці Карпат. Ти прийдеш одним — повернешся іншим.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.58, ease: "easeOut" }}
          className="mb-10 sm:mb-12"
        >
          <Countdown />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease: [0.16,1,0.3,1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#pricing" className="btn-cta">
            Забронювати місце — 19 800 грн
          </a>
          <motion.a
            href="#program"
            whileHover={{ opacity: 1, x: 4 }}
            style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, letterSpacing: "0.08em", textDecoration: "none", transition: "color 0.2s" }}
          >
            Дізнатись більше ↓
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-5 sm:mt-6 text-xs"
          style={{ color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em" }}
        >
          Seven Hills · с. Яблуниця · вид на Петрос та Говерлу
        </motion.p>
      </motion.div>

      {/* Seamless fade to next section (#15173A) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 140, background: "linear-gradient(to bottom, transparent, #15173A)", zIndex: 3 }}
      />
    </section>
  );
}
