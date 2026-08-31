"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Колаж зі знімків спільноти навколо першого екрана.
 *
 * Плитки розкидані кільцем, центр лишається порожнім під заголовок. На скролі
 * вони розлітаються назовні й гаснуть разом із блоком, а мандала за ними
 * продовжує свій рух — вона живе в окремому фіксованому шарі й про колаж
 * нічого не знає.
 *
 * Рух тільки transform + opacity. Жодних фільтрів: цей шар лежить на першому
 * екрані, тобто на найдорожчому для телефона місці.
 */
type Tile = {
  src: string;
  /** відсотки від вікна: центр плитки */
  x: number;
  y: number;
  /** сторона в пікселях на десктопі */
  size: number;
  rotate: number;
  /** аватарки круглі, знімки з ретриту — прямокутні */
  round: boolean;
  /** плитки, які лишаються на телефоні (там їх менше) */
  mobile?: boolean;
};

const TILES: Tile[] = [
  { src: "m15", x: 10.2, y: 6.2, size: 88, rotate: -1.7, round: true, mobile: true },
  { src: "m28", x: 56.9, y: 7.8, size: 110, rotate: -5.1, round: true },
  { src: "m10", x: 67.0, y: 9.5, size: 56, rotate: -1.6, round: true },
  { src: "carpathians", x: 19.9, y: 13.4, size: 110, rotate: -7.3, round: false },
  { src: "m22", x: 32.5, y: 13.8, size: 110, rotate: 0.9, round: true },
  { src: "m06", x: 3.5, y: 16.2, size: 110, rotate: -1.1, round: true, mobile: true },
  { src: "writing", x: 87.3, y: 16.7, size: 98, rotate: -1.9, round: false, mobile: true },
  { src: "m04", x: 94.6, y: 17.3, size: 80, rotate: -6.5, round: true, mobile: true },
  { src: "m02", x: 87.0, y: 30.3, size: 110, rotate: -5.9, round: true },
  { src: "m23", x: 10.9, y: 30.8, size: 56, rotate: -7.4, round: true },
  { src: "m09", x: 93.1, y: 32.6, size: 88, rotate: 0.7, round: true },
  { src: "m01", x: 6.6, y: 38.0, size: 110, rotate: 8.3, round: true },
  { src: "m17", x: 14.1, y: 42.4, size: 98, rotate: -2.8, round: true },
  { src: "m19", x: 87.1, y: 53.6, size: 88, rotate: 5.9, round: true },
  { src: "m11", x: 79.3, y: 55.9, size: 56, rotate: -8.9, round: true },
  { src: "m20", x: 9.0, y: 67.2, size: 80, rotate: -8.3, round: true },
  { src: "hands", x: 91.6, y: 68.3, size: 80, rotate: 7.9, round: false },
  { src: "crystal", x: 93.7, y: 77.1, size: 80, rotate: -0.7, round: false, mobile: true },
  { src: "m25", x: 86.1, y: 82.1, size: 56, rotate: 1.6, round: true },
  { src: "m30", x: 5.0, y: 87.1, size: 72, rotate: -4.7, round: true, mobile: true },
  { src: "m05", x: 92.7, y: 87.1, size: 98, rotate: -3.0, round: true, mobile: true },
  { src: "m29", x: 34.8, y: 88.4, size: 64, rotate: -7.9, round: true },
  { src: "m21", x: 27.0, y: 93.9, size: 64, rotate: -3.3, round: true },
  { src: "m31", x: 73.8, y: 94.5, size: 56, rotate: -5.4, round: true, mobile: true },
  { src: "m12", x: 85.6, y: 95.2, size: 98, rotate: 5.6, round: true, mobile: true },
  { src: "cards", x: 8.8, y: 95.7, size: 80, rotate: -0.5, round: false, mobile: true },
];

export default function HeroCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Ховати зайві плитки через CSS не досить: браузер усе одно їх завантажує.
  // Тому на сервері рендеримо лише мобільний набір, а решту додаємо вже в
  // браузері, коли знаємо ширину. Телефон качає 10 картинок замість 26.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  // Прогрес рахуємо від верху сторінки до кінця першого екрана.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {TILES.filter((t) => wide || t.mobile).map((t, i) => (
        <CollageTile key={t.src} tile={t} index={i} progress={scrollYProgress} reduced={!!reduced} />
      ))}
    </div>
  );
}

function CollageTile({
  tile,
  index,
  progress,
  reduced,
}: {
  tile: Tile;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  // Напрямок розльоту — від центру екрана до плитки.
  const dx = tile.x - 50;
  const dy = tile.y - 50;
  const len = Math.hypot(dx, dy) || 1;
  const fly = 78; // наскільки далеко відлітає, у відсотках власного розміру

  const x = useTransform(progress, [0, 1], ["0%", `${(dx / len) * fly}%`]);
  const y = useTransform(progress, [0, 1], ["0%", `${(dy / len) * fly - 26}%`]);
  const opacity = useTransform(progress, [0, 0.55, 0.9], [1, 0.55, 0]);
  const scale = useTransform(progress, [0, 1], [1, 1.18]);

  return (
    <motion.div
      style={{
        left: `${tile.x}%`,
        top: `${tile.y}%`,
        // Розмір заданий у пікселях для десктопа й зменшується коефіцієнтом
        // --tile-k на вузьких екранах: інлайновий style не вміє медіазапитів.
        ["--tile" as string]: `${tile.size}px`,
        width: "calc(var(--tile) * var(--tile-k, 1))",
        ...(reduced ? {} : { x, y, opacity, scale }),
      } as React.CSSProperties}
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className={`tile-float overflow-hidden ${tile.round ? "rounded-full" : "rounded-[12px]"}`}
        style={{
          transform: `rotate(${tile.rotate}deg)`,
          animationDelay: `${index * 0.9}s`,
        }}
      >
        <Image
          src={`/photos/community/${tile.src}.webp`}
          alt=""
          width={tile.round ? 240 : 320}
          height={tile.round ? 240 : 320}
          sizes="120px"
          className="h-auto w-full opacity-[0.78]"
        />
      </div>
    </motion.div>
  );
}
