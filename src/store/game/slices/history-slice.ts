import { v4 as uuidv4 } from 'uuid';
import { GameSlice, HistorySlice } from '../types';

export const createHistorySlice: GameSlice<HistorySlice> = (set, get) => ({
  history: {
    events: [],
  },

  addHistoryEvent: (event) =>
    set((state) => {
      // Get current game date
      const { month, year, monthName } = get().time;

      // Create a timestamp that encodes the game date
      // We'll use a special format: use the year as 2xxx and month as mm
      // So January 2025 would be encoded as timestamp 20250100
      // This keeps chronological sorting intact while using game time
      const gameTimestamp = year * 10000 + month * 100;

      // Add new event at the beginning of the array for chronological display
      state.history.events.unshift({
        ...event,
        id: uuidv4(),
        timestamp: gameTimestamp,
      });

      // Limit history to 100 events for performance
      if (state.history.events.length > 100) {
        state.history.events = state.history.events.slice(0, 100);
      }
    }),
});
