import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 회사 소개 페이지를 홈으로 통합 — 기존 /about 링크는 홈으로 이동
      { source: "/about", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
