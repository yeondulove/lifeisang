export default function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-16 bg-brand">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          인생 난이도를{" "}
          <br className="sm:hidden" />
          &lsquo;매우 쉬움&rsquo;으로 바꿔보세요
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-orange-50">
          무료 강의부터 부담없이 시작하세요. 어떤 콘텐츠가 맞을지 고민된다면
          문의 주시면 친절히 안내해 드립니다.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="https://pudufu.co.kr/"
            className="w-full rounded-full bg-white px-8 py-4 text-base font-bold text-brand transition hover:bg-orange-50 sm:w-auto"
          >
            무료 강의로 시작하기
          </a>
          <a
            href="mailto:contact@pudufu.co.kr?subject=프드프 문의"
            className="w-full rounded-full border border-white/50 px-8 py-4 text-base font-bold text-white transition hover:border-white hover:bg-brand-hover sm:w-auto"
          >
            이메일 문의하기
          </a>
        </div>

        <p className="mt-6 text-sm text-orange-100">
          가입비 없음 · 무료 콘텐츠 다수 · 원할 때 언제든 해지 가능
        </p>
      </div>
    </section>
  );
}
