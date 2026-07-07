const POSITIONS = [
  {
    team: "프드프",
    title: "콘텐츠 마케터",
    type: "정규직",
    location: "서울 · 상시채용",
    description:
      "강의·전자책의 매력을 가장 잘 전달하는 카피와 캠페인을 기획하고 실행합니다.",
  },
  {
    team: "프드프",
    title: "강의 기획 PD",
    type: "정규직",
    location: "서울 · 상시채용",
    description:
      "베스트셀러 강의를 발굴하고, 강사와 함께 커리큘럼을 설계·제작합니다.",
  },
  {
    team: "프드프",
    title: "프론트엔드 개발자",
    type: "정규직",
    location: "서울 · 상시채용",
    description:
      "수만 명이 학습하는 플랫폼의 사용자 경험을 Next.js로 만들고 개선합니다.",
  },
  {
    team: "필로틱",
    title: "단행본 편집자",
    type: "정규직",
    location: "서울 · 상시채용",
    description:
      "다음 베스트셀러가 될 원고를 발굴하고, 저자와 함께 한 권의 책을 완성합니다.",
  },
  {
    team: "그로스",
    title: "퍼포먼스 마케터",
    type: "정규직",
    location: "서울 · 상시채용",
    description:
      "데이터를 기반으로 광고와 퍼널을 최적화해 성장을 만들어냅니다.",
  },
  {
    team: "경영지원",
    title: "피플팀 (HR) 담당자",
    type: "정규직",
    location: "서울 · 상시채용",
    description:
      "채용부터 온보딩, 조직문화까지 사람과 관련된 모든 경험을 설계합니다.",
  },
];

export default function Positions() {
  return (
    <section id="positions" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">
          Open Positions
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
          채용 중인 포지션
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          지금 딱 맞는 공고가 없어도 괜찮습니다. 함께하고 싶은 이유가 있다면
          언제든 문을 두드려 주세요.
        </p>

        <ul className="glass mt-12 divide-y divide-[rgba(255,255,255,0.08)] overflow-hidden rounded-2xl">
          {POSITIONS.map((position) => (
            <li key={`${position.team}-${position.title}`}>
              <a
                href="mailto:hr.dev@isanghan.co.kr?subject=[라이프해킹 지원] 포지션 문의"
                className="group flex flex-col gap-3 p-6 transition hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between sm:p-7"
              >
                <div className="sm:max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                      {position.team}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {position.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {position.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1">
                  <span className="text-sm font-bold text-white/90">
                    {position.type}
                  </span>
                  <span className="text-xs text-muted">
                    {position.location}
                  </span>
                  <span
                    className="hidden text-sm font-bold text-accent transition group-hover:translate-x-1 sm:mt-2 sm:inline-flex"
                    aria-hidden
                  >
                    지원하기 →
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
