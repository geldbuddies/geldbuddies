import { useGameStore } from '@/store/game-store';
import { useCallback } from 'react';

export function useGame() {
  const { month, year, advanceMonth, resetGame } = useGameStore();

  const getMonthName = useCallback((monthNum: number) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthNum - 1];
  }, []);

  const formatDate = useCallback(() => {
    return `${getMonthName(month)} ${year}`;
  }, [month, year, getMonthName]);

  const nextMonth = useCallback(() => {
    advanceMonth();
  }, [advanceMonth]);

  return {
    month,
    year,
    formatDate,
    nextMonth,
    resetGame,
  };
}
