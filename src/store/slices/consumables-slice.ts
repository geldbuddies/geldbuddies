import { v4 as uuidv4 } from 'uuid';
import { ConsumablesSlice, GameSlice } from './types';

export const createConsumablesSlice: GameSlice<ConsumablesSlice> = (set, get) => ({
  consumables: {
    inventory: [],
  },

  buyConsumable: (consumable, quantity = 1) => {
    const totalCost = consumable.price * quantity;

    if (get().spendMoney(totalCost, `Purchased ${quantity}x ${consumable.name}`)) {
      set((state) => {
        const existingItem = state.consumables.inventory.find((i) => i.name === consumable.name);

        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.consumables.inventory.push({
            id: uuidv4(),
            name: consumable.name,
            quantity,
            effects: consumable.effects,
          });
        }
      });

      // Add to history
      get().addHistoryEvent({
        type: 'consumable',
        subtype: 'purchase',
        description: `Purchased ${quantity}x ${consumable.name}`,
        metadata: { name: consumable.name, quantity, price: totalCost },
      });

      return true;
    }

    return false;
  },

  useConsumable: (consumableId) => {
    const consumable = get().consumables.inventory.find((i) => i.id === consumableId);
    if (!consumable || consumable.quantity <= 0) return false;

    set((state) => {
      // Apply effects
      Object.entries(consumable.effects).forEach(([stat, value]) => {
        const currentValue = (state.player.stats as any)[stat] || 0;
        get().updateStat(stat, currentValue + value);
      });

      // Reduce quantity
      const item = state.consumables.inventory.find((i) => i.id === consumableId);
      if (item) {
        item.quantity -= 1;

        // Remove if quantity is 0
        if (item.quantity <= 0) {
          const index = state.consumables.inventory.findIndex((i) => i.id === consumableId);
          if (index !== -1) {
            state.consumables.inventory.splice(index, 1);
          }
        }
      }
    });

    // Add to history
    get().addHistoryEvent({
      type: 'consumable',
      subtype: 'use',
      description: `Used ${consumable.name}`,
      metadata: { name: consumable.name, effects: consumable.effects },
    });

    return true;
  },
});
