import Link from "next/link";
import CharadesGeneratorOptimized from "@/components/CharadesGeneratorOptimized";
import { buildLocalePath } from "@/utils/localePaths";
import type { CharadesWord } from "@/data/charades-types";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import CommunityPlaybooks from "@/components/CommunityPlaybooks";

interface HomeLandingProps {
  initialWords: CharadesWord[];
  dictionary: Dictionary;
  locale: Locale;
}

export default function HomeLanding({ initialWords, dictionary, locale }: HomeLandingProps) {
  const themedGenerators = dictionary.home.themedGenerators;
  const playGuides = dictionary.home.playGuides;
  const expertInsights = dictionary.home.expertInsights;
  const quickResources = dictionary.home.quickResources;
  const generatorDeepDive = dictionary.home.generatorDeepDive;

  const difference = generatorDeepDive.difference;
  const presets = generatorDeepDive.presets;
  const useCases = generatorDeepDive.useCases;
  const tips = generatorDeepDive.tips;
  const faq = generatorDeepDive.faq;

  return (
    <>
      <CharadesGeneratorOptimized initialWords={initialWords} isShowScenarios />

      {dictionary.home?.seoIntro && (
        <div className="max-w-4xl mx-auto px-6 mt-6">
          <section className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{dictionary.home.seoIntro.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{dictionary.home.seoIntro.lead}</p>
            <div className="flex flex-wrap gap-2 text-sm">
              <Link href={buildLocalePath(locale, "/random-charades-generator/")}
                className="inline-flex items-center rounded-md border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50">
                Random
              </Link>
              <Link href={buildLocalePath(locale, "/movie-charades-generator/")}
                className="inline-flex items-center rounded-md border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50">
                Movies
              </Link>
              <Link href={buildLocalePath(locale, "/disney-charades-generator/")}
                className="inline-flex items-center rounded-md border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50">
                Disney
              </Link>
              <Link href={buildLocalePath(locale, "/charades-generator-for-kids/")}
                className="inline-flex items-center rounded-md border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50">
                Kids
              </Link>
              <Link href={buildLocalePath(locale, "/reverse-charades-game/")}
                className="inline-flex items-center rounded-md border border-gray-200 px-2 py-1 text-gray-700 hover:bg-gray-50">
                Reverse
              </Link>
            </div>
          </section>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-6 pb-10">
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-indigo-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{difference.title}</h2>
          <p className="text-gray-600 mb-4">{difference.lead}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            {difference.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p className="text-gray-600">
            {difference.footer.before}{" "}
            <Link
              href={buildLocalePath(locale, difference.footer.href)}
              className="text-indigo-600 hover:text-indigo-800 underline"
            >
              {difference.footer.linkText}
            </Link>{" "}
            {difference.footer.after}
          </p>
        </section>

        <section className="bg-gradient-to-r from-indigo-100 to-sky-100 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{presets.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {presets.items.map((preset) => (
              <div key={preset.title} className="bg-white/70 rounded-xl border border-indigo-200 p-5 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-700 mb-2">{preset.title}</h3>
                <p className="text-sm text-gray-700 mb-2">{preset.description}</p>
                <p className="text-xs uppercase tracking-wider text-indigo-500 font-semibold">{preset.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{useCases.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {useCases.columns.map((column) => (
              <div key={column.title} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold text-gray-800 mb-3">{column.title}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{tips.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.cards.map((card) => (
              <div key={card.title} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">{card.title}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{faq.title}</h2>
          <div className="space-y-4">
            {faq.items.map((item) => (
              <div key={item.question} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="mb-8">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em]">
              {dictionary.home.exploreLabel}
            </p>
            <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{dictionary.home.themedHeading}</h2>
                <p className="text-gray-600 mt-2">{dictionary.home.themedDescription}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold text-green-600 uppercase tracking-[0.2em]">
              {dictionary.home.guidesLabel}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{dictionary.home.guidesHeading}</h2>
            <p className="mt-2 text-gray-600">{dictionary.home.guidesDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{expertInsights.title}</h2>
            <p className="mt-2 text-gray-600">{expertInsights.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertInsights.personas.map((persona) => (
              <article key={persona.title} className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900">{persona.title}</h3>
                <p className="mt-2 text-sm text-gray-600 italic">“{persona.quote}”</p>
                <h4 className="mt-4 text-sm font-semibold uppercase tracking-wide text-gray-800">
                  {persona.tipsTitle}
                </h4>
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-gray-700">
                  {persona.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
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

      {quickResources && (
        <section className="bg-gray-100 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="mb-8 max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{quickResources.title}</h2>
              <p className="mt-2 text-gray-600">{quickResources.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quickResources.items.map((item) => (
                <article key={item.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  <Link
                    className="mt-4 inline-flex items-center text-sm font-semibold text-orange-600"
                    href={buildLocalePath(locale, item.href)}
                  >
                    {quickResources.actionLabel}
                    <svg
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href={buildLocalePath(locale, "/quick-play-kit/")}
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                {quickResources.printLabel}
              </Link>
            </div>
          </div>
        </section>
      )}

      {dictionary.home.communityPlaybooks && (
        <CommunityPlaybooks
          locale={locale}
          playbooks={dictionary.home.communityPlaybooks}
          fallbackShareCta={dictionary.home.expertInsights.shareCta}
        />
      )}
    </>
  );
}
