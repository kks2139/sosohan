/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // 서버컴포넌트에서는 외부 패키지를 번들링 하지않는 경우가 있음
    // 서버컴포넌트에서 이 패키지를 사용하라고 알려주기 위함
    serverComponentsExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  },
};

export default nextConfig;
