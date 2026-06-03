export default function Missions() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Mission du jour</h1>

      <p className="mt-6">
        Trouver un objet qui ne devrait pas exister à Avignon.
        <br />
        Capture-le, partage-le sur Instagram avec DispensaBarzotti et active la suite du jeu.
      </p>

      <a
        href="/reves"
        className="mt-8 inline-block bg-black text-white px-4 py-2"
      >
        Traverser ver le rêve collectif
      </a>
    </main>
  );
}