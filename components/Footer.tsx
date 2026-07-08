export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-base font-bold text-white">라이프해킹(주)</p>
          <p className="mt-3 leading-relaxed text-muted">
            작은 습관이 큰 삶을 만든다.
            <br />
            대표 이메일: contact@lifehacking.co.kr
          </p>
        </div>
        <div>
          <p className="font-bold text-white">패밀리 브랜드</p>
          <nav className="mt-3 flex flex-col gap-2 text-muted">
            <a href="/pudufu" className="transition hover:text-accent">
              프드프 — 강의 플랫폼
            </a>
            <a href="/philotic" className="transition hover:text-accent">
              필로틱 — 출판사
            </a>
          </nav>
        </div>
        <div>
          <p className="font-bold text-white">바로가기</p>
          <nav className="mt-3 flex flex-col gap-2 text-muted">
            <a href="/about" className="transition hover:text-accent">
              회사 소개
            </a>
            <a href="/careers" className="transition hover:text-accent">
              채용
            </a>
            <a href="/#contact" className="transition hover:text-accent">
              문의하기
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-hairline">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted sm:px-6">
          © 2026 Lifehacking Inc. 삶을 더 나은 방향으로 바꾸는 작은 실천들
        </p>
      </div>
    </footer>
  );
}
