"use client";

import { useState } from "react";
import Image from "next/image";

type NavLink = { href: string; label: string };

type SiteHeaderProps = {
  brandName?: string;
  brandHref?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoBoxClass?: string;
  logoChar?: string;
  logoClassName?: string;
  brandTextClass?: string;
  links: NavLink[];
  cta: { href: string; label: string; className?: string };
};

export default function SiteHeader({
  brandName,
  brandHref = "/",
  logoSrc,
  logoAlt,
  logoBoxClass = "h-7 w-40",
  logoChar,
  logoClassName,
  brandTextClass = "text-lg font-bold tracking-tight text-white",
  links,
  cta,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  // 메뉴를 닫으면 클릭된 앵커가 언마운트되고 레이아웃이 바뀌어 브라우저 기본
  // 해시 스크롤이 취소되므로, 해시 링크는 레이아웃 정리 후 직접 스크롤한다.
  function handleMobileNav(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (!href.startsWith("#")) {
      setOpen(false);
      return;
    }
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
    }, 0);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-[#07131f]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href={brandHref} className="flex items-center gap-2.5">
          {logoSrc ? (
            <span className="rounded-xl bg-white/95 p-1.5">
              <span className={`relative block ${logoBoxClass}`}>
                <Image
                  src={logoSrc}
                  alt={logoAlt ?? brandName ?? "로고"}
                  fill
                  sizes="240px"
                  className="object-contain object-left"
                  loading="eager"
                />
              </span>
            </span>
          ) : logoChar ? (
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-white ${logoClassName ?? "bg-white/10"}`}
            >
              {logoChar}
            </span>
          ) : null}
          {brandName ? <span className={brandTextClass}>{brandName}</span> : null}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={cta.href}
            className={`btn-primary rounded-full px-5 py-2 text-sm font-bold transition hover:-translate-y-0.5 ${cta.className ?? ""}`}
          >
            {cta.label}
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white/80 md:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-hairline bg-[#07131f]/95 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleMobileNav(e, link.href)}
              className="block rounded-lg px-3 py-3 text-base font-medium text-muted hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={cta.href}
            onClick={(e) => handleMobileNav(e, cta.href)}
            className="btn-primary mt-2 block rounded-full px-5 py-3 text-center text-base font-bold"
          >
            {cta.label}
          </a>
        </nav>
      )}
    </header>
  );
}
