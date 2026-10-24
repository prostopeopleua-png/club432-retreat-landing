import type { Metadata } from "next";
import VedennyaClient from "../VedennyaClient";
import { OLEH } from "../content/oleh";

/* Сторінка лише за посиланням: не в меню, не в sitemap, noindex/nofollow.
   Показуємо в прямому ефірі, пошуковики не індексують.
   Без назви клубу ні у вкладці, ні в прев'ю посилання (шле Вадим у WhatsApp). */
export const metadata: Metadata = {
  title: { absolute: "Персональне ведення" },
  description: "Персональне глибинне ведення. 3 місяці індивідуальної трансформації.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: undefined },
  openGraph: { title: "Персональне ведення", description: "3 місяці індивідуальної трансформації." },
  twitter: { title: "Персональне ведення", description: "3 місяці індивідуальної трансформації." },
};

export default function VedennyaOPage() {
  return <VedennyaClient p={OLEH} />;
}
