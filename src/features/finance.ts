import { Asset, Consumable, Job } from '@/types/game';

export function calculateTotalIncome(jobs: Job[]) {
  return jobs.reduce((total, job) => total + job.income, 0);
}

export function calculateTotalExpenses(assets: Asset[], consumables: Consumable[]) {
  return (
    assets.reduce((total, asset) => total + asset.monthlyCost, 0) +
    consumables.reduce((total, consumable) => total + consumable.monthlyCost, 0)
  );
}
