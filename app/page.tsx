export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold">
        THE BARNARD LOOP
      </h1>

      <p className="mt-6 max-w-md">
        Une boucle onirique a été détectée.<br />
        Si tu es ici, tu es déjà concerné.
      </p>

      <a
        href="/test"
        className="mt-8 px-6 py-3 bg-black text-white rounded"
      >
        rentrer
      </a>
    </main>
  );
}