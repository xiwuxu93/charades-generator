'use client';

import { useState, useEffect, useCallback } from 'react';
import { charadesDatabase, categories, difficulties, type CharadesWord } from '@/data/charades-data';

interface CharadesGeneratorProps {
  defaultCategory?: string;
  defaultAgeGroup?: string;
  defaultDifficulty?: string;
  title?: string;
  description?: string;
  hideFilters?: boolean;
  hideCategoryFilter?: boolean;
  hideDifficultyFilter?: boolean;
  hideAgeGroupFilter?: boolean;
}

export default function CharadesGenerator({ 
  defaultCategory = 'all',
  defaultAgeGroup = 'all', 
  defaultDifficulty = 'all',
  title = 'Charades Generator - Free & Instant',
  description = 'Generate charades words instantly from our database of 1000+ carefully curated words and ideas!',
  hideFilters = false,
  hideCategoryFilter = false,
  hideDifficultyFilter = false,
  hideAgeGroupFilter = false
}: CharadesGeneratorProps = {}) {
  const [generatedWords, setGeneratedWords] = useState<CharadesWord[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(defaultDifficulty);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(defaultAgeGroup);
  const [, setHistory] = useState<CharadesWord[]>([]);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const [batchSize, setBatchSize] = useState<number>(3);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customCount, setCustomCount] = useState<string>('');

  const generateBatchWords = useCallback((count: number) => {
    setHistory(prevHistory => {
      // Filter words based on selected criteria
      let filteredWords = charadesDatabase.filter(word => {
        return (selectedCategory === 'all' || word.category === selectedCategory) &&
               (selectedDifficulty === 'all' || word.difficulty === selectedDifficulty) &&
               (selectedAgeGroup === 'all' || word.ageGroup === selectedAgeGroup || word.ageGroup === 'all');
      });

      // Remove recently used words to avoid repetition
      if (prevHistory.length > 0) {
        const recentWords = prevHistory.slice(-Math.max(10, count * 2)).map(w => w.word);
        filteredWords = filteredWords.filter(word => !recentWords.includes(word.word));
      }

      if (filteredWords.length === 0) {
        // If no words available, reset history and try again
        filteredWords = charadesDatabase.filter(word => {
          return (selectedCategory === 'all' || word.category === selectedCategory) &&
                 (selectedDifficulty === 'all' || word.difficulty === selectedDifficulty) &&
                 (selectedAgeGroup === 'all' || word.ageGroup === selectedAgeGroup || word.ageGroup === 'all');
        });
      }

      // Generate multiple random words
      const selectedWords: CharadesWord[] = [];
      const availableWords = [...filteredWords];
      
      for (let i = 0; i < Math.min(count, availableWords.length); i++) {
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        const selectedWord = availableWords[randomIndex];
        selectedWords.push(selectedWord);
        // Remove selected word to avoid duplicates in batch
        availableWords.splice(randomIndex, 1);
      }

      setGeneratedWords(selectedWords);

      return [...prevHistory, ...selectedWords];
    });
  }, [selectedCategory, selectedDifficulty, selectedAgeGroup]);

  const parsedCustomCount = Number.parseInt(customCount, 10);
  const isCustomValid =
    isCustomMode && !Number.isNaN(parsedCustomCount) && parsedCustomCount >= 1 && parsedCustomCount <= 50;

  const generateWords = useCallback(() => {
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
    generateBatchWords(batchSize);
  }, [generateBatchWords, batchSize]);


  const getDifficultyButtonColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      easy: 'bg-green-500',
      medium: 'bg-yellow-500',
      hard: 'bg-red-500'
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  const quickPickOptions = [1, 3, 5, 10];
  const buttonCountLabel = isCustomMode ? customCount || String(batchSize) : String(batchSize);
  const buttonCountNumber = Number.parseInt(buttonCountLabel, 10);
  const resolvedButtonCount = Number.isNaN(buttonCountNumber) ? batchSize : buttonCountNumber;
  const buttonCountPlural = resolvedButtonCount === 1 ? 'Word' : 'Words';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 leading-tight">
          {title}
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-4 px-2">
          {description}
        </p>
        <p className="text-center text-gray-500 text-sm mt-2 px-2">
          1000+ words across 9 categories: Movies, Animals, Disney, Actions, Professions, Objects, Emotions, Funny, Christmas
        </p>
      </div>

           {/* Collapsible Filters */}
      {!hideFilters && (
      <div className="mb-6 sm:mb-8">
        <button
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          className="w-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 rounded-lg p-4 sm:p-3 flex items-center justify-between transition-colors duration-200 border border-gray-200 touch-manipulation"
        >
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Advanced Options</span>
            {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedAgeGroup !== 'all') && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Custom Filters
              </span>
            )}
          </div>
          <div className={`transform transition-transform duration-200 ${filtersExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Expandable Filter Content */}
        {filtersExpanded && (
          <div className="bg-white rounded-b-lg shadow-md p-4 sm:p-6 -mt-2 border-t border-gray-100">
            {/* Category Filter */}
            {!hideCategoryFilter && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] sm:min-h-auto touch-manipulation ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 active:bg-blue-200'
                    }`}
                  >
{category === 'all' ? 'All Categories' : 
                     category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            )}

            {/* Difficulty Filter */}
            {!hideDifficultyFilter && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] sm:min-h-auto touch-manipulation ${
                    selectedDifficulty === 'all'
                      ? 'bg-gray-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                  }`}
                >
                  All Levels
                </button>
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] sm:min-h-auto touch-manipulation ${
                      selectedDifficulty === difficulty
                        ? `${getDifficultyButtonColor(difficulty)} text-white shadow-lg transform scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                    }`}
                  >
{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            )}

            {/* Age Group Filter */}
            {!hideAgeGroupFilter && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Age Group
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAgeGroup('all')}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] sm:min-h-auto touch-manipulation ${
                    selectedAgeGroup === 'all'
                      ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700 active:bg-purple-200'
                  }`}
                >
                  All Ages
                </button>
                <button
                  onClick={() => setSelectedAgeGroup('kids')}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] sm:min-h-auto touch-manipulation ${
                    selectedAgeGroup === 'kids'
                      ? 'bg-green-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700 active:bg-green-200'
                  }`}
                >
                  Kids Friendly
                </button>
                <button
                  onClick={() => setSelectedAgeGroup('adults')}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] sm:min-h-auto touch-manipulation ${
                    selectedAgeGroup === 'adults'
                      ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700 active:bg-orange-200'
                  }`}
                >
                  Adults Only
                </button>
              </div>
            </div>
            )}

            {/* Active Filters Summary */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">Active filters:</span>
                <div className="flex flex-wrap gap-1">
                  {selectedCategory !== 'all' && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {selectedCategory}
                    </span>
                  )}
                  {selectedDifficulty !== 'all' && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      {selectedDifficulty}
                    </span>
                  )}
                  {selectedAgeGroup !== 'all' && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      {selectedAgeGroup}
                    </span>
                  )}
                  {selectedCategory === 'all' && selectedDifficulty === 'all' && selectedAgeGroup === 'all' && (
                    <span className="text-gray-500 italic">None (showing all words)</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Generated Words Display */}
      {generatedWords.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Charades Words</h2>
            <p className="text-gray-600">Ready to play! {generatedWords.length} {generatedWords.length === 1 ? 'word' : 'words'} generated</p>
            
            {/* Quick Batch Options - Compact one-row layout */}
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-gray-700 shrink-0">Generate:</span>
                {quickPickOptions.map(num => (
                  <button
                    key={num}
                    onClick={() => {
                      setIsCustomMode(false);
                      setCustomCount('');
                      setBatchSize(num);
                      generateBatchWords(num);
                    }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation min-h-[40px] flex items-center justify-center ${
                      !isCustomMode && batchSize === num 
                        ? 'bg-blue-500 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 active:bg-blue-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setIsCustomMode(true);
                    if (!customCount) {
                      setCustomCount(String(batchSize));
                    }
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation min-h-[40px] flex items-center justify-center ${
                    isCustomMode
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 active:bg-blue-200'
                  }`}
                >
                  Custom
                </button>
              </div>
              {isCustomMode && (
                <div className="mt-3 flex items-center justify-center gap-2">
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
                        generateBatchWords(parsedCustomCount);
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {generatedWords.map((word, index) => (
              <div
                key={`${word.word}-${index}`}
                className="bg-white border border-gray-200 rounded-xl p-5 sm:p-4 hover:shadow-md transition-shadow min-h-[120px] flex items-center justify-center"
              >
                <div className="text-center w-full">
                  <div className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 leading-tight">
                    {word.word}
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{word.difficulty}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{word.category}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{word.wordCount} {word.wordCount === 1 ? 'word' : 'words'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      )}

      {/* Generate New Words Button - Compact */}
      <div className="text-center mb-6">
        <button
          onClick={generateWords}
          disabled={isCustomMode && !isCustomValid}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 text-sm touch-manipulation"
        >
          Generate New {buttonCountLabel} {buttonCountPlural}
        </button>
        <p className="text-xs text-gray-500 mt-2">Get fresh words for your next round!</p>
      </div>

 



      {/* Instructions */}
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
