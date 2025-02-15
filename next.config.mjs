/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  pageExtensions: ["ts", "tsx"],
  async redirects() {
    // Проверяем, задан ли API URL
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("⚠️ NEXT_PUBLIC_API_URL is not defined. Skipping redirects.");
      return [];
    }

    let redirections = [];

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 500); // Таймаут 5 сек.

      console.log("🔍 Fetching redirects from API...");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/redirections`,
        { signal: controller.signal }
      );

      clearTimeout(timeout);

      if (!res.ok) {
        console.warn(`⚠️ Failed to fetch redirects. Status: ${res.status}`);
        return [];
      }

      const result = await res.json();
      if (!result?.data?.length) {
        console.warn("⚠️ No redirects found.");
        return [];
      }

      const redirectItems = result.data.map(({ source, destination }) => ({
        source: `/:locale${source}`,
        destination: `/:locale${destination}`,
        permanent: false,
      }));

      redirections = redirections.concat(redirectItems);

      console.log(`✅ Loaded ${redirections.length} redirects.`);
      return redirections;
    } catch (error) {
      console.error("❌ Error fetching redirects: (next.config)");
      return [];
    }
  },
};

export default nextConfig;
