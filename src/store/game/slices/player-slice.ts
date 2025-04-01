import { GameSlice, PlayerSlice } from '../types';

export const createPlayerSlice: GameSlice<PlayerSlice> = (set, get) => ({
  player: {
    money: 5000,
    name: 'Speler',
    birthMonth: 1,
    birthYear: 2006,
  },

  addMoney: (amount, reason) => {
    console.log('addMoney', amount, reason);

    set((state) => {
      state.player.money += amount;
    });
  },

  spendMoney: (amount, reason) => {
    if (get().player.money >= amount) {
      set((state) => {
        state.player.money -= amount;
      });

      return true;
    }
    return false;
  },
});
