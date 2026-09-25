"use client";

import Image from "next/image";
import { useState } from "react";
import { content as C } from "@/content";
import { track } from "@/lib/analytics";

const V = C.video;

/**
 * Відео від Вадима одразу під першим екраном.
 *
 * До кліку на сторінці є лише обкладинка (next/image). Тег <video> з'являється
 * тільки після натискання, тож ролик не вантажиться, поки його не попросили.
 * Для телефона це важливо: див. «Мобільна перф» у HANDOFF.md.
 *
 * Самі mp4 лежать на VPS (app.club432.com/media), а не у Vercel: кожен перегляд
 * це 40–80 МБ трафіку, і на Vercel це швидко з'їло б ліміт.
 */
export default function IntroVideo() {
  const [src, setSrc] = useState<string | null>(null);

  function play() {
    // Вузький екран отримує 720p: менше трафіку, різниці на телефоні не видно.
    const narrow = window.matchMedia("(max-width: 820px)").matches;
    setSrc(narrow ? V.src720 : V.src1080);
    track("video_play", { location: "intro", quality: narrow ? "720p" : "1080p" });
  }

  return (
    <div className="frost relative aspect-video w-full overflow-hidden !rounded-3xl">
      {src ? (
        <video
          className="absolute inset-0 h-full w-full bg-black object-cover"
          src={src}
          poster={V.poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          onEnded={() => track("video_complete", { location: "intro" })}
        >
          <track kind="subtitles" src={V.subtitles} srcLang="uk" label="Українська" default />
        </video>
      ) : (
        <button
          type="button"
          onClick={play}
          aria-label={V.play}
          className="group absolute inset-0 cursor-pointer"
        >
          <Image
            src={V.poster}
            alt={V.heading}
            fill
            sizes="(max-width: 820px) 100vw, 900px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,5,16,0.75),transparent_45%)]" />
          {/* Кнопка в кутку, а не по центру: обличчя лишається відкритим, саме воно чіпляє погляд */}
          <span className="absolute bottom-4 left-4 flex items-center gap-3 sm:bottom-7 sm:left-7 sm:gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--c432-amber)]/90 shadow-[0_0_40px_rgba(253,209,111,0.45)] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-[#07081b] sm:h-9 sm:w-9"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="text-[13px] uppercase tracking-[0.18em] text-white/90 [text-shadow:0_1px_12px_rgba(7,8,27,0.95)]">
              {V.play}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
