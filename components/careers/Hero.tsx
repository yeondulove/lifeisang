export default function Hero() {
  return (
    <section className="bg-brand-soft">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-4 py-1.5 text-sm font-bold text-brand">
          라이프해킹(주) 채용
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          인생의 난이도를 낮추는 일,
          <br />
          <span className="text-brand">함께할 동료</span>를 찾습니다
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          강의 플랫폼 프드프와 출판사 필로틱을 통해, 우리는 검증된 지식을 가장
          배우기 좋은 형태로 만듭니다. 더 많은 사람의 삶을 바꾸는 이 일에 함께할
          분을 기다립니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#positions"
            className="rounded-full bg-brand px-8 py-4 text-center text-base font-bold text-white transition hover:bg-brand-hover"
          >
            채용 중인 포지션 보기
          </a>
          <a
            href="#culture"
            className="rounded-full border border-slate-300 bg-white px-8 py-4 text-center text-base font-bold text-slate-800 transition hover:border-brand hover:text-brand"
          >
            일하는 방식 알아보기
          </a>
        </div>
      </div>
    </section>
  );
}
