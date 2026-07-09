"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// 지원서 접수 메일 — 아래 APPS_SCRIPT_URL이 비어있을 때만 쓰이는 예비(mailto) 경로
const RECRUIT_EMAIL = "recruit@lifehacking.kr";

// 구글시트 자동 수집 웹앱 URL. google-apps-script/README.md 안내대로 배포한 뒤
// 여기에 "https://script.google.com/macros/s/xxx/exec" 형태로 붙여넣으세요.
// 비어있으면 예전처럼 mailto(이메일 앱 열기) 방식으로 자동 대체됩니다.
const APPS_SCRIPT_URL = "";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 파일당 10MB

type UploadedFile = { name: string; mimeType: string; base64: string };

function fileToBase64(file: File): Promise<UploadedFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const base64 = result.split(",")[1] || "";
      resolve({
        name: file.name,
        mimeType: file.type || "application/octet-stream",
        base64,
      });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// 채용 직무 — 이 배열에 한 줄만 추가하면 지원 폼의 직무 선택 탭이 자동으로 늘어납니다.
const POSITIONS = [
  "경영지원",
  "강의기획",
  "콘텐츠기획",
  "영상편집",
  "출판기획",
];

// lifehacking_about.html 디자인을 .lh-about 아래로 스코프한 스타일
const CSS = `
.lh-about{
  --paper:#FCFCFA; --ink:#171715; --ink-soft:#4A4A44; --hl:#FF8A00;
  --philotic:#1F4A38; --philotic-tint:#EDF2EE; --pudufu:#3D45E8; --pudufu-tint:#EEF0FE;
  --line:#E4E2DA;
  --serif: var(--font-noto-serif-kr), 'Nanum Myeongjo', serif;
  --sans: var(--font-noto-sans-kr), 'Apple SD Gothic Neo', sans-serif;
  position:relative; z-index:0; isolation:isolate;
  background:var(--paper); color:var(--ink); font-family:var(--sans);
  font-size:17px; line-height:1.75; -webkit-font-smoothing:antialiased; min-height:100vh;
}
.lh-about *{margin:0;padding:0;box-sizing:border-box}
.lh-about a{color:inherit;text-decoration:none}
.lh-about img{max-width:100%;display:block}
.lh-about .wrap{max-width:1080px;margin:0 auto;padding:0 24px}

.lh-about .hl{position:relative;display:inline;white-space:nowrap}
.lh-about .hl::before{content:"";position:absolute;left:-2px;right:-4px;bottom:6%;height:46%;
  background:var(--hl);z-index:-1;transform:scaleX(0);transform-origin:left center;
  transition:transform .7s cubic-bezier(.22,1,.36,1) .15s;border-radius:2px 6px 3px 5px}
.lh-about .hl.on::before{transform:scaleX(1)}
@media (prefers-reduced-motion: reduce){
  .lh-about .hl::before{transform:scaleX(1);transition:none}
  .lh-about .fade{opacity:1 !important;transform:none !important;transition:none !important}
}

.lh-about nav{position:sticky;top:0;z-index:50;background:rgba(252,252,250,.92);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.lh-about .nav-in{display:flex;align-items:center;justify-content:space-between;height:64px}
.lh-about .logo{font-family:var(--serif);font-weight:900;font-size:20px;letter-spacing:-.02em}
.lh-about .logo em{font-style:normal;background:linear-gradient(transparent 55%, var(--hl) 55%)}
.lh-about .nav-toggle{display:none;align-items:center;justify-content:center;width:40px;height:40px;margin-right:-8px;border:none;background:none;color:var(--ink);cursor:pointer}
.lh-about .menu{display:flex;align-items:center;gap:28px;font-size:14.5px;font-weight:500;color:var(--ink-soft)}
.lh-about .menu a:hover{color:var(--ink)}
.lh-about .menu .cta{color:var(--ink);border:1.5px solid var(--ink);padding:7px 16px;border-radius:999px;transition:background .2s,color .2s}
.lh-about .menu .cta:hover{background:var(--ink);color:var(--paper)}
@media(max-width:720px){
  .lh-about .nav-toggle{display:inline-flex}
  .lh-about .menu{position:absolute;left:0;right:0;top:64px;display:none;flex-direction:column;align-items:stretch;gap:0;background:var(--paper);border-bottom:1px solid var(--line);padding:6px 24px 16px;box-shadow:0 14px 26px rgba(0,0,0,.07)}
  .lh-about .menu.open{display:flex}
  .lh-about .menu a{padding:13px 2px;font-size:16px;border-top:1px solid var(--line)}
  .lh-about .menu a:first-child{border-top:none}
  .lh-about .menu .cta{margin-top:12px;text-align:center;padding:12px 16px}
}

.lh-about .hero{padding:110px 0 90px;border-bottom:1px solid var(--line)}
.lh-about .eyebrow{font-size:13px;font-weight:700;letter-spacing:.18em;color:var(--ink-soft);margin-bottom:26px}
.lh-about h1{font-family:var(--serif);font-weight:900;font-size:clamp(34px,5.6vw,62px);line-height:1.32;letter-spacing:-.015em}
.lh-about .hero p.lead{margin-top:32px;font-size:clamp(16px,1.8vw,19px);color:var(--ink-soft);max-width:560px}
.lh-about .hero-stats{margin-top:40px;display:flex;flex-wrap:wrap;gap:32px}
.lh-about .hero-stat .v{font-family:var(--serif);font-weight:900;font-size:clamp(24px,2.6vw,32px);color:var(--ink)}
.lh-about .hero-stat .k{margin-top:4px;font-size:13.5px;color:var(--ink-soft)}
.lh-about .hero-cta{margin-top:44px;display:flex;gap:12px;flex-wrap:wrap}
.lh-about .btn{display:inline-block;padding:14px 26px;border-radius:999px;font-weight:700;font-size:15.5px;transition:transform .15s,box-shadow .15s}
.lh-about .btn:hover{transform:translateY(-2px)}
.lh-about .btn-ink{background:var(--ink);color:var(--paper)}
.lh-about .btn-line{border:1.5px solid var(--ink)}
.lh-about .btn-ghost{color:var(--ink-soft);padding:14px 10px}
.lh-about .btn-ghost:hover{color:var(--ink)}

.lh-about section{padding:96px 0}
.lh-about .chapter{font-size:13px;font-weight:700;letter-spacing:.18em;color:var(--ink-soft);margin-bottom:18px}
.lh-about h2{font-family:var(--serif);font-weight:700;font-size:clamp(26px,3.4vw,38px);line-height:1.45;letter-spacing:-.01em}
.lh-about .fade{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease}
.lh-about .fade.on{opacity:1;transform:none}

.lh-about .self-nav{border-bottom:1px solid var(--line);background:#fff}
.lh-about .path-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:820px){.lh-about .path-grid{grid-template-columns:1fr}}
.lh-about .path-card{display:block;border:1.5px solid var(--line);border-radius:16px;padding:28px 26px;transition:border-color .2s,transform .2s;background:var(--paper)}
.lh-about .path-card:hover{border-color:var(--ink);transform:translateY(-3px)}
.lh-about .path-card .q{font-size:14px;color:var(--ink-soft);font-weight:500}
.lh-about .path-card .go{margin-top:10px;font-family:var(--serif);font-size:22px;font-weight:700;color:var(--ink)}
.lh-about .path-card .arrow{margin-top:16px;font-size:14px;font-weight:700;color:var(--ink-soft)}
.lh-about .path-card:hover .arrow{color:var(--ink)}

.lh-about .fit{margin-top:56px;border-top:1px solid var(--line);padding-top:48px}
.lh-about .fit-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
@media(max-width:820px){.lh-about .fit-grid{grid-template-columns:1fr}}
.lh-about .fit-col{border-radius:16px;padding:28px 26px}
.lh-about .fit-col.no{background:#F2F1EC;color:var(--ink-soft)}
.lh-about .fit-col.yes{background:var(--ink);color:var(--paper)}
.lh-about .fit-col .ft{font-family:var(--serif);font-weight:700;font-size:19px;margin-bottom:16px}
.lh-about .fit-col.yes .ft{color:var(--hl)}
.lh-about .fit-col ul{list-style:none;display:flex;flex-direction:column;gap:12px}
.lh-about .fit-col li{font-size:15px;line-height:1.6;padding-left:20px;position:relative}
.lh-about .fit-col.no li::before{content:"–";position:absolute;left:0;color:#B0AFA6}
.lh-about .fit-col.yes li::before{content:"✓";position:absolute;left:0;color:var(--hl);font-weight:700}

.lh-about .worries{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:44px 0 40px}
.lh-about .worry{border:1px solid var(--line);border-radius:14px;padding:26px 24px;background:#fff;font-size:15.5px;color:var(--ink-soft)}
.lh-about .worry b{display:block;color:var(--ink);font-family:var(--serif);font-size:17px;margin-bottom:8px;font-weight:600}
@media(max-width:820px){.lh-about .worries{grid-template-columns:1fr}}
.lh-about .thesis{font-family:var(--serif);font-size:clamp(21px,2.6vw,28px);font-weight:600;line-height:1.6;max-width:720px}

.lh-about .numbers{background:var(--ink);color:var(--paper)}
.lh-about .numbers .chapter{color:#9A9A90}
.lh-about .num-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:48px;border-top:1px solid #34342E}
.lh-about .num{padding:34px 28px 30px;border-bottom:1px solid #34342E}
.lh-about .num:nth-child(3n+1){padding-left:0}
.lh-about .num .v{font-family:var(--serif);font-weight:900;font-size:clamp(30px,3.6vw,42px);letter-spacing:-.01em}
.lh-about .num .v span{color:var(--hl)}
.lh-about .num .k{margin-top:8px;font-size:14.5px;color:#B9B9AF;line-height:1.6}
.lh-about .footnote{margin-top:34px;font-size:12.5px;color:#8A8A80;line-height:1.8}
.lh-about .verify{margin-top:26px;font-size:15px;color:#D9D9CF}
.lh-about .verify a{border-bottom:1px solid #6A6A60;padding-bottom:1px}
.lh-about .verify a:hover{color:var(--hl);border-color:var(--hl)}
@media(max-width:820px){.lh-about .num-grid{grid-template-columns:1fr}.lh-about .num{padding-left:0}}

.lh-about .brand{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
@media(max-width:880px){.lh-about .brand{grid-template-columns:1fr;gap:36px}}
.lh-about .brand-tag{display:inline-block;font-size:12.5px;font-weight:700;letter-spacing:.14em;padding:6px 14px;border-radius:999px;margin-bottom:22px}
.lh-about .philotic .brand-tag{background:var(--philotic-tint);color:var(--philotic)}
.lh-about .philotic h2 em{font-style:normal;color:var(--philotic)}
.lh-about .pudufu-sec .brand-tag{background:var(--pudufu-tint);color:var(--pudufu)}
.lh-about .pudufu-sec h2 em{font-style:normal;color:var(--pudufu)}
.lh-about .brand p{margin-top:20px;color:var(--ink-soft)}
.lh-about .book-card{border:1px solid var(--line);border-radius:14px;background:#fff;padding:26px 24px;margin-bottom:14px}
.lh-about .book-card.with-cover{display:flex;gap:18px;align-items:flex-start}
.lh-about .book-cover-img{flex:none;width:88px;height:132px;object-fit:cover;border-radius:8px;box-shadow:0 5px 16px rgba(0,0,0,.14)}
.lh-about .book-body{flex:1;min-width:0}
.lh-about .book-card .t{font-family:var(--serif);font-weight:700;font-size:18px}
.lh-about .book-card .a{font-size:14px;color:var(--ink-soft);margin-top:4px}
.lh-about .book-card .d{font-size:15px;color:var(--ink-soft);margin-top:12px;line-height:1.7}
.lh-about .badge{display:inline-block;margin-top:14px;font-size:12.5px;font-weight:700;color:var(--philotic);background:var(--philotic-tint);padding:4px 10px;border-radius:6px}
.lh-about .pudufu-sec .badge{color:var(--pudufu);background:var(--pudufu-tint)}
.lh-about .brand-link{display:inline-block;margin-top:26px;font-weight:700;font-size:15.5px;border-bottom:2px solid var(--ink);padding-bottom:2px}
.lh-about .philotic .brand-link{border-color:var(--philotic);color:var(--philotic)}
.lh-about .pudufu-sec .brand-link{border-color:var(--pudufu);color:var(--pudufu)}
.lh-about .sec-tint-g{background:var(--philotic-tint)}
.lh-about .sec-tint-b{background:var(--pudufu-tint)}
.lh-about .pill-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px}
.lh-about .pill{font-size:13.5px;font-weight:500;border:1px solid var(--line);background:#fff;border-radius:999px;padding:6px 14px;color:var(--ink-soft)}

.lh-about .culture-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-top:44px}
@media(max-width:820px){.lh-about .culture-grid{grid-template-columns:1fr}}
.lh-about .cul{border:1px solid var(--line);border-radius:14px;padding:28px 24px;background:#fff}
.lh-about .cul .t{font-family:var(--serif);font-weight:700;font-size:18px;margin-bottom:10px}
.lh-about .cul p{font-size:15px;color:var(--ink-soft)}

.lh-about .apply{margin-top:44px;border:1px solid var(--line);border-radius:18px;background:#fff;padding:40px 36px}
@media(max-width:720px){.lh-about .apply{padding:28px 20px}}
.lh-about .form-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.lh-about .file-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:820px){.lh-about .form-grid,.lh-about .file-grid{grid-template-columns:1fr}}
.lh-about .form-block{margin-top:36px;padding-top:32px;border-top:1px dashed var(--line)}
.lh-about .form-block-title{font-family:var(--serif);font-weight:700;font-size:18px;margin-bottom:18px}
.lh-about .field{display:flex;flex-direction:column;gap:8px;margin-bottom:18px}
.lh-about .field label{font-size:14px;font-weight:700}
.lh-about .field label em{font-style:normal;color:#C0392B}
.lh-about .field .hint{font-weight:400;color:var(--ink-soft);font-size:12.5px;margin-left:4px}
.lh-about .field input[type=text],.lh-about .field input[type=email],.lh-about .field input[type=tel],.lh-about .field input[type=url],.lh-about .field textarea{
  font-family:var(--sans);font-size:15px;padding:12px 14px;border:1px solid var(--line);border-radius:10px;background:var(--paper);color:var(--ink);width:100%}
.lh-about .field textarea{resize:vertical;line-height:1.7}
.lh-about .field input:focus,.lh-about .field textarea:focus{outline:2px solid var(--ink);outline-offset:1px;border-color:var(--ink)}
.lh-about .field input[type=file]{font-size:13.5px;color:var(--ink-soft)}
.lh-about .field input[type=file]::file-selector-button{font-family:var(--sans);font-weight:700;font-size:13px;border:1.5px solid var(--ink);background:#fff;color:var(--ink);border-radius:999px;padding:8px 16px;margin-right:12px;cursor:pointer}
.lh-about .field input[type=file]::file-selector-button:hover{background:var(--ink);color:#fff}
.lh-about .counter{align-self:flex-end;font-size:12.5px;color:var(--ink-soft)}
.lh-about .counter.limit{color:#C0392B;font-weight:700}
.lh-about .consent{margin-top:10px}
.lh-about .consent label{display:flex;align-items:center;gap:10px;font-weight:500;font-size:14.5px;cursor:pointer}
.lh-about .consent input{width:18px;height:18px;accent-color:var(--ink)}
.lh-about #applyBtn{margin-top:10px;border:none;cursor:pointer;font-family:var(--sans)}
.lh-about .form-note{margin-top:14px;font-size:13px;color:var(--ink-soft)}
.lh-about .form-note.ok{color:var(--philotic);font-weight:700}
.lh-about .role-tabs{display:flex;flex-wrap:wrap;gap:10px}
.lh-about .role-tab{cursor:pointer;position:relative}
.lh-about .role-tab input{position:absolute;opacity:0;width:0;height:0}
.lh-about .role-tab span{display:inline-block;padding:11px 20px;border:1.5px solid var(--line);border-radius:999px;font-weight:500;font-size:14.5px;color:var(--ink-soft);background:#fff;transition:border-color .15s,background .15s,color .15s}
.lh-about .role-tab:hover span{border-color:var(--ink)}
.lh-about .role-tab input:checked + span{border-color:var(--ink);background:var(--ink);color:var(--paper)}
.lh-about .role-tab input:focus-visible + span{outline:2px solid var(--ink);outline-offset:2px}

.lh-about .closing{border-top:1px solid var(--line);text-align:center;padding:120px 0}
.lh-about .closing h2{font-size:clamp(28px,4vw,44px)}
.lh-about .closing p{margin-top:24px;color:var(--ink-soft)}
.lh-about .closing .hero-cta{justify-content:center}

.lh-about footer{border-top:1px solid var(--line);padding:40px 0 56px;font-size:13px;color:var(--ink-soft);line-height:2}
.lh-about .foot{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap}
`;

export default function AboutContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(false);

  // 내비 링크 클릭: 모바일 메뉴 닫고, 해시 섹션으로 부드럽게 스크롤
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setNavOpen(false);
    if (!href.startsWith("#")) return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    window.setTimeout(() => {
      const y = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      history.replaceState(null, "", href);
    }, 0);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 스크롤 인터랙션: 형광펜 스윕 + 페이드 인
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    root.querySelectorAll(".hl, .fade").forEach((el) => io.observe(el));

    // 지원 폼: 글자수 카운터
    const cleanups: Array<() => void> = [];
    root.querySelectorAll<HTMLTextAreaElement>(".apply textarea").forEach((t) => {
      const c = root.querySelector<HTMLElement>(
        '.counter[data-for="' + t.id + '"]',
      );
      const upd = () => {
        if (!c) return;
        c.textContent = t.value.length + " / 700";
        c.classList.toggle("limit", t.value.length >= 700);
      };
      t.addEventListener("input", upd);
      upd();
      cleanups.push(() => t.removeEventListener("input", upd));
    });

    // 지원 폼: 제출 → 구글시트(APPS_SCRIPT_URL) 또는 mailto 예비 경로
    const form = root.querySelector<HTMLFormElement>("#applyForm");
    const applyBtn = root.querySelector<HTMLButtonElement>("#applyBtn");
    const note = root.querySelector<HTMLElement>("#formNote");
    const v = (id: string) =>
      (
        root.querySelector<HTMLInputElement | HTMLTextAreaElement>("#" + id)
          ?.value ?? ""
      ).trim();
    const fileAt = (id: string) =>
      root.querySelector<HTMLInputElement>("#" + id)?.files?.[0] ?? null;

    const setNote = (text: string, ok: boolean) => {
      if (!note) return;
      note.textContent = text;
      note.classList.toggle("ok", ok);
    };

    const submitViaMailto = () => {
      const portfolioLink = v("f-portfolio-link");
      const role =
        root.querySelector<HTMLInputElement>('input[name="role"]:checked')
          ?.value || "(미선택)";
      const body = [
        "[라이프해킹 상시채용 지원서]",
        "",
        "지원 직무: " + role,
        "이름: " + v("f-name"),
        "이메일: " + v("f-email"),
        "연락처: " + v("f-phone"),
        "포트폴리오 링크: " + (portfolioLink || "없음"),
        "",
        "--- 사전 질문 ---",
        "",
        "1. 라이프해킹에 지원하게 된 이유",
        v("q1"),
        "",
        "2. 본인의 주요 성과나 경험",
        v("q2"),
        "",
        "3. 라이프해킹에서 이루고 싶은 목표·기여하고 싶은 바",
        v("q3"),
        "",
        "※ 이력서&자기소개서(필수), 경력기술서·포트폴리오(선택) 파일을 이 메일에 첨부해 주세요.",
      ].join("\n");
      const subject =
        "[지원서] " + v("f-name") + " (" + role + ") — 라이프해킹 상시채용";
      window.location.href =
        "mailto:" +
        RECRUIT_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);
      setNote(
        "메일 창이 열렸습니다. 준비하신 서류 파일을 첨부한 뒤 전송해 주시면 지원이 완료됩니다.",
        true,
      );
    };

    const submitViaSheet = async () => {
      const resumeFile = fileAt("f-resume");
      const careerFile = fileAt("f-career");
      const portfolioFile = fileAt("f-portfolio");

      for (const f of [resumeFile, careerFile, portfolioFile]) {
        if (f && f.size > MAX_FILE_SIZE) {
          setNote(
            `"${f.name}" 파일이 10MB를 초과합니다. 더 작은 파일로 첨부해 주세요.`,
            false,
          );
          return;
        }
      }

      if (applyBtn) {
        applyBtn.disabled = true;
        applyBtn.textContent = "제출 중…";
      }
      setNote("지원서를 제출하고 있습니다…", false);

      try {
        const [resume, career, portfolio] = await Promise.all([
          resumeFile ? fileToBase64(resumeFile) : null,
          careerFile ? fileToBase64(careerFile) : null,
          portfolioFile ? fileToBase64(portfolioFile) : null,
        ]);

        const role =
          root.querySelector<HTMLInputElement>('input[name="role"]:checked')
            ?.value || "";

        const payload = {
          role,
          name: v("f-name"),
          email: v("f-email"),
          phone: v("f-phone"),
          portfolioLink: v("f-portfolio-link"),
          q1: v("q1"),
          q2: v("q2"),
          q3: v("q3"),
          resume,
          career,
          portfolio,
        };

        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });

        setNote(
          "지원서가 정상적으로 제출되었습니다. 검토 후 연락드리겠습니다. 감사합니다!",
          true,
        );
        form?.reset();
        root
          .querySelectorAll<HTMLElement>(".apply .counter")
          .forEach((c) => (c.textContent = "0 / 700"));
      } catch {
        setNote(
          "제출 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 " +
            RECRUIT_EMAIL +
            " 로 직접 메일 부탁드립니다.",
          false,
        );
      } finally {
        if (applyBtn) {
          applyBtn.disabled = false;
          applyBtn.textContent = "지원서 제출하기";
        }
      }
    };

    const onSubmit = (ev: Event) => {
      ev.preventDefault();
      if (!form || !form.reportValidity()) return;
      if (APPS_SCRIPT_URL) {
        void submitViaSheet();
      } else {
        submitViaMailto();
      }
    };
    form?.addEventListener("submit", onSubmit);

    return () => {
      io.disconnect();
      cleanups.forEach((fn) => fn());
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <div className="lh-about" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <nav>
        <div className="wrap nav-in">
          <a
            className="logo"
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
          >
            LIFE<em>HACKING</em>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={navOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={navOpen}
            onClick={() => setNavOpen(!navOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              {navOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className={navOpen ? "menu open" : "menu"}>
            <a href="#about" onClick={(e) => handleNavClick(e, "#about")}>
              회사소개
            </a>
            <a href="#philotic" onClick={(e) => handleNavClick(e, "#philotic")}>
              필로틱
            </a>
            <a href="#pudufu" onClick={(e) => handleNavClick(e, "#pudufu")}>
              프드프
            </a>
            <a href="#culture" onClick={(e) => handleNavClick(e, "#culture")}>
              일하는 방식
            </a>
            <a
              href="#careers"
              className="cta"
              onClick={(e) => handleNavClick(e, "#careers")}
            >
              채용
            </a>
          </div>
        </div>
      </nav>

      {/* 히어로 */}
      <header className="hero" id="top">
        <div className="wrap">
          <div className="eyebrow">콘텐츠를 시스템으로 만드는 회사</div>
          <h1>
            콘텐츠는 많습니다.
            <br />
            인생을 바꾸는 콘텐츠는
            <br />
            <span className="hl">드뭅니다.</span>
          </h1>
          <p className="lead">
            라이프해킹은 그 드문 콘텐츠를 만듭니다. 종이책부터 전자책, 온라인
            강의까지 — 읽고 나면 삶이 달라지는 지식만 다룹니다. 베스트셀러
            『역행자』의 자청이 만든 콘텐츠 컴퍼니. 출판 브랜드 필로틱과 지식
            플랫폼 프드프를 운영합니다.
          </p>

          <dl className="hero-stats">
            <div className="hero-stat fade">
              <dt className="v">2년 연속</dt>
              <dd className="k">필로틱 출간작 종합 베스트셀러</dd>
            </div>
            <div className="hero-stat fade">
              <dt className="v">60만+</dt>
              <dd className="k">유튜브·인스타 등 채널 도달</dd>
            </div>
            <div className="hero-stat fade">
              <dt className="v">80만 부</dt>
              <dd className="k">『역행자』 누적 판매</dd>
            </div>
          </dl>

          <div className="hero-cta">
            <a className="btn btn-ink" href="#careers">
              함께할 동료 찾기 →
            </a>
            <a className="btn btn-ghost" href="#about">
              회사 소개 더 보기 ↓
            </a>
          </div>
        </div>
      </header>

      {/* 자가 분류 내비게이션 */}
      <section className="self-nav">
        <div className="wrap">
          <div className="path-grid">
            <a
              className="path-card fade"
              href="https://www.philotic.co.kr/#submit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="q">책을 내고 싶으신가요?</div>
              <div className="go">필로틱</div>
              <div className="arrow">원고 투고 안내 →</div>
            </a>
            <a
              className="path-card fade"
              href="#careers"
              onClick={(e) => handleNavClick(e, "#careers")}
            >
              <div className="q">함께 일하고 싶으신가요?</div>
              <div className="go">채용</div>
              <div className="arrow">일하는 방식 보기 →</div>
            </a>
            <a
              className="path-card fade"
              href="mailto:contact@lifehacking.kr?subject=[라이프해킹] 제휴 문의"
            >
              <div className="q">협업을 원하시나요?</div>
              <div className="go">제휴 문의</div>
              <div className="arrow">이메일 보내기 →</div>
            </a>
          </div>
        </div>
      </section>

      {/* 왜 라이프해킹인가 */}
      <section id="about">
        <div className="wrap">
          <div className="chapter fade">WHY “LIFEHACKING”</div>
          <h2 className="fade">
            인생은 노력만으로 바뀌지 않습니다.
            <br />더 좋은 지식을, <span className="hl">더 빨리 만나야</span>{" "}
            바뀝니다.
          </h2>

          <div className="worries">
            <div className="worry fade">
              <b>“100권을 읽었는데…”</b>
              자기계발서를 아무리 읽어도 인생이 그대로인 이유 — 팔리기 위한
              콘텐츠와 바뀌게 하는 콘텐츠는 다르기 때문입니다.
            </div>
            <div className="worry fade">
              <b>“결제만 하고 또…”</b>
              완강하지 못한 강의가 쌓여가는 이유 — 콘텐츠가 아니라, 끝까지 가게
              만드는 설계의 문제입니다.
            </div>
            <div className="worry fade">
              <b>“자극적이기만 하고…”</b>
              보고 나면 아무것도 남지 않는 콘텐츠의 홍수 — 저희가 반대 방향으로
              가는 이유입니다.
            </div>
          </div>

          <p className="thesis fade">
            그래서 저희는 콘텐츠를 만들 때 한 가지 질문만 합니다.
            <br />
            <strong>“이걸 본 사람의 3개월 뒤가 달라지는가?”</strong>
            <br />
            달라지지 않으면, 내지 않습니다. 수십 년 걸릴 시행착오를 한 권의 책과
            한 편의 강의로 단축하는 일 — 저희는 그것을{" "}
            <span className="hl">해킹</span>이라 부릅니다.
          </p>
        </div>
      </section>

      {/* 숫자 증거 */}
      <section className="numbers">
        <div className="wrap">
          <div className="chapter fade">PROOF IN NUMBERS</div>
          <h2 className="fade" style={{ color: "#FCFCFA" }}>
            말보다 숫자로 먼저 보여드립니다.
          </h2>
          <div className="num-grid">
            <div className="num fade">
              <div className="v">
                <span>80만</span> 부
              </div>
              <div className="k">
                『역행자』 누적 판매 — 라이프해킹의 뿌리가 된 자청의 콘텐츠
                철학¹
              </div>
            </div>
            <div className="num fade">
              <div className="v">
                첫날 <span>2억 원</span>
              </div>
              <div className="k">
                프드프 2021년 런칭 당일 매출 — 전자책 시장의 통념을 하루 만에
                뒤집었습니다²
              </div>
            </div>
            <div className="num fade">
              <div className="v">
                <span>17,100명</span>
              </div>
              <div className="k">
                초사고 글쓰기 누적 수강생 · 평점 4.9 — 광고가 아니라 후기로 팔린
                강의³
              </div>
            </div>
            <div className="num fade">
              <div className="v">
                첫날 <span>4.9억 원</span>
              </div>
              <div className="k">
                자청 AI 올인원 출시 당일 매출 · 1,696명 수강 신청 (2025.3)⁴
              </div>
            </div>
            <div className="num fade">
              <div className="v">
                종합 <span>1위</span>
              </div>
              <div className="k">
                필로틱 『완벽한 원시인』 — 출간 직후 교보문고 종합 1위⁵
              </div>
            </div>
            <div className="num fade">
              <div className="v">
                평점 <span>9.9</span>
              </div>
              <div className="k">
                필로틱 『프로이트의 감정수업』 — 교보문고 독자 리뷰 기준
              </div>
            </div>
          </div>
          <p className="verify fade">
            의심되시면 직접 확인하세요.{" "}
            <a
              href="https://www.philotic.co.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              필로틱 공식 사이트를 방문
            </a>
            하거나,{" "}
            <a
              href="https://pudufu.co.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              프드프 후기란
            </a>
            을 열어보시면 됩니다. 저희 숫자는 전부 공개된 곳에 있습니다.
          </p>
          <p className="footnote">
            ¹ 출판사 발표 누적 판매 기준 &nbsp;² 프드프 공개 자료 기준 &nbsp;³
            2026년 7월 프드프 표기 기준 &nbsp;⁴ 언론 보도 기준(전자신문, 2025.4)
            &nbsp;⁵ 교보문고 종합 주간베스트, 출간 주 기준
          </p>
        </div>
      </section>

      {/* 필로틱 */}
      <section className="sec-tint-g philotic" id="philotic">
        <div className="wrap brand">
          <div>
            <span className="brand-tag fade">BOOK PUBLISHING</span>
            <h2 className="fade">
              출판 브랜드
              <br />
              <em>필로틱 PHILOTIC</em>
            </h2>
            <p className="fade">
              고전의 깊이를, 오늘의 언어로. 필로틱은 인문·심리·자기계발의
              경계에서 책을 만듭니다. 한 번 읽고 버려지는 책이 아니라, 책장에서
              다시 꺼내게 되는 책.
            </p>
            <a
              className="brand-link fade"
              href="https://www.philotic.co.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              필로틱 전체 도서 보기 →
            </a>
          </div>
          <div>
            <div className="book-card with-cover fade">
              <Image
                src="/books/wonsiin.jpg"
                alt="완벽한 원시인 표지"
                width={88}
                height={132}
                className="book-cover-img"
              />
              <div className="book-body">
                <div className="t">완벽한 원시인</div>
                <div className="a">자청 지음 · 2026</div>
                <div className="d">
                  진화심리학으로 현대인의 불안과 번아웃을 해부한 인문교양서.
                  『역행자』 이후 4년 만의 신작.
                </div>
                <span className="badge">출간 직후 교보문고 종합 1위</span>
              </div>
            </div>
            <div className="book-card with-cover fade">
              <Image
                src="/books/freud.jpg"
                alt="프로이트의 감정수업 표지"
                width={88}
                height={132}
                className="book-cover-img"
              />
              <div className="book-body">
                <div className="t">프로이트의 감정수업</div>
                <div className="a">강이안 지음 · 2025</div>
                <div className="d">
                  보이지 않는 무의식의 세계를 현대 독자의 언어로 풀어낸
                  심리교양서.
                </div>
                <span className="badge">독자 평점 9.9</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 프드프 */}
      <section className="sec-tint-b pudufu-sec" id="pudufu">
        <div className="wrap brand">
          <div>
            <span className="brand-tag fade">KNOWLEDGE PLATFORM</span>
            <h2 className="fade">
              지식 콘텐츠 플랫폼
              <br />
              <em>프드프 pudufu</em>
            </h2>
            <p className="fade">
              상위 1%의 지식을, 부담 없이. 프드프는 2021년 3월 런칭한 자기계발
              콘텐츠 플랫폼입니다. 프리미엄 전자책에서 시작해 지금은 VOD 강의와
              챌린지까지 — 검증된 지식만 다룹니다.
            </p>
            <div className="pill-row fade">
              <span className="pill">글쓰기</span>
              <span className="pill">마케팅</span>
              <span className="pill">AI</span>
              <span className="pill">심리</span>
              <span className="pill">전자책</span>
              <span className="pill">VOD 강의</span>
            </div>
            <a
              className="brand-link fade"
              href="https://pudufu.co.kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              프드프에서 무료 콘텐츠 받기 →
            </a>
          </div>
          <div>
            <div className="book-card fade">
              <div className="t">무료로 시작하세요</div>
              <div className="d">
                무료 전자책과 무료 강의를 상시 열어두고 있습니다. “결제 안 해도
                이득 얻고 가는” 콘텐츠가 프드프의 첫인상이길 바랍니다.
              </div>
              <span className="badge">
                이달의 무료 전자책 · 무료 특강 운영 중
              </span>
            </div>
            <div className="book-card fade">
              <div className="t">후기로 검증된 콘텐츠</div>
              <div className="d">
                초사고 글쓰기 수강생 17,100명 · 평점 4.9. 프드프의 콘텐츠는
                광고보다 수강생의 후기가 먼저 말합니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 일하는 방식 */}
      <section id="culture">
        <div className="wrap">
          <div className="chapter fade">HOW WE WORK</div>
          <h2 className="fade">
            책을 파는 회사가 아니라,
            <br />
            <span className="hl">책대로 사는 회사</span>입니다.
          </h2>
          <div className="culture-grid">
            <div className="cul fade">
              <div className="t">수요지식회</div>
              <p>
                매주 수요일, 전 직원이 모여 읽은 것과 배운 것을 나눕니다. 그
                인사이트가 다시 콘텐츠가 됩니다. 이 문화로 독서경영 우수사례로
                수상한 이력도 있습니다.
              </p>
            </div>
            <div className="cul fade">
              <div className="t">AI가 기본기입니다</div>
              <p>
                기획자도, 편집자도, 마케터도 AI 도구로 일합니다. 인사팀
                수연님은 채용 현황을 한눈에 보는 대시보드를, 현종님은 사내
                교육 플랫폼을 AI로 직접 만들어 씁니다. 지금 보고 계신 이
                홈페이지도 AI 코딩으로 직접 만들었습니다.
              </p>
            </div>
            <div className="cul fade">
              <div className="t">결과로 보상합니다</div>
              <p>
                성과에 따라 S·A·B·C 등급으로 명확하게 보상하는 성과보상
                제도를 운영합니다. 노력의 총량이 아니라 만들어낸 결과가
                기준입니다.
              </p>
            </div>
            <div className="cul fade">
              <div className="t">작지만 밀도 높게</div>
              <p>
                소수 정예 조직으로, 한 사람이 프로젝트의 처음과 끝을 봅니다.
                성장의 속도는 조직의 크기가 아니라 밀도에서 나옵니다.
              </p>
            </div>
          </div>

          <div className="fit">
            <div className="chapter fade">WHO WE'RE LOOKING FOR</div>
            <div className="fit-grid">
              <div className="fit-col no fade">
                <div className="ft">이런 분은 지원하지 않으셔도 됩니다</div>
                <ul>
                  <li>정해진 매뉴얼대로만 일하고 싶은 분</li>
                  <li>
                    책을 읽지 않아도 좋은 콘텐츠를 만들 수 있다고 생각하는 분
                  </li>
                  <li>새로운 AI 도구를 익히는 게 귀찮게 느껴지는 분</li>
                  <li>결과보다 들인 노력의 총량으로 평가받고 싶은 분</li>
                </ul>
              </div>
              <div className="fit-col yes fade">
                <div className="ft">이런 분과 함께 일하고 싶습니다</div>
                <ul>
                  <li>정답이 없는 문제를 스스로 붙잡고 답을 만들어가는 분</li>
                  <li>매주 읽고 나누는 걸 부담이 아니라 성장으로 느끼는 분</li>
                  <li>AI를 도구로 다루는 데 거부감이 없는 분</li>
                  <li>내가 만든 것의 결과를 숫자로 증명하고 싶은 분</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 채용 */}
      <section id="careers" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="chapter fade">CAREERS · 상시채용</div>
          <h2 className="fade">
            읽는 것을 좋아하고,
            <br />
            만드는 것을 더 좋아하는 분을 찾습니다.
          </h2>
          <p
            className="fade"
            style={{
              marginTop: 20,
              color: "var(--ink-soft)",
              maxWidth: 640,
            }}
          >
            라이프해킹은 상시채용으로 운영됩니다. 지금 열려 있는 포지션이 없어도,
            함께하고 싶은 분이라면 언제든 지원서를 남겨주세요. 모든 지원서는
            인사팀이 직접 검토합니다.
          </p>

          <form className="apply fade" id="applyForm" noValidate>
            <div className="form-block-title" style={{ marginBottom: 16 }}>
              지원 직무 <em>*</em>{" "}
              <span className="hint">지원하실 직무를 선택하세요</span>
            </div>
            <div className="role-tabs" style={{ marginBottom: 24 }}>
              {POSITIONS.map((role) => (
                <label className="role-tab" key={role}>
                  <input type="radio" name="role" value={role} required />
                  <span>{role}</span>
                </label>
              ))}
            </div>

            <div className="form-grid">
              <div className="field">
                <label htmlFor="f-name">
                  이름 <em>*</em>
                </label>
                <input
                  type="text"
                  id="f-name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="홍길동"
                />
              </div>
              <div className="field">
                <label htmlFor="f-email">
                  이메일 주소 <em>*</em>
                </label>
                <input
                  type="email"
                  id="f-email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <label htmlFor="f-phone">
                  연락처 <em>*</em>
                </label>
                <input
                  type="tel"
                  id="f-phone"
                  name="phone"
                  required
                  autoComplete="tel"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            <div className="form-block">
              <div className="form-block-title">제출 서류</div>
              <div className="file-grid">
                <div className="field">
                  <label htmlFor="f-resume">
                    이력서 &amp; 자기소개서 <em>*</em>{" "}
                    <span className="hint">필수 · PDF 권장</span>
                  </label>
                  <input
                    type="file"
                    id="f-resume"
                    name="resume"
                    accept=".pdf,.doc,.docx,.hwp"
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-career">
                    경력기술서 <span className="hint">선택</span>
                  </label>
                  <input
                    type="file"
                    id="f-career"
                    name="career"
                    accept=".pdf,.doc,.docx,.hwp"
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-portfolio">
                    포트폴리오{" "}
                    <span className="hint">선택 · 파일 또는 링크</span>
                  </label>
                  <input type="file" id="f-portfolio" name="portfolio" />
                  <input
                    type="url"
                    id="f-portfolio-link"
                    name="portfolio_link"
                    placeholder="또는 링크를 입력하세요 (URL)"
                    style={{ marginTop: 8 }}
                  />
                </div>
              </div>
            </div>

            <div className="form-block">
              <div className="form-block-title">사전 질문</div>
              <div className="field">
                <label htmlFor="q1">
                  1. 라이프해킹에 지원하게 된 이유를 적어주세요. <em>*</em>{" "}
                  <span className="hint">700자 이내</span>
                </label>
                <textarea id="q1" name="q1" maxLength={700} rows={6} required />
                <div className="counter" data-for="q1">
                  0 / 700
                </div>
              </div>
              <div className="field">
                <label htmlFor="q2">
                  2. 본인의 주요 성과나 경험은 무엇인가요? <em>*</em>{" "}
                  <span className="hint">700자 내외</span>
                </label>
                <textarea id="q2" name="q2" maxLength={700} rows={6} required />
                <div className="counter" data-for="q2">
                  0 / 700
                </div>
              </div>
              <div className="field">
                <label htmlFor="q3">
                  3. 라이프해킹에서 이루고 싶은 목표나 기여하고 싶은 바가 있다면
                  무엇인가요? <em>*</em>{" "}
                  <span className="hint">700자 내외</span>
                </label>
                <textarea id="q3" name="q3" maxLength={700} rows={6} required />
                <div className="counter" data-for="q3">
                  0 / 700
                </div>
              </div>
            </div>

            <div className="field consent">
              <label>
                <input type="checkbox" id="f-consent" required /> 지원서 검토를
                위한 개인정보 수집·이용에 동의합니다. <em>*</em>
              </label>
            </div>

            <button type="submit" className="btn btn-ink" id="applyBtn">
              지원서 제출하기
            </button>
            <p className="form-note" id="formNote">
              제출 시 작성하신 내용이 인사팀 메일로 전달됩니다. 첨부 파일은
              열리는 메일에 함께 첨부해 주세요.
            </p>
          </form>
        </div>
      </section>

      {/* 클로징 */}
      <section className="closing">
        <div className="wrap">
          <h2 className="fade">
            콘텐츠는 앞으로 더 많아질 겁니다.
            <br />
            그래서 저희는 반대로 갑니다.
          </h2>
          <p className="fade">
            더 적게, 더 깊게, 더 오래 남게.
            <br />
            인생을 바꾸는 콘텐츠는 여전히 <span className="hl">드뭅니다.</span>{" "}
            라이프해킹이 그 드문 것을 만들겠습니다.
          </p>
          <div className="hero-cta fade">
            <a className="btn btn-ink" href="#philotic">
              필로틱 도서 보기
            </a>
            <a className="btn btn-line" href="#pudufu">
              프드프 바로가기
            </a>
            <a className="btn btn-ghost" href="#careers">
              채용 공고 보기 →
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot">
          <div>
            <strong
              style={{
                fontFamily: "var(--serif)",
                fontSize: 15,
                color: "var(--ink)",
              }}
            >
              라이프해킹(주)
            </strong>
            <br />
            대표이사 송명진 · 사업자등록번호 479-81-01709
            <br />
            서울시 강남구 도산대로 207, 9층 (성도빌딩) · contact@lifehacking.kr
          </div>
          <div style={{ textAlign: "right" }}>
            <a href="#philotic">필로틱</a> · <a href="#pudufu">프드프</a> ·{" "}
            <a href="#careers">채용</a>
            <br />© 2026 Lifehacking Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
