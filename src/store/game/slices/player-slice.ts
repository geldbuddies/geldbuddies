import { GameSlice, PlayerSlice } from '../types';

export const createPlayerSlice: GameSlice<PlayerSlice> = (set, get) => ({
  player: {
    money: 5000,
    name: 'Player',
    age: 25,
  },

  addMoney: (amount, reason) => {
    set((state) => {
      state.player.money += amount;
    });

    // Add to history
    get().addHistoryEvent({
      type: 'transaction',
      description: `Received $${amount.toLocaleString()} - ${reason}`,
    });
  },

  spendMoney: (amount, reason) => {
    if (get().player.money >= amount) {
      set((state) => {
        state.player.money -= amount;
      });

      // Add to history
      get().addHistoryEvent({
        type: 'transaction',
        description: `Spent $${amount.toLocaleString()} - ${reason}`,
      });

      return true;
    }
    return false;
  },
});
