"use client";

import { useEffect, useRef } from "react";

/**
 * Seamless, page-wide cosmic backdrop. Fixed so it stays continuous while
 * content scrolls over it — the dark-blue cosmos is one uninterrupted field
 * with no visible seams between sections.
 */
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: { x: number; y: number; r: number; a: number; tw: number }[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const build = () => {
      const w = (canvas.width = window.innerWidth * dpr);
      const h = (canvas.height = window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      const count = Math.min(220, Math.round((window.innerWidth * window.innerHeight) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.3 + 0.3) * dpr,
        a: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const draw = (t: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const flicker = reduced ? s.a : s.a + Math.sin(t / 900 + s.tw) * 0.18;
        ctx.globalAlpha = Math.max(0, Math.min(1, flicker));
        ctx.fillStyle = s.r > 1.4 * dpr ? "#FDE9BE" : "#DCE6FB";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    build();
    draw(0);
    if (reduced) cancelAnimationFrame(raf);

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* base cosmos gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_-10%,#141a44_0%,#0b0d2c_38%,#07081b_100%)]" />
      {/* nebula glows */}
      <div
        className="absolute left-1/2 top-[-10%] h-[70vh] w-[80vw] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(239,128,24,0.16), transparent 62%)", animation: "breathe 11s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-[-15%] right-[-10%] h-[60vh] w-[55vw] rounded-full blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(109,90,230,0.16), transparent 60%)", animation: "breathe 14s ease-in-out infinite reverse" }}
      />
      <div
        className="absolute bottom-[10%] left-[-10%] h-[45vh] w-[45vw] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(253,209,111,0.08), transparent 60%)", animation: "breathe 16s ease-in-out infinite" }}
      />
      {/* starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* blueprint grid */}
      <div className="grid-overlay absolute inset-0 opacity-70" />
      {/* top conic spotlight */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh]"
        style={{ background: "conic-gradient(from 180deg at 50% -20%, transparent 42%, rgba(200,215,247,0.06) 49%, rgba(253,209,111,0.10) 50%, rgba(200,215,247,0.06) 51%, transparent 58%)" }}
      />
    </div>
  );
}
