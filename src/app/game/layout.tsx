'use client';

import { ActivitySidebar } from '@/components/game/activity-sidebar';
import { HistoryPanel } from '@/components/game/history-panel';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { GameProvider } from '@/lib/game/context';
import React from 'react';

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <SidebarProvider>
        <ActivitySidebar />
        <SidebarInset>{children}</SidebarInset>
        <HistoryPanel />
      </SidebarProvider>
    </GameProvider>
  );
}
