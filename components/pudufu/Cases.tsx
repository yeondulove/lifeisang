const CASES = [
  {
    quote:
      "글쓰기가 막막했는데 초사고 글쓰기를 만나고 콘텐츠 조회수가 13배 늘었어요. 블로그 매출도 15배가 됐습니다. 배운 대로 썼을 뿐인데요.",
    name: "김OO님 (콘텐츠 크리에이터)",
    program: "초사고 글쓰기",
    result: "조회수 13배 · 매출 15배 상승",
  },
  {
    quote:
      "AI는 남 얘기라고 생각했던 평범한 직장인입니다. 강의에서 배운 자동화로 부업을 시작했고, 지금은 월 수익이 본업을 넘었어요.",
    name: "박OO님 (직장인)",
    program: "일반인을 위한 AI 올인원",
    result: "부업 월 수익 2,200만 원 달성",
  },
  {
    quote:
      "심리 강의가 이렇게 실용적일 줄 몰랐어요. 사람을 이해하는 관점이 바뀌니 영업 성과부터 인간관계까지 전부 달라졌습니다.",
    name: "이OO님 (소상공인)",
    program: "인간을 분석하는 6가지 도구",
    result: "재구매율 2배 · 단골 고객 확보",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="scroll-mt-16 bg-brand-soft">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-bold uppercase tracking-widest text-brand">
          Reviews
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          수강생이 직접 만든 변화
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          평균 평점 4.9점. 숫자보다 확실한 건 수강생들의 실제 이야기입니다.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CASES.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand/10"
            >
              <p className="text-brand" aria-label="별점 5점 만점에 5점">
                ★★★★★
              </p>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-slate-100 pt-5">
                <p className="text-sm font-bold">{item.name}</p>
                <p className="mt-0.5 text-xs text-slate-500">{item.program}</p>
                <p className="mt-3 inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-hover">
                  {item.result}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
