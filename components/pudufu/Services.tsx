const SERVICES = [
  {
    icon: "📚",
    name: "전자책",
    tagline: "핵심만 담은 지식 요약본",
    description:
      "초사고 글쓰기, 인간 분석 도구 등 수만 명이 선택한 베스트셀러 전자책을 어디서든 부담없이 읽어보세요.",
  },
  {
    icon: "🎬",
    name: "VOD 강의",
    tagline: "검증된 전문가의 실전 강의",
    description:
      "AI 활용, 마케팅, 콘텐츠 창작까지. 현업에서 결과를 만든 전문가의 강의를 원하는 속도로 수강하세요.",
  },
  {
    icon: "🔥",
    name: "챌린지",
    tagline: "함께하니까 끝까지 간다",
    description:
      "혼자서는 작심삼일이어도 괜찮아요. 같은 목표를 가진 사람들과 미션을 수행하며 실행력을 만들어갑니다.",
  },
  {
    icon: "🧡",
    name: "구독 멤버십",
    tagline: "모든 지식을 한 번에",
    description:
      "월 구독 하나로 전자책과 강의를 자유롭게. 새로 올라오는 콘텐츠도 추가 비용 없이 즐길 수 있습니다.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-bold uppercase tracking-widest text-brand">
          Services
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          지식을 즐기는 네 가지 방법
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          읽고, 보고, 실행하고, 구독하세요. 어떤 방식이든 아무도 알려주지 않던
          상위 1%의 노하우가 여러분의 것이 됩니다.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <div
              key={service.name}
              className="group rounded-2xl border border-slate-200 p-8 transition hover:-translate-y-1 hover:border-brand hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-2xl" aria-hidden>
                {service.icon}
              </span>
              <h3 className="mt-4 text-xl font-bold">{service.name}</h3>
              <p className="mt-1 text-sm font-bold text-brand">
                {service.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
