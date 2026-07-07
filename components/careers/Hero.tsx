export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-white/5 px-4 py-1.5 text-sm font-bold text-accent">
          라이프해킹(주) 채용
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
          인생의 난이도를 낮추는 일,
          <br />
          <span className="text-accent">함께할 동료</span>를 찾습니다
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          강의 플랫폼 프드프와 출판사 필로틱을 통해, 우리는 검증된 지식을 가장
          배우기 좋은 형태로 만듭니다. 더 많은 사람의 삶을 바꾸는 이 일에 함께할
          분을 기다립니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#positions"
            className="btn-primary inline-flex min-h-[46px] items-center justify-center rounded-full px-8 text-base font-bold transition hover:-translate-y-0.5"
          >
            채용 중인 포지션 보기
          </a>
          <a
            href="#culture"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-hairline bg-white/8 px-8 text-base font-bold text-white transition hover:bg-white/15"
          >
            일하는 방식 알아보기
          </a>
        </div>
      </div>
    </section>
  );
}
