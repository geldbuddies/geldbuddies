import { v4 as uuidv4 } from 'uuid';
import { GameSlice, InvestmentsSlice } from '../types';

// Initial stock data
export const initialStocks = [
  {
    id: uuidv4(),
    symbol: 'TECH',
    name: 'TechCorp NV',
    description: 'Een innovatief technologiebedrijf',
    currentPrice: 150,
    priceHistory: [{ timestamp: Date.now(), price: 150 }],
  },
  {
    id: uuidv4(),
    symbol: 'GROEN',
    name: 'GroenEnergie BV',
    description: 'Duurzame energie oplossingen',
    currentPrice: 75,
    priceHistory: [{ timestamp: Date.now(), price: 75 }],
  },
  {
    id: uuidv4(),
    symbol: 'BANK',
    name: 'NederBank',
    description: 'Grootste bank van Nederland',
    currentPrice: 45,
    priceHistory: [{ timestamp: Date.now(), price: 45 }],
  },
  {
    id: uuidv4(),
    symbol: 'FOOD',
    name: 'FoodTech',
    description: 'Innovatieve voedselproductie',
    currentPrice: 30,
    priceHistory: [{ timestamp: Date.now(), price: 30 }],
  },
  {
    id: uuidv4(),
    symbol: 'RETAIL',
    name: 'RetailGigant',
    description: 'Grootste retailketen van de Benelux',
    currentPrice: 95,
    priceHistory: [{ timestamp: Date.now(), price: 95 }],
  },
];

export const createInvestmentsSlice: GameSlice<InvestmentsSlice> = (set, get) => ({
  investments: {
    stocks: initialStocks,
    portfolio: [],
  },

  buyShares: (stockId, shares) => {
    const stock = get().investments.stocks.find((s) => s.id === stockId);
    if (!stock) return false;

    const totalCost = stock.currentPrice * shares;
    if (get().spendMoney(totalCost, `Aandelen gekocht in ${stock.name}`)) {
      set((state) => {
        const existingPosition = state.investments.portfolio.find((p) => p.stockId === stockId);
        if (existingPosition) {
          // Update existing position
          const totalShares = existingPosition.shares + shares;
          const totalCostBasis =
            existingPosition.shares * existingPosition.averageBuyPrice +
            shares * stock.currentPrice;
          existingPosition.shares = totalShares;
          existingPosition.averageBuyPrice = totalCostBasis / totalShares;
        } else {
          // Create new position
          state.investments.portfolio.push({
            id: uuidv4(),
            stockId,
            shares,
            averageBuyPrice: stock.currentPrice,
          });
        }
      });

      // Add to history
      get().addHistoryEvent({
        type: 'transaction',
        description: `${shares} aandelen gekocht in ${stock.name}`,
        amount: -totalCost,
      });

      return true;
    }
    return false;
  },

  sellShares: (portfolioId, shares) => {
    const position = get().investments.portfolio.find((p) => p.id === portfolioId);
    if (!position || position.shares < shares) return false;

    const stock = get().investments.stocks.find((s) => s.id === position.stockId);
    if (!stock) return false;

    const totalValue = stock.currentPrice * shares;

    set((state) => {
      if (position.shares === shares) {
        // Remove position entirely
        state.investments.portfolio = state.investments.portfolio.filter(
          (p) => p.id !== portfolioId
        );
      } else {
        // Update position
        position.shares -= shares;
      }
    });

    // Add money from sale
    get().addMoney(totalValue, `Aandelen verkocht van ${stock.name}`);

    // Add to history
    get().addHistoryEvent({
      type: 'transaction',
      description: `${shares} aandelen verkocht van ${stock.name}`,
      amount: totalValue,
    });

    return true;
  },

  updateStockPrices: () => {
    const time = get().time;
    const currentTimestamp = new Date(time.year, time.month - 1).getTime();

    set((state) => {
      state.investments.stocks.forEach((stock) => {
        // Monthly price movement between -5% and +10%
        const changePercent = Math.random() * 0.15 - 0.05;
        const newPrice = Math.max(1, Math.round(stock.currentPrice * (1 + changePercent)));

        // Only add to price history if this timestamp doesn't exist yet
        const hasCurrentTimestamp = stock.priceHistory.some(
          (entry) => entry.timestamp === currentTimestamp
        );

        if (!hasCurrentTimestamp) {
          // Add to price history with game time
          stock.priceHistory.push({
            timestamp: currentTimestamp,
            price: stock.currentPrice,
          });

          // Keep only last 24 months of data points
          if (stock.priceHistory.length > 24) {
            stock.priceHistory.shift();
          }

          stock.currentPrice = newPrice;
        }
      });
    });
  },
});
