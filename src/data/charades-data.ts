// Import all category data
import { moviesData } from './categories/movies';
import { animalsData } from './categories/animals';
import { actionsData } from './categories/actions';
import { professionsData } from './categories/professions';
import { objectsData } from './categories/objects';
import { emotionsData } from './categories/emotions';
import { disneyData } from './categories/disney';
import { funnyData } from './categories/funny';

export interface CharadesWord {
  word: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ageGroup: 'kids' | 'adults' | 'all';
  wordCount: number;
}

// Combine all category data into one comprehensive database
export const charadesDatabase: CharadesWord[] = [
  ...moviesData,
  ...animalsData,
  ...actionsData,
  ...professionsData,
  ...objectsData,
  ...emotionsData,
  ...disneyData,
  ...funnyData,
];

export const categories = [
  'all',
  'movies', 
  'animals', 
  'actions', 
  'professions', 
  'objects', 
  'emotions', 
  'disney', 
  'funny'
];

export const difficulties = ['easy', 'medium', 'hard'];
export const ageGroups = ['all', 'kids', 'adults'];