"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────────
type Star = { w: number; h: number; left: number; top: number; opacity: number; dur: number; delay: number };

// ── Stars ──────────────────────────────────────────────────────────────────
function Stars() {
  const [stars, setStars] = useState<Star[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 90 }, (_, i) => ({
      w: Math.random() * 2.2 + 0.4,
      h: Math.random() * 2.2 + 0.4,
      left: Math.random() * 100,
      top: Math.random() * 85,
      opacity: Math.random() * 0.55 + 0.08,
      dur: 2 + Math.random() * 5,
      delay: Math.random() * 5,
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
            background: i % 4 === 0 ? "#fff" : i % 4 === 1 ? "#FDD16F" : "rgba(180,160,255,0.9)",
            opacity: s.opacity,
            animation: `starPulse ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </>
  );
}

// ── Frequency rings emanating from bottom ─────────────────────────────────
function FrequencyRings() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none"
      style={{ zIndex: 2 }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 220 + i * 160,
            height: 220 + i * 160,
            bottom: -((220 + i * 160) / 2),
            border: `1px solid rgba(253,209,111,${0.14 - i * 0.022})`,
            boxShadow: i === 0 ? "0 0 40px rgba(239,128,24,0.12)" : "none",
          }}
          animate={{
            scale: [1, 1.18],
            opacity: [0.9, 0],
          }}
          transition={{
            duration: 3.8,
            delay: i * 0.75,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
      {/* Static rings (non-animated, always visible) */}
      {[0, 1, 2].map((i) => (
        <div
          key={`static-${i}`}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 140,
            height: 200 + i * 140,
            bottom: -((200 + i * 140) / 2),
            border: `1px solid rgba(253,209,111,${0.06 - i * 0.015})`,
          }}
        />
      ))}
    </div>
  );
}

// ── Carpathian mountain silhouette ─────────────────────────────────────────
function Mountains() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 3 }}>
      <svg
        viewBox="0 0 1440 300"
        preserveAspectRatio="xMidYMax meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", minHeight: 180, verticalAlign: "bottom" }}
      >
        {/* Far ridge – mist */}
        <path
          d="M0,210 L60,175 L130,195 L200,145 L290,170 L370,115 L450,160 L530,90 L610,145 L680,95 L760,155 L840,85 L920,140 L1000,100 L1090,155 L1170,115 L1260,165 L1340,125 L1440,180 L1440,300 L0,300 Z"
          fill="rgba(25,28,70,0.55)"
        />
        {/* Mid ridge */}
        <path
          d="M0,240 L80,205 L155,228 L240,178 L330,218 L400,162 L480,205 L560,148 L645,196 L720,160 L810,200 L890,165 L970,205 L1060,172 L1150,215 L1240,182 L1330,225 L1440,198 L1440,300 L0,300 Z"
          fill="rgba(12,13,38,0.88)"
        />
        {/* Near ridge – solid, blends into next section */}
        <path
          d="M0,272 L100,250 L175,265 L265,235 L350,260 L430,228 L510,255 L590,220 L665,250 L750,232 L830,258 L910,238 L995,268 L1080,248 L1165,270 L1255,252 L1350,275 L1440,258 L1440,300 L0,300 Z"
          fill="#15173A"
        />
        {/* Ridge glow line */}
        <path
          d="M0,272 L100,250 L175,265 L265,235 L350,260 L430,228 L510,255 L590,220 L665,250 L750,232 L830,258 L910,238 L995,268 L1080,248 L1165,270 L1255,252 L1350,275 L1440,258"
          fill="none"
          stroke="rgba(253,209,111,0.08)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

// ── Countdown ──────────────────────────────────────────────────────────────
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
    <div className="flex gap-3 sm:gap-5 justify-center items-end">
      {[{ v: d, l: "Днів" }, { v: h, l: "Годин" }, { v: m, l: "Хв" }, { v: s, l: "Сек" }].map(({ v, l }, i) => (
        <div key={l} className="flex flex-col items-center">
          <div
            className="flex items-center justify-center rounded-2xl mb-2"
            style={{
              width: "clamp(58px, 15vw, 80px)",
              height: "clamp(58px, 15vw, 80px)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(253,209,111,0.18)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.span
              key={`${l}-${v}`}
              initial={{ y: -6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.22, delay: i * 0.03 }}
              className="tabular-nums"
              style={{
                color: "#FDD16F",
                fontWeight: 800,
                fontSize: "clamp(22px, 5.5vw, 34px)",
                lineHeight: 1,
              }}
            >
              {pad(v)}
            </motion.span>
          </div>
          <span
            className="tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px" }}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Scroll indicator ───────────────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1.5"
      style={{ bottom: 120, left: "50%", x: "-50%", zIndex: 10 }}
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div style={{
        width: 1.5,
        height: 32,
        background: "linear-gradient(to bottom, rgba(253,209,111,0.6), transparent)",
        borderRadius: 2,
      }} />
      <div style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "rgba(253,209,111,0.5)",
        boxShadow: "0 0 8px rgba(253,209,111,0.4)",
      }} />
    </motion.div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────
export default function Hero() {
  const { scrollY } = useScroll();
  const auroraY = useTransform(scrollY, [0, 700], [0, -100]);
  const contentY = useTransform(scrollY, [0, 600], [0, 50]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);
  const mountainsY = useTransform(scrollY, [0, 600], [0, -30]);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-6 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #06071A 0%, #0B0C25 45%, #0F1035 75%, #15173A 100%)",
      }}
    >
      {/* ── Aurora (parallax) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: auroraY }}
      >
        {/* Main aurora blobs */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse at 22% 15%, rgba(239,128,24,0.28) 0%, transparent 50%),
            radial-gradient(ellipse at 78% 72%, rgba(120,60,200,0.22) 0%, transparent 52%),
            radial-gradient(ellipse at 55% 38%, rgba(253,209,111,0.06) 0%, transparent 55%),
            radial-gradient(ellipse at 10% 65%, rgba(60,100,220,0.12) 0%, transparent 45%),
            radial-gradient(ellipse at 88% 20%, rgba(100,40,180,0.14) 0%, transparent 45%)
          `,
          animation: "auroraFloat 14s ease-in-out infinite",
        }} />
        {/* Subtle center glow */}
        <div style={{
          position: "absolute",
          top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(239,128,24,0.07) 0%, transparent 70%)",
          animation: "auroraFloat 9s ease-in-out 2s infinite reverse",
        }} />
      </motion.div>

      {/* ── Ghost "432" background text ── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ zIndex: 1, marginTop: "-8%" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          style={{
            fontSize: "clamp(180px, 48vw, 440px)",
            fontWeight: 900,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(253,209,111,0.11)",
            userSelect: "none",
            textShadow: "0 0 120px rgba(239,128,24,0.05)",
          }}
        >
          432
        </motion.span>
      </div>

      {/* ── Stars ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <Stars />
      </div>

      {/* ── Frequency rings ── */}
      <FrequencyRings />

      {/* ── Content ── */}
      <motion.div
        className="relative w-full max-w-2xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity, zIndex: 10 }}
      >
        {/* Badge eyebrow */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
            style={{
              background: "rgba(253,209,111,0.07)",
              border: "1px solid rgba(253,209,111,0.22)",
              color: "#FDD16F",
              backdropFilter: "blur(8px)",
              letterSpacing: "0.2em",
            }}
          >
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#EF8018",
              boxShadow: "0 0 8px #EF8018",
              animation: "dotPulse 2s ease-in-out infinite",
              flexShrink: 0,
            }} />
            Клуб 432 · Карпати · 12–16 Червня 2026
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontWeight: 800, lineHeight: 1.02, letterSpacing: "-0.025em", marginBottom: "1.2rem" }}
        >
          <span
            className="block text-white"
            style={{ fontSize: "clamp(42px, 11vw, 88px)" }}
          >
            П'ять днів,
          </span>
          <span
            className="block grad-text"
            style={{ fontSize: "clamp(42px, 11vw, 88px)" }}
          >
            що змінять все
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.34 }}
          className="mx-auto mb-6"
          style={{
            width: 48, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(253,209,111,0.5), transparent)",
          }}
        />

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 sm:mb-12 mx-auto"
          style={{
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.72,
            fontSize: "clamp(14px, 2.3vw, 17px)",
            maxWidth: 420,
          }}
        >
          Духовні практики та езотерична психологія в серці Карпат.{" "}
          <span style={{ color: "rgba(255,255,255,0.32)" }}>
            Ти прийдеш одним — повернешся іншим.
          </span>
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="mb-10 sm:mb-12"
        >
          <Countdown />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.66, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4"
        >
          <a href="#pricing" className="btn-cta">
            Забронювати місце — 3 000 грн
          </a>
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            повна оплата при заселенні · безпечно
          </span>
        </motion.div>

        {/* Location tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-6 text-xs tracking-widest"
          style={{ color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em" }}
        >
          Seven Hills · с. Яблуниця · Петрос та Говерла
        </motion.p>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />

      {/* ── Mountains (parallax) ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ y: mountainsY, zIndex: 5 }}
      >
        <Mountains />
      </motion.div>

      {/* ── Bottom fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: 80,
          background: "linear-gradient(to bottom, transparent, #15173A)",
          zIndex: 6,
        }}
      />
    </section>
  );
}
