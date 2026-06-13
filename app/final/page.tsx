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
      "Je suis tombé sur The Barnard Loop… je ne sais pas si c’est un spectacle ou une expérience collective de rêve. À Avignon cet été.";

    if (navigator.share) {
      navigator.share({
        title: "The Barnard Loop",
        text,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(text + " " + window.location.origin);
      alert("Lien copié ✨");
    }
  }

  return (
    <main className="min-h-screen text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/faccia.jpg')",
        }}
      />

      {/* DARK LAYERS */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.25),transparent_60%)]" />

      {/* FLOATING ELEMENTS */}
      <div className="absolute top-10 left-6 text-white/20 text-3xl rotate-12">✦</div>
      <div className="absolute top-24 right-10 text-white/20 text-xl">☁</div>
      <div className="absolute bottom-20 left-12 text-white/10 text-xl">↺</div>

      {/* CONTENT */}
      <div className="max-w-xl text-center relative z-10">

        {/* HOOK (FORT) */}
        <h1 className="text-4xl md:text-6xl mb-6 font-semibold leading-tight">
          tu n’étais pas censé arriver ici.
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-2">
          certains spectateurs ne savent pas comment ils ont trouvé cette page.
        </p>

        <p className="text-lg md:text-xl text-white/60 mb-10">
          et pourtant ils finissent tous au même endroit.
        </p>

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl mb-6 tracking-wide">
          THE BARNARD LOOP
        </h2>

        <p className="text-white/70 mb-10">
          une anomalie dans le monde des rêves collectifs.
        </p>

        {/* CORE BLOCK */}
        <div className="border border-white/20 rounded-3xl p-8 mb-10 bg-white/5 backdrop-blur">

          <p className="text-lg mb-4">
            il y a des rêves qui ne devraient appartenir à personne.
          </p>

          <p className="text-sm text-white/70 mb-4">
            Barnard les archive.  
            Ciuffino les fait pousser.  
            La Souris les lit avant toi.
          </p>

          <p className="text-lg">
            et parfois… ils deviennent partagés.
          </p>

        </div>

        {/* TESTIMONIALS (TRÈS IMPORTANT POUR VENDRE) */}
        <div className="mb-10 space-y-4 text-white/70 text-sm">

          <p>“je ne sais pas si j’ai assisté à un spectacle ou à un rêve collectif.”</p>

          <p>“à la fin, j’avais l’impression que quelqu’un d’autre avait vécu ma vie.”</p>

          <p>“je suis sorti différent sans savoir pourquoi.”</p>

        </div>

        {/* URGENCY */}
        <p className="text-white/60 mb-8">
          représentation limitée • chaque soirée est légèrement différente
        </p>

        {/* CTA PRIMARY */}
        <button
          onClick={openAvignon}
          className="w-full py-5 rounded-2xl bg-white text-black text-lg font-semibold hover:scale-105 transition mb-3"
        >
          🎟️ entrer dans la boucle
        </button>

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

        {/* FINAL LINE */}
        <p className="mt-12 text-sm text-white/50 leading-relaxed">
          ce spectacle ne se raconte pas.  
          il se traverse.
        </p>

      </div>
    </main>
  );
}