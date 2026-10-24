import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/* Прев'ю посилання для сторінки Олега: без назви клубу, ціни і домену. */
export const alt = "Персональне ведення";
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 81% 49%, rgba(239,128,24,0.42) 0%, rgba(239,128,24,0.12) 20%, rgba(13,14,45,0) 40%)",
          }}
        />
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
            width: 780,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#FDD16F",
              marginBottom: 30,
            }}
          >
            Персональне глибинне ведення
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -1,
            }}
          >
            <span>Ви не мусите</span>
            <span>нести це самі.</span>
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.6)", marginTop: 34 }}>
            3 місяці · індивідуально
          </div>
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
