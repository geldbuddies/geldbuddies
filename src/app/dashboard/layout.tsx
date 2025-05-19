import { ProtectedLayout } from '@/components/layouts';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { getServerSession } from '@/server/auth/utils';
import { api, HydrateClient } from '@/trpc/server';
import { DashboardSidebar } from './_components/dashboard-sidebar';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session) {
    void api.organization.getOrganizations.prefetch();
  }

  return (
    <HydrateClient>
      <ProtectedLayout>
        <SidebarProvider>
          <DashboardSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </ProtectedLayout>
    </HydrateClient>
  );
}
