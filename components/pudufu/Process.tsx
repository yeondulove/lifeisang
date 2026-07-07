const STEPS = [
  {
    step: "01",
    title: "관심 분야 찾기",
    description:
      "글쓰기, AI, 마케팅, 심리 중 지금 나에게 필요한 주제를 골라보세요. 무료 콘텐츠로 가볍게 시작해도 좋습니다.",
  },
  {
    step: "02",
    title: "내 방식대로 배우기",
    description:
      "전자책으로 빠르게 훑거나, VOD 강의로 깊이 있게. 원하는 시간에 원하는 속도로 수강하세요.",
  },
  {
    step: "03",
    title: "챌린지로 실행하기",
    description:
      "배운 것을 미션으로 직접 실행합니다. 함께하는 동료들 덕분에 작심삼일로 끝나지 않아요.",
  },
  {
    step: "04",
    title: "성과로 증명하기",
    description:
      "조회수, 매출, 수익까지. 배움이 실제 결과로 이어지는 순간을 경험하세요.",
  },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          시작부터 성과까지, 4단계
        </h2>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => (
            <li key={item.step} className="glass rounded-2xl p-6">
              <span className="text-4xl font-black text-accent">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
