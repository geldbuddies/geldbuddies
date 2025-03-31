import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Job {
  id: string;
  title: string;
  income: number;
}

interface Possession {
  id: string;
  name: string;
  category: 'housing' | 'transport' | 'utility' | 'subscription' | 'other';
  monthlyCost: number;
}

interface GameState {
  // Player information
  birthMonth: number;
  birthYear: number;

  // Player finances
  money: number;
  jobs: Job[];
  possessions: Possession[];

  // Time
  month: number;
  year: number;

  // Assets
  assets: Array<{ id: string; name: string; value: number }>;

  // Game state
  events: Array<{ id: string; seen: boolean }>;
}

interface GameActions {
  // Basic setters for each state property
  updateMoney: (value: number) => void;
  setBirthDate: (month: number, year: number) => void;
  addJob: (job: Job) => void;
  removeJob: (id: string) => void;
  addPossession: (possession: Possession) => void;
  removePossession: (id: string) => void;
  addAsset: (asset: { id: string; name: string; value: number }) => void;
  removeAsset: (id: string) => void;
  advanceMonth: () => void;
  resetGame: () => void;
}

const initialState: GameState = {
  // Player is 25 years old at the start
  birthMonth: 6,
  birthYear: 1998,

  money: 1000,
  jobs: [{ id: '1', title: 'Entry Level Job', income: 1500 }],
  possessions: [
    { id: '1', name: 'Studio Apartment', category: 'housing', monthlyCost: 500 },
    { id: '2', name: 'Basic Groceries', category: 'other', monthlyCost: 300 },
  ],
  month: 1,
  year: 2023,
  assets: [],
  events: [],
};

export const useGameStore = create<GameState & GameActions>()(
  persist(
    (set) => ({
      ...initialState,

      updateMoney: (value) => set({ money: value }),

      setBirthDate: (month, year) => set({ birthMonth: month, birthYear: year }),

      addJob: (job) =>
        set((state) => ({
          jobs: [...state.jobs, job],
        })),

      removeJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id),
        })),

      addPossession: (possession) =>
        set((state) => ({
          possessions: [...state.possessions, possession],
        })),

      removePossession: (id) =>
        set((state) => ({
          possessions: state.possessions.filter((possession) => possession.id !== id),
        })),

      addAsset: (asset) =>
        set((state) => ({
          assets: [...state.assets, asset],
        })),

      removeAsset: (id) =>
        set((state) => ({
          assets: state.assets.filter((asset) => asset.id !== id),
        })),

      advanceMonth: () =>
        set((state) => {
          const newMonth = state.month === 12 ? 1 : state.month + 1;
          const newYear = newMonth === 1 ? state.year + 1 : state.year;

          // Calculate total income from all jobs
          const monthlyIncome = state.jobs.reduce((total, job) => total + job.income, 0);

          // Calculate total expenses from all possessions
          const monthlyExpenses = state.possessions.reduce(
            (total, possession) => total + possession.monthlyCost,
            0
          );

          const newMoney = state.money + monthlyIncome - monthlyExpenses;

          return {
            month: newMonth,
            year: newYear,
            money: newMoney,
          };
        }),

      resetGame: () => set(initialState),
    }),
    {
      name: 'geldbuddies-game-storage',
    }
  )
);
