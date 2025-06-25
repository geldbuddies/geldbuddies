import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useGameStore from '@/store/game/game-store';
import { Building } from 'lucide-react';

export function AssetsSection() {
  const { assets } = useGameStore();

  // Calculate total assets value
  const totalAssetsValue = assets.owned.reduce((total, asset) => total + asset.value, 0);

  return (
    <div className="space-y-6">
      {/* Assets Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Bezittingen Overzicht</CardTitle>
          <CardDescription>Al je eigendommen op een rij</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Totale Waarde</h3>
              <p className="text-2xl font-bold">€{totalAssetsValue.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Owned Assets */}
      <Card>
        <CardHeader>
          <CardTitle>Jouw Bezittingen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assets.owned.length > 0 ? (
              assets.owned.map((asset) => (
                <div
                  key={asset.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">{asset.name}</p>
                      <p className="text-sm text-muted-foreground">{asset.type}</p>
                    </div>
                  </div>
                  <p className="font-medium">€{asset.value.toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">Je hebt nog geen bezittingen</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
