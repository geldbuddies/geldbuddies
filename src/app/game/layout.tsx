import { Fragment } from 'react';

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <header className="fixed">Game layout</header>
      <main className="flex flex-col items-center justify-center h-screen">{children}</main>
    </Fragment>
  );
}
