/* ─────────────────────────────────────────────────────────────
   Аналітика club432.com — єдина точка входу.
   GA4 + Meta Pixel + Vercel Analytics.
   ID беруться зі змінних оточення, з фолбеком на ті,
   що стояли на старому сайті (Weblium).
   ───────────────────────────────────────────────────────────── */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-VSKQWFFNLK";
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "406163265532535";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Подія в GA4 (snake_case) + Meta Pixel (custom event). */
export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
  } catch {}
  try {
    window.fbq?.("trackCustom", event, params);
  } catch {}
}

/** Стандартна подія Meta (Lead / Subscribe / ViewContent / Contact …) + GA4. */
export function trackStandard(fbEvent: string, gaEvent: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", gaEvent, params);
  } catch {}
  try {
    window.fbq?.("track", fbEvent, params);
  } catch {}
}

/** Клік по кнопці «Стати учасником» — головна конверсія сайту. */
export function trackSubscribeClick(location: string) {
  trackStandard("Lead", "subscribe_click", { location, currency: "EUR", value: 25 });
}

/**
 * Людина догортала до блоку з ціною — сигнал реального інтересу.
 *
 * Навіщо: Lead трапляється надто рідко (одиниці на тиждень), і алгоритму Meta
 * немає на чому вчитись — набір реклами не виходить з фази навчання, поки не
 * набере близько 50 конверсій за тиждень. ViewContent дає щільніший сигнал:
 * на нього можна оптимізувати перші кампанії, а на Lead перемкнутись пізніше,
 * коли обсяг дозволить.
 */
export function trackPricingView() {
  trackStandard("ViewContent", "pricing_view", {
    content_name: "Клуб 432 — підписка",
    currency: "EUR",
    value: 25,
  });
}

/** Клік по звичайному посиланню на бот (не кнопка-CTA). Навмисно НЕ Lead,
    щоб не забруднювати головну конверсію, на яку оптимізується реклама. */
export function trackBotLinkClick(location: string) {
  track("bot_link_click", { location });
}
