import { GameSlice, PlayerSlice } from '../types';

export const createPlayerSlice: GameSlice<PlayerSlice> = (set, get) => ({
  player: {
    money: 0,
    name: '',
    birthMonth: 0,
    birthYear: 0,
    isInitialized: false,
    energy: 100,
    maxEnergy: 100,
    education: [],
    skills: [],
    workExperience: [],
  },

  initializePlayer: (playerData) => {
    set((state) => {
      state.player.money = playerData.money;
      state.player.name = playerData.name;
      state.player.birthMonth = playerData.birthMonth;
      state.player.birthYear = playerData.birthYear;
      state.player.isInitialized = true;
      state.player.energy = 100;
      state.player.maxEnergy = 100;
      state.player.education = [];
      state.player.skills = [];
      state.player.workExperience = [];
    });
  },

  addMoney: (amount, reason) => {
    set((state) => {
      state.player.money += amount;
    });

    // Add to history
    get().addHistoryEvent({
      type: 'transaction',
      description: reason,
      amount: amount,
    });
  },

  spendMoney: (amount, reason) => {
    if (get().player.money < amount) return false;

    set((state) => {
      state.player.money -= amount;
    });

    // Add to history
    get().addHistoryEvent({
      type: 'transaction',
      description: reason,
      amount: -amount,
    });

    return true;
  },

  consumeEnergy: (amount) => {
    if (get().player.energy < amount) return false;

    set((state) => {
      state.player.energy = Math.max(0, state.player.energy - amount);
    });

    return true;
  },

  resetEnergy: () => {
    set((state) => {
      state.player.energy = state.player.maxEnergy;
    });
  },
});
