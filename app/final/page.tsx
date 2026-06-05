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
      "Je viens de laisser quelque chose dans The Barnard Loop. Apparemment les rêves continuent en vrai cet été à Avignon.";

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

      {/* glow mystérieux */}
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
        <h1 className="text-5xl md:text-6xl mb-10 font-semibold leading-tight">
          ton rêve n'était pas le seul.
        </h1>

        {/* INTRO */}
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-white/90">
          Tu viens de laisser une trace dans Barnard.
        </p>

        <p className="text-lg md:text-xl leading-relaxed mb-10 text-white/70">
          D’autres personnes en laissent aussi.
          <br />
          Ensemble, ça devient quelque chose de vivant.
        </p>

        {/* BLOC CENTRAL */}
        <div className="border border-white/30 rounded-3xl p-8 mb-10 bg-white/5 backdrop-blur">

          <p className="text-xl leading-relaxed mb-4">
            ce que tu viens de vivre continue en vrai.
          </p>

          <p className="text-base leading-relaxed text-white/70 mb-4">
            The Barnard Loop rassemble des fragments de rêves,
            des images et des sensations de chacun,
            et les fait exister sur scène.
          </p>

          <p className="text-xl text-white">
            cet été à Avignon.
          </p>

        </div>

        {/* CTA PRINCIPAL */}
        <button
          onClick={openAvignon}
          className="w-full py-4 rounded-2xl bg-white text-black text-lg font-semibold hover:scale-105 transition mb-5"
        >
          ✨ voir le spectacle
        </button>

        {/* SHARE */}
        <button
          onClick={share}
          className="text-base underline underline-offset-4 text-white/60 hover:text-white transition"
        >
          💌 inviter quelqu’un à rêver aussi
        </button>

        {/* FOOTER */}
        <p className="mt-12 text-xs text-white/30">
          The Barnard Loop • Festival OFF Avignon • Théâtre de l'Entrepôt
        </p>

      </div>
    </main>
  );
}