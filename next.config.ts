import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    // Ретрит у Карпатах уже минув. Саму сторінку не чіпаємо: вона лишається
    // як орієнтир для наступної події. Але ховаємо її від пошуку, щоб ніхто
    // не прийшов з Google на закритий продаж. Заголовок дозволяє прибрати
    // сторінку з індексу, не редагуючи її власний код (на відміну від
    // robots.txt Disallow, який лише забороняє обхід і лишає URL в індексі).
    return [
      {
        source: "/:path(retreat-carpathians|oferta-retreat)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  images: {
    // Обкладинки лекцій беремо просто з YouTube — вони публічні навіть
    // для unlisted-відео, тож дублювати їх у репозиторій нема сенсу.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
