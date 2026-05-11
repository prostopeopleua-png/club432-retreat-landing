"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const perks = [
  { icon: "🏔", text: "Вид на Петрос та Говерлу" },
  { icon: "🏊", text: "Басейн та сауна на території" },
  { icon: "🛏", text: "Затишні шале — вся група разом" },
  { icon: "🍽", text: "Ресторани та магазини поруч" },
  { icon: "🌲", text: "Карпатські ліси навколо" },
  { icon: "🚗", text: "Трансфер від Яблуниці" },
];

function LocationPhoto() {
  const [err, setErr] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth === 0) {
      setErr(true);
    }
  }, []);

  if (!err) {
    return (
      <img
        ref={imgRef}
        src="/photos/location-1.jpg"
        alt="Seven Hills — с. Яблуниця, Карпати"
        onError={() => setErr(true)}
        className="w-full h-full object-cover"
      />
    );
  }
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center">
      <div className="text-5xl mb-4" style={{ animation: "float 4s ease-in-out infinite" }}>🏔</div>
      <p className="text-sm font-medium mb-1" style={{ color: "rgba(255,255,255,0.45)" }}>Фото локації</p>
      <p className="text-xs" style={{ color: "rgba(255,255,255,0.22)" }}>
        Завантаж <code style={{ color: "#FDD16F", fontSize: 11 }}>/public/photos/location-1.jpg</code>
      </p>
    </div>
  );
}

export default function Location() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#0D0E2D" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 70% 50%, rgba(253,209,111,0.04) 0%, transparent 55%)"
      }} />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.p
          className="eyebrow text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        >
          Локація
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,0.3,1] }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-2"
          style={{ lineHeight: 1.05 }}
        >
          <span className="grad-text">Seven Hills</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="text-center mb-10 sm:mb-12 text-xs tracking-widest uppercase"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em" }}
        >
          с. Яблуниця · Карпати
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }}
          >
            <p className="text-sm sm:text-base leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.65)" }}>
              Проживання у затишних шале комплексу Seven Hills з панорамним видом на Петрос та Говерлу.
              Поряд — магазини, ресторани, басейни, сауна. Вся група проживає на одній території.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {perks.map(({ icon, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: [0.16,1,0.3,1] }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(253,209,111,0.28)" }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(253,209,111,0.04)",
                    border: "1px solid rgba(253,209,111,0.1)",
                    transition: "border-color 0.25s",
                  }}
                >
                  <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
                  <span className="text-xs sm:text-sm font-medium" style={{ color: "rgba(255,255,255,0.78)" }}>{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — photo */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.16,1,0.3,1] }}
            className="rounded-3xl overflow-hidden"
            style={{
              aspectRatio: "4/3",
              background: "linear-gradient(135deg, #15173A 0%, #1E2048 100%)",
              border: "1px solid rgba(253,209,111,0.15)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
            }}
          >
            <LocationPhoto />
          </motion.div>
        </div>
      </div>

      {/* Seamless fade → Guides (#15173A) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #15173A)", zIndex: 4 }}
      />
    </section>
  );
}
