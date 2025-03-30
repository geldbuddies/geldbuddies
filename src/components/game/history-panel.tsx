'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useGame } from '@/lib/game/context';
import { formatCurrency } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function HistoryPanel() {
  const { state, getRandomTip } = useGame();
  const { activityHistory } = state;
  const [tip, setTip] = useState('');

  // Update tip when component mounts or when history changes
  useEffect(() => {
    setTip(getRandomTip());
  }, [getRandomTip]);

  // Format date as day and month (e.g., "2 jan")
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('nl-NL', {
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <Sidebar collapsible="none" className="h-svh max-h-svh border-l overflow-y-auto">
      <SidebarHeader>
        <h2 className="text-lg font-bold">Recente activiteiten</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            {activityHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Je hebt nog geen activiteiten uitgevoerd. Kies een activiteit links om te beginnen.
              </p>
            ) : (
              <div className="space-y-2 overflow-y-auto pr-2">
                {activityHistory.map((activity, index) => (
                  <div key={index} className="p-2 border-b border-border last:border-0">
                    <p className="text-sm">{activity.description}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                      <ActivityEffect effect={activity.effect} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* Financial tip */}
        <div className="p-2">
          <div className=" bg-primary/10 p-3 rounded-md">
            <p className="text-sm font-medium">💡 Financiële tip:</p>
            <p className="text-sm mt-1">{tip}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function ActivityEffect({ effect }: { effect: Record<string, number | undefined> }) {
  const icons: Record<string, string> = {
    money: '💰',
    knowledge: '📚',
    happiness: '😊',
    health: '❤️',
  };

  return (
    <div className="flex gap-2">
      {Object.entries(effect).map(([key, value]) => {
        if (value === undefined || value === 0) return null;

        const icon = icons[key] || '✨';
        const color = value > 0 ? 'text-green-600' : 'text-red-600';
        const sign = value > 0 ? '+' : '';

        let displayValue = value;
        if (key === 'money') {
          displayValue = value;
          return (
            <span key={key} className={color} title={key}>
              {icon} {formatCurrency(displayValue)}
            </span>
          );
        }

        return (
          <span key={key} className={color} title={key}>
            {icon} {sign}
            {value}
          </span>
        );
      })}
    </div>
  );
}
