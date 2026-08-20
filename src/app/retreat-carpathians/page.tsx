import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";
import Hero from "@/components/Hero";
import Transform from "@/components/Transform";
import Program from "@/components/Program";
import Schedule from "@/components/Schedule";
import Location from "@/components/Location";
import Guides from "@/components/Guides";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import StickyBar from "@/components/StickyBar";

export const metadata: Metadata = {
  title: "Ретрит 432 в Карпатах · 12–16 червня 2026",
  description:
    "П'ять днів духовних практик, трансформації та перезавантаження в серці Карпат. Йога, медитація, гра Ліла, кристалохілінг. Seven Hills, Яблуниця.",
  alternates: { canonical: "/retreat-carpathians" },
  openGraph: {
    type: "article",
    url: "/retreat-carpathians",
    title: "Ретрит 432 в Карпатах · 12–16 червня 2026",
    description:
      "П'ять днів духовних практик і перезавантаження в серці Карпат. Йога, медитація, гра Ліла, кристалохілінг.",
    images: [OG_IMAGE],
  },
};

export default function RetreatPage() {
  return (
    <main>
      <Hero />
      <Transform />
      <Program />
      <Schedule />
      <Location />
      <Guides />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <StickyBar />
    </main>
  );
}
