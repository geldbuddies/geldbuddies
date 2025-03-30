'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/lib/game/context';
import { formatCurrency } from '@/lib/utils';

export function ActivityPanel() {
  const { state, dispatch, getActivitiesForCategory } = useGame();
  const { selectedCategory } = state;

  const activities = getActivitiesForCategory(selectedCategory);

  const handleActivityClick = (activityId: string) => {
    dispatch({
      type: 'PERFORM_ACTIVITY',
      payload: { activityId, category: selectedCategory },
    });
  };

  // Capitalize first letter of category
  const categoryTitle = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);

  return (
    <Card className="h-fit ">
      <CardHeader>
        <CardTitle>{categoryTitle} Activiteiten</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">Kies een activiteit om uit te voeren:</p>

        <div className="space-y-2">
          {activities.map((activity) => (
            <Button
              key={activity.id}
              variant="outline"
              className="w-full justify-between"
              onClick={() => handleActivityClick(activity.id)}
              disabled={state.character.money < activity.cost}
            >
              <span className="text-left">{activity.title}</span>
              <span className="text-muted-foreground">{formatCurrency(activity.cost)}</span>
            </Button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-muted rounded-md text-sm">
          <p className="font-medium">Effecten van {categoryTitle} activiteiten:</p>
          <ul className="mt-2 space-y-1 list-disc list-inside">
            {selectedCategory === 'bank' && (
              <>
                <li>Verbeter je financiële kennis</li>
                <li>Beheer je geld slimmer</li>
                <li>Plan voor de toekomst</li>
              </>
            )}
            {selectedCategory === 'onderwijs' && (
              <>
                <li>Verhoog je kennis en vaardigheden</li>
                <li>Verbeter je toekomstige inkomenspotentieel</li>
                <li>Leer over geld beheren</li>
              </>
            )}
            {selectedCategory === 'sport' && (
              <>
                <li>Verbeter je gezondheid</li>
                <li>Verhoog je geluk</li>
                <li>Bouw sociale contacten op</li>
              </>
            )}
            {selectedCategory === 'shopping' && (
              <>
                <li>Koop benodigdheden en luxe items</li>
                <li>Verbeter je geluk op korte termijn</li>
                <li>Pas op voor impulsaankopen!</li>
              </>
            )}
            {selectedCategory === 'werk' && (
              <>
                <li>Verdien extra inkomen</li>
                <li>Bouw werkervaring op</li>
                <li>Balanceer werk en vrije tijd</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
