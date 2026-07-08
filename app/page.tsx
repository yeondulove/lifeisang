import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "라이프해킹 — 인생을 바꾸는 콘텐츠 컴퍼니",
  description:
    "라이프해킹은 출판 브랜드 필로틱과 지식 콘텐츠 플랫폼 프드프를 운영하는 콘텐츠 컴퍼니입니다.",
};

export default function Home() {
  return <AboutContent />;
}
