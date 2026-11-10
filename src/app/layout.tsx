
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wemdibs.com"),
  title: "작은얼굴관리, 바디, 스킨 관리 | 위엠디 에스테틱",
  description:
    "작은얼굴관리부터 바디, 스킨 관리까지 위엠디 에스테틱 공식 홈페이지. 본점은 강동구 둔촌동역에서 1분입니다.",
  openGraph: {
    siteName: "위엠디 에스테틱",
    locale: "ko_KR",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

// 모바일 핀치 줌 완전 차단
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}