export default function Journal() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Journal de Barnard</h1>

      <div className="mt-6 space-y-6">
        <p>Je n’ai pas dormi depuis 47 nuits.</p>
      
      </div>

      <a
        href="/missions"
        className="mt-8 inline-block bg-black text-white px-4 py-2"
      >
        Missions
      </a>
    </main>
  );
}