import type { NextConfig } from "next";

// Documentation:
//http://localhost:8000/api/docs

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/session",
        destination: "/api/session"
      },
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/:path*"
            : "/api/:path*",
      },
      {
        source: "/docs",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/docs"
            : "/api/docs",
      },
      {
        source: "/openapi.json",
        destination:
          process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:8000/api/openapi.json"
            : "/api/openapi.json",
      },
    ];
  },
};

export default nextConfig;
