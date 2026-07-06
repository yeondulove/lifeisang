const BOOKS = [
  {
    title: "역행자",
    bestseller: true,
    cover: "bg-gradient-to-br from-slate-800 to-slate-950",
    description:
      "돈, 시간, 운명으로부터 완전한 자유를 얻는 7단계 인생 공략집.",
  },
  {
    title: "완벽한 원시인",
    bestseller: true,
    cover: "bg-gradient-to-br from-amber-700 to-stone-800",
    description:
      "진화심리학으로 들여다본 인간 본성. 오래된 몸으로 현대를 사는 법.",
  },
  {
    title: "프로이트의 감정수업",
    bestseller: true,
    cover: "bg-gradient-to-br from-rose-800 to-slate-900",
    description:
      "정신분석의 통찰로 배우는, 감정에 휘둘리지 않는 연습.",
  },
  {
    title: "무한의 부",
    bestseller: false,
    cover: "bg-gradient-to-br from-emerald-700 to-slate-900",
    description: "부의 그릇을 넓히는 사고방식과 자본주의 생존 전략.",
  },
  {
    title: "강풍에도 쓰러지지 않는다",
    bestseller: false,
    cover: "bg-gradient-to-br from-sky-700 to-slate-900",
    description: "흔들리는 시대에도 무너지지 않는 단단한 마음의 구조.",
  },
  {
    title: "어제보다 멍청해지기 전에",
    bestseller: false,
    cover: "bg-gradient-to-br from-violet-700 to-slate-900",
    description: "뇌를 깨우는 지적 습관. 매일 조금씩 더 선명해지는 법.",
  },
];

export default function Books() {
  return (
    <section id="books" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <p className="text-sm font-bold uppercase tracking-widest text-ink">
          Books
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
          필로틱이 만든 책들
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
          한 권 한 권, 독자의 삶이 실제로 달라지는 것을 목표로 만듭니다.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-3">
          {BOOKS.map((book) => (
            <article key={book.title} className="group">
              <div
                className={`relative flex aspect-[3/4] items-end overflow-hidden rounded-xl p-5 shadow-md transition group-hover:-translate-y-1 group-hover:shadow-xl ${book.cover}`}
              >
                {book.bestseller && (
                  <span className="absolute right-3 top-3 rounded-full bg-brand-bright px-3 py-1 text-xs font-bold text-white">
                    베스트셀러
                  </span>
                )}
                <span className="absolute inset-y-0 left-0 w-1.5 bg-white/20" />
                <h3 className="text-lg font-black leading-snug text-white sm:text-xl">
                  {book.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {book.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
