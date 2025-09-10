'use client';

import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { charadesDatabase, type CharadesWord } from '@/data/charades-data';

// Lazy load non-critical components
const FilterComponent = lazy(() => import('@/components/FilterComponent'));

interface CharadesGeneratorProps {
  defaultCategory?: string;
  defaultAgeGroup?: string;
  defaultDifficulty?: string;
  title?: string;
  description?: string;
  hideFilters?: boolean;
}

export default function CharadesGeneratorOptimized({ 
  defaultCategory = 'all',
  defaultAgeGroup = 'all', 
  defaultDifficulty = 'all',
  title = 'Charades Generator - Free & Instant',
  description = 'Generate charades words instantly from our database of 1000+ carefully curated words and ideas!',
  hideFilters = false,
}: CharadesGeneratorProps = {}) {
  const [generatedWords, setGeneratedWords] = useState<CharadesWord[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(defaultDifficulty);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(defaultAgeGroup);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(3);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateBatchWords = useCallback((count: number) => {
    // Simplified word generation for better performance
    let filteredWords = charadesDatabase.filter(word => {
      return (selectedCategory === 'all' || word.category === selectedCategory) &&
             (selectedDifficulty === 'all' || word.difficulty === selectedDifficulty) &&
             (selectedAgeGroup === 'all' || word.ageGroup === selectedAgeGroup || word.ageGroup === 'all');
    });

    if (filteredWords.length === 0) {
      filteredWords = charadesDatabase;
    }

    const selectedWords: CharadesWord[] = [];
    const shuffled = [...filteredWords].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < Math.min(count, shuffled.length); i++) {
      selectedWords.push(shuffled[i]);
    }

    setGeneratedWords(selectedWords);
  }, [selectedCategory, selectedDifficulty, selectedAgeGroup]);

  const generateWords = useCallback(() => generateBatchWords(batchSize), [generateBatchWords, batchSize]);

  // Generate initial words only after mount for better LCP
  useEffect(() => {
    if (mounted) {
      generateWords();
    }
  }, [mounted, generateWords]);

  if (!mounted) {
    // Show minimal loading state for better FCP
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header - Critical for LCP */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 text-lg">{description}</p>
        <p className="text-gray-500 text-sm mt-2">
          1000+ words across 9 categories
        </p>
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
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Charades Words</h2>
            <p className="text-gray-600">Ready to play! {generatedWords.length} words generated</p>
            
            {/* Batch Size Selector */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-sm font-medium text-gray-700">Generate:</span>
              {[1, 3, 5, 10].map(num => (
                <button
                  key={num}
                  onClick={() => {
                    setBatchSize(num);
                    generateBatchWords(num);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    batchSize === num 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {generatedWords.map((word, index) => (
              <div
                key={`${word.word}-${index}`}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 mb-3">
                    {word.word}
                  </div>
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
          onClick={generateWords}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
        >
          Generate New {batchSize} {batchSize === 1 ? 'Word' : 'Words'}
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