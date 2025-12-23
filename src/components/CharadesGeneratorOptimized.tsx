'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback, useRef, lazy, Suspense, useMemo } from 'react';
import type { CharadesWord } from '@/data/charades-types';
import { useLocale } from '@/contexts/LocaleContext';
import { categoryIds, difficultyIds, ageGroupIds } from '@/data/charades-metadata';
import { buildLocalePath } from '@/utils/localePaths';
import { trackEvent } from '@/lib/analytics';

const DEFAULT_BATCH_SIZE = 3;

interface ScenarioPreset {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  ageGroup: string;
  wordCount: number;
  roundLength: string;
  tip: string;
}

// Lazy load non-critical components
const FilterComponent = lazy(() => import('@/components/FilterComponent'));

interface CharadesGeneratorProps {
  defaultCategory?: string;
  defaultAgeGroup?: string;
  defaultDifficulty?: string;
  title?: string;
  description?: string;
  hideFilters?: boolean;
  initialWords?: CharadesWord[];
  hideCategoryFilter?: boolean;
  hideDifficultyFilter?: boolean;
  hideAgeGroupFilter?: boolean;
  isShowScenarios?: boolean;
  showChristmasPromoLink?: boolean;
}

type PickWordsFn = (
  category: string,
  difficulty: string,
  ageGroup: string,
  count: number,
  locale: string,
) => CharadesWord[];

export default function CharadesGeneratorOptimized({
  defaultCategory = 'all',
  defaultAgeGroup = 'all',
  defaultDifficulty = 'all',
  title,
  description,
  hideFilters = false,
  initialWords,
  hideCategoryFilter = false,
  hideDifficultyFilter = false,
  hideAgeGroupFilter = false,
  isShowScenarios = false,
  showChristmasPromoLink = false,
}: CharadesGeneratorProps = {}) {
  const { locale, dictionary, t } = useLocale();
  const difficultiesLabel = dictionary.difficulties;
  const categoriesLabel = dictionary.categories;
  const ageGroupLabels = dictionary.ageGroups;
  const resolvedTitle = title ?? dictionary.generator.defaultTitle;
  const resolvedDescription = description ?? dictionary.generator.defaultDescription;
  const scenarios = useMemo(
    () => (dictionary.generator.scenarios ?? []) as ScenarioPreset[],
    [dictionary],
  );
  const christmasHref = useMemo(
    () => buildLocalePath(locale, '/christmas-charades-generator/'),
    [locale],
  );
  const christmasLabel =
    locale === 'es'
      ? 'Especial de Navidad: charadas navideñas'
      : 'Holiday special: Christmas charades generator';

  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(defaultDifficulty);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(defaultAgeGroup);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(DEFAULT_BATCH_SIZE);
  const [customCount, setCustomCount] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [generatedWords, setGeneratedWords] = useState<CharadesWord[]>(initialWords || []);
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasTriggeredInitialFetch = useRef(false);
  const pickWordsRef = useRef<PickWordsFn | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<'idle' | 'success' | 'error'>('idle');
  const [scenarioUsage, setScenarioUsage] = useState<Record<string, boolean>>({});
  const [scenariosExpanded, setScenariosExpanded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem('cg-scenario-usage');
        if (stored) {
          const parsed = JSON.parse(stored) as Record<string, boolean>;
          setScenarioUsage(parsed);
        }
      } catch {
        // ignore parsing errors
      }
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    setActiveScenarioId(null);
  }, [locale]);

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    setSelectedDifficulty(defaultDifficulty);
  }, [defaultDifficulty]);

  useEffect(() => {
    setSelectedAgeGroup(defaultAgeGroup);
  }, [defaultAgeGroup]);

  useEffect(() => {
    if (!scenarios.find((scenario) => scenario.id === activeScenarioId)) {
      setActiveScenarioId(null);
    }
  }, [scenarios, activeScenarioId]);

  const loadPickWords = useCallback(async (): Promise<PickWordsFn> => {
    if (pickWordsRef.current) {
      return pickWordsRef.current;
    }
    const mod = await import('@/utils/charades');
    pickWordsRef.current = mod.pickWords as PickWordsFn;
    return pickWordsRef.current;
  }, []);

  const generateBatchWords = useCallback(
    async (count: number) => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const pickWords = await loadPickWords();
        const words = pickWords(
          selectedCategory,
          selectedDifficulty,
          selectedAgeGroup,
          count,
          locale,
        );
        setGeneratedWords(words);
      } catch {
        setErrorMessage(dictionary.generator.errorFetchingWords);
      } finally {
        setIsLoading(false);
      }
    },
    [
      dictionary.generator.errorFetchingWords,
      loadPickWords,
      locale,
      selectedAgeGroup,
      selectedCategory,
      selectedDifficulty,
    ],
  );

  const activeScenario = useMemo(() => {
    if (!activeScenarioId) return null;
    return scenarios.find((scenario) => scenario.id === activeScenarioId) ?? null;
  }, [activeScenarioId, scenarios]);

  const handleApplyScenario = useCallback(
    (scenario: ScenarioPreset) => {
      setActiveScenarioId(scenario.id);
      setSelectedCategory(scenario.category);
      setSelectedDifficulty(scenario.difficulty);
      setSelectedAgeGroup(scenario.ageGroup);
      setBatchSize(scenario.wordCount);
      setIsCustomMode(false);
      setCustomCount('');
      setScenariosExpanded(true);
      trackEvent('charades_scenario_apply', { scenarioId: scenario.id });
    },
    [],
  );

  const handleScenarioReset = useCallback(() => {
    setActiveScenarioId(null);
    setSelectedCategory(defaultCategory);
    setSelectedDifficulty(defaultDifficulty);
    setSelectedAgeGroup(defaultAgeGroup);
    setBatchSize(DEFAULT_BATCH_SIZE);
    setIsCustomMode(false);
    setCustomCount('');
  }, [defaultAgeGroup, defaultCategory, defaultDifficulty]);

  const markScenarioUsed = useCallback(() => {
    if (!activeScenario) return;
    const next = { ...scenarioUsage, [activeScenario.id]: true };
    setScenarioUsage(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cg-scenario-usage', JSON.stringify(next));
    }
  }, [activeScenario, scenarioUsage]);

  // Mark hydration complete so we can manage client-side requests
  useEffect(() => {
    if (!hasHydrated) {
      setHasHydrated(true);
    }
  }, [hasHydrated]);

  const parsedCustomCount = Number.parseInt(customCount, 10);
  const isCustomValid =
    isCustomMode && !Number.isNaN(parsedCustomCount) && parsedCustomCount >= 1 && parsedCustomCount <= 50;

  const handleGenerateClick = useCallback(() => {
    const effectiveCount = isCustomMode && isCustomValid ? parsedCustomCount : batchSize;
    trackEvent('charades_generate_click', {
      category: selectedCategory,
      difficulty: selectedDifficulty,
      ageGroup: selectedAgeGroup,
      count: effectiveCount,
    });

    if (isCustomMode) {
      if (!isCustomValid) {
        return;
      }
      setBatchSize(parsedCustomCount);
      void generateBatchWords(parsedCustomCount);
      return;
    }

    void generateBatchWords(batchSize);
  }, [
    batchSize,
    generateBatchWords,
    isCustomMode,
    isCustomValid,
    parsedCustomCount,
    selectedAgeGroup,
    selectedCategory,
    selectedDifficulty,
  ]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!hasTriggeredInitialFetch.current) {
      hasTriggeredInitialFetch.current = true;
      if (initialWords && initialWords.length > 0) {
        return;
      }
    }

    const effectiveCount = isCustomMode && isCustomValid ? parsedCustomCount : batchSize;
    void generateBatchWords(effectiveCount);
  }, [batchSize, generateBatchWords, hasHydrated, initialWords, isCustomMode, isCustomValid, parsedCustomCount, selectedAgeGroup, selectedCategory, selectedDifficulty]);

  const quickPickOptions = [1, 3, 5, 10];
  const displayCount = isCustomMode ? customCount || String(batchSize) : String(batchSize);

  const handleCopyWords = useCallback(async () => {
    if (!generatedWords.length) return;
    trackEvent('charades_copy_words', { count: generatedWords.length });
    const list = generatedWords
      .map((word) => {
        const difficultyLabel =
          difficultiesLabel[word.difficulty as keyof typeof difficultiesLabel] ?? word.difficulty;
        const categoryLabel =
          categoriesLabel[word.category as keyof typeof categoriesLabel] ?? word.category;
        const ageLabel = ageGroupLabels[word.ageGroup as keyof typeof ageGroupLabels] ?? word.ageGroup;
        return `${word.word} — ${difficultyLabel} · ${categoryLabel} · ${ageLabel}`;
      })
      .join('\n');

    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(list);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = list;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopyFeedback('success');
    } catch {
      setCopyFeedback('error');
    }

    window.setTimeout(() => {
      setCopyFeedback('idle');
    }, 3000);
  }, [generatedWords, difficultiesLabel, categoriesLabel, ageGroupLabels]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header - Critical for LCP */}
      <header className="text-center mb-8">
        {showChristmasPromoLink && (
          <div className="mb-3">
            <Link
              href={christmasHref}
              className="inline-flex items-center rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white shadow-md shadow-red-300/70 hover:bg-red-500 transition-colors"
            >
              <span className="mr-2" aria-hidden="true">
                🎄
              </span>
              {christmasLabel}
            </Link>
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{resolvedTitle}</h1>
        <p className="text-gray-600 text-lg">{resolvedDescription}</p>
        <p className="text-gray-500 text-sm mt-2">{dictionary.generator.wordsCountSublabel}</p>
      </header>

      {scenarios.length > 0 &&  isShowScenarios && (
        <section className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 pt-4 pb-4 sm:p-6 sm:pt-4 sm:pb-4">
          <div className="sm:flex sm:items-start sm:justify-between gap-3">
            <div className="max-w-2xl">
              <button
                type="button"
                onClick={() => setScenariosExpanded((prev) => !prev)}
                className="flex items-center gap-2 text-left text-lg font-semibold text-indigo-900"
                aria-expanded={scenariosExpanded}
              >
                <span>{dictionary.generator.scenarioHeading}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${scenariosExpanded ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {scenariosExpanded && (
                <p className="mt-1 text-sm text-indigo-800">
                  {dictionary.generator.scenarioSubheading}
                </p>
              )}
            </div>
            <div className="mt-3 flex shrink-0 items-center gap-2 sm:mt-0">
              <button
                type="button"
                onClick={() => setScenariosExpanded((prev) => !prev)}
                className="inline-flex items-center rounded-md border border-indigo-300 px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
              >
                {scenariosExpanded
                  ? dictionary.generator.scenarioToggleClose
                  : dictionary.generator.scenarioToggleOpen}
              </button>
              {activeScenario && (
                <button
                  type="button"
                  onClick={handleScenarioReset}
                  className="inline-flex items-center rounded-md border border-indigo-300 px-3 py-1.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                >
                  {dictionary.generator.scenarioReset}
                </button>
              )}
            </div>
          </div>

          {scenariosExpanded && (
            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {scenarios.map((scenario) => {
                const isActive = scenario.id === activeScenarioId;
                const difficultyLabel =
                  difficultiesLabel[scenario.difficulty as keyof typeof difficultiesLabel] ?? scenario.difficulty;
                const categoryLabel =
                categoriesLabel[scenario.category as keyof typeof categoriesLabel] ?? scenario.category;
              const ageLabel =
                ageGroupLabels[scenario.ageGroup as keyof typeof ageGroupLabels] ?? scenario.ageGroup;

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleApplyScenario(scenario)}
                  aria-pressed={isActive}
                  className={`text-left rounded-xl border p-4 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isActive
                      ? 'border-indigo-400 bg-white shadow-sm'
                      : 'border-transparent bg-white/80 hover:border-indigo-200 hover:bg-white'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-indigo-600">
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5">{difficultyLabel}</span>
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5">{categoryLabel}</span>
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5">{ageLabel}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-indigo-900">{scenario.title}</h3>
                  <p className="mt-2 text-sm text-indigo-800">{scenario.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-indigo-600">
                    {t('generator.cardCountLabel', { count: scenario.wordCount })}
                  </p>
                </button>
              );
            })}
            </div>
          )}

          {activeScenario && scenariosExpanded && (
            <div className="mt-5 rounded-xl border border-indigo-200 bg-white p-4 text-sm text-indigo-800">
              <p className="font-semibold text-indigo-900">
                {dictionary.generator.scenarioAppliedLabel} {activeScenario.title}
              </p>
              <p className="mt-1">{activeScenario.description}</p>
              <p className="mt-3 flex flex-wrap gap-3 text-sm">
                <span>
                  {t('generator.cardCountLabel', { count: activeScenario.wordCount })}
                </span>
                <span>• {dictionary.generator.roundLengthLabel}: {activeScenario.roundLength}</span>
                <span>• {dictionary.generator.tipLabel}: {activeScenario.tip}</span>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={markScenarioUsed}
                  className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                    scenarioUsage[activeScenario.id]
                      ? 'border-indigo-200 bg-indigo-50 text-indigo-700 cursor-default'
                      : 'border-indigo-300 bg-white text-indigo-700 hover:bg-indigo-100'
                  }`}
                  disabled={scenarioUsage[activeScenario.id] ?? false}
                >
                  {dictionary.generator.scenarioMarkUsed}
                </button>
                {scenarioUsage[activeScenario.id] && (
                  <span className="text-xs text-indigo-600">
                    {dictionary.generator.scenarioMarkedMessage}
                  </span>
                )}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Filters - Lazy loaded */}
      {!hideFilters && (
        <Suspense
          fallback={(
            <div className="mb-8">
              <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 h-14 animate-pulse" />
            </div>
          )}
        >
          <FilterComponent
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            selectedAgeGroup={selectedAgeGroup}
            filtersExpanded={filtersExpanded}
            setSelectedCategory={setSelectedCategory}
            setSelectedDifficulty={setSelectedDifficulty}
            setSelectedAgeGroup={setSelectedAgeGroup}
            setFiltersExpanded={setFiltersExpanded}
            categories={categoryIds}
            difficulties={[...difficultyIds]}
            ageGroups={[...ageGroupIds]}
            showCategoryFilter={!hideCategoryFilter}
            showDifficultyFilter={!hideDifficultyFilter}
            showAgeGroupFilter={!hideAgeGroupFilter}
          />
        </Suspense>
      )}

      {/* Generated Words - Critical content */}
      {generatedWords.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{dictionary.generator.yourWordsHeading}</h2>
            <p className="text-gray-600">{t('generator.readyToPlay', { count: generatedWords.length })}</p>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-indigo-700">
              <button
                type="button"
                onClick={handleCopyWords}
                className="inline-flex items-center rounded-md border border-indigo-300 px-3 py-1.5 font-semibold text-indigo-700 transition hover:bg-indigo-100"
              >
                {dictionary.generator.copyListButton}
              </button>
              <span aria-live="polite" className="min-h-[1rem] text-xs text-gray-500">
                {copyFeedback === 'success'
                  ? dictionary.generator.copySuccess
                  : copyFeedback === 'error'
                    ? dictionary.generator.copyError
                    : ''}
              </span>
            </div>

              {/* Batch Size Selector */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700">{dictionary.generator.quickPickLabel}</span>
                {quickPickOptions.map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setIsCustomMode(false);
                      setBatchSize(num);
                      setCustomCount('');
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !isCustomMode && batchSize === num
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsCustomMode(true);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCustomMode
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {dictionary.generator.customLabel}
                </button>
                </div>

              {/* Custom Count Input */}
              {isCustomMode && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{dictionary.generator.customAmountLabel}</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={customCount}
                    onChange={(e) => setCustomCount(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const count = Number.parseInt(e.currentTarget.value, 10);
                        if (!Number.isNaN(count) && count >= 1 && count <= 50) {
                          setBatchSize(count);
                          void generateBatchWords(count);
                        }
                      }
                    }}
                    placeholder={dictionary.generator.customPlaceholder}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                  onClick={() => {
                    if (isCustomValid) {
                      setBatchSize(parsedCustomCount);
                      void generateBatchWords(parsedCustomCount);
                    }
                  }}
                    disabled={!isCustomValid}
                    className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {dictionary.generator.apply}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-200 ${
                isLoading ? 'opacity-40 pointer-events-none' : 'opacity-100'
              }`}
            >
              {generatedWords.map((word, index) => (
                <div
                  key={`${word.word}-${index}`}
                  className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-3">{word.word}</div>
                  <div className="flex justify-center gap-2 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{difficultiesLabel[word.difficulty as keyof typeof difficultiesLabel] ?? word.difficulty}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{categoriesLabel[word.category as keyof typeof categoriesLabel] ?? word.category}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{ageGroupLabels[word.ageGroup as keyof typeof ageGroupLabels] ?? word.ageGroup}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isLoading && hasHydrated && (
              <div className="absolute inset-0 rounded-xl bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
                <div className="flex flex-wrap justify-center gap-4 w-full px-6">
                  {Array.from({ length: Math.min(Math.max(batchSize, 1), 6) }, (_, index) => (
                    <div
                      key={`overlay-loading-${index}`}
                      className="w-32 sm:w-40 bg-white border border-gray-200 rounded-xl p-4 animate-pulse"
                    >
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-8 text-center">
          {errorMessage}
        </div>
      )}

      {/* Generate Button */}
      <div className="text-center mb-6">
        <button
          onClick={handleGenerateClick}
          disabled={isCustomMode && !isCustomValid}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          {t('generator.generateButton', { count: displayCount })}
        </button>
      </div>

      {/* Instructions - Non-critical, loaded after main content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">{dictionary.generator.howToPlayHeading}</h2>
        <ul className="text-gray-600 space-y-2">
          {dictionary.generator.howToPlaySteps.map((step) => (
            <li key={step}>• {step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
