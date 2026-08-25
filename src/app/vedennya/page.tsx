import type { Metadata } from "next";
import VedennyaClient from "./VedennyaClient";

/* Сторінка лише за посиланням: не в меню, не в sitemap, noindex/nofollow.
   Показуємо в прямому ефірі, пошуковики не індексують. */
export const metadata: Metadata = {
  title: "Персональне ведення",
  description: "Персональне глибинне ведення. 3 місяці індивідуальної трансформації.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: undefined },
  openGraph: { title: "Персональне ведення", description: "3 місяці індивідуальної трансформації." },
};

export default function VedennyaPage() {
  return <VedennyaClient />;
}
