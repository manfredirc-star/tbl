'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(1738);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white overflow-hidden">

      {/* IMAGE DE FOND */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/reveil.jpg')",
        }}
      />

      {/* OMBRE */}
      <div className="absolute inset-0 bg-black/65" />

      {/* AMBIANCE */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black animate-pulse opacity-50" />

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)] animate-pulse" />

      {/* CONTENU */}
      <div className="relative z-10 max-w-lg">

        <div className="mb-8 text-xs tracking-[0.4em] text-red-400 animate-pulse">
          ANOMALIE DÉTECTÉE
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-widest mb-8">
          THE BARNARD LOOP
        </h1>

        <p className="text-base md:text-lg text-white/80 leading-relaxed mb-8">
          Une boucle onirique a été détectée.
          <br />
          Si tu es ici, tu es déjà concerné.
        </p>

        {/* COMPTEUR */}
        <div className="mb-10 border border-white/20 bg-black/30 backdrop-blur-sm rounded-xl px-6 py-4">

          <div className="text-xs tracking-[0.3em] text-white/50 uppercase mb-2">
            Registre des anomalies
          </div>

          <div className="text-3xl font-bold text-white">
            {count.toLocaleString("fr-FR")}
          </div>

          <div className="text-sm text-white/60 mt-2">
            individus détectés dans la boucle
          </div>

        </div>

        {/* MESSAGE */}
        <p className="text-sm text-white/50 italic mb-10">
          Nous ignorons encore comment vous êtes arrivé ici.
        </p>

        {/* BOUTON */}
        <a
          href="/test"
          className="inline-block px-8 py-4 border border-white/40 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          entrer dans la boucle
        </a>

      </div>

    </main>
  );
}