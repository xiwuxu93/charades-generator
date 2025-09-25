export interface CharadesWord {
  word: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  ageGroup: "kids" | "adults" | "all";
  wordCount: number;
  emoji?: string;
  description?: string;
  tags?: string[];
  popularity?: number;
}
