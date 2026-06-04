"use client";

export default function FinalPage() {

  function goToAignon() {
    window.open("https://aignon.com", "_blank");
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center text-center p-6 text-white bg-black overflow-hidden">

      {/* 🌌 BACKGROUND CINÉ */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black opacity-90" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)]" />

      {/* CONTENU */}
      <div className="relative z-10 max-w-md space-y-6">

        {/* TITRE IMPACT */}
        <h1 className="text-2xl font-bold tracking-widest">
          TU ES ARRIVÉ AU BORD DU RÊVE
        </h1>

        <p className="text-white/70 text-sm leading-relaxed">
          Barnard n’est pas coincé.  
          Il est en représentation.
        </p>

        <p className="text-white/60 text-sm">
          Ce que tu viens de vivre fait partie du spectacle  
          “Barnard Loop” — une expérience théâtrale immersive.
        </p>

        {/* BLOQUE EMOTIONNEL */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-700 to-black shadow-xl">

          <p className="text-white/90 text-sm leading-relaxed">
            Tu n’as pas répondu à un test.  
            Tu as déjà commencé la pièce.
          </p>

        </div>

        {/* CTA PRINCIPAL */}
        <button
          onClick={goToAignon}
          className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 transition"
        >
          Acheter mon billet sur Aignon
        </button>

        {/* CTA SECONDAIRE */}
        <button
          onClick={goToAignon}
          className="text-sm text-white/60 underline hover:text-white"
        >
          Voir les dates du spectacle
        </button>

        {/* MICRO TEXTE */}
        <p className="text-xs text-white/40 mt-6">
          expérience théâtrale — Avignon / tournée
        </p>

      </div>

      {/* AMBIANCE */}
      <div className="absolute bottom-6 text-xs text-white/20 tracking-widest">
        barnard loop // you are inside
      </div>

    </main>
  );
}