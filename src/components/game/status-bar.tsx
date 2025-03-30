'use client';

import { useGame } from '@/lib/game/context';
import { formatCurrency } from '@/lib/utils';

export function StatusBar() {
  const { state } = useGame();
  const { character, currentDate } = state;

  // Format date as Month Year (e.g., "Januari 2025")
  const formattedDate = new Intl.DateTimeFormat('nl-NL', {
    month: 'long',
    year: 'numeric',
  }).format(currentDate);

  return (
    <div className="flex justify-between border-b pl-4 border-border bg-sidebar">
      <div className="flex items-center gap-4">
        {/* Avatar placeholder */}
        <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
          {character.name.charAt(0)}
        </div>
        <div className="flex gap-16 items-end">
          <div>
            <h2 className="text-xl font-bold">{character.name}</h2>
            <p className="text-muted-foreground">{character.age} jaar oud</p>
          </div>
          <div className="flex gap-2 mt-1">
            <StatusIcon type="knowledge" value={character.knowledge} />
            <StatusIcon type="happiness" value={character.happiness} />
            <StatusIcon type="health" value={character.health} />
          </div>
        </div>
      </div>
      <div className="bg-muted p-4 border-l flex flex-col items-end">
        <p className="text-xl font-bold">
          {formatCurrency(character.money)} ({formatCurrency(character.income)}/m)
        </p>
        <p className="text-sm text-muted-foreground">{formattedDate}</p>
      </div>
    </div>
  );
}

function StatusIcon({
  type,
  value,
}: {
  type: 'knowledge' | 'happiness' | 'health';
  value: number;
}) {
  let icon = '📚'; // Default knowledge icon
  if (type === 'happiness') icon = '😊';
  if (type === 'health') icon = '❤️';

  // Determine color based on value
  let bgColor = 'bg-green-500';
  if (value < 30) bgColor = 'bg-red-500';
  else if (value < 70) bgColor = 'bg-yellow-500';

  return (
    <div className="flex items-center gap-1" title={`${type}: ${value}/100`}>
      <span>{icon}</span>
      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${bgColor}`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
