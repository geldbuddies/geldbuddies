import NavigationBar from '@/components/navigation/navigation-bar';
import { Fragment } from 'react';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <header className="fixed">
        <NavigationBar />
      </header>
      <main className="flex flex-col items-center justify-center h-screen">{children}</main>
    </Fragment>
  );
}
