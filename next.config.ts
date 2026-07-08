import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // 모든 하위 페이지를 회사소개 한 페이지(홈)로 통합 — 기존 링크는 홈으로 이동
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/pudufu", destination: "/#pudufu", permanent: true },
      { source: "/philotic", destination: "/#philotic", permanent: true },
      { source: "/careers", destination: "/#careers", permanent: true },
    ];
  },
};

export default nextConfig;
