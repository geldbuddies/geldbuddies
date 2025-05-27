import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Building, CreditCard, LineChart, ShoppingBag } from 'lucide-react';
import { AssetsSection } from './assets-section';
import { FinanceSection } from './finance-section';
import { InvestmentsSection } from '@/components/game/investments-section';
import { PlayerStatus } from './player-status';
import { ShopSection } from './shop-section';
import { WorkSection } from './work-section';

export function GameDashboard() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <PlayerStatus />

      <Tabs defaultValue="work" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4 bg-muted/50 backdrop-blur-sm border-muted/50 shadow-lg">
          <TabsTrigger value="work" className="data-[state=active]:bg-primary/10">
            <Briefcase className="h-4 w-4 mr-2" />
            Werk
          </TabsTrigger>
          <TabsTrigger value="shop" className="data-[state=active]:bg-primary/10">
            <ShoppingBag className="h-4 w-4 mr-2" />
            Winkelen
          </TabsTrigger>
          <TabsTrigger value="assets" className="data-[state=active]:bg-primary/10">
            <Building className="h-4 w-4 mr-2" />
            Bezittingen
          </TabsTrigger>
          <TabsTrigger value="investments" className="data-[state=active]:bg-primary/10">
            <LineChart className="h-4 w-4 mr-2" />
            Investeringen
          </TabsTrigger>
          <TabsTrigger value="finance" className="data-[state=active]:bg-primary/10">
            <CreditCard className="h-4 w-4 mr-2" />
            Financiën
          </TabsTrigger>
        </TabsList>

        <TabsContent value="work">
          <WorkSection />
        </TabsContent>

        <TabsContent value="shop">
          <ShopSection />
        </TabsContent>

        <TabsContent value="assets">
          <AssetsSection />
        </TabsContent>

        <TabsContent value="investments">
          <InvestmentsSection />
        </TabsContent>

        <TabsContent value="finance">
          <FinanceSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
