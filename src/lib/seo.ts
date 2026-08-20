export const SITE_URL = "https://club432.com";
export const SITE_NAME = "Клуб 432";
export const SITE_TAGLINE = "Спільнота свідомого життя";
export const SITE_DESCRIPTION =
  "Клуб 432 — жива спільнота і система знань про себе: глибинна психологія та духовні закони, 8 онлайн-зустрічей на місяць із Вадимом Шпильчуком, база лекцій за 4 роки і закрите оточення. 25 € на місяць.";

/** Спільна OG-картинка (генерується в src/app/opengraph-image.tsx).
 *  Потрібна явно на сторінках, які задають власний блок openGraph — інакше
 *  Next.js «загубить» файлову картинку. */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} · ${SITE_TAGLINE}`,
};
