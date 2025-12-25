"use client";

import { trackEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

type AudienceGroup = {
  key: string;
  title: string;
  description: string;
  items: string[];
};

interface CharadesAudienceListsProps {
  locale: Locale;
  title: string;
  description: string;
  audiences: AudienceGroup[];
}

export default function CharadesAudienceLists({
  locale,
  title,
  description,
  audiences,
}: CharadesAudienceListsProps) {
  const copyLabel = locale === "es" ? "Copiar lista" : "Copy list";

  return (
    <section id="word-lists" className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {audiences.map((group) => (
          <article
            key={group.key}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {group.title}
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  {group.description}
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  const text = group.items.join("\n");
                  try {
                    if (
                      typeof navigator !== "undefined" &&
                      navigator.clipboard &&
                      typeof navigator.clipboard.writeText === "function"
                    ) {
                      await navigator.clipboard.writeText(text);
                    }
                  } catch {
                    // no-op if clipboard is unavailable
                  }

                  try {
                    trackEvent("charades_ideas_copy_list", {
                      audience: group.key,
                      count: group.items.length,
                    });
                  } catch {
                    // ignore analytics errors
                  }
                }}
                className="inline-flex shrink-0 items-center rounded-md border border-gray-300 px-2.5 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                {copyLabel}
              </button>
            </div>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

