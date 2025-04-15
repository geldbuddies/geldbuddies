// src/store/slices/goodsSlice.ts
import { v4 as uuidv4 } from 'uuid';
import { GameSlice, GoodsSlice } from '../types';

export const createGoodsSlice: GameSlice<GoodsSlice> = (set, get) => ({
  goods: {
    owned: [],
  },

  buyGood: (good) => {
    if (get().spendMoney(good.price, `${good.name} gekocht`)) {
      set((state) => {
        state.goods.owned.push({
          id: uuidv4(),
          name: good.name,
          purchasePrice: good.price,
          resellValue: good.resellValue,
          monthlyCost: good.monthlyCost,
        });
      });

      // Add to history
      get().addHistoryEvent({
        type: 'good',
        description: `${good.name} gekocht`,
        amount: -good.price,
      });

      return true;
    }
    return false;
  },

  sellGood: (goodId) => {
    const good = get().goods.owned.find((g) => g.id === goodId);
    if (!good) return false;

    set((state) => {
      const index = state.goods.owned.findIndex((g) => g.id === goodId);
      if (index !== -1) {
        state.goods.owned.splice(index, 1);
      }
    });

    // Add money from sale
    get().addMoney(good.resellValue, `${good.name} verkocht`);

    // Add to history
    get().addHistoryEvent({
      type: 'good',
      description: `${good.name} verkocht`,
      amount: good.resellValue,
    });

    return true;
  },

  payMonthlyCosts: () => {
    const goods = get().goods.owned;

    let totalMonthlyCosts = 0;
    const itemizedCosts: string[] = [];

    goods.forEach((good) => {
      if (good.monthlyCost > 0) {
        totalMonthlyCosts += good.monthlyCost;
        itemizedCosts.push(`${good.name}: €${good.monthlyCost}`);
      }
    });

    if (totalMonthlyCosts > 0) {
      get().spendMoney(totalMonthlyCosts, `Maandelijkse kosten (${itemizedCosts.join(', ')})`);

      get().addHistoryEvent({
        type: 'good',
        description: `Maandelijkse kosten (${itemizedCosts.join(', ')})`,
        amount: -totalMonthlyCosts,
      });
    }
  },
});
