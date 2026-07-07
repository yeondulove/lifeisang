import Image from "next/image";

const FEATURED = [
  { title: "프로이트의 감정수업", cover: "/books/freud.jpg" },
  { title: "완벽한 원시인", cover: "/books/wonsiin.jpg" },
  { title: "무한의 부", cover: "/books/muhan.jpg" },
];

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
          Philotic · 출판사
        </p>

        <h1 className="mt-8 max-w-3xl font-serif text-4xl font-bold leading-[1.35] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          단단한 삶을 만드는
          <br />한 권의 책
        </h1>

        <p className="mt-8 max-w-xl text-base leading-loose text-slate-500 sm:text-lg">
          필로틱은 심리와 부, 인간 본성을 깊이 있게 다룹니다. 오래 곁에 두고
          다시 펼치게 되는 책을 만듭니다.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a
            href="#books"
            className="border-b border-slate-900 pb-1 text-sm font-bold text-slate-900 transition hover:border-slate-300 hover:text-slate-500"
          >
            출간 도서 보기
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
          >
            원고 투고 · 제휴 문의 →
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-5 sm:mt-20 sm:max-w-2xl sm:gap-10">
          {FEATURED.map((book) => (
            <figure key={book.title}>
              <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-slate-100 shadow-md ring-1 ring-black/5">
                <Image
                  src={book.cover}
                  alt={`${book.title} 표지`}
                  fill
                  sizes="(min-width: 640px) 220px, 30vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
              <figcaption className="mt-3 text-center text-xs text-slate-500 sm:text-sm">
                {book.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
