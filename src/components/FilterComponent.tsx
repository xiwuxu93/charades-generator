'use client';

import { categories, difficulties } from '@/data/charades-data';

interface FilterComponentProps {
  selectedCategory: string;
  selectedDifficulty: string;
  selectedAgeGroup: string;
  filtersExpanded: boolean;
  setSelectedCategory: (category: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  setSelectedAgeGroup: (ageGroup: string) => void;
  setFiltersExpanded: (expanded: boolean) => void;
}

const getDifficultyColor = (difficulty: string) => {
  const colors: { [key: string]: string } = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500'
  };
  return colors[difficulty] || 'bg-gray-500';
};

export default function FilterComponent({
  selectedCategory,
  selectedDifficulty,
  selectedAgeGroup,
  filtersExpanded,
  setSelectedCategory,
  setSelectedDifficulty,
  setSelectedAgeGroup,
  setFiltersExpanded
}: FilterComponentProps) {
  return (
    <div className="mb-8">
      <button
        onClick={() => setFiltersExpanded(!filtersExpanded)}
        className="w-full bg-gray-50 hover:bg-gray-100 rounded-lg p-4 flex items-center justify-between transition-colors border border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Advanced Options</span>
          {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedAgeGroup !== 'all') && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
              Custom Filters
            </span>
          )}
        </div>
        <div className={`transform transition-transform ${filtersExpanded ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {filtersExpanded && (
        <div className="bg-white rounded-b-lg shadow-md p-6 border-t border-gray-100">
          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : 
                   category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Difficulty Level</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDifficulty === 'all'
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Levels
              </button>
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? `${getDifficultyColor(difficulty)} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Age Group Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">Age Group</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'kids', 'adults'].map(ageGroup => (
                <button
                  key={ageGroup}
                  onClick={() => setSelectedAgeGroup(ageGroup)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedAgeGroup === ageGroup
                      ? ageGroup === 'all' ? 'bg-purple-500 text-white' :
                        ageGroup === 'kids' ? 'bg-green-500 text-white' :
                        'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {ageGroup === 'all' ? 'All Ages' :
                   ageGroup === 'kids' ? 'Kids Friendly' : 'Adults Only'}
                </button>
              ))}
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
  );
}