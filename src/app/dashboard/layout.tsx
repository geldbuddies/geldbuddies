import { ProtectedLayout } from '@/components/layouts';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
