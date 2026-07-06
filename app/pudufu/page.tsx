import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/pudufu/Hero";
import Services from "@/components/pudufu/Services";
import Cases from "@/components/pudufu/Cases";
import Process from "@/components/pudufu/Process";
import ContactCta from "@/components/pudufu/ContactCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "프드프 | 부담없이 즐기는 상위 1% 지식",
  description:
    "전자책, 강의, 챌린지까지. 검증된 상위 1%의 노하우를 부담없는 가격으로 만나보세요. 글쓰기, AI, 마케팅, 심리 분야 베스트 콘텐츠.",
};

export default function PudufuPage() {
  return (
    <>
      <SiteHeader
        brandName="프드프"
        logoChar="프"
        logoClassName="bg-brand"
        links={[
          { href: "#services", label: "서비스" },
          { href: "#cases", label: "수강 후기" },
          { href: "#process", label: "이용 방법" },
          { href: "/philotic", label: "필로틱" },
          { href: "/careers", label: "채용" },
        ]}
        cta={{
          href: "#contact",
          label: "무료로 시작하기",
          className: "bg-brand hover:bg-brand-hover",
        }}
      />
      <main className="flex-1">
        <Hero />
        <Services />
        <Cases />
        <Process />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
