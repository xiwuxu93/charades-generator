import { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/i18n/config";
import { statSync } from "fs";
import { join } from "path";

export const dynamic = "force-static";

const baseUrl = "https://charades-generator.com";

// Function to get file modification time
function getFileModificationTime(filePath: string): Date {
  try {
    const stats = statSync(filePath);
    return stats.mtime;
  } catch {
    // If file doesn't exist, return a default date
    return new Date("2025-08-01");
  }
}

// Function to get page file path
function getPageFilePath(routePath: string): string {
  const basePath = join(process.cwd(), "src/app/[locale]");

  if (routePath === "/") {
    return join(basePath, "page.tsx");
  }

  const trimmed = routePath.replace(/^\/+/, "").replace(/\/+$/, "");
  return join(basePath, trimmed, "page.tsx");
}

// Define all available routes with their properties
const routeConfig: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: MetadataRoute.Sitemap[number]["priority"];
}> = [
  {
    path: "/",
    changeFrequency: "daily",
    priority: 1.0,
  },
  {
    path: "/charades-generator-for-kids",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/movie-charades-generator",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/disney-charades-generator",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/funny-charades-for-adults",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/christmas-charades-generator",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/random-charades-generator",
    changeFrequency: "daily",
    priority: 0.8,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/quick-play-kit",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/contact",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    path: "/how-to-use",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/faq",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/privacy-policy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    path: "/terms-of-service",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate sitemap entries for each supported locale
  for (const locale of SUPPORTED_LOCALES) {
    for (const route of routeConfig) {
      const url =
        locale === "en"
          ? `${baseUrl}${route.path}${route.path === "/" ? "" : "/"}`
          : `${baseUrl}/${locale}${route.path}${route.path === "/" ? "" : "/"}`;

      // Get the actual file modification time
      const pageFilePath = getPageFilePath(route.path);
      const lastModified = getFileModificationTime(pageFilePath);

      sitemapEntries.push({
        url: url,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  return sitemapEntries;
}
