export default function ContactCta() {
  return (
    <section
      id="contact"
      className="scroll-mt-16 border-t border-slate-100 bg-slate-50"
    >
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h2 className="font-serif text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl">
          당신의 원고가
          <br className="sm:hidden" /> 다음 한 권이 됩니다
        </h2>
        <p className="mx-auto mt-6 max-w-md text-base leading-loose text-slate-500">
          원고 투고와 강연·제휴, 대량 구매 문의를 기다립니다. 검토 후 영업일
          기준 7일 이내에 답변드립니다.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:contact@lifehacking.co.kr?subject=필로틱 원고 투고"
            className="border border-slate-900 bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-slate-900"
          >
            원고 투고하기
          </a>
          <a
            href="mailto:contact@lifehacking.co.kr?subject=필로틱 제휴 문의"
            className="px-6 py-3.5 text-sm font-bold text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline"
          >
            제휴 · 대량 구매 문의
          </a>
        </div>
      </div>
    </section>
  );
}
