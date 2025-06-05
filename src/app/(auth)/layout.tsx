export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <section className="flex w-full max-w-sm flex-col gap-6">{children}</section>
    </main>
  );
}
