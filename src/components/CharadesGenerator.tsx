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
}

export default function CharadesGenerator({ 
  defaultCategory = 'all',
  defaultAgeGroup = 'all', 
  defaultDifficulty = 'all',
  title = 'Best Free Charades Generator Online',
  description = 'Generate instant charades words from our database of 1000+ carefully curated words and ideas!',
  hideFilters = false
}: CharadesGeneratorProps = {}) {
  const [currentWord, setCurrentWord] = useState<CharadesWord | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(defaultCategory);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(defaultDifficulty);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>(defaultAgeGroup);
  const [, setHistory] = useState<CharadesWord[]>([]);
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);

  const generateWord = useCallback(() => {
    setHistory(prevHistory => {
      // Filter words based on selected criteria
      let filteredWords = charadesDatabase.filter(word => {
        return (selectedCategory === 'all' || word.category === selectedCategory) &&
               (selectedDifficulty === 'all' || word.difficulty === selectedDifficulty) &&
               (selectedAgeGroup === 'all' || word.ageGroup === selectedAgeGroup || word.ageGroup === 'all');
      });

      // Remove recently used words to avoid repetition
      if (prevHistory.length > 0) {
        const recentWords = prevHistory.slice(-5).map(w => w.word);
        filteredWords = filteredWords.filter(word => !recentWords.includes(word.word));
      }

      if (filteredWords.length === 0) {
        // If no words available, reset history and try again
        filteredWords = charadesDatabase.filter(word => {
          return (selectedCategory === 'all' || word.category === selectedCategory) &&
                 (selectedDifficulty === 'all' || word.difficulty === selectedDifficulty) &&
                 (selectedAgeGroup === 'all' || word.ageGroup === selectedAgeGroup || word.ageGroup === 'all');
        });
        // Reset history
        if (filteredWords.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredWords.length);
          const selectedWord = filteredWords[randomIndex];
          setCurrentWord(selectedWord);
          return [selectedWord];
        }
        return [];
      } else {
        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        const selectedWord = filteredWords[randomIndex];
        setCurrentWord(selectedWord);
        return [...prevHistory, selectedWord];
      }
    });
  }, [selectedCategory, selectedDifficulty, selectedAgeGroup]);

  useEffect(() => {
    generateWord();
  }, [generateWord]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      all: '🎭',
      movies: '🎬',
      animals: '🐾',
      actions: '⚡',
      professions: '👔',
      objects: '📦',
      emotions: '😊',
      disney: '🏰',
      funny: '😂'
    };
    return icons[category] || '🎭';
  };

  const getDifficultyIcon = (difficulty: string) => {
    const icons: { [key: string]: string } = {
      easy: '🟢',
      medium: '🟡',
      hard: '🔴'
    };
    return icons[difficulty] || '⚡';
  };

  const getDifficultyButtonColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      easy: 'bg-green-500',
      medium: 'bg-yellow-500',
      hard: 'bg-red-500'
    };
    return colors[difficulty] || 'bg-gray-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {title}
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          {description}
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">🎬 Movies</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">🐾 Animals</span>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">🏰 Disney</span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">😂 Funny</span>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">⚡ Actions</span>
        </div>
      </div>

      {/* Current Word Display - Priority Position */}
      {currentWord && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white text-center">
          <div className="text-6xl mb-4">
            {getCategoryIcon(currentWord.category)}
          </div>
          <div className="text-5xl font-bold mb-4">
            {currentWord.word}
          </div>
          <div className="flex justify-center items-center space-x-4 text-sm">
            <span className={`px-3 py-1 rounded-full ${getDifficultyColor(currentWord.difficulty)} text-gray-800`}>
              {currentWord.difficulty.toUpperCase()}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {currentWord.category.toUpperCase()}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {currentWord.wordCount} {currentWord.wordCount === 1 ? 'WORD' : 'WORDS'}
            </span>
          </div>
        </div>
      )}

      {/* Generate Button - Prominent Position */}
      <div className="text-center mb-8">
        <button
          onClick={generateWord}
          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          🎲 Generate New Word
        </button>
      </div>

      {/* Collapsible Filters */}
      {!hideFilters && (
      <div className="mb-8">
        <button
          onClick={() => setFiltersExpanded(!filtersExpanded)}
          className="w-full bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-800">🎯 Customize Your Game</span>
            {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedAgeGroup !== 'all') && (
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                Filters Active
              </span>
            )}
          </div>
          <div className={`transform transition-transform duration-200 ${filtersExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Expandable Filter Content */}
        {filtersExpanded && (
          <div className="bg-white rounded-b-lg shadow-md p-6 -mt-2 border-t border-gray-100">
            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                📂 Category
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700'
                    }`}
                  >
                    {getCategoryIcon(category)} {category === 'all' ? 'All Categories' : 
                     category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                ⚡ Difficulty Level
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedDifficulty === 'all'
                      ? 'bg-gray-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🎯 All Levels
                </button>
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedDifficulty === difficulty
                        ? `${getDifficultyButtonColor(difficulty)} text-white shadow-lg transform scale-105`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getDifficultyIcon(difficulty)} {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Age Group Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                👥 Age Group
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAgeGroup('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedAgeGroup === 'all'
                      ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                  }`}
                >
                  🌟 All Ages
                </button>
                <button
                  onClick={() => setSelectedAgeGroup('kids')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedAgeGroup === 'kids'
                      ? 'bg-green-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                  }`}
                >
                  👶 Kids Friendly
                </button>
                <button
                  onClick={() => setSelectedAgeGroup('adults')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedAgeGroup === 'adults'
                      ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                  }`}
                >
                  🧑 Adults Only
                </button>
              </div>
            </div>

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


      {/* Why Choose Our Charades Generator */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Our Free Charades Generator?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">1000+ Curated Words</h3>
            <p className="text-gray-600 text-sm">Carefully selected charades words across multiple categories for endless fun</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">👨‍👩‍👧‍👦</div>
            <h3 className="font-semibold text-gray-800 mb-2">All Ages Welcome</h3>
            <p className="text-gray-600 text-sm">Family-friendly content suitable for kids, teens, and adults</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Instant & Free</h3>
            <p className="text-gray-600 text-sm">No registration required. Generate charades words instantly</p>
          </div>
        </div>
      </div>

      {/* Perfect For Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfect for Every Occasion</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🎉</div>
            <h3 className="font-semibold text-gray-800">Party Games</h3>
            <p className="text-gray-600 text-sm">Perfect icebreaker for parties and social gatherings</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🏠</div>
            <h3 className="font-semibold text-gray-800">Family Night</h3>
            <p className="text-gray-600 text-sm">Quality time with family members of all ages</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🏢</div>
            <h3 className="font-semibold text-gray-800">Team Building</h3>
            <p className="text-gray-600 text-sm">Great for office team building activities</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🎓</div>
            <h3 className="font-semibold text-gray-800">Classroom</h3>
            <p className="text-gray-600 text-sm">Educational and fun for students and teachers</p>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Play Charades - Complete Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Basic Charades Rules:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>One player acts out the charades word without speaking</li>
              <li>Other players try to guess the word within the time limit</li>
              <li>Use gestures, facial expressions, and body language only</li>
              <li>No talking, pointing at objects, or mouthing words allowed</li>
              <li>Team with most correct guesses wins!</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Pro Charades Tips:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Start with easier categories for beginners</li>
              <li>Set a time limit (2-3 minutes works well)</li>
              <li>Use standard charades gestures when possible</li>
              <li>Break complex words into smaller parts</li>
              <li>Be creative and have fun with your acting!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How many charades words are in your database?</h3>
            <p className="text-gray-600">Our charades generator includes over 1000 carefully curated words across multiple categories including movies, animals, Disney characters, actions, professions, and more.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Is this charades generator really free?</h3>
            <p className="text-gray-600">Yes! Our online charades generator is completely free to use. No registration, no downloads, no hidden fees. Just instant charades fun for everyone.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Can I use this for kids&apos; charades games?</h3>
            <p className="text-gray-600">Absolutely! We have a dedicated kids-friendly filter that shows age-appropriate charades words. Perfect for family game nights, classroom activities, and children&apos;s parties.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What categories of charades words do you offer?</h3>
            <p className="text-gray-600">We offer multiple categories including movies, animals, Disney characters, actions, professions, objects, emotions, and funny words. You can filter by category, difficulty, and age group.</p>
          </div>
        </div>
      </div>
    </div>
  );
}