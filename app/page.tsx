import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

const BRANDS = [
  {
    name: "프드프",
    href: "/pudufu",
    category: "온라인 강의 플랫폼",
    tagline: "부담없이 즐기는 상위 1% 지식",
    description:
      "전자책, VOD 강의, 챌린지까지. 글쓰기·AI·마케팅·심리 분야의 검증된 노하우를 부담없는 가격으로 제공합니다.",
    highlights: ["누적 수강생 38,000+", "평균 평점 4.9점", "콘텐츠 300+"],
    cardClass: "bg-brand-soft border-brand/20 hover:border-brand",
    accentClass: "text-brand",
    buttonClass: "bg-brand hover:bg-brand-hover",
    logoClass: "bg-brand",
    logoChar: "프",
  },
  {
    name: "필로틱",
    href: "/philotic",
    category: "출판사",
    tagline: "단단한 삶을 만드는 한 권의 책",
    description:
      "『역행자』, 『완벽한 원시인』, 『프로이트의 감정수업』 등 베스트셀러를 만든 출판사. 심리, 부, 인간 본성을 깊이 있게 다룹니다.",
    highlights: ["출간 도서 6종+", "베스트셀러 3종", "원고 투고 상시"],
    cardClass: "bg-paper border-ink/20 hover:border-ink",
    accentClass: "text-ink",
    buttonClass: "bg-ink hover:bg-ink-hover",
    logoClass: "bg-ink",
    logoChar: "필",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader
        brandName="라이프해킹"
        logoChar="L"
        logoClassName="bg-slate-900"
        links={[
          { href: "/pudufu", label: "프드프" },
          { href: "/philotic", label: "필로틱" },
          { href: "#brands", label: "브랜드" },
          { href: "/careers", label: "채용" },
        ]}
        cta={{
          href: "#contact",
          label: "문의하기",
          className: "bg-brand hover:bg-brand-hover",
        }}
      />
      <main className="flex-1">
        {/* 히어로 */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 text-center sm:px-6 sm:pb-28 sm:pt-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-bold text-slate-700">
              LIFEHACKING Inc.
            </span>
            <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              인생의 난이도를 낮추는
              <br />
              <span className="text-brand">배움</span>과{" "}
              <span className="text-ink">책</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              라이프해킹(주)는 강의 플랫폼 프드프와 출판사 필로틱을 운영합니다.
              검증된 지식을 가장 배우기 좋은 형태로 만들어, 누구나 더 나은
              선택을 할 수 있도록 돕습니다.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="/pudufu"
                className="w-full rounded-full bg-brand px-8 py-4 text-base font-bold text-white transition hover:bg-brand-hover sm:w-auto"
              >
                프드프 바로가기
              </a>
              <a
                href="/philotic"
                className="w-full rounded-full bg-ink px-8 py-4 text-base font-bold text-white transition hover:bg-ink-hover sm:w-auto"
              >
                필로틱 바로가기
              </a>
            </div>
          </div>
        </section>

        {/* 브랜드 소개 */}
        <section id="brands" className="scroll-mt-16 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="text-center text-sm font-bold uppercase tracking-widest text-slate-500">
              Our Brands
            </p>
            <h2 className="mt-3 text-center text-3xl font-black tracking-tight sm:text-4xl">
              두 개의 브랜드, 하나의 목표
            </h2>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {BRANDS.map((brand) => (
                <div
                  key={brand.name}
                  className={`flex flex-col rounded-3xl border p-8 transition hover:-translate-y-1 hover:shadow-lg sm:p-10 ${brand.cardClass}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-black text-white ${brand.logoClass}`}
                    >
                      {brand.logoChar}
                    </span>
                    <div>
                      <h3 className="text-xl font-black">{brand.name}</h3>
                      <p className="text-xs font-bold text-slate-500">
                        {brand.category}
                      </p>
                    </div>
                  </div>
                  <p className={`mt-6 text-lg font-bold ${brand.accentClass}`}>
                    {brand.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {brand.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {brand.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={brand.href}
                    className={`mt-8 rounded-full px-6 py-3.5 text-center text-base font-bold text-white transition ${brand.buttonClass}`}
                  >
                    {brand.name} 바로가기
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 문의 CTA */}
        <section
          id="contact"
          className="scroll-mt-16 bg-gradient-to-r from-brand to-brand-bright"
        >
          <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              함께 만들고 싶은 일이 있나요?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-orange-50">
              제휴, 강의 입점, 원고 투고, 채용까지. 라이프해킹(주)와 함께할
              제안을 기다립니다.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="mailto:contact@lifehacking.co.kr?subject=라이프해킹 문의"
                className="w-full rounded-full bg-white px-8 py-4 text-base font-bold text-brand-hover transition hover:bg-brand-soft sm:w-auto"
              >
                이메일 문의하기
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
