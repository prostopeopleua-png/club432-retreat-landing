import type { Metadata } from "next";
import Link from "next/link";
import CosmicBackground from "@/components/CosmicBackground";
import ValuesTest from "./ValuesTest";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Тест на цінності — обери свої 10",
  description:
    "Безкоштовна вправа на 3 хвилини: обери зі списку все, що відгукується, і залиш десять головних цінностей. Побачиш, навколо чого зібралося твоє життя зараз.",
  alternates: { canonical: "/tsinnosti" },
  openGraph: {
    type: "article",
    url: "/tsinnosti",
    title: "Тест на цінності — обери свої 10",
    description: "Три хвилини, 89 цінностей і чесна десятка. Побачиш, про що для тебе життя зараз.",
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return (
    <>
      <CosmicBackground />
      <main className="relative z-10 min-h-[100svh] py-16 md:py-24">
        <div className="mx-auto mb-10 w-full max-w-4xl px-5">
          <Link href="/" className="text-sm text-white/45 transition-colors hover:text-[var(--c432-amber)]">
            ← Клуб 432
          </Link>
        </div>
        <ValuesTest />
      </main>
    </>
  );
}
