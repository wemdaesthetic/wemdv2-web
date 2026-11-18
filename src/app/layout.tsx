
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";

// 구글 애널리틱스(GA4) 측정 ID
const GA_ID = "G-BXEB96775L";

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
  verification: {
    other: {
      "naver-site-verification": "06d6585199e76ad057b3c30e5ee99f80a86fff80",
    },
  },
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
      <body className="font-sans antialiased">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
        </Script>
      </body>
    </html>
  );
}