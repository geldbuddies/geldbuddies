import { api } from '@/trpc/server';
import { GameSlice, TimeSlice } from '../types';

const MONTHS = [
  'Januari',
  'Februari',
  'Maart',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Augustus',
  'September',
  'Oktober',
  'November',
  'December',
];

export const createTimeSlice: GameSlice<TimeSlice> = (set, get) => ({
  time: {
    month: 1,
    year: 2025,
    monthName: MONTHS[0],
  },

  advanceMonth: () => {
    // Collect salary
    get().collectSalary();

    // Update stock prices
    get().updateStockPrices();

    // Pay monthly costs
    get().payMonthlyCosts();

    // Reset energy
    get().resetEnergy();

    // Update time
    set((state) => {
      if (state.time.month === 12) {
        state.time.month = 1;
        state.time.year++;
      } else {
        state.time.month++;
      }
      state.time.monthName = MONTHS[state.time.month - 1];
    });

    // Add to history
    get().addHistoryEvent({
      type: 'life',
      description: `Nieuwe maand: ${get().time.monthName} ${get().time.year}`,
    });
  },

  // Updated function to sync time with organization creation date
  syncTimeWithOrganization: (targetDate: Date) => {
    set((state) => {
      state.time.month = targetDate.getMonth() + 1;
      state.time.year = targetDate.getFullYear();
      state.time.monthName = MONTHS[state.time.month - 1];
    });

    // Update stock prices to reflect the new time
    get().updateStockPrices();
  },
});
