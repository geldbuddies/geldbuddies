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

    // Update stock prices
    get().updateStockPrices();

    // Pay monthly costs
    get().payMonthlyCosts();

    // Reset energy
    get().resetEnergy();

    // Add to history
    get().addHistoryEvent({
      type: 'life',
      description: `Nieuwe maand: ${get().time.monthName} ${get().time.year}`,
    });
  },

  // New function to sync time with organization creation date
  syncTimeWithOrganization: (createdAt: Date) => {
    set((state) => {
      state.time.month = createdAt.getMonth() + 1;
      state.time.year = createdAt.getFullYear();
      state.time.monthName = MONTHS[state.time.month - 1];
    });
  },
});
