import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Метод 432 — цілісна система пізнання себе",
  description:
    "Метод 432 поєднує психологію (наукову та езотеричну), духовні закони, філософію і світові традиції в одну систему: тіло, психіка, Душа. Основа навчання Клубу 432.",
  alternates: { canonical: "/metod-432" },
  openGraph: {
    type: "article",
    url: "/metod-432",
    title: "Метод 432 — цілісна система пізнання себе",
    description:
      "Три рівні людини — тіло, психіка, Душа. Психологія, духовні закони, філософія і традиції в одній робочій системі.",
    images: [OG_IMAGE],
  },
};

export default function MetodLayout({ children }: { children: React.ReactNode }) {
  return children;
}
