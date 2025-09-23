'use client';

import { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { type CharadesWord } from '@/data/charades-data';
import { pickWords } from '@/utils/charades';

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
}

export default function CharadesGeneratorOptimized({
  defaultCategory = 'all',
  defaultAgeGroup = 'all',
  defaultDifficulty = 'all',
  title = 'Charades Generator - Free & Instant',
  description = 'Generate charades words instantly from our database of 1000+ carefully curated words and ideas!',
  hideFilters = false,
  initialWords,
}: CharadesGeneratorProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(defaultDifficulty);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(defaultAgeGroup);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(DEFAULT_BATCH_SIZE);
  const [customCount, setCustomCount] = useState<string>('');
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [generatedWords, setGeneratedWords] = useState<CharadesWord[]>(() =>
    initialWords && initialWords.length > 0
      ? initialWords
      : pickWords(defaultCategory, defaultDifficulty, defaultAgeGroup, DEFAULT_BATCH_SIZE),
  );
  const hasHydrated = useRef(false);

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
    (count: number) => {
      const words = pickWords(selectedCategory, selectedDifficulty, selectedAgeGroup, count);
      setGeneratedWords(words);
    },
    [selectedCategory, selectedDifficulty, selectedAgeGroup],
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
    if (!hasHydrated.current) {
      hasHydrated.current = true;
      return;
    }

    const effectiveCount = isCustomMode && isCustomValid ? parsedCustomCount : batchSize;
    generateBatchWords(effectiveCount);
  }, [batchSize, generateBatchWords, isCustomMode, isCustomValid, parsedCustomCount, selectedCategory, selectedDifficulty, selectedAgeGroup]);

  const quickPickOptions = [1, 3, 5, 10];
  const displayCount = isCustomMode ? customCount || String(batchSize) : String(batchSize);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header - Critical for LCP */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 text-lg">{description}</p>
        <p className="text-gray-500 text-sm mt-2">1000+ words across 9 categories</p>
      </header>

      {/* Filters - Lazy loaded */}
      {!hideFilters && (
        <Suspense fallback={<div className="mb-6 bg-gray-50 rounded-lg p-4">Loading filters...</div>}>
          <FilterComponent
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            selectedAgeGroup={selectedAgeGroup}
            filtersExpanded={filtersExpanded}
            setSelectedCategory={setSelectedCategory}
            setSelectedDifficulty={setSelectedDifficulty}
            setSelectedAgeGroup={setSelectedAgeGroup}
            setFiltersExpanded={setFiltersExpanded}
          />
        </Suspense>
      )}

      {/* Generated Words - Critical content */}
      {generatedWords.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Charades Words</h2>
            <p className="text-gray-600">Ready to play! {generatedWords.length} words generated</p>

              {/* Batch Size Selector */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700">Quick pick:</span>
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
                  Custom
                </button>
                </div>

              {/* Custom Count Input */}
              {isCustomMode && (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Custom amount:</span>
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
                    placeholder="1-50"
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
                    Apply
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
                    <span className="bg-gray-100 px-2 py-1 rounded">{word.difficulty}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{word.category}</span>
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
          Generate {displayCount} new words
        </button>
      </div>

      {/* Instructions - Non-critical, loaded after main content */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-800 mb-4">How to Play</h2>
        <ul className="text-gray-600 space-y-2">
          <li>• One player acts out the word without speaking</li>
          <li>• Other players guess within the time limit</li>
          <li>• Use only gestures, facial expressions, and body language</li>
          <li>• No talking, pointing, or mouthing words</li>
        </ul>
      </div>
    </div>
  );
}
