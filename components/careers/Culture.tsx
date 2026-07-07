const VALUES = [
  {
    icon: "🎯",
    title: "결과로 증명합니다",
    description:
      "직급이나 연차가 아니라, 실제로 만들어낸 변화로 이야기합니다. 좋은 아이디어는 누구의 것이든 채택됩니다.",
  },
  {
    icon: "📚",
    title: "배움을 파는 만큼, 배웁니다",
    description:
      "우리는 지식을 다루는 회사입니다. 성장하지 않는 팀은 좋은 콘텐츠를 만들 수 없다고 믿습니다.",
  },
  {
    icon: "⚡",
    title: "빠르게 실행하고 개선합니다",
    description:
      "완벽한 기획보다 빠른 실행과 데이터 기반의 개선을 선호합니다. 실패는 비용이 아니라 학습입니다.",
  },
  {
    icon: "🤝",
    title: "솔직하게 소통합니다",
    description:
      "돌려 말하지 않고, 근거를 가지고 직접 말합니다. 건강한 피드백이 더 나은 결과를 만든다고 믿습니다.",
  },
];

const BENEFITS = [
  "리프레시 휴가 제도",
  "도서·강의 무제한 지원",
  "자유로운 연차 사용",
  "최신 장비 지원",
  "유연 출퇴근",
  "성과 기반 인센티브",
];

export default function Culture() {
  return (
    <section id="culture" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">
          Our Culture
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          우리가 일하는 방식
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          어떤 사람과 함께 일하고 싶은지가, 우리가 어떤 회사인지를 말해줍니다.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="glass rounded-2xl p-8 transition hover:-translate-y-1 hover:border-accent/40"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl"
                aria-hidden
              >
                {value.icon}
              </span>
              <h3 className="mt-4 text-xl font-bold text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        <div className="glass mt-12 rounded-2xl p-8 sm:p-10">
          <h3 className="text-lg font-bold text-white">함께 누리는 복지</h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="rounded-full border border-hairline bg-white/5 px-4 py-2 text-sm font-bold text-muted"
              >
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
