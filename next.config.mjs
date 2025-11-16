/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import { fileURLToPath } from "node:url";

import withBundleAnalyzer from "@next/bundle-analyzer";
import createJiti from "jiti";
import withNextIntl from "next-intl/plugin";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Load env helper (stubbed in this project)
jiti("./src/libs/Env");

const withNextIntlConfig = withNextIntl("./src/libs/i18n.ts");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
export default bundleAnalyzer(
  withNextIntlConfig({
    eslint: {
      dirs: ["."],
    },
    // logging: false,
    compiler: {
      // Remove console logs only in production
      // removeConsole: process.env.NODE_ENV === "production",
    },
    poweredByHeader: false,
    reactStrictMode: false,
    experimental: {
      optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    },
    images: {
      remotePatterns: [],
    },
  })
);


