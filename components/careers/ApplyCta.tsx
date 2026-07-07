export default function ApplyCta() {
  return (
    <section id="apply" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="glass rounded-3xl px-6 py-16 text-center sm:px-10">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            당신의 이야기가 궁금합니다
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            이력서와 함께, 왜 우리와 함께하고 싶은지 짧게 들려주세요. 딱 맞는
            공고가 없어도 상시로 지원을 환영합니다.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="mailto:hr.dev@isanghan.co.kr?subject=[라이프해킹 지원] 입사 지원"
              className="btn-primary inline-flex min-h-[46px] items-center justify-center rounded-full px-8 text-base font-bold transition hover:-translate-y-0.5"
            >
              이메일로 지원하기
            </a>
          </div>

          <p className="mt-6 text-sm text-muted">
            채용 문의: hr.dev@isanghan.co.kr
          </p>
        </div>
      </div>
    </section>
  );
}
