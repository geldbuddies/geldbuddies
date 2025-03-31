import { Fragment } from 'react';

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <header className="fixed">Gamebuddies</header>
      <aside>{/* Sidebar */}</aside>
      <main className="flex h-screen">
        <section>{children}</section>
      </main>
      <aside>{/* History */}</aside>
    </Fragment>
  );
}
