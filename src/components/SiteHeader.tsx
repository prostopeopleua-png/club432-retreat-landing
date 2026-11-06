"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import CtaLink from "@/components/CtaLink";
import { content as C } from "@/content";

/* Шапка ховається, поки видно перший екран (там уже є і назва, і кнопка),
   і виїжджає, коли герой пішов з екрана. Стежимо через IntersectionObserver,
   без слухача прокрутки. Поява: лише opacity і transform. */
export default function SiteHeader({ heroId, botUrl }: { heroId: string; botUrl: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), { threshold: 0 });
    io.observe(hero);
    return () => io.disconnect();
  }, [heroId]);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 ${shown ? "is-shown" : ""}`}
      aria-hidden={shown ? undefined : "true"}
      inert={!shown}
    >
      <nav className="frost flex w-full max-w-5xl items-center justify-between gap-3 rounded-full py-2.5 pl-3 pr-3 sm:pl-5">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/logo-mandala-white.svg" alt={C.nav.brand} width={32} height={32} className="shrink-0 drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]" />
          <span className="font-display whitespace-nowrap text-lg font-semibold tracking-wide">{C.nav.brand}</span>
        </a>
        <CtaLink href={botUrl} location="nav" className="btn-cta cursor-pointer !px-4 !py-2.5 !text-[11px] sm:!px-6 sm:!py-3 sm:!text-[13px]">
          {C.nav.cta}
        </CtaLink>
      </nav>
    </header>
  );
}
