import Image from "next/image";

const BOOKS = [
  { title: "역행자", cover: null, bestseller: true },
  { title: "프로이트의 감정수업", cover: "/books/freud.jpg", bestseller: true },
  { title: "완벽한 원시인", cover: "/books/wonsiin.jpg", bestseller: true },
  { title: "무한의 부", cover: "/books/muhan.jpg", bestseller: false },
  { title: "라이프코드", cover: "/books/lifecode.jpg", bestseller: false },
  {
    title: "강풍에도 쓰러지지 않는다",
    cover: "/books/gangpung.jpg",
    bestseller: false,
  },
  {
    title: "어제보다 멍청해지기 전에",
    cover: "/books/eoje.jpg",
    bestseller: false,
  },
  {
    title: "게으른 그들은 어떻게 1조원을 벌었을까",
    cover: "/books/geeoreun.jpg",
    bestseller: false,
  },
];

export default function Books() {
  return (
    <section id="books" className="scroll-mt-16 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl font-bold tracking-tight text-white sm:text-3xl">
            출간 도서
          </h2>
          <span className="text-sm text-muted">전체 {BOOKS.length}종</span>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {BOOKS.map((book) => (
            <article key={book.title} className="group">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-white/5 shadow-xl ring-1 ring-hairline transition duration-300 group-hover:-translate-y-1.5 group-hover:ring-accent/40">
                {book.cover ? (
                  <Image
                    src={book.cover}
                    alt={`${book.title} 표지`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#12233a] to-[#0a1420] p-4 text-center">
                    <span className="font-serif text-2xl font-bold leading-tight text-white">
                      {book.title}
                    </span>
                    <span className="mt-3 text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
                      Philotic
                    </span>
                  </div>
                )}
                {book.bestseller && (
                  <span className="absolute left-3 top-3 rounded-full bg-gradient-to-br from-accent to-accent-strong px-2.5 py-1 text-[11px] font-bold tracking-wide text-[#052035] shadow-sm">
                    베스트셀러
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm font-bold leading-snug text-white">
                {book.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
