import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
