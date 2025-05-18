export default function DashboardPage() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Overzicht</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold">Docenten</h2>
        </div>
      </div>
    </section>
  );
}
