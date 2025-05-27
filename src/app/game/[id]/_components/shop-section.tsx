import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useGameStore from '@/store/game/game-store';
import { toast } from 'sonner';

// Available goods to purchase
const availableGoods = [
  {
    id: 'g1',
    name: 'Smartphone',
    price: 800,
    resellValue: 400,
    monthlyCost: 40,
    description: 'Een moderne smartphone met abonnement',
  },
  {
    id: 'g2',
    name: 'Laptop',
    price: 1200,
    resellValue: 600,
    monthlyCost: 0,
    description: 'Een krachtige laptop voor werk en studie',
  },
  {
    id: 'g3',
    name: 'Auto',
    price: 8000,
    resellValue: 6000,
    monthlyCost: 200,
    description: 'Een tweedehands auto inclusief verzekering en brandstof',
  },
];

export function ShopSection() {
  const { player, goods, spendMoney } = useGameStore();

  // Buy good function
  const handleBuyGood = (good: (typeof availableGoods)[0]) => {
    if (spendMoney(good.price, `${good.name} gekocht`)) {
      // Add to owned goods
      useGameStore.getState().buyGood({
        name: good.name,
        price: good.price,
        resellValue: good.resellValue,
        monthlyCost: good.monthlyCost,
      });

      toast.success(`Je hebt een ${good.name} gekocht!`);
    } else {
      toast.error('Niet genoeg geld!');
    }
  };

  // Sell good function
  const handleSellGood = (goodId: string) => {
    if (useGameStore.getState().sellGood(goodId)) {
      toast.success('Item verkocht!');
    } else {
      toast.error('Kon item niet verkopen.');
    }
  };

  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="relative">
          <CardTitle>Winkel</CardTitle>
          <CardDescription>Koop producten en diensten</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {availableGoods.map((good) => (
              <div
                key={good.id}
                className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm hover:bg-muted/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                      {good.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{good.description}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Prijs:</span> €{good.price.toLocaleString()}
                      </p>
                      {good.monthlyCost > 0 && (
                        <p className="text-sm">
                          <span className="font-medium">Maandelijkse kosten:</span> €
                          {good.monthlyCost.toLocaleString()}
                        </p>
                      )}
                      <p className="text-sm">
                        <span className="font-medium">Inruilwaarde:</span> €
                        {good.resellValue.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBuyGood(good)}
                    disabled={player.money < good.price}
                    className="bg-primary/10 hover:bg-primary/20"
                  >
                    Kopen
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="relative">
          <CardTitle>Jouw Bezittingen</CardTitle>
          <CardDescription>Beheer je gekochte producten</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          {goods.owned.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Je hebt nog geen producten gekocht
            </p>
          ) : (
            <div className="space-y-4">
              {goods.owned.map((good) => (
                <div
                  key={good.id}
                  className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm hover:bg-muted/40 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                        {good.name}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Aankoopprijs:</span> €
                          {good.purchasePrice.toLocaleString()}
                        </p>
                        {good.monthlyCost > 0 && (
                          <p className="text-sm">
                            <span className="font-medium">Maandelijkse kosten:</span> €
                            {good.monthlyCost.toLocaleString()}
                          </p>
                        )}
                        <p className="text-sm">
                          <span className="font-medium">Inruilwaarde:</span> €
                          {good.resellValue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleSellGood(good.id)}
                      className="bg-primary/5 hover:bg-primary/10"
                    >
                      Verkopen (€{good.resellValue})
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
