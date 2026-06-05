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
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6 py-12">

      <div className="max-w-xl text-center">

        {/* TITRE PLUS HUMAIN */}
        <h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight">
          ce que tu viens de vivre continue ailleurs.
        </h1>

        {/* ACCROCHE */}
        <p className="text-lg md:text-xl leading-relaxed mb-4">
Tu est rentré dans la boucle onyrique de Barnard        </p>

        <p className="text-lg md:text-xl leading-relaxed mb-10 opacity-80">
         Quelque chose a été partagé.
        </p>

        {/* BLOC ÉMOTION / SENS */}
        <div className="border border-black rounded-3xl p-8 mb-10 bg-[#fafafa]">

          <p className="text-xl leading-relaxed mb-4">
            The Barnard Loop part de là :
          </p>

          <p className="text-base leading-relaxed opacity-80 mb-4">
            des rêves, des fragments d’idées,
            et ce moment étrange où ils deviennent communs.
          </p>

          <p className="text-xl font-medium">
            cet été à Avignon.
          </p>

        </div>

        {/* 🔥 CTA OPTIMISÉ (TRÈS IMPORTANT) */}
        <button
          onClick={openAvignon}
          className="w-full py-5 rounded-2xl bg-black text-white text-lg font-semibold hover:scale-105 transition mb-3"
        >
          🎟️ réserver ma place
        </button>

        {/* SOUS CTA (réduction de friction mentale) */}
        <p className="text-xs opacity-50 mb-6">
          Festival OFF Avignon • Théâtre de l’Entrepôt
        </p>

        {/* SHARE OPTIMISÉ */}
        <button
          onClick={share}
          className="text-base underline underline-offset-4 opacity-70 hover:opacity-100 transition"
        >
          💌 partager ce rêve
        </button>

        {/* MICRO CONVERSION FINALE */}
        <p className="mt-12 text-sm opacity-60 leading-relaxed">
          Ce spectacle parle aussi de toi,
          même si tu ne le sais pas encore.
        </p>

      </div>
    </main>
  );
}