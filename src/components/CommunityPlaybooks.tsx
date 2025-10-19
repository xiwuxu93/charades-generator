import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { buildLocalePath } from "@/utils/localePaths";

interface PlaybookEntry {
  id: string;
  persona: string;
  location: string;
  scenario: string;
  summary: string;
  highlights: string[];
  steps: string[];
  lastTested: string;
}

interface CommunityPlaybooksProps {
  locale: Locale;
  playbooks: {
    title: string;
    description: string;
    followLabel: string;
    shareHref?: string;
    shareCta?: string;
    entries: PlaybookEntry[];
  };
  fallbackShareCta: string;
  baseUrl?: string;
}

function formatDate(locale: Locale, isoDate: string) {
  try {
    const formatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    const safeDate = new Date(`${isoDate}T00:00:00Z`);
    return formatter.format(safeDate);
  } catch {
    return isoDate;
  }
}

export default function CommunityPlaybooks({
  locale,
  playbooks,
  fallbackShareCta,
  baseUrl = "https://charades-generator.com",
}: CommunityPlaybooksProps) {
  if (!playbooks?.entries?.length) {
    return null;
  }

  const localizedRoot = buildLocalePath(locale, "/");

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: playbooks.title,
    itemListElement: playbooks.entries.map((entry: PlaybookEntry, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "HowTo",
        "@id": `${baseUrl}${localizedRoot}#${entry.id}`,
        url: `${baseUrl}${localizedRoot}#${entry.id}`,
        name: entry.scenario,
        description: entry.summary,
        dateModified: entry.lastTested,
        author: {
          "@type": "Person",
          name: entry.persona,
        },
        step: entry.steps.map((step, stepIndex) => ({
          "@type": "HowToStep",
          position: stepIndex + 1,
          text: step,
        })),
      },
    })),
  };

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {playbooks.title}
          </h2>
          <p className="mt-2 text-gray-600">{playbooks.description}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {playbooks.entries.map((entry: PlaybookEntry) => (
            <article
              key={entry.id}
              id={entry.id}
              className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {entry.persona}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-gray-900">{entry.scenario}</h3>
                <p className="mt-2 text-sm text-gray-600">{entry.summary}</p>

                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  {entry.highlights.map((highlight) => (
                    <p key={highlight} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                      <span>{highlight}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500">
                  {entry.location} · {formatDate(locale, entry.lastTested)}
                </p>
                <details className="rounded-md border border-indigo-200 bg-white px-3 py-2 text-sm text-gray-700">
                  <summary className="cursor-pointer font-semibold text-indigo-700">
                    {playbooks.followLabel}
                  </summary>
                  <ol className="mt-2 list-decimal list-inside space-y-1">
                    {entry.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </details>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-600">
          <Link
            href={playbooks.shareHref ?? "/contact"}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            {playbooks.shareCta ?? fallbackShareCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
