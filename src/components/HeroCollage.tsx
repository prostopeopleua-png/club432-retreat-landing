"use client";

import Image from "next/image";
import { useRef } from "react";
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
  /** плитки, які лишаються на телефоні (там їх менше) */
  mobile?: boolean;
};

const TILES: Tile[] = [
  { src: "group", x: 13, y: 22, size: 124, rotate: -7, mobile: true },
  { src: "crystal", x: 26, y: 62, size: 96, rotate: 5 },
  { src: "mountain", x: 8, y: 74, size: 108, rotate: -4, mobile: true },
  { src: "hands", x: 33, y: 12, size: 84, rotate: 9 },
  { src: "writing", x: 88, y: 26, size: 118, rotate: 6, mobile: true },
  { src: "notebook", x: 74, y: 68, size: 92, rotate: -8 },
  { src: "cards", x: 93, y: 74, size: 104, rotate: 4, mobile: true },
  { src: "carpathians", x: 67, y: 10, size: 88, rotate: -5 },
];

export default function HeroCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Прогрес рахуємо від верху сторінки до кінця першого екрана.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {TILES.map((t, i) => (
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
      className={`absolute -translate-x-1/2 -translate-y-1/2 ${tile.mobile ? "" : "hidden md:block"}`}
    >
      <div
        className="tile-float overflow-hidden rounded-[12px]"
        style={{
          transform: `rotate(${tile.rotate}deg)`,
          animationDelay: `${index * 0.9}s`,
        }}
      >
        <Image
          src={`/photos/community/${tile.src}.webp`}
          alt=""
          width={320}
          height={320}
          sizes="140px"
          className="h-auto w-full opacity-70"
        />
      </div>
    </motion.div>
  );
}
