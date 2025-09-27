'use client';

import Link from 'next/link';
import CharadesGeneratorOptimized from '@/components/CharadesGeneratorOptimized';
import { useLocale } from '@/contexts/LocaleContext';
import { buildLocalePath } from '@/utils/localePaths';
import type { CharadesWord } from '@/data/charades-types';

interface HomeLandingProps {
  initialWords: CharadesWord[];
}

export default function HomeLanding({ initialWords }: HomeLandingProps) {
  const { locale, dictionary } = useLocale();

  const themedGenerators = dictionary.home.themedGenerators;
  const playGuides = dictionary.home.playGuides;
  const expertInsights = dictionary.home.expertInsights;

  return (
    <>
      <CharadesGeneratorOptimized initialWords={initialWords} />

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em]">
              {dictionary.home.exploreLabel}
            </p>
            <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{dictionary.home.themedHeading}</h2>
                <p className="text-gray-600 mt-2">{dictionary.home.themedDescription}</p>
              </div>
              <Link
                href={buildLocalePath(locale, '/random-charades-generator/')}
                className="inline-flex items-center justify-center rounded-md border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                {dictionary.home.luckyLabel}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {themedGenerators.map((item) => (
              <Link
                key={item.href}
                href={buildLocalePath(locale, item.href)}
                className="group relative flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="inline-flex w-fit items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                  {item.badge}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 group-hover:text-blue-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 flex-1">{item.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                  {dictionary.home.browsePromptsLabel}
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-[0.2em]">
              {dictionary.home.guidesLabel}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{dictionary.home.guidesHeading}</h2>
            <p className="mt-2 text-gray-600">{dictionary.home.guidesDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {playGuides.map((resource) => (
              <Link
                key={resource.href}
                href={buildLocalePath(locale, resource.href)}
                className="group flex h-full flex-col rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-700">{resource.title}</h3>
                <p className="mt-2 text-sm text-gray-600 flex-1">{resource.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-green-600">
                  {dictionary.home.readMoreLabel}
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900">{expertInsights.title}</h2>
            <p className="mt-3 text-gray-600">{expertInsights.description}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {expertInsights.personas.map((persona) => (
              <article key={persona.title} className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{persona.title}</h3>
                <p className="mt-2 text-sm text-gray-600 italic">“{persona.quote}”</p>
                <h4 className="mt-4 text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  {persona.tipsTitle}
                </h4>
                <ul className="mt-2 space-y-2 text-sm text-gray-600">
                  {persona.tips.map((tip) => (
                    <li key={tip} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-indigo-900">{expertInsights.shareTitle}</h3>
              <p className="mt-1 text-sm text-indigo-800">{expertInsights.shareDescription}</p>
            </div>
            <Link
              href={buildLocalePath(locale, expertInsights.shareHref)}
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              {expertInsights.shareCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
