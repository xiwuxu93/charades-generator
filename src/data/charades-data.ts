// Import all category data
import { moviesData } from "./categories/movies";
import { animalsData } from "./categories/animals";
import { actionsData } from "./categories/actions";
import { professionsData } from "./categories/professions";
import { objectsData } from "./categories/objects";
import { emotionsData } from "./categories/emotions";
import { disneyData } from "./categories/disney";
import { funnyData } from "./categories/funny";
// import { enhanceWordWithEmoji } from "@/utils/emojiMapper";

export interface CharadesWord {
  word: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  ageGroup: "kids" | "adults" | "all";
  wordCount: number;
  // Enhanced fields
  emoji?: string; // Visual icon for the word
  description?: string; // Brief description or hint
  tags?: string[]; // Additional searchable tags
  popularity?: number; // Usage frequency (1-10, higher = more popular)
}

// Combine all category data into one comprehensive database with emojis
const rawDatabase = [
  ...moviesData,
  ...animalsData,
  ...actionsData,
  ...professionsData,
  ...objectsData,
  ...emotionsData,
  ...disneyData,
  ...funnyData,
];

// Enhance all words with emojis
export const charadesDatabase: CharadesWord[] = rawDatabase;

export const categories = [
  "all",
  "movies",
  "animals",
  "actions",
  "professions",
  "objects",
  "emotions",
  "disney",
  "funny",
];

export const difficulties = ["easy", "medium", "hard"];
export const ageGroups = ["all", "kids", "adults"];
