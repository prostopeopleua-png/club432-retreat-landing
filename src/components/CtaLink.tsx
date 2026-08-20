"use client";

import { trackSubscribeClick } from "@/lib/analytics";

/**
 * Кнопка «Стати учасником». Веде в бот і надсилає подію конверсії
 * (GA4: subscribe_click, Meta Pixel: Lead) з міткою місця кліку.
 */
export default function CtaLink({
  href,
  location,
  className,
  children,
}: {
  href: string;
  location: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackSubscribeClick(location)}
    >
      {children}
    </a>
  );
}
