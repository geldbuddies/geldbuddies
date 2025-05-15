import { ProtectedLayout } from '@/components/layouts';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}
