export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white overflow-hidden">

      {/* 🖼️ IMAGE DE FOND (reveil.jpg) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/reveil.jpg')",
        }}
      />

      {/* 🌑 ASSOMBRISSEMENT POUR LISIBILITÉ */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🌌 BACKGROUND INSTABLE (ton effet original conservé) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black animate-pulse opacity-60" />

      {/* 💫 BRUIT / VIBRATION VISUELLE */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)] animate-pulse" />

      {/* 🌫 FLOTTEMENT GLOBAL */}
      <div className="absolute inset-0 pointer-events-none animate-pulse opacity-5 bg-gradient-to-tr from-indigo-500 via-transparent to-purple-500" />

      {/* CONTENU */}
      <div className="relative z-10">

        <h1 className="text-3xl font-bold tracking-widest mb-10">
          THE BARNARD LOOP
        </h1>

        <p className="max-w-md text-sm leading-relaxed text-white/80 space-y-2">
          <span className="block">
            Une boucle onirique a été détectée.
          </span>
          <span className="block">
            Si tu es ici, tu es déjà concerné.
          </span>
        </p>

        {/* BOUTON */}
        <a
          href="/test"
          className="mt-10 inline-block px-6 py-3 border border-white/40 text-white rounded hover:bg-white hover:text-black transition"
        >
          rentrer
        </a>

      </div>

    </main>
  );
}