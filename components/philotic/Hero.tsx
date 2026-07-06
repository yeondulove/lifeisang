const STATS = [
  { value: "6종+", label: "출간 도서" },
  { value: "3종", label: "베스트셀러 선정" },
  { value: "10만+", label: "독자와의 만남" },
];

export default function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white px-4 py-1.5 text-sm font-bold text-ink">
          출판사 필로틱
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
          단단한 삶을 만드는
          <br />
          <span className="underline decoration-brand decoration-4 underline-offset-8">
            한 권의 책
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          필로틱은 심리, 부, 인간 본성을 깊이 있게 다루는 책을 만듭니다.
          『역행자』, 『완벽한 원시인』, 『프로이트의 감정수업』 등 베스트셀러로
          검증된 통찰을 독자에게 전합니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#books"
            className="rounded-full bg-ink px-8 py-4 text-center text-base font-bold text-white transition hover:bg-ink-hover"
          >
            출간 도서 보기
          </a>
          <a
            href="#contact"
            className="rounded-full border border-ink/30 bg-white px-8 py-4 text-center text-base font-bold text-ink transition hover:border-ink"
          >
            원고 투고 · 제휴 문의
          </a>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8 sm:gap-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm text-slate-500">{stat.label}</dt>
              <dd className="mt-1 text-2xl font-black text-ink sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
