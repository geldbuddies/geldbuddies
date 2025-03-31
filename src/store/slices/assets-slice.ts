import { v4 as uuidv4 } from 'uuid';
import { AssetsSlice, GameSlice } from './types';

export const createAssetsSlice: GameSlice<AssetsSlice> = (set, get) => ({
  assets: {
    owned: [],
  },

  buyAsset: (asset) => {
    if (get().spendMoney(asset.price, `Purchased ${asset.name}`)) {
      set((state) => {
        state.assets.owned.push({
          id: uuidv4(),
          name: asset.name,
          type: asset.type,
          value: asset.price,
          purchasePrice: asset.price,
          purchaseDate: Date.now(),
        });
      });

      // Add to history
      get().addHistoryEvent({
        type: 'asset',
        subtype: 'purchase',
        description: `Purchased ${asset.type} - ${asset.name} for $${asset.price.toLocaleString()}`,
        metadata: { assetName: asset.name, assetType: asset.type, price: asset.price },
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
    get().addMoney(asset.value, `Sold ${asset.name}`);

    // Add to history
    get().addHistoryEvent({
      type: 'asset',
      subtype: 'sale',
      description: `Sold ${asset.type} - ${asset.name} for $${asset.value.toLocaleString()}`,
      metadata: {
        assetName: asset.name,
        assetType: asset.type,
        price: asset.value,
        profit: asset.value - asset.purchasePrice,
      },
    });

    return true;
  },
});
