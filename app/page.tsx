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
    logoChar: "프",
  },
  {
    name: "필로틱",
    href: "/philotic",
    category: "출판사",
    tagline: "단단한 삶을 만드는 한 권의 책",
    description:
      "『완벽한 원시인』, 『프로이트의 감정수업』 등 베스트셀러를 만든 출판사. 심리, 부, 인간 본성을 깊이 있게 다룹니다.",
    highlights: ["출간 도서 7종+", "베스트셀러 다수", "원고 투고 상시"],
    logoChar: "필",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader
        logoSrc="/logo/lifehacking-mark.png"
        logoAlt="라이프해킹"
        logoBoxClass="h-7 w-7"
        brandName="라이프해킹"
        links={[
          { href: "/pudufu", label: "프드프" },
          { href: "/philotic", label: "필로틱" },
          { href: "#brands", label: "브랜드" },
          { href: "/careers", label: "채용" },
        ]}
        cta={{ href: "#contact", label: "문의하기" }}
      />
      <main className="flex-1">
        {/* 히어로 */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-4 py-1.5 text-sm font-medium text-accent">
                LIFEHACKING Inc.
              </span>
              <h1 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
                작은 습관이
                <br />큰 삶을 만든다
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                라이프해킹(주)는 삶을 더 잘 관리하고 더 깊이 살아내는 실천을 위한
                강의와 책을 만듭니다. 강의 플랫폼 프드프와 출판사 필로틱으로 오늘의
                나를 조금 더 선명하게 만드는 지혜를 전합니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#brands"
                  className="btn-primary inline-flex min-h-[46px] items-center gap-2 rounded-full px-7 text-base font-bold transition hover:-translate-y-0.5"
                >
                  브랜드 살펴보기
                  <span aria-hidden>↓</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-[46px] items-center rounded-full border border-hairline bg-white/8 px-7 text-base font-bold text-white transition hover:bg-white/15"
                >
                  문의하기
                </a>
              </div>
            </div>

            {/* 히어로 카드 */}
            <div className="glass rounded-3xl p-6 shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5">
                <img
                  src="/books/gangpung.jpg"
                  alt="강풍에도 쓰러지지 않는다 표지"
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mt-5 text-lg font-bold text-white">이번 달 추천 도서</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                혼란스러운 시대에 흔들리지 않는 마음을 만드는 방법을 담은
                『강풍에도 쓰러지지 않는다』.
              </p>
              <a
                href="/philotic"
                className="mt-4 inline-flex text-sm font-bold text-accent transition hover:text-white"
              >
                필로틱에서 보기 →
              </a>
            </div>
          </div>
        </section>

        {/* 브랜드 소개 */}
        <section id="brands" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-accent">
                  Our Brands
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  두 개의 브랜드, 하나의 목표
                </h2>
              </div>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
              {BRANDS.map((brand) => (
                <div
                  key={brand.name}
                  className="glass flex flex-col rounded-3xl p-8 transition hover:-translate-y-1 hover:border-accent/40 sm:p-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-strong text-lg font-black text-[#052035]">
                      {brand.logoChar}
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-white">
                        {brand.name}
                      </h3>
                      <p className="text-xs font-bold text-muted">
                        {brand.category}
                      </p>
                    </div>
                  </div>
                  <p className="mt-6 text-lg font-bold text-accent">
                    {brand.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {brand.description}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {brand.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-hairline bg-white/5 px-3 py-1 text-xs font-bold text-muted"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={brand.href}
                    className="btn-primary mt-8 rounded-full px-6 py-3.5 text-center text-base font-bold transition hover:-translate-y-0.5"
                  >
                    {brand.name} 바로가기
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 문의 CTA */}
        <section id="contact" className="scroll-mt-16">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="glass rounded-3xl px-6 py-16 text-center sm:px-10">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                함께 만들고 싶은 일이 있나요?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
                제휴, 강의 입점, 원고 투고, 채용까지. 라이프해킹(주)와 함께할
                제안을 기다립니다.
              </p>
              <div className="mt-9 flex justify-center">
                <a
                  href="mailto:contact@lifehacking.co.kr?subject=라이프해킹 문의"
                  className="btn-primary inline-flex min-h-[46px] items-center rounded-full px-8 text-base font-bold transition hover:-translate-y-0.5"
                >
                  이메일 문의하기
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
