import { StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Job, JobCategory, JobLevel } from '@/data/jobs';

export type HistoryEvent = {
  id: string;
  type: 'transaction' | 'job' | 'asset' | 'good' | 'life';
  description: string;
  amount?: number;
  timestamp: number;
};

// Player slice types
export interface PlayerSlice {
  player: {
    money: number;
    name: string;
    birthMonth: number;
    birthYear: number;
    isInitialized: boolean;
    energy: number;
    maxEnergy: number;
    education: string[];
    skills: string[];
    workExperience: Array<{
      jobId: string;
      title: string;
      company: string;
      startDate: { month: number; year: number };
      endDate?: { month: number; year: number };
    }>;
  };
  initializePlayer: (playerData: {
    money: number;
    name: string;
    birthMonth: number;
    birthYear: number;
  }) => void;
  addMoney: (amount: number, reason: string) => void;
  spendMoney: (amount: number, reason: string) => boolean;
  useEnergy: (amount: number) => boolean;
  resetEnergy: () => void;
}

// Jobs slice types
export interface JobsSlice {
  jobs: {
    currentJob: Job | null;
    availableJobs: Job[];
    hoursWorked: number;
    maxHoursWorked: number;
    filters: {
      search: string;
      category: JobCategory | 'all';
      level: JobLevel | 'all';
      minSalary: number;
      location: string;
    };
  };
  applyForJob: (jobId: string) => void;
  quitJob: () => void;
  collectSalary: () => void;
  addHoursWorked: (hours: number) => boolean;
  setJobFilters: (filters: Partial<JobsSlice['jobs']['filters']>) => void;
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
  syncTimeWithOrganization: (createdAt: Date) => void;
}

// Investments slice types
export interface Stock {
  id: string;
  symbol: string;
  name: string;
  description: string;
  currentPrice: number;
  priceHistory: Array<{
    timestamp: number;
    price: number;
  }>;
}

export interface InvestmentsSlice {
  investments: {
    stocks: Stock[];
    portfolio: Array<{
      id: string;
      stockId: string;
      shares: number;
      averageBuyPrice: number;
    }>;
  };
  buyShares: (stockId: string, shares: number) => boolean;
  sellShares: (portfolioId: string, shares: number) => boolean;
  updateStockPrices: () => void;
}

// Combined store type
export type GameStore = PlayerSlice &
  JobsSlice &
  AssetsSlice &
  GoodsSlice &
  HistorySlice &
  TimeSlice &
  InvestmentsSlice & {
    resetGame: () => void;
  };

// Type for slice creators
export type GameSlice<T> = StateCreator<GameStore, [['zustand/immer', never]], [], T>;
