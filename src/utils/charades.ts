import { getCharadesDatabase } from '@/data/charades-data';
import type { CharadesWord } from '@/data/charades-types';
import type { Locale } from '@/i18n/config';

export function pickWords(
  category: string,
  difficulty: string,
  ageGroup: string,
  count: number,
  locale: Locale,
): CharadesWord[] {
  const database = getCharadesDatabase(locale);

  const filtered = database.filter((word) => {
    const matchesCategory = category === 'all' || word.category === category;
    const matchesDifficulty = difficulty === 'all' || word.difficulty === difficulty;
    const matchesAgeGroup =
      ageGroup === 'all' || word.ageGroup === ageGroup || word.ageGroup === 'all';

    return matchesCategory && matchesDifficulty && matchesAgeGroup;
  });

  const pool = filtered.length > 0 ? filtered : database;
  const available = [...pool];

  for (let i = available.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }

  return available.slice(0, Math.min(count, available.length));
}
