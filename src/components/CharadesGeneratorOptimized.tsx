'use client';

import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import type { CharadesWord } from '@/data/charades-types';
import { useLocale } from '@/contexts/LocaleContext';
import { categoryIds, difficultyIds, ageGroupIds } from '@/data/charades-metadata';

const DEFAULT_BATCH_SIZE = 3;

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
}

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
}: CharadesGeneratorProps = {}) {
  const { locale, dictionary, t } = useLocale();
  const difficultiesLabel = dictionary.difficulties;
  const categoriesLabel = dictionary.categories;
  const resolvedTitle = title ?? dictionary.generator.defaultTitle;
  const resolvedDescription = description ?? dictionary.generator.defaultDescription;

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
  const pendingRequest = useRef<AbortController | null>(null);
  const hasTriggeredInitialFetch = useRef(false);

  useEffect(() => () => {
    if (pendingRequest.current) {
      pendingRequest.current.abort();
    }
  }, []);

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    setSelectedDifficulty(defaultDifficulty);
  }, [defaultDifficulty]);

  useEffect(() => {
    setSelectedAgeGroup(defaultAgeGroup);
  }, [defaultAgeGroup]);

  const generateBatchWords = useCallback(
    async (count: number) => {
      if (pendingRequest.current) {
        pendingRequest.current.abort();
      }

      const controller = new AbortController();
      pendingRequest.current = controller;
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch('/api/charades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: selectedCategory,
            difficulty: selectedDifficulty,
            ageGroup: selectedAgeGroup,
            count,
            locale,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch words');
        }

        const data = (await response.json()) as { words: CharadesWord[] };
        setGeneratedWords(data.words);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setErrorMessage(dictionary.generator.errorFetchingWords);
        }
      } finally {
        if (pendingRequest.current === controller) {
          pendingRequest.current = null;
        }
        setIsLoading(false);
      }
    },
    [dictionary.generator.errorFetchingWords, locale, selectedAgeGroup, selectedCategory, selectedDifficulty],
  );

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
    if (isCustomMode) {
      if (!isCustomValid) {
        return;
      }
      setBatchSize(parsedCustomCount);
      void generateBatchWords(parsedCustomCount);
      return;
    }

    void generateBatchWords(batchSize);
  }, [batchSize, generateBatchWords, isCustomMode, isCustomValid, parsedCustomCount]);

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header - Critical for LCP */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{resolvedTitle}</h1>
        <p className="text-gray-600 text-lg">{resolvedDescription}</p>
        <p className="text-gray-500 text-sm mt-2">{dictionary.generator.wordsCountSublabel}</p>
      </header>

      {/* Filters - Lazy loaded */}
      {!hideFilters && (
        <Suspense fallback={<div className="mb-6 bg-gray-50 rounded-lg p-4">{dictionary.generator.loadingFilters}</div>}>
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
