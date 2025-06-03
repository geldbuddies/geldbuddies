import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useGameStore from '@/store/game/game-store';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export function ShopSection() {
  const { goods, buyGood } = useGameStore();

  // Handle buying goods
  const handleBuy = (goodId: string) => {
    if (buyGood(goodId)) {
      toast.success('Aankoop succesvol!');
    } else {
      toast.error('Kon item niet kopen. Controleer je saldo.');
    }
  };

  // Calculate total monthly costs
  const totalMonthlyCosts = goods.owned.reduce((total, good) => total + good.monthlyCost, 0);

  return (
    <div className="space-y-6">
      {/* Shopping Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Winkel Overzicht</CardTitle>
          <CardDescription>Koop items en beheer je bezittingen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Maandelijkse Kosten</h3>
              <p className="text-2xl font-bold">€{totalMonthlyCosts.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Owned Items */}
      {goods.owned.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Jouw Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goods.owned.map((good) => (
                <div key={good.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{good.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Maandelijkse kosten: €{good.monthlyCost.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Restwaarde: €{good.resellValue.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Items */}
      <Card>
        <CardHeader>
          <CardTitle>Beschikbare Items</CardTitle>
          <CardDescription>Koop nieuwe items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goods.available.map((good) => (
              <div key={good.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{good.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Maandelijkse kosten: €{good.monthlyCost.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-medium">€{good.price.toLocaleString()}</p>
                  <Button variant="outline" size="sm" onClick={() => handleBuy(good.id)}>
                    Kopen
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 