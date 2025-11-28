import { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/i18n/dictionary";
import { SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { BASE_URL, buildAlternateLanguages, buildCanonicalUrl, getOpenGraphLocale } from "@/utils/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);

  const canonicalPath = "/about";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  return {
    title: dictionary.seo.about.title,
    description: dictionary.seo.about.description,
    keywords: dictionary.seo.about.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternateLanguages(canonicalPath),
    },
    openGraph: {
      title: dictionary.seo.about.title,
      description: dictionary.seo.about.description,
      type: "website",
      url: canonicalUrl,
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: `${BASE_URL}/charades-generator-og.png`,
          width: 1200,
          height: 630,
          alt: dictionary.seo.about.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.seo.about.title,
      description: dictionary.seo.about.description,
      images: [`${BASE_URL}/charades-generator-og.png`],
    },
    robots: "index, follow",
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dictionary = getDictionary(locale);
  const changelog = dictionary.pages.changelog;
  const canonicalPath = "/about";
  const canonicalUrl = buildCanonicalUrl(locale, canonicalPath);

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  const changelogSchema = changelog
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: changelog.title,
        itemListElement: changelog.items.map((item: { date: string; title: string; highlights: string[] }, index: number) => {
          const slug = slugify(`${item.date}-${item.title}`) || `entry-${index + 1}`;
          const url = `${canonicalUrl}#${slug}`;

          return {
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Article",
              "@id": url,
              url,
              headline: item.title,
              datePublished: item.date,
              author: {
                "@type": "Organization",
                name: dictionary.footer.brandTitle,
              },
              description: item.highlights.join(" "),
            },
          };
        }),
      }
    : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {changelogSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(changelogSchema) }} />
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {dictionary.pages.about.title}
      </h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.about.mission}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.about.missionDescription}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.about.whatWeDo}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.about.whatWeDoDescription}
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>{dictionary.pages.about.feature1}</li>
            <li>{dictionary.pages.about.feature2}</li>
            <li>{dictionary.pages.about.feature3}</li>
            <li>{dictionary.pages.about.feature4}</li>
            <li>{dictionary.pages.about.feature5}</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.about.whyChooseUs}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {dictionary.pages.about.reason1Title}
              </h3>
              <p className="text-blue-800">
                {dictionary.pages.about.reason1Description}
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-900 mb-3">
                {dictionary.pages.about.reason2Title}
              </h3>
              <p className="text-green-800">
                {dictionary.pages.about.reason2Description}
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                {dictionary.pages.about.reason3Title}
              </h3>
              <p className="text-purple-800">
                {dictionary.pages.about.reason3Description}
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">
                {dictionary.pages.about.reason4Title}
              </h3>
              <p className="text-orange-800">
                {dictionary.pages.about.reason4Description}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {dictionary.pages.about.howItWorks}
          </h2>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.about.howItWorksDescription}
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>{dictionary.pages.about.workStep1}</li>
            <li>{dictionary.pages.about.workStep2}</li>
            <li>{dictionary.pages.about.workStep3}</li>
            <li>{dictionary.pages.about.workStep4}</li>
          </ol>
        </section>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {dictionary.pages.about.getStarted}
          </h3>
          <p className="text-gray-700 mb-4">
            {dictionary.pages.about.getStartedDescription}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={buildLocalePath(locale, "/")}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {dictionary.pages.about.startGenerating}
            </Link>
            <Link
              href={buildLocalePath(locale, "/how-to-use/")}
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {dictionary.pages.about.learnMore}
            </Link>
          </div>
        </div>
      </div>

      {changelog && (
        <section className="mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">{changelog.title}</h2>
          <p className="text-gray-600">{changelog.description}</p>
          <div className="space-y-6">
            {changelog.items.map((entry: { date: string; title: string; highlights: string[] }, index: number) => (
              <article
                key={entry.date}
                id={slugify(`${entry.date}-${entry.title}`) || `entry-${index + 1}`}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                  {new Date(entry.date).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">{entry.title}</h3>
                <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-gray-700">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
