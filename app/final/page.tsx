"use client";

export default function FinalPage() {
  function openAvignon() {
    window.open(
      "https://festivaloffavignon.com/spectacles/the-barnard-loop",
      "_blank"
    );
  }

  function share() {
    const text =
      "Je viens de découvrir The Barnard Loop. Un spectacle sur les rêves qu’on partage sans s’en rendre compte. À Avignon cet été.";

    if (navigator.share) {
      navigator.share({
        title: "The Barnard Loop",
        text,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(
        text + " " + window.location.origin
      );
      alert("Lien copié ✨");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* ambiance lumineuse / rêve */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,119,198,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.05),transparent_70%)]" />

      {/* éléments flottants */}
      <div className="absolute top-10 left-6 text-white/20 text-3xl rotate-12">
        ✦
      </div>

      <div className="absolute top-20 right-8 text-white/20 text-2xl -rotate-12">
        ☁
      </div>

      <div className="absolute bottom-20 left-10 text-white/10 text-xl">
        ↺
      </div>

      <div className="max-w-xl text-center relative z-10">

        {/* TITRE */}
        <h1 className="text-5xl md:text-6xl mb-8 font-semibold leading-tight">
          ce que tu viens de vivre continue ailleurs.
        </h1>

        {/* ACCROCHE */}
        <p className="text-lg md:text-xl leading-relaxed mb-4 text-white/90">
          tu es entré dans la boucle onirique de Barnard.
        </p>

        <p className="text-lg md:text-xl leading-relaxed mb-10 text-white/70">
          quelque chose a été partagé.
        </p>

        {/* BLOC CENTRAL */}
        <div className="border border-white/20 rounded-3xl p-8 mb-10 bg-white/5 backdrop-blur">

          <p className="text-xl leading-relaxed mb-4">
            The Barnard Loop part de là :
          </p>

          <p className="text-base leading-relaxed opacity-80 mb-4">
            des rêves, des fragments d’idées,
            et ce moment étrange où ils deviennent communs.
          </p>

          <p className="text-xl">
            cet été à Avignon.
          </p>

        </div>

        {/* CTA PRINCIPAL */}
        <button
          onClick={openAvignon}
          className="w-full py-5 rounded-2xl bg-white text-black text-lg font-semibold hover:scale-105 transition mb-3"
        >
          🎟️ réserver ma place
        </button>

        {/* SOUS CTA */}
        <p className="text-xs text-white/40 mb-6">
          Festival OFF Avignon • Théâtre de l’Entrepôt
        </p>

        {/* SHARE */}
        <button
          onClick={share}
          className="text-base underline underline-offset-4 text-white/60 hover:text-white transition"
        >
          💌 partager ce rêve
        </button>

        {/* MICRO PHRASE */}
        <p className="mt-12 text-sm text-white/60 leading-relaxed">
          ce spectacle parle aussi de toi,
          <br />
          même si tu ne le sais pas encore.
        </p>

      </div>
    </main>
  );
}