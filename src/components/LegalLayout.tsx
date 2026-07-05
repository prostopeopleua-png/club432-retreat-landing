import Link from "next/link";
import type { ReactNode } from "react";

export type LegalBlock =
  | { type: "h"; text: string }
  | { type: "p"; text: string };

export function LegalLayout({
  title,
  updated,
  blocks,
  footer,
}: {
  title: string;
  updated?: string;
  blocks: LegalBlock[];
  footer?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--c432-bg)] text-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-[var(--c432-amber)]"
        >
          ← На головну
        </Link>

        <h1 className="grad-text mb-3 text-3xl font-bold leading-tight md:text-4xl">
          {title}
        </h1>
        {updated && (
          <p className="mb-10 text-sm text-white/40">Оновлено: {updated}</p>
        )}

        <div className="space-y-5 text-[15px] leading-relaxed text-white/75">
          {blocks.map((b, i) =>
            b.type === "h" ? (
              <h2
                key={i}
                className="pt-6 text-lg font-semibold text-white first:pt-0"
              >
                {b.text}
              </h2>
            ) : (
              <p key={i}>{b.text}</p>
            )
          )}
        </div>

        {footer && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-[var(--c432-bg-lift)] p-6 text-sm text-white/70">
            {footer}
          </div>
        )}

        <footer className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} Клуб 432 · ФОП Шпильчук Вадим Дмитрович
        </footer>
      </div>
    </main>
  );
}
