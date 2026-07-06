import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/philotic/Hero";
import Books from "@/components/philotic/Books";
import ContactCta from "@/components/philotic/ContactCta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "필로틱 | 단단한 삶을 만드는 한 권의 책",
  description:
    "역행자, 완벽한 원시인, 프로이트의 감정수업 등 베스트셀러를 만든 출판사 필로틱. 심리, 부, 인간 본성을 깊이 있게 다룹니다.",
};

export default function PhiloticPage() {
  return (
    <>
      <SiteHeader
        brandName="필로틱"
        logoChar="필"
        logoClassName="bg-ink"
        links={[
          { href: "#books", label: "출간 도서" },
          { href: "#contact", label: "문의" },
          { href: "/pudufu", label: "프드프" },
          { href: "/careers", label: "채용" },
        ]}
        cta={{
          href: "#books",
          label: "도서 살펴보기",
          className: "bg-ink hover:bg-ink-hover",
        }}
      />
      <main className="flex-1">
        <Hero />
        <Books />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
