import type { Metadata, Viewport } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics from "@/components/Analytics";
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/seo";
import { GA_ID, FB_PIXEL_ID } from "@/lib/analytics";
import { content as C } from "@/content";
import "./globals.css";

/* Шрифти віддаємо зі свого домену (next/font). Раніше сторінка чекала на
   fonts.googleapis.com + fonts.gstatic.com — два зайві зʼєднання, які на
   мобільному інтернеті коштують сотні мілісекунд до першого тексту.
   Fraunces не має кирилиці (тільки латиниця й цифри) — українські заголовки
   і далі малюються системним Georgia, як було. */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="uk" className={`${fraunces.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {/* ── Google Analytics 4 ── */}
        {GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
              }}
            />
          </>
        ) : null}

        {/* ── Meta Pixel (базовий код — має бути саме в <head>) ── */}
        {FB_PIXEL_ID ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${FB_PIXEL_ID}');fbq('track','PageView');`,
            }}
          />
        ) : null}
      </head>
      <body>
        {FB_PIXEL_ID ? (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              alt=""
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        ) : null}
        {children}
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
