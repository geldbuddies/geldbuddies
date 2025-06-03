import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Building, CreditCard, GraduationCap, LineChart, ShoppingBag } from 'lucide-react';
import { AssetsSection } from '@/components/game/assets-section';
import { CharacterSelect } from '@/components/game/character-select';
import { EducationSection } from '@/components/game/education-section';
import { FinanceSection } from '@/components/game/finance-section';
import { InvestmentsSection } from '@/components/game/investments-section';
import { PlayerStatus } from '@/components/game/player-status';
import { ShopSection } from '@/components/game/shop-section';
import { WorkSection } from '@/components/game/work-section';
import useGameStore from '@/store/game/game-store';
import { useEffect, useState } from 'react';

// Define navigation items
const navigationItems = [
  { id: 'work', label: 'Werk', icon: Briefcase },
  { id: 'education', label: 'Opleiding', icon: GraduationCap },
  { id: 'shop', label: 'Winkelen', icon: ShoppingBag },
  { id: 'assets', label: 'Bezittingen', icon: Building },
  { id: 'investments', label: 'Investeringen', icon: LineChart },
  { id: 'finance', label: 'Financiën', icon: CreditCard },
];

export function GameDashboard() {
  const { player, time } = useGameStore();
  const [activeTab, setActiveTab] = useState('education'); // Set default tab to education

  // Initialize history on first render if empty
  useEffect(() => {
    const { history, addHistoryEvent } = useGameStore.getState();
    if (history.events.length === 0) {
      addHistoryEvent({
        type: 'life',
        description: `Nieuwe levenssimulatie gestart in ${time.monthName} ${time.year}`,
      });
    }
  }, [time.monthName, time.year]);

  // Function to render the active section
  const renderSection = () => {
    switch (activeTab) {
      case 'work':
        return <WorkSection />;
      case 'education':
        return <EducationSection />;
      case 'shop':
        return <ShopSection />;
      case 'assets':
        return <AssetsSection />;
      case 'investments':
        return <InvestmentsSection />;
      case 'finance':
        return <FinanceSection />;
      default:
        return <EducationSection />; // Default to education section
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {!player.isInitialized && <CharacterSelect />}
      <PlayerStatus />

      {/* Navigation */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 p-2 bg-muted rounded-lg mb-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 p-2 rounded-md transition-colors debug-nav-${item.id}
                ${
                  activeTab === item.id
                    ? 'bg-background text-foreground'
                    : 'hover:bg-background/50 text-muted-foreground'
                }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="mt-4">
        {renderSection()}
      </div>
    </div>
  );
} 