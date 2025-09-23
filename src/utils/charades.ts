import { charadesDatabase, type CharadesWord } from '@/data/charades-data';

export function pickWords(
  category: string,
  difficulty: string,
  ageGroup: string,
  count: number,
): CharadesWord[] {
  const filtered = charadesDatabase.filter((word) => {
    const matchesCategory = category === 'all' || word.category === category;
    const matchesDifficulty = difficulty === 'all' || word.difficulty === difficulty;
    const matchesAgeGroup =
      ageGroup === 'all' || word.ageGroup === ageGroup || word.ageGroup === 'all';

    return matchesCategory && matchesDifficulty && matchesAgeGroup;
  });

  const pool = filtered.length > 0 ? filtered : charadesDatabase;
  const available = [...pool];

  for (let i = available.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  return available.slice(0, Math.min(count, available.length));
}
