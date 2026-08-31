"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Обличчя спільноти навколо першого екрана.
 *
 * Плитки стоять на трьох концентричних кільцях. Кільця обертаються з різною
 * швидкістю — внутрішнє найшвидше, кожне наступне повільніше, — тому виникає
 * відчуття глибини, а не хаосу. Кожна плитка обертається у зворотний бік з тією
 * самою швидкістю, щоб обличчя лишалися рівними.
 *
 * На скролі весь колаж розширюється й гасне, а мандала за ним продовжує рух:
 * вона живе в окремому фіксованому шарі.
 *
 * Обертання — CSS-анімація transform, тобто працює на композиторі без JS.
 * На телефоні його немає взагалі, і лишаються тільки плитки біля лівого та
 * правого країв, де є місце поза текстом.
 */
type Tile = { src: string; ring: number; angle: number; size: number; mobile?: boolean };

/** На телефоні кільце не працює: при будь-якому радіусі частина плиток лягає
 *  рівно на текст. Тому там окрема розкладка — по кутах і краях. */
const MOBILE: { src: string; x: number; y: number; size: number }[] = [
  { src: "m15", x: 11, y: 7, size: 82 },
  { src: "m28", x: 84, y: 9, size: 74 },
  { src: "m10", x: 30, y: 3, size: 62 },
  { src: "carpathians", x: 70, y: 4, size: 66 },
  { src: "m08", x: 5, y: 21, size: 70 },
  { src: "m12", x: 95, y: 15, size: 72 },
  { src: "m11", x: 12, y: 89, size: 76 },
  { src: "group", x: 88, y: 87, size: 70 },
  { src: "m19", x: 32, y: 95, size: 62 },
  { src: "m22", x: 68, y: 94, size: 66 },
];

const TILES: Tile[] = [
  { src: "m15", ring: 0, angle: 37.0, size: 88, mobile: true },
  { src: "m28", ring: 0, angle: 98.3, size: 100 },
  { src: "m10", ring: 0, angle: 154.7, size: 92, mobile: true },
  { src: "carpathians", ring: 0, angle: 212.0, size: 104, mobile: true },
  { src: "m22", ring: 0, angle: 276.6, size: 100 },
  { src: "m06", ring: 0, angle: 335.2, size: 88, mobile: true },
  { src: "writing", ring: 1, angle: 6.7, size: 80, mobile: true },
  { src: "m04", ring: 1, angle: 54.6, size: 84 },
  { src: "m02", ring: 1, angle: 85.4, size: 84 },
  { src: "m23", ring: 1, angle: 124.6, size: 80 },
  { src: "m09", ring: 1, angle: 163.9, size: 88, mobile: true },
  { src: "m01", ring: 1, angle: 206.4, size: 76, mobile: true },
  { src: "m17", ring: 1, angle: 253.3, size: 84 },
  { src: "m19", ring: 1, angle: 290.4, size: 72 },
  { src: "m11", ring: 1, angle: 332.7, size: 72, mobile: true },
  { src: "m20", ring: 2, angle: 34.8, size: 64, mobile: true },
  { src: "hands", ring: 2, angle: 65.9, size: 64 },
  { src: "crystal", ring: 2, angle: 94.7, size: 68 },
  { src: "m25", ring: 2, angle: 129.4, size: 56 },
  { src: "m30", ring: 2, angle: 157.6, size: 72, mobile: true },
  { src: "m05", ring: 2, angle: 196.1, size: 68, mobile: true },
  { src: "m29", ring: 2, angle: 226.4, size: 68 },
  { src: "m21", ring: 2, angle: 260.4, size: 56 },
  { src: "m31", ring: 2, angle: 286.1, size: 72 },
  { src: "m12", ring: 2, angle: 320.8, size: 56, mobile: true },
  { src: "cards", ring: 2, angle: 351.9, size: 68, mobile: true },
];

/** Період обертання кільця. Внутрішнє найшвидше. */
const SPIN = ["52s", "78s", "112s"];

export default function HeroCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  // Приховані через CSS картинки браузер усе одно завантажує, тому на сервері
  // рендеримо лише мобільний набір, а решту додаємо, коли знаємо ширину.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.55]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 0.92], [1, 0.5, 0]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reduced ? undefined : { scale, opacity }}
      >
        {!wide &&
          MOBILE.map((t) => (
            <div
              key={t.src}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${t.x}%`, top: `${t.y}%`, width: `calc(${t.size}px * var(--tile-k, 1))` }}
            >
              <Image
                src={`/photos/community/${t.src}.webp`}
                alt=""
                width={240}
                height={240}
                sizes="100px"
                className="h-auto w-full rounded-full opacity-[0.82]"
              />
            </div>
          ))}

        {wide &&
          [0, 1, 2].map((ring) => (
          <div
            key={ring}
            className="collage-ring absolute left-1/2 top-1/2"
            style={{
              width: `calc(var(--ring-${ring}) * 2)`,
              height: `calc(var(--ring-${ring}) * 2)`,
              marginLeft: `calc(var(--ring-${ring}) * -1)`,
              marginTop: `calc(var(--ring-${ring}) * -1)`,
              animationDuration: SPIN[ring],
            }}
          >
            {TILES.filter((t) => t.ring === ring).map((t) => (
              <div
                key={t.src}
                className="absolute"
                style={{
                  left: `${50 + 50 * Math.cos((t.angle * Math.PI) / 180)}%`,
                  top: `${50 + 50 * Math.sin((t.angle * Math.PI) / 180)}%`,
                  width: `calc(${t.size}px * var(--tile-k, 1))`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* зворотне обертання з тим самим періодом — обличчя не крутиться */}
                <div className="collage-counter" style={{ animationDuration: SPIN[ring] }}>
                  <Image
                    src={`/photos/community/${t.src}.webp`}
                    alt=""
                    width={240}
                    height={240}
                    sizes="120px"
                    className="h-auto w-full rounded-full opacity-[0.82]"
                  />
                </div>
              </div>
            ))}
            </div>
          ))}
      </motion.div>
    </div>
  );
}
