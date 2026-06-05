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
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6 py-12">

      <div className="max-w-xl text-center relative">

        {/* petites traces graphiques */}
        <div className="absolute -top-10 left-0 text-3xl opacity-20 rotate-12">
          ✦
        </div>

        <div className="absolute top-0 right-2 text-2xl opacity-20 -rotate-12">
          ☁
        </div>

        <div className="absolute bottom-16 left-4 text-xl opacity-10">
          ↺
        </div>

        {/* TITRE */}
        <h1
          className="text-5xl md:text-6xl mb-10 leading-tight font-semibold"
        >
          ton rêve n'était pas le seul.
        </h1>

        {/* INTRO SIMPLE */}
        <p className="text-lg md:text-xl leading-relaxed mb-6 opacity-90">
          Tu viens de laisser une trace dans Barnard.
        </p>

        <p className="text-lg md:text-xl leading-relaxed mb-10 opacity-80">
          D’autres personnes en laissent aussi.
          <br />
          Ensemble, ça devient quelque chose de vivant.
        </p>

        {/* BLOC CENTRAL */}
        <div className="border border-black rounded-3xl p-8 mb-10 bg-[#fafafa]">

          <p className="text-xl leading-relaxed mb-4">
            ce que tu viens de vivre continue en vrai.
          </p>

          <p className="text-base leading-relaxed opacity-80 mb-4">
            The Barnard Loop rassemble des fragments de rêves,
            des images et des sensations de chacun,
            et les fait exister sur scène.
          </p>

          <p className="text-xl">
            cet été à Avignon.
          </p>

        </div>

        {/* CTA PRINCIPAL */}
        <button
          onClick={openAvignon}
          className="w-full py-4 rounded-2xl bg-black text-white text-lg font-semibold hover:scale-105 transition mb-5"
        >
          ✨ voir le spectacle
        </button>

        {/* SHARE */}
        <button
          onClick={share}
          className="text-base underline underline-offset-4 opacity-70 hover:opacity-100 transition"
        >
          💌 inviter quelqu’un à rêver aussi
        </button>

        {/* SIGNATURE */}
        <p className="mt-12 text-xs opacity-40">
          The Barnard Loop • Festival OFF Avignon • Théâtre de l'Entrepôt
        </p>

      </div>
    </main>
  );
}
