import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The venture and origin-story pages retired — SaySpark speaks for itself
      {
        source: "/venture",
        destination: "https://sayspark.ca",
        permanent: false,
      },
      {
        source: "/projects/sayspark",
        destination: "https://sayspark.ca",
        permanent: false,
      },
      // Canonical host: bounce www to the apex domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ahmadali.ca" }],
        destination: "https://ahmadali.ca/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
