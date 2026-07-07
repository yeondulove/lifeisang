import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const notoSerifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "라이프해킹(주) | 인생의 난이도를 낮추는 배움과 책",
  description:
    "라이프해킹(주)는 강의 플랫폼 프드프와 출판사 필로틱을 운영합니다. 검증된 지식을 가장 배우기 좋은 형태로 만듭니다.",
  openGraph: {
    title: "라이프해킹(주)",
    description: "인생의 난이도를 낮추는 배움과 책 — 프드프 · 필로틱",
    url: "https://lifehacking.co.kr",
    siteName: "라이프해킹",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKr.variable} ${notoSerifKr.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
      </body>
    </html>
  );
}
