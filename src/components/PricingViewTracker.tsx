"use client";

import { useEffect } from "react";
import { trackPricingView } from "@/lib/analytics";

/**
 * Надсилає ViewContent, коли людина догортала до блоку з ціною (#join).
 *
 * Спрацьовує один раз за візит. IntersectionObserver, а не слухач скролу —
 * браузер рахує перетин сам, головний потік не смикається. Це важливо: на
 * мобільному сторінка й так везе мандалу і космос, зайвий обробник скролу
 * коштував би плавності.
 */
export default function PricingViewTracker({ targetId = "join" }: { targetId?: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // 25% блоку у в'юпорті — людина справді дивиться на ціну,
          // а не просто пролетіла повз на інерції скролу.
          if (e.isIntersecting) {
            trackPricingView();
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  return null;
}
