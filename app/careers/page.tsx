import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/careers/Hero";
import Culture from "@/components/careers/Culture";
import Positions from "@/components/careers/Positions";
import ApplyCta from "@/components/careers/ApplyCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "채용 | 라이프해킹(주)와 함께할 동료를 찾습니다",
  description:
    "강의 플랫폼 프드프와 출판사 필로틱을 만드는 라이프해킹(주)의 채용 정보. 콘텐츠 마케터, 강의 PD, 편집자, 개발자 등 상시 채용 중입니다.",
};

export default function CareersPage() {
  return (
    <>
      <SiteHeader
        logoSrc="/logo/lifehacking-mark.png"
        logoAlt="라이프해킹"
        logoBoxClass="h-7 w-7"
        brandName="라이프해킹"
        links={[
          { href: "#culture", label: "문화" },
          { href: "#positions", label: "채용 포지션" },
          { href: "/about", label: "회사 소개" },
        ]}
        cta={{ href: "#apply", label: "지원하기" }}
      />
      <main className="flex-1">
        <Hero />
        <Culture />
        <Positions />
        <ApplyCta />
      </main>
      <Footer />
    </>
  );
}
