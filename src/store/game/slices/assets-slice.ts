import { v4 as uuidv4 } from 'uuid';
import { AssetsSlice, GameSlice } from '../types';

export const createAssetsSlice: GameSlice<AssetsSlice> = (set, get) => ({
  assets: {
    owned: [],
  },

  buyAsset: (asset) => {
    if (get().spendMoney(asset.price, `${asset.name} gekocht`)) {
      set((state) => {
        state.assets.owned.push({
          id: uuidv4(),
          name: asset.name,
          type: asset.type,
          value: asset.price,
          purchasePrice: asset.price,
        });
      });

      // Add to history
      get().addHistoryEvent({
        type: 'asset',
        description: `${asset.name} gekocht`,
        amount: -asset.price,
      });

      return true;
    }
    return false;
  },

  sellAsset: (assetId) => {
    const asset = get().assets.owned.find((a) => a.id === assetId);
    if (!asset) return false;

    set((state) => {
      const index = state.assets.owned.findIndex((a) => a.id === assetId);
      if (index !== -1) {
        state.assets.owned.splice(index, 1);
      }
    });

    // Add money from sale
    get().addMoney(asset.value, `${asset.name} verkocht`);

    // Add to history
    get().addHistoryEvent({
      type: 'asset',
      description: `${asset.name} verkocht`,
      amount: asset.value,
    });

    return true;
  },
});
