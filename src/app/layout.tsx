import type { Metadata, Viewport } from "next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics from "@/components/Analytics";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/seo";
import { content as C } from "@/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Клуб 432",
    "Вадим Шпильчук",
    "духовний розвиток",
    "глибинна психологія",
    "пізнати себе",
    "медитація українською",
    "духовна спільнота",
    "онлайн лекції про свідомість",
  ],
  authors: [{ name: "Вадим Шпильчук", url: SITE_URL }],
  creator: "Вадим Шпильчук",
  publisher: "ФОП Шпильчук Вадим Дмитрович",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "uk_UA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#0D0E2D",
  colorScheme: "dark",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-mandala.svg`,
      description: SITE_DESCRIPTION,
      email: "prosto.people.ua@gmail.com",
      founder: {
        "@type": "Person",
        "@id": `${SITE_URL}#vadym`,
        name: C.author.name,
        jobTitle: "Духовний учитель, наставник",
        description: C.author.bio,
        url: SITE_URL,
      },
      sameAs: [
        C.botUrl,
        "https://www.youtube.com/channel/UC2U67S-t-YQbaKRXLbo65Ug",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "uk-UA",
      description: SITE_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
