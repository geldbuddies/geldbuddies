import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type HistoryEvent = {
  id: string;
  type: 'transaction' | 'job' | 'asset' | 'good' | 'life';
  description: string;
  timestamp: number;
};

// Player slice types
export interface PlayerSlice {
  player: {
    money: number;
    name: string;
    age: number;
  };
  addMoney: (amount: number, reason: string) => void;
  spendMoney: (amount: number, reason: string) => boolean;
}

// Jobs slice types
export interface JobsSlice {
  jobs: {
    currentJob: {
      title: string;
      company: string;
      salary: number;
    } | null;
    availableJobs: Array<{
      id: string;
      title: string;
      company: string;
      salary: number;
    }>;
  };
  applyForJob: (jobId: string) => void;
  quitJob: () => void;
  collectSalary: () => void;
}

// Assets slice types
export interface AssetsSlice {
  assets: {
    owned: Array<{
      id: string;
      name: string;
      type: 'property';
      value: number;
      purchasePrice: number;
    }>;
  };
  buyAsset: (asset: { name: string; type: 'property'; price: number }) => boolean;
  sellAsset: (assetId: string) => boolean;
}

// Goods slice types
export interface GoodsSlice {
  goods: {
    owned: Array<{
      id: string;
      name: string;
      purchasePrice: number;
      resellValue: number;
      monthlyCost: number; // 0 for items with no recurring cost
    }>;
  };
  buyGood: (good: {
    name: string;
    price: number;
    resellValue: number;
    monthlyCost: number;
  }) => boolean;
  sellGood: (goodId: string) => boolean;
  payMonthlyCosts: () => void;
}

// History slice types
export interface HistorySlice {
  history: {
    events: HistoryEvent[];
  };
  addHistoryEvent: (event: Omit<HistoryEvent, 'id' | 'timestamp'>) => void;
}

// Time slice types
export interface TimeSlice {
  time: {
    month: number;
    year: number;
    monthName: string;
  };
  advanceMonth: () => void;
}

// Combined store type
export type GameStore = PlayerSlice &
  JobsSlice &
  AssetsSlice &
  GoodsSlice &
  HistorySlice &
  TimeSlice;

// Type for slice creators
export type GameSlice<T> = StateCreator<GameStore, [['zustand/immer', never]], [], T>;
