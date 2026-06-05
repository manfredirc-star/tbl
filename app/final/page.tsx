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
      "Je viens de découvrir The Barnard Loop. C’est un spectacle sur les rêves et ce qu’on partage sans le dire. Cet été à Avignon.";

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

        {/* TITRE SIMPLE / HUMAIN */}
        <h1 className="text-5xl md:text-6xl font-semibold mb-8 leading-tight">
          tu viens de partager quelque chose.
        </h1>

        {/* INTRO ÉMOTIONNELLE */}
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          Même si tu ne t’en rends pas compte,
          ce que tu viens de vivre t’appartient un peu.
        </p>

        <p className="text-lg md:text-xl leading-relaxed mb-10 opacity-80">
          Et maintenant, ça continue ailleurs.
        </p>

        {/* BLOC CENTRAL ÉMOTION */}
        <div className="border border-black rounded-3xl p-8 mb-10 bg-[#fafafa]">

          <p className="text-xl leading-relaxed mb-4">
            The Barnard Loop parle de ça :
          </p>

          <p className="text-base leading-relaxed opacity-80 mb-4">
            des rêves qu’on garde pour soi,
            des choses qu’on ressent sans les expliquer,
            et du moment où elles deviennent réelles
            quand on les partage.
          </p>

          <p className="text-xl font-medium">
            cet été à Avignon.
          </p>

        </div>

        {/* CTA PRINCIPAL */}
        <button
          onClick={openAvignon}
          className="w-full py-4 rounded-2xl bg-black text-white text-lg font-semibold hover:scale-105 transition mb-5"
        >
          ✨ réserver le spectacle
        </button>

        {/* SHARE PLUS HUMAIN */}
        <button
          onClick={share}
          className="text-base underline underline-offset-4 opacity-70 hover:opacity-100 transition"
        >
          💌 partager à quelqu’un qui devrait le voir
        </button>

        {/* MICRO PHRASE FINALE */}
        <p className="mt-12 text-sm opacity-50 leading-relaxed">
          Ce n’est pas juste un spectacle.
          <br />
          C’est quelque chose qu’on traverse ensemble.
        </p>

        <p className="mt-8 text-xs opacity-30">
          The Barnard Loop • Festival OFF Avignon • Théâtre de l'Entrepôt
        </p>

      </div>
    </main>
  );
}