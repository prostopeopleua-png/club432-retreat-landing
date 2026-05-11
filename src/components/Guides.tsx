"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const guides = [
  {
    name: "Вадим Шпильчук",
    role: "Духовний наставник · Провідник практик",
    bio: "Лектор-педагог та духовний учитель. Більше 4 років передає давні знання сучасною мовою. Провів 3000+ людей через практики, ретрити та особисту роботу. Тренер гри Ліла. Засновник Клубу 432.",
    quote: "Моє завдання — не дати тобі відповіді. Моє завдання — допомогти тобі поставити правильні питання.",
    photo: "/photos/guide-vadym.jpg",
    emoji: "🧘‍♂️",
    color: "#EF8018",
  },
  {
    name: "Діана",
    role: "Майстриня кристалохілінгу · Організатор",
    bio: "Майстриня кристалохілінгу та енергетичних практик. Організатор ретриту. Проводить церемонії підбору та активації каменів-талісманів.",
    quote: "Кожен камінь — це союзник. Ми просто знаходимо твого.",
    photo: "/photos/guide-diana.jpg",
    emoji: "💎",
    color: "#9B59B6",
  },
];

function GuideAvatar({ photo, emoji, color, name }: { photo: string; emoji: string; color: string; name: string }) {
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
        src={photo}
        alt={name}
        onError={() => setErr(true)}
        className="w-full h-full object-cover"
        style={{ borderRadius: "1rem" }}
      />
    );
  }
  return <span className="text-3xl">{emoji}</span>;
}

export default function Guides() {
  return (
    <section className="relative py-20 md:py-28 px-5 sm:px-6 overflow-hidden" style={{ background: "#15173A" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 30% 60%, rgba(239,128,24,0.06) 0%, transparent 55%)"
      }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p
          className="eyebrow text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }}
        >
          Провідники
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16,1,0.3,1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 sm:mb-12"
          style={{ lineHeight: 1.1 }}
        >
          Хто веде <span className="grad-text">ретрит</span>
        </motion.h2>

        <div className="flex flex-col gap-5 sm:gap-6">
          {guides.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16,1,0.3,1] }}
              whileHover={{ borderColor: `${g.color}50`, boxShadow: `0 0 40px ${g.color}12` }}
              className="rounded-2xl p-5 sm:p-8"
              style={{
                background: "#0D0E2D",
                border: "1px solid rgba(253,209,111,0.1)",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            >
              <div className="flex gap-4 sm:gap-5 items-start">
                <div
                  className="flex-shrink-0 w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${g.color}33 0%, ${g.color}11 100%)`,
                    border: `1px solid ${g.color}40`,
                  }}
                >
                  <GuideAvatar photo={g.photo} emoji={g.emoji} color={g.color} name={g.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-bold mb-0.5" style={{ color: "#fff" }}>{g.name}</h3>
                  <p className="text-xs mb-3" style={{ color: "#FDD16F" }}>{g.role}</p>
                  <p className="text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5" style={{ color: "rgba(255,255,255,0.58)" }}>
                    {g.bio}
                  </p>
                  <blockquote
                    className="text-xs sm:text-sm italic leading-relaxed pl-4"
                    style={{ borderLeft: `2px solid ${g.color}`, color: "rgba(255,255,255,0.72)" }}
                  >
                    &ldquo;{g.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seamless fade → Pricing (#0D0E2D) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 120, background: "linear-gradient(to bottom, transparent, #0D0E2D)", zIndex: 4 }}
      />
    </section>
  );
}
