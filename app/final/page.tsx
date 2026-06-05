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
      "Je viens de tomber dans The Barnard Loop. Apparemment le rêve continue en vrai cet été à Avignon.";

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
    <main className="min-h-screen bg-[#f8f4eb] text-black flex items-center justify-center px-6 py-12">
      <div className="max-w-xl text-center relative">

        <div className="absolute -top-10 left-0 text-3xl rotate-[-15deg] opacity-50">
          ✦
        </div>

        <div className="absolute top-0 right-0 text-2xl rotate-12 opacity-50">
          ☁
        </div>

        <div className="absolute bottom-20 -left-4 text-xl opacity-40">
          ↺
        </div>

        <h1
          className="text-5xl md:text-6xl mb-8 leading-none"
          style={{ fontFamily: "cursive" }}
        >
          le rêve continue
        </h1>

        <p className="text-lg md:text-xl leading-relaxed mb-6">
          tu viens de terminer une version numérique de Barnard.
        </p>

        <p className="text-lg md:text-xl leading-relaxed mb-10">
          maintenant le rêve existe en vrai.
          <br />
          cet été à Avignon.
        </p>

        <div className="border-2 border-black rounded-[30px] p-8 mb-10 bg-white/60">
          <p className="text-xl leading-relaxed">
            ce que tu viens de vivre
            <br />
            continue en live.
          </p>

          <p className="mt-6 text-base leading-relaxed opacity-80">
            The Barnard Loop est un rêve collectif
            qui prend vie sur scène.
          </p>

          <p
            className="mt-4 text-2xl"
            style={{ fontFamily: "cursive" }}
          >
            ne l'arrête pas.
          </p>
        </div>

        <button
          onClick={openAvignon}
          className="w-full py-4 rounded-2xl bg-black text-white text-lg font-semibold hover:scale-105 transition mb-5"
        >
          voir le spectacle
        </button>

        <button
          onClick={share}
          className="text-base underline underline-offset-4 opacity-70 hover:opacity-100 transition"
        >
          partager le rêve ↗
        </button>

        <p className="mt-12 text-xs opacity-40">
          The Barnard Loop • Festival OFF Avignon • Théâtre de l'Entrepôt
        </p>

      </div>
    </main>
  );
}