export default function ApplyCta() {
  return (
    <section
      id="apply"
      className="scroll-mt-16 bg-gradient-to-r from-brand to-brand-bright"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          당신의 이야기가 궁금합니다
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-orange-50">
          이력서와 함께, 왜 우리와 함께하고 싶은지 짧게 들려주세요. 딱 맞는
          공고가 없어도 상시로 지원을 환영합니다.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="mailto:hr.dev@isanghan.co.kr?subject=[라이프해킹 지원] 입사 지원"
            className="w-full rounded-full bg-white px-8 py-4 text-base font-bold text-brand-hover transition hover:bg-brand-soft sm:w-auto"
          >
            이메일로 지원하기
          </a>
        </div>

        <p className="mt-6 text-sm text-orange-100">
          채용 문의: hr.dev@isanghan.co.kr
        </p>
      </div>
    </section>
  );
}
