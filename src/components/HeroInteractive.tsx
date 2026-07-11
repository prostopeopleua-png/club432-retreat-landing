"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const BOT = "https://t.me/prosto_mindful_bot";
const HEADLINE = "з чого почнеться\nтвоє пробудження?";
const OPTIONS = ["Клуб 432", "Ретрит", "Індивідуально", "Інше"];

/* ── typewriter ── */
function useTypewriter(text: string, speed = 42, startDelay = 650) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);
  return { displayed, done };
}

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 stroke-[2.5]">
    <path d="M5 12.5l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HeroInteractive() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [services, setServices] = useState<string[]>([]);
  const { displayed, done } = useTypewriter(HEADLINE);

  /* video: desktop mouse-scrub / mobile autoplay */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startMobile = () => {
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {});
    };
    if (window.innerWidth < 1024) {
      if (video.readyState >= 2) startMobile();
      else video.addEventListener("loadeddata", startMobile, { once: true });
      return;
    }

    video.pause();
    let prevX: number | null = null;
    let target = 0;
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      if (prevX === null) { prevX = e.clientX; return; }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      const d = video.duration;
      if (!d || Number.isNaN(d)) return;
      target += (delta / window.innerWidth) * 0.8 * d;
      target = Math.max(0, Math.min(d, target));
      video.currentTime = target;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const toggle = (s: string) =>
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden lg:block">
      {/* ── background video (figure) ── */}
      <div className="relative order-last aspect-square w-full overflow-hidden pointer-events-none lg:absolute lg:inset-0 lg:order-none lg:aspect-auto lg:h-full">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="hero-video h-full w-full object-cover object-center lg:object-right"
        >
          <source src="/hero-figure.webm" type="video/webm" />
          <source src="/hero-figure.mp4" type="video/mp4" />
        </video>

        {/* fiery mandala at the head — spiritual awakening of the head centers */}
        <div className="pointer-events-none absolute right-[6%] top-[3%] h-[38vw] w-[38vw] max-h-[300px] max-w-[300px] lg:right-[13%] lg:top-[6%] lg:h-[19vw] lg:w-[19vw]">
          <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,120,20,0.55), rgba(253,209,111,0.25) 45%, transparent 68%)", animation: "fireGlow 3.4s ease-in-out infinite", mixBlendMode: "screen" }} />
          <Image
            src="/logo-mandala.svg"
            alt=""
            width={300}
            height={300}
            className="relative h-full w-full"
            style={{ animation: "spinSlow 26s linear infinite", filter: "brightness(1.25) drop-shadow(0 0 14px rgba(255,140,30,0.9))", mixBlendMode: "screen" }}
          />
        </div>

        {/* dissolve the light backdrop into the cosmos (seamless) */}
        <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(90deg, var(--c432-bg) 0%, rgba(13,14,45,0.85) 30%, rgba(13,14,45,0.15) 55%, transparent 78%)" }} />
        <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(180deg, transparent 45%, rgba(13,14,45,0.7) 80%, var(--c432-bg) 100%)" }} />
      </div>

      {/* ── content ── */}
      <div className="relative z-10 order-first flex w-full flex-col lg:order-none lg:min-h-screen lg:justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 pt-28 pb-10 lg:py-24">
          <div className="max-w-xl">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="eyebrow-line mb-6 justify-start before:hidden">Клуб 432 · спільнота свідомого життя</div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="font-display mb-7 w-full select-none whitespace-pre-wrap text-[clamp(2.6rem,7vw,4.8rem)] font-semibold leading-[1.05] tracking-tight text-white"
            >
              {displayed}
              {!done && <span className="ml-[3px] inline-block h-[0.95em] w-[3px] translate-y-[3px] bg-[var(--c432-amber)] animate-blink" />}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="mb-10 max-w-lg text-lg leading-relaxed text-[var(--c432-ink)] md:text-xl"
            >
              Обери, що відгукується — і ми покажемо, з чого почати
              <br className="hidden sm:block" /> твій шлях у Клубі 432.
            </motion.p>

            {/* pills */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
              <h2 className="mb-1 text-xl font-semibold tracking-tight text-white">Що тебе цікавить?</h2>
              <p className="mb-6 text-sm text-white/45">Обери, що відгукується</p>
              <div className="flex flex-wrap gap-3">
                {OPTIONS.map((o) => {
                  const active = services.includes(o);
                  return (
                    <motion.button
                      key={o}
                      onClick={() => toggle(o)}
                      whileTap={{ scale: 0.96 }}
                      className={`flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-colors duration-200 ${
                        active
                          ? "bg-gradient-to-r from-[#EF8018] to-[#FDD16F] text-[#1a1305] shadow-lg shadow-orange-950/20"
                          : "text-white/85 hover:text-white"
                      }`}
                      style={active ? undefined : { boxShadow: "inset 0 0 0 1px rgba(200,215,247,0.16)" }}
                    >
                      <AnimatePresence>
                        {active && (
                          <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                            <Check />
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {o}
                    </motion.button>
                  );
                })}
              </div>

              {/* feedback banner */}
              <div className="mt-6 min-h-[4rem]">
                <AnimatePresence mode="wait">
                  {services.length === 0 ? (
                    <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="text-xs italic text-white/50">
                      Обери, що відгукується вище.
                    </motion.p>
                  ) : (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 24 }}
                      className="frost flex flex-col items-start gap-4 overflow-hidden rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <p className="text-[15px] text-white/85">
                        Готові показати шлях: <span className="font-semibold text-[var(--c432-amber)]">{services.join(", ")}</span>
                      </p>
                      <a href={BOT} target="_blank" rel="noopener noreferrer" className="btn-cta cursor-pointer shrink-0 !px-6 !py-3 !text-[13px]">
                        Далі →
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
