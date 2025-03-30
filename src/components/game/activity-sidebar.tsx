'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useGame } from '@/lib/game/context';
import { ActivityCategory } from '@/lib/game/types';
import { BookOpen, Briefcase, Building2, Dumbbell, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const categories: Array<{ id: ActivityCategory; label: string; icon: React.ReactNode }> = [
  { id: 'bank', label: 'Bank', icon: <Building2 className="w-5 h-5" /> },
  { id: 'onderwijs', label: 'Onderwijs', icon: <BookOpen className="w-5 h-5" /> },
  { id: 'sport', label: 'Sport', icon: <Dumbbell className="w-5 h-5" /> },
  { id: 'shopping', label: 'Shopping', icon: <ShoppingBag className="w-5 h-5" /> },
  { id: 'werk', label: 'Werk', icon: <Briefcase className="w-5 h-5" /> },
];

export function ActivitySidebar() {
  const { state, dispatch } = useGame();
  const { selectedCategory } = state;

  const handleCategoryClick = (category: ActivityCategory) => {
    dispatch({ type: 'SELECT_CATEGORY', payload: category });
  };

  return (
    <Sidebar>
      <SidebarHeader className="gap-0">
        <h2 className="text-xl font-bold">GeldBuddies</h2>
        <p className="text-xs text-muted-foreground">Leer financiële vaardigheden</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {categories.map((category) => (
              <SidebarMenuItem key={category.id}>
                <SidebarMenuButton
                  isActive={selectedCategory === category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="w-full justify-start gap-3"
                >
                  {category.icon}
                  <span>{category.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3">
        <Button variant="ghost" asChild>
          <Link href="/" className="text-xs text-muted-foreground">
            Terug naar de startpagina
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
