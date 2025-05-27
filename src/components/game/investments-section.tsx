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

export function InvestmentsSection() {
  const { investments, player } = useGameStore();
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [sharesToTrade, setSharesToTrade] = useState<number>(0);

  // Calculate total portfolio value
  const calculatePortfolioValue = () => {
    return investments.portfolio.reduce((total, position) => {
      const stock = investments.stocks.find(s => s.id === position.stockId);
      return total + (stock ? stock.currentPrice * position.shares : 0);
    }, 0);
  };

  // Calculate total profit/loss
  const calculateTotalProfitLoss = () => {
    return investments.portfolio.reduce((total, position) => {
      const stock = investments.stocks.find(s => s.id === position.stockId);
      if (!stock) return total;
      return total + ((stock.currentPrice - position.averageBuyPrice) * position.shares);
    }, 0);
  };

  // Calculate profit/loss for a position
  const calculatePositionProfitLoss = (position: typeof investments.portfolio[0]) => {
    const stock = investments.stocks.find(s => s.id === position.stockId);
    if (!stock) return 0;
    return ((stock.currentPrice - position.averageBuyPrice) * position.shares);
  };

  // Handle buying shares
  const handleBuy = () => {
    if (!selectedStock || sharesToTrade <= 0) return;
    
    if (useGameStore.getState().buyShares(selectedStock, sharesToTrade)) {
      toast.success('Aandelen gekocht!');
      setSharesToTrade(0);
    } else {
      toast.error('Niet genoeg geld om aandelen te kopen.');
    }
  };

  // Handle selling shares
  const handleSell = (portfolioId: string, shares: number) => {
    if (useGameStore.getState().sellShares(portfolioId, shares)) {
      toast.success('Aandelen verkocht!');
    } else {
      toast.error('Kon aandelen niet verkopen.');
    }
  };

  const totalProfitLoss = calculateTotalProfitLoss();
  const portfolioValue = calculatePortfolioValue();

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <p className="text-2xl font-bold">€{portfolioValue.toLocaleString()}</p>
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

        <Card className="bg-gradient-to-br from-background to-muted/50">
          <CardHeader>
            <CardTitle>Beschikbaar Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Contant Geld</p>
                <p className="text-2xl font-bold">€{player.money.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                        onClick={() => handleSell(position.id, position.shares)}
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
              {investments.stocks.map(stock => (
                <div key={stock.id} className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold">{stock.name}</h3>
                        <span className="text-sm text-muted-foreground">({stock.symbol})</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{stock.description}</p>
                      <p className="text-xl font-semibold">€{stock.currentPrice.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="0"
                        value={selectedStock === stock.id ? sharesToTrade : 0}
                        onChange={(e) => {
                          setSelectedStock(stock.id);
                          setSharesToTrade(parseInt(e.target.value) || 0);
                        }}
                        className="w-24"
                        placeholder="Aantal"
                      />
                      <Button
                        variant="outline"
                        onClick={handleBuy}
                        disabled={selectedStock !== stock.id || sharesToTrade <= 0 || player.money < (stock.currentPrice * sharesToTrade)}
                      >
                        Kopen
                      </Button>
                    </div>
                  </div>
                  
                  {/* Price Chart */}
                  <div className="h-[200px] w-full rounded-md border bg-muted/50 p-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stock.priceHistory}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="timestamp"
                          tickFormatter={(timestamp) => {
                            const date = new Date(timestamp);
                            return `${date.getMonth() + 1}/${date.getFullYear()}`;
                          }}
                          stroke="#6B7280"
                        />
                        <YAxis stroke="#6B7280" />
                        <Tooltip
                          labelFormatter={(timestamp) => {
                            const date = new Date(timestamp);
                            return `${date.getMonth() + 1}/${date.getFullYear()}`;
                          }}
                          formatter={(value: number) => [`€${value}`, 'Prijs']}
                          contentStyle={{
                            backgroundColor: 'rgba(17, 24, 39, 0.8)',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#F3F4F6'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#2563eb"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <Separator />
                </div>
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
} 