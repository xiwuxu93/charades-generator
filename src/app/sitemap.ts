import { MetadataRoute } from "next";
import { statSync } from "node:fs";
import { join } from "node:path";

export const dynamic = "force-static";

function getLastModified(relativePath: string): Date {
  try {
    return statSync(join(process.cwd(), relativePath)).mtime;
  } catch {
    return new Date("2024-01-01T00:00:00Z");
  }
}

const routes: Array<{
  url: string;
  file: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: MetadataRoute.Sitemap[number]["priority"];
}> = [
  {
    url: "https://charades-generator.com/",
    file: "src/app/page.tsx",
    changeFrequency: "daily",
    priority: 1,
  },
  {
    url: "https://charades-generator.com/charades-generator-for-kids/",
    file: "src/app/charades-generator-for-kids/page.tsx",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: "https://charades-generator.com/movie-charades-generator/",
    file: "src/app/movie-charades-generator/page.tsx",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: "https://charades-generator.com/disney-charades-generator/",
    file: "src/app/disney-charades-generator/page.tsx",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: "https://charades-generator.com/funny-charades-for-adults/",
    file: "src/app/funny-charades-for-adults/page.tsx",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: "https://charades-generator.com/christmas-charades-generator/",
    file: "src/app/christmas-charades-generator/page.tsx",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    url: "https://charades-generator.com/random-charades-generator/",
    file: "src/app/random-charades-generator/page.tsx",
    changeFrequency: "daily",
    priority: 0.9,
  },
  {
    url: "https://charades-generator.com/feedback/",
    file: "src/app/feedback/page.tsx",
    changeFrequency: "monthly",
    priority: 0.3,
  },
  {
    url: "https://charades-generator.com/about/",
    file: "src/app/about/page.tsx",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: "https://charades-generator.com/how-to-use/",
    file: "src/app/how-to-use/page.tsx",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: "https://charades-generator.com/faq/",
    file: "src/app/faq/page.tsx",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: "https://charades-generator.com/privacy-policy/",
    file: "src/app/privacy-policy/page.tsx",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: "https://charades-generator.com/terms-of-service/",
    file: "src/app/terms-of-service/page.tsx",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ url, file, changeFrequency, priority }) => ({
    url,
    lastModified: getLastModified(file),
    changeFrequency,
    priority,
  }));
}
