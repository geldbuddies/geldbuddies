'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from '@/lib/game/context';
import { startingScenarios } from '@/lib/game/data';
import { formatCurrency } from '@/lib/utils';
import { useState } from 'react';

export function CharacterSelect({ onComplete }: { onComplete: () => void }) {
  const { dispatch } = useGame();
  const [selectedScenario, setSelectedScenario] = useState(startingScenarios[0].id);

  const handleSelectCharacter = () => {
    const scenario = startingScenarios.find((s) => s.id === selectedScenario);
    if (scenario) {
      dispatch({ type: 'SELECT_CHARACTER', payload: scenario.character });
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Kies je scenario</h2>
          <p className="text-muted-foreground mt-2">
            Selecteer een startsituatie voor je financiële reis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {startingScenarios.map((scenario) => (
            <Card
              key={scenario.id}
              className={`cursor-pointer transition-all hover:border-primary ${
                selectedScenario === scenario.id ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => setSelectedScenario(scenario.id)}
            >
              <CardHeader>
                <CardTitle>{scenario.name}</CardTitle>
                <CardDescription>Leeftijd: {scenario.character.age}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>{scenario.description}</p>
                  <div className="pt-2">
                    <div className="flex justify-between">
                      <span>Geld:</span>
                      <span className={scenario.character.money < 0 ? 'text-red-500' : ''}>
                        {formatCurrency(scenario.character.money)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inkomen:</span>
                      <span>{formatCurrency(scenario.character.income)}/maand</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kennis:</span>
                      <span>{scenario.character.knowledge}/100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={handleSelectCharacter}>
            Start je financiële avontuur
          </Button>
        </div>
      </div>
    </div>
  );
}
