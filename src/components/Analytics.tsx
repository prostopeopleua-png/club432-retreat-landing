"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Базовий код GA4 і Meta Pixel стоїть напряму в <head> (src/app/layout.tsx) —
 * так вимагає Meta: подія має піти ще до гідратації React, інакше губляться
 * люди, які закривають сторінку в перші секунди (типово для трафіку з реклами).
 *
 * Цей компонент добиває лише те, чого базовий код не вміє: перегляди сторінок
 * при переходах усередині SPA (gtag/fbq рахують тільки перше завантаження).
 */
export default function Analytics() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.gtag?.("event", "page_view", { page_path: pathname });
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
