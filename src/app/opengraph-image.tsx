import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Клуб 432 · Спільнота свідомого життя";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [semibold, regular, mandala] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/Montserrat-SemiBold.ttf")),
    readFile(join(process.cwd(), "src/app/_og/Montserrat-Regular.ttf")),
    readFile(join(process.cwd(), "public/logo-mandala-fire.svg"), "utf-8"),
  ]);
  const mandalaSrc = `data:image/svg+xml;base64,${Buffer.from(mandala).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(140deg, #07081B 0%, #0D0E2D 55%, #151538 100%)",
          fontFamily: "Montserrat",
          color: "#fff",
        }}
      >
        {/* тепле сяйво позаду мандали */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 81% 49%, rgba(239,128,24,0.42) 0%, rgba(239,128,24,0.12) 20%, rgba(13,14,45,0) 40%)",
          }}
        />
        {/* мандала */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mandalaSrc}
          alt=""
          width={620}
          height={620}
          style={{ position: "absolute", right: -110, top: 5, opacity: 0.95 }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
            width: 760,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#FDD16F",
              marginBottom: 26,
            }}
          >
            Спільнота свідомого життя
          </div>
          <div style={{ fontSize: 116, fontWeight: 600, lineHeight: 1, letterSpacing: -2 }}>
            Клуб 432
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.78)",
              marginTop: 28,
            }}
          >
            <span>Глибинна психологія та духовні закони.</span>
            <span>Живі зустрічі з Вадимом Шпильчуком.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 44 }}>
            <div
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 999,
                background: "linear-gradient(90deg, #FDD16F, #EF8018)",
                color: "#0D0E2D",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              25 € / міс
            </div>
            <div style={{ fontSize: 24, color: "rgba(255,255,255,0.6)" }}>
              8 живих зустрічей на місяць
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 72,
            bottom: 44,
            fontSize: 22,
            color: "rgba(255,255,255,0.42)",
          }}
        >
          club432.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: semibold, weight: 600, style: "normal" },
        { name: "Montserrat", data: regular, weight: 400, style: "normal" },
      ],
    }
  );
}
