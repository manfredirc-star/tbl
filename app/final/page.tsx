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
      "The Barnard Loop m’a laissé un truc bizarre en tête… je sais pas trop si j’ai vu un spectacle ou autre chose. À Avignon cet été.";

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

        {/* HEADER UNIFIÉ (comme demandé) */}
        <p className="text-xs md:text-sm text-white/60 mb-6 tracking-wide">
          The Barnard Loop • Théâtre de l’Entrepôt • Festival OFF Avignon 2026 • 19h10
        </p>

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-semibold tracking-wide mb-10">
          THE BARNARD LOOP
        </h1>

        {/* SUB MESSAGE (HOOK UNIQUE, PROPRE, SANS STORY) */}
        <p className="text-base md:text-lg text-white/70 mb-10 leading-relaxed">
          ceci n’était pas qu’un rêve.  
          parfois, la magie est dans le monde réel.
        </p>

        {/* TESTIMONIALS */}
        <div className="mb-10 space-y-4 text-white/70 text-sm">

          <p>“je ne m’attendais pas à être autant dedans.”</p>

          <p>“c’est étrange… mais j’ai encore des images en tête.”</p>

          <p>“j’ai eu du mal à revenir à la réalité après.”</p>

        </div>

        {/* URGENCY */}
        <p className="text-white/60 mb-8">
          représentation limitée • chaque soirée est légèrement différente
        </p>

        {/* CTA */}
        <button
          onClick={openAvignon}
          className="w-full py-5 rounded-2xl bg-white text-black text-lg font-semibold hover:scale-105 transition mb-3"
        >
          🎟️ réserver ma place
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
          ce n’est pas une histoire.  
          c’est quelque chose que tu traverses.
        </p>

      </div>
    </main>
  );
}