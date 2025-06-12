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
    const newMonthName = MONTHS[newMonth - 1];

    // Update the time and player state
    set((state) => {
      state.time.month = newMonth;
      state.time.year = newYear;
      state.time.monthName = newMonthName;
      state.player.energy = 100;
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

  // New function to sync time with organization creation date
  syncTimeWithOrganization: (createdAt: Date) => {
    const now = new Date();
    const elapsedSeconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
    const currentMonth = Math.floor(elapsedSeconds / 90); // 90 seconds per month

    // Calculate the new date based on elapsed months
    const startDate = new Date(createdAt);
    const currentDate = new Date(startDate);
    currentDate.setMonth(startDate.getMonth() + currentMonth);

    // Update the time state
    set((state) => {
      state.time.month = currentDate.getMonth() + 1; // +1 because months are 0-indexed
      state.time.year = currentDate.getFullYear();
      state.time.monthName = MONTHS[currentDate.getMonth()];
    });
  },
});
