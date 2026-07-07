export default function ContactCta() {
  return (
    <section id="contact" className="scroll-mt-16 border-t border-hairline">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <h2 className="font-serif text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
          당신의 원고가
          <br className="sm:hidden" /> 다음 한 권이 됩니다
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-loose text-muted">
          원고 투고와 강연·제휴, 대량 구매 문의를 기다립니다. 검토 후 영업일
          기준 7일 이내에 답변드립니다.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:contact@lifehacking.co.kr?subject=필로틱 원고 투고"
            className="btn-primary inline-flex min-h-[46px] items-center justify-center rounded-full px-8 text-sm font-bold transition hover:-translate-y-0.5"
          >
            원고 투고하기
          </a>
          <a
            href="mailto:contact@lifehacking.co.kr?subject=필로틱 제휴 문의"
            className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-hairline bg-white/8 px-8 text-sm font-bold text-white transition hover:bg-white/15"
          >
            제휴 · 대량 구매 문의
          </a>
        </div>
      </div>
    </section>
  );
}
