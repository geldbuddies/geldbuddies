import { GameState } from '@/types/game';

export function nextMonth(month: number, year: number) {
  const newMonth = month === 12 ? 1 : month + 1;
  const newYear = newMonth === 1 ? year + 1 : year;

  return {
    month: newMonth,
    year: newYear,
  };
}
