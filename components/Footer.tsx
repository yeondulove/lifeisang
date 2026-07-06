export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-500">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-3 sm:px-6">
        <div>
          <p className="text-base font-black text-slate-900">라이프해킹(주)</p>
          <p className="mt-3 leading-relaxed">
            배움과 책으로, 인생의 난이도를 낮춥니다.
            <br />
            대표 이메일: contact@lifehacking.co.kr
          </p>
        </div>
        <div>
          <p className="font-bold text-slate-900">패밀리 브랜드</p>
          <nav className="mt-3 flex flex-col gap-2">
            <a href="/pudufu" className="transition hover:text-brand">
              프드프 — 강의 플랫폼
            </a>
            <a href="/philotic" className="transition hover:text-ink">
              필로틱 — 출판사
            </a>
          </nav>
        </div>
        <div>
          <p className="font-bold text-slate-900">바로가기</p>
          <nav className="mt-3 flex flex-col gap-2">
            <a href="/" className="transition hover:text-slate-900">
              회사 소개
            </a>
            <a href="/careers" className="transition hover:text-slate-900">
              채용
            </a>
            <a href="/#contact" className="transition hover:text-slate-900">
              문의하기
            </a>
          </nav>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-slate-400 sm:px-6">
          © 2026 Lifehacking Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
