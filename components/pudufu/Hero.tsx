const STATS = [
  { value: "38,000+", label: "누적 수강생" },
  { value: "4.9점", label: "평균 강의 평점" },
  { value: "300+", label: "전자책 · 강의 · 챌린지" },
];

export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-4 py-1.5 text-sm font-bold text-accent">
          오늘은 어떤 지식을 만나실 건가요?
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
          부담없이 즐기는
          <br />
          <span className="text-accent">상위 1% 지식</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          글쓰기, AI, 마케팅, 심리까지. 수만 명이 검증한 상위 1%의 노하우를
          전자책과 강의, 챌린지로 부담없는 가격에 만나보세요. 인생 난이도가
          &lsquo;매우 쉬움&rsquo;으로 바뀝니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#contact"
            className="btn-primary inline-flex min-h-[46px] items-center justify-center rounded-full px-8 text-base font-bold transition hover:-translate-y-0.5"
          >
            무료 강의로 시작하기
          </a>
          <a
            href="#services"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-hairline bg-white/8 px-8 text-base font-bold text-white transition hover:bg-white/15"
          >
            콘텐츠 둘러보기
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-hairline pt-8 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-black text-white sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
