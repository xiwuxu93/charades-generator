'use client';

import { useState, useEffect, useCallback, useRef, useMemo, lazy, Suspense } from 'react';
import type { CharadesWord } from '@/data/charades-types';
import { pickWords } from '@/utils/charades';
import { useLocale } from '@/contexts/LocaleContext';
import { categoryIds, difficulties as difficultyIds, ageGroups as ageGroupIds } from '@/data/charades-data';

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

  useEffect(() => {
    setSelectedCategory(defaultCategory);
  }, [defaultCategory]);

  useEffect(() => {
    setSelectedDifficulty(defaultDifficulty);
  }, [defaultDifficulty]);

  useEffect(() => {
    setSelectedAgeGroup(defaultAgeGroup);
  }, [defaultAgeGroup]);

  // Handle client-side hydration and initial word generation
  useEffect(() => {
    if (!hasHydrated) {
      setHasHydrated(true);
      // Only generate initial words if none were provided
      if (!initialWords || initialWords.length === 0) {
        const words = pickWords(defaultCategory, defaultDifficulty, defaultAgeGroup, DEFAULT_BATCH_SIZE, locale);
        setGeneratedWords(words);
      }
    }
  }, [hasHydrated, initialWords, defaultCategory, defaultDifficulty, defaultAgeGroup, locale]);

  const generateBatchWords = useCallback(
    (count: number) => {
      const words = pickWords(selectedCategory, selectedDifficulty, selectedAgeGroup, count, locale);
      setGeneratedWords(words);
    },
    [locale, selectedAgeGroup, selectedCategory, selectedDifficulty],
  );

  const parsedCustomCount = Number.parseInt(customCount, 10);
  const isCustomValid =
    isCustomMode && !Number.isNaN(parsedCustomCount) && parsedCustomCount >= 1 && parsedCustomCount <= 50;

  const handleGenerateClick = useCallback(() => {
    if (isCustomMode) {
      if (!isCustomValid) {
        return;
      }
      setBatchSize(parsedCustomCount);
      generateBatchWords(parsedCustomCount);
      return;
    }

    generateBatchWords(batchSize);
  }, [batchSize, generateBatchWords, isCustomMode, isCustomValid, parsedCustomCount]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    const effectiveCount = isCustomMode && isCustomValid ? parsedCustomCount : batchSize;
    generateBatchWords(effectiveCount);
  }, [hasHydrated, batchSize, generateBatchWords, isCustomMode, isCustomValid, parsedCustomCount, selectedCategory, selectedDifficulty, selectedAgeGroup]);

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
      {hasHydrated && generatedWords.length > 0 && (
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
                          generateBatchWords(count);
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </div>
      )}

      {/* Loading state during hydration */}
      {!hasHydrated && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="text-center mb-6">
            <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: DEFAULT_BATCH_SIZE }, (_, index) => (
              <div
                key={`loading-${index}`}
                className="bg-white border border-gray-200 rounded-xl p-4 animate-pulse"
              >
                <div className="text-center">
                  <div className="h-8 bg-gray-200 rounded mb-3"></div>
                  <div className="flex justify-center gap-2">
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
