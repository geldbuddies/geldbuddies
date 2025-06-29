import SidebarRight from '@/components/game/sidebar-right';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="fixed inset-0">
      {/* <SidebarLeft /> */}
      <SidebarInset className="flex h-svh max-h-svh mb-8 overflow-auto">{children}</SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
