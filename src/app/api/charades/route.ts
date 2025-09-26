import { NextRequest, NextResponse } from 'next/server';
import { pickWords } from '@/utils/charades';
import { DEFAULT_LOCALE, isLocale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const category = typeof body?.category === 'string' ? body.category : 'all';
    const difficulty = typeof body?.difficulty === 'string' ? body.difficulty : 'all';
    const ageGroup = typeof body?.ageGroup === 'string' ? body.ageGroup : 'all';
    const locale = isLocale(body?.locale) ? body.locale : DEFAULT_LOCALE;

    let count = Number.parseInt(body?.count, 10);
    if (Number.isNaN(count)) {
      count = 3;
    }
    count = Math.min(Math.max(count, 1), 50);

    const words = pickWords(category, difficulty, ageGroup, count, locale);
    return NextResponse.json({ words });
  } catch {
    return NextResponse.json({ error: 'Unable to generate words' }, { status: 400 });
  }
}
