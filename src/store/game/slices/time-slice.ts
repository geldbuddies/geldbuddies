import { GameSlice, TimeSlice } from '../types';

export const createTimeSlice: GameSlice<TimeSlice> = (set, get) => ({
  time: {
    month: 1,
    year: 2025,
    monthName: 'January',
  },

  advanceMonth: () =>
    set((state) => {
      // Increment month
      state.time.month += 1;

      // Handle year rollover
      if (state.time.month > 12) {
        state.time.month = 1;
        state.time.year += 1;
      }

      // Update month name
      const monthNames = [
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
      state.time.monthName = monthNames[state.time.month - 1];

      // Process monthly events

      // 1. Collect salary
      get().collectSalary();

      // 2. Process monthly costs for goods
      get().payMonthlyCosts();

      // 3. Record the month passing
      get().addHistoryEvent({
        type: 'life',
        description: `Advanced to ${state.time.monthName} ${state.time.year}`,
      });
    }),
});
