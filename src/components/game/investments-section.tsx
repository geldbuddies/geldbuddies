import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import useGameStore from '@/store/game/game-store';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useState } from 'react';
import { toast } from 'sonner';
import { TrendingDown, TrendingUp, LineChart as LineChartIcon } from 'lucide-react';
import { Stock } from '@/store/game/types';

export function InvestmentsSection() {
  const { investments, player, buyShares, sellShares } = useGameStore();
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [sharesToTrade, setSharesToTrade] = useState<number>(0);

  const handleBuyShares = (stock: Stock) => {
    const shares = prompt(`Hoeveel aandelen wil je kopen van ${stock.name}?`);
    if (!shares) return;

    const amount = parseInt(shares);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Voer een geldig aantal in');
      return;
    }

    if (buyShares(stock.id, amount)) {
      toast.success(`${amount} aandelen gekocht van ${stock.name}`);
    } else {
      toast.error('Kon aandelen niet kopen. Controleer je saldo.');
    }
  };

  const handleSellShares = (portfolioId: string, stockName: string) => {
    const portfolio = investments.portfolio.find((p) => p.id === portfolioId);
    if (!portfolio) return;

    const shares = prompt(`Hoeveel aandelen wil je verkopen van ${stockName}?`);
    if (!shares) return;

    const amount = parseInt(shares);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Voer een geldig aantal in');
      return;
    }

    if (amount > portfolio.shares) {
      toast.error(`Je hebt maar ${portfolio.shares} aandelen`);
      return;
    }

    if (sellShares(portfolioId, amount)) {
      toast.success(`${amount} aandelen verkocht van ${stockName}`);
    } else {
      toast.error('Kon aandelen niet verkopen');
    }
  };

  // Calculate total portfolio value
  const calculatePortfolioValue = () => {
    return investments.portfolio.reduce((total, position) => {
      const stock = investments.stocks.find((s) => s.id === position.stockId);
      if (!stock) return total;
      return total + position.shares * stock.currentPrice;
    }, 0);
  };

  // Calculate total profit/loss
  const calculateTotalProfitLoss = () => {
    return investments.portfolio.reduce((total, position) => {
      const stock = investments.stocks.find((s) => s.id === position.stockId);
      if (!stock) return total;
      const currentValue = position.shares * stock.currentPrice;
      const costBasis = position.shares * position.averageBuyPrice;
      return total + (currentValue - costBasis);
    }, 0);
  };

  // Calculate profit/loss for a position
  const calculatePositionProfitLoss = (position: typeof investments.portfolio[0]) => {
    const stock = investments.stocks.find(s => s.id === position.stockId);
    if (!stock) return 0;
    return ((stock.currentPrice - position.averageBuyPrice) * position.shares);
  };

  const totalValue = calculatePortfolioValue();
  const totalProfitLoss = calculateTotalProfitLoss();

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="bg-gradient-to-br from-background to-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5" />
            Portfolio Overzicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Totale Waarde</p>
              <p className="text-2xl font-bold">€{totalValue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Totale Winst/Verlies</p>
              <div className="flex items-center gap-2">
                {totalProfitLoss >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                )}
                <p className={`text-2xl font-bold ${totalProfitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  €{totalProfitLoss.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Positions */}
      <Card>
        <CardHeader>
          <CardTitle>Jouw Aandelen</CardTitle>
          <CardDescription>
            Overzicht van je aandelenposities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px] rounded-md border">
            <div className="space-y-4 p-4">
              {investments.portfolio.map(position => {
                const stock = investments.stocks.find(s => s.id === position.stockId);
                if (!stock) return null;
                
                const profitLoss = calculatePositionProfitLoss(position);
                const profitLossPercentage = ((stock.currentPrice - position.averageBuyPrice) / position.averageBuyPrice) * 100;
                
                return (
                  <div key={position.id} className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{stock.name}</h3>
                          <span className="text-sm text-muted-foreground">({stock.symbol})</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Aantal Aandelen</p>
                            <p className="font-medium">{position.shares}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Huidige Koers</p>
                            <p className="font-medium">€{stock.currentPrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Gemiddelde Aankoopprijs</p>
                            <p className="font-medium">€{position.averageBuyPrice.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Totale Waarde</p>
                            <p className="font-medium">€{(stock.currentPrice * position.shares).toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          {profitLoss >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <p className={`text-sm font-medium ${profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            €{profitLoss.toLocaleString()} ({profitLossPercentage.toFixed(1)}%)
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSellShares(position.id, stock.name)}
                      >
                        Verkopen
                      </Button>
                    </div>
                  </div>
                );
              })}
              {investments.portfolio.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  <LineChartIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Je hebt nog geen aandelen in bezit.</p>
                  <p className="text-sm text-muted-foreground">Begin met investeren door aandelen te kopen.</p>
                </div>
              )}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Available Stocks */}
      <Card>
        <CardHeader>
          <CardTitle>Beschikbare Aandelen</CardTitle>
          <CardDescription>Investeer in verschillende bedrijven</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] rounded-md border">
            <div className="space-y-8 p-4">
              {investments.stocks.map(stock => {
                const position = investments.portfolio.find((p) => p.stockId === stock.id);
                const priceChange =
                  stock.priceHistory.length > 1
                    ? ((stock.currentPrice - stock.priceHistory[0].price) /
                        stock.priceHistory[0].price) *
                      100
                    : 0;

                return (
                  <div key={stock.id} className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <LineChart
                            className={`h-5 w-5 ${
                              priceChange >= 0 ? 'text-green-500' : 'text-red-500'
                            }`}
                          />
                          <h3 className="font-medium">{stock.name}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{stock.description}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleBuyShares(stock)}>
                        Kopen
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Huidige Prijs</p>
                        <p>€{stock.currentPrice.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Verandering</p>
                        <p
                          className={priceChange >= 0 ? 'text-green-500' : 'text-red-500'}
                        >{`${priceChange.toFixed(2)}%`}</p>
                      </div>
                    </div>
                    {position && (
                      <div className="mt-2 p-2 bg-muted rounded">
                        <p className="text-sm">
                          Je bezit: {position.shares} aandelen (€
                          {(position.shares * stock.currentPrice).toLocaleString()})
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 