'use client';

import { ActivityPanel } from '@/components/game/activity-panel';
import { ActivitySidebar } from '@/components/game/activity-sidebar';
import { CharacterSelect } from '@/components/game/character-select';
import { GameControl } from '@/components/game/game-control';
import { HistoryPanel } from '@/components/game/history-panel';
import { StatusBar } from '@/components/game/status-bar';
import { useState } from 'react';

export default function GamePage() {
  const [showCharacterSelect, setShowCharacterSelect] = useState(true);

  const handleCharacterSelectComplete = () => {
    setShowCharacterSelect(false);
  };

  return (
    <>
      {showCharacterSelect && <CharacterSelect onComplete={handleCharacterSelectComplete} />}

      {/* Main game area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Top status bar */}
        <StatusBar />

        {/* Main game content */}
        <div className="flex-1">
          {/* Activity panel */}
          <div className="h-full p-4">
            <ActivityPanel />
          </div>
        </div>

        {/* Bottom action bar */}
        <GameControl />
      </div>
    </>
  );
}
