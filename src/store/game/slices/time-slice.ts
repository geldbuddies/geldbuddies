import { GameSlice, TimeSlice } from '../types';

export const createTimeSlice: GameSlice<TimeSlice> = (set, get) => ({
  time: {
    month: 1,
    year: 2025,
    monthName: 'Januari',
  },

  advanceMonth: () => {
    // Get current state for updating
    const prevState = get().time;
    let newMonth = prevState.month + 1;
    let newYear = prevState.year;

    // Handle year rollover
    if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    // Calculate month name
    const monthNames = [
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
    const newMonthName = monthNames[newMonth - 1];

    // Update the time state
    set((state) => {
      state.time.month = newMonth;
      state.time.year = newYear;
      state.time.monthName = newMonthName;
    });

    get().collectSalary();

    get().payMonthlyCosts();

    // Age player if it's their birthmonth
    if (newMonth === get().player.birthMonth) {
      get().addHistoryEvent({
        type: 'life',
        description: 'Je bent jarig geworden!',
        amount: 100,
      });
    }
  },
});
