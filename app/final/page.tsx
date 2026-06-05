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
      "J’ai trouvé un fragment de Barnard. Je crois que d’autres personnes le voient aussi. Cet été à Avignon.";

    if (navigator.share) {
      navigator.share({
        title: "Barnard Loop",
        text,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(
        text + " " + window.location.origin
      );
      alert("message copié");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* bruit / glitch visuel */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_60%)] animate-pulse" />

      {/* éléments "système" */}
      <div className="absolute top-10 left-6 text-white/20 text-sm tracking-widest">
        [signal reçu]
      </div>

      <div className="absolute top-16 right-6 text-white/20 text-sm tracking-widest">
        node: unstable
      </div>

      <div className="absolute bottom-10 left-6 text-white/10 text-xs">
        loop://active
      </div>

      <div className="max-w-xl text-center relative z-10">

        {/* titre type système cassé */}
        <h1 className="text-4xl md:text-6xl font-semibold mb-10 leading-tight">
          un fragment a été laissé ici.
        </h1>

        {/* état système */}
        <div className="border border-white/20 rounded-2xl p-6 mb-10 text-left bg-white/5">

          <p className="text-sm text-white/60 mb-3">
            statut : non résolu
          </p>

          <p className="text-sm text-white/60 mb-3">
            origine : inconnue (Barnard)
          </p>

          <p className="text-sm text-white/60 mb-3">
            répétition : oui
          </p>

          <p className="text-sm text-white/60">
            observation : plusieurs rêves se superposent
          </p>

        </div>

        {/* message principal */}
        <p className="text-lg md:text-xl leading-relaxed mb-6 text-white/90">
          Tu viens de traverser une version de Barnard.
        </p>

        <p className="text-lg md:text-xl leading-relaxed mb-10 text-white/70">
          D’autres personnes y entrent aussi.
          <br />
          Les résultats ne sont pas identiques.
        </p>

        {/* bloc étrange */}
        <div className="border border-dashed border-white/30 rounded-3xl p-8 mb-10 bg-white/5">

          <p className="text-xl mb-4">
            ce que tu as vu n’est pas fermé.
          </p>

          <p className="text-base text-white/70 mb-4">
            The Barnard Loop est un système vivant construit à partir
            de fragments de rêves humains.
          </p>

          <p className="text-xl">
            il continue hors de ton écran.
          </p>

        </div>

        {/* glitch phrase */}
        <p className="text-sm tracking-widest text-white/40 mb-8">
          si tu comprends, tu fais déjà partie du réseau.
        </p>

        {/* CTA principal */}
        <button
          onClick={openAvignon}
          className="w-full py-4 rounded-2xl bg-white text-black text-lg font-semibold hover:scale-105 transition mb-5"
        >
          ▶ exécuter la suite (Avignon)
        </button>

        {/* SHARE */}
        <button
          onClick={share}
          className="text-base underline underline-offset-4 text-white/60 hover:text-white transition"
        >
          transmettre le fragment
        </button>

        {/* footer étrange */}
        <p className="mt-12 text-xs text-white/20 tracking-widest">
          Barnard Loop • observation active • Théâtre de l'Entrepôt
        </p>

      </div>
    </main>
  );
}