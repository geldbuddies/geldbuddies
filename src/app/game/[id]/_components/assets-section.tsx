import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useGameStore from '@/store/game/game-store';
import { toast } from 'sonner';

// Available assets to purchase
const availableAssets = [
  {
    id: 'a1',
    name: 'Studio Appartement',
    type: 'property' as const,
    price: 120000,
    description: 'Een kleine studio in de stad',
  },
  {
    id: 'a2',
    name: 'Aandelen Pakket',
    type: 'property' as const,
    price: 5000,
    description: 'Een gediversifieerd pakket aandelen',
  },
];

export function AssetsSection() {
  const { player, assets } = useGameStore();

  // Buy asset function
  const handleBuyAsset = (asset: (typeof availableAssets)[0]) => {
    if (
      useGameStore.getState().buyAsset({
        name: asset.name,
        type: asset.type,
        price: asset.price,
      })
    ) {
      toast.success(`Je hebt ${asset.name} gekocht!`);
    } else {
      toast.error('Niet genoeg geld!');
    }
  };

  // Sell asset function
  const handleSellAsset = (assetId: string) => {
    if (useGameStore.getState().sellAsset(assetId)) {
      toast.success('Bezit verkocht!');
    } else {
      toast.error('Kon bezit niet verkopen.');
    }
  };

  return (
    <div className="space-y-4">
      <Card className="relative overflow-hidden bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm border-muted/50 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-50" />
        <CardHeader className="relative">
          <CardTitle>Investeringen</CardTitle>
          <CardDescription>Investeer in vastgoed en andere activa</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4">
            {availableAssets.map((asset) => (
              <div
                key={asset.id}
                className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm hover:bg-muted/40 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                      {asset.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{asset.description}</p>
                    <div className="mt-2">
                      <p className="text-sm">
                        <span className="font-medium">Prijs:</span> €{asset.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBuyAsset(asset)}
                    disabled={player.money < asset.price}
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
          <CardTitle>Jouw Investeringen</CardTitle>
          <CardDescription>Beheer je investeringen en activa</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          {assets.owned.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">Je hebt nog geen investeringen</p>
          ) : (
            <div className="space-y-4">
              {assets.owned.map((asset) => (
                <div
                  key={asset.id}
                  className="p-4 border rounded-lg bg-muted/30 backdrop-blur-sm hover:bg-muted/40 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                        {asset.name}
                      </h3>
                      <p className="text-sm">
                        <span className="font-medium">Type:</span> {asset.type}
                      </p>
                      <div className="mt-2">
                        <p className="text-sm">
                          <span className="font-medium">Aankoopprijs:</span> €
                          {asset.purchasePrice.toLocaleString()}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Huidige waarde:</span> €
                          {asset.value.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleSellAsset(asset.id)}
                      className="bg-primary/5 hover:bg-primary/10"
                    >
                      Verkopen (€{asset.value})
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
