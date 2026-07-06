export default function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-16 bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          당신의 원고가
          <br className="sm:hidden" /> 다음 베스트셀러가 될 수 있습니다
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-300">
          원고 투고, 강연·제휴, 대량 구매 문의를 기다립니다. 검토 후 영업일
          기준 7일 이내에 답변드립니다.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href="mailto:contact@lifehacking.co.kr?subject=필로틱 원고 투고"
            className="w-full rounded-full bg-white px-8 py-4 text-base font-bold text-ink transition hover:bg-paper sm:w-auto"
          >
            원고 투고하기
          </a>
          <a
            href="mailto:contact@lifehacking.co.kr?subject=필로틱 제휴 문의"
            className="w-full rounded-full border border-white/40 px-8 py-4 text-base font-bold text-white transition hover:border-white hover:bg-ink-hover sm:w-auto"
          >
            제휴 · 대량 구매 문의
          </a>
        </div>
      </div>
    </section>
  );
}
