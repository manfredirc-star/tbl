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
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/reveil.jpg')",
        }}
      />

      {/* ASSOMBRISSEMENT PLUS DOUX (meilleure visibilité image) */}
      <div className="absolute inset-0 bg-black/45" />

      {/* léger dégradé cinématographique (beaucoup plus subtil) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />

      {/* CONTENU */}
      <div className="relative z-10 max-w-lg">

        <div className="mb-6 text-xs tracking-[0.4em] text-red-400/80 animate-pulse">
          ANOMALIE DÉTECTÉE
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-widest mb-6">
          THE BARNARD LOOP
        </h1>

        <p className="text-base md:text-lg text-white/85 leading-relaxed mb-10">
          Une boucle onirique a été détectée.
          <br />
          Si tu es ici, tu es déjà concerné.
        </p>

        {/* COMPTEUR */}
        <div className="mb-10 border border-white/15 bg-black/25 backdrop-blur-sm rounded-xl px-6 py-5">

          <div className="text-3xl font-bold text-white">
            {count.toLocaleString("fr-FR")}
          </div>

          <div className="text-sm text-white/60 mt-2">
            témoins recensés dans la boucle
          </div>

        </div>

        {/* MESSAGE HUMORISTIQUE REMPLAÇANT "REGISTRE DES ANOMALIES" */}
        <p className="text-sm text-white/55 italic mb-10">
          Le département des rêves déconseille de continuer.
        </p>

        {/* BOUTON */}
        <a
          href="/test"
          className="inline-block px-8 py-4 border border-white/30 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          entrer dans la boucle
        </a>

      </div>

    </main>
  );
}