"use client";

export default function FinalPage() {

  function openAignon() {
    window.open("https://aignon.com", "_blank");
  }

  function share() {
    const text =
      "J’ai trouvé un message étrange lié à Barnard. Je crois que ça doit être vu par quelqu’un qui rêve encore.";

    if (navigator.share) {
      navigator.share({
        title: "Barnard Loop",
        text,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(text + " " + window.location.origin);
      alert("Message copié");
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center text-center p-6 bg-black text-white overflow-hidden">

      {/* 🌌 fond vivant doux */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black opacity-90" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)] animate-pulse" />

      {/* contenu */}
      <div className="relative z-10 max-w-lg space-y-8">

        {/* titre étrange */}
        <h1 className="text-2xl font-bold tracking-widest">
          quelqu’un a laissé un rêve ici
        </h1>

        <p className="text-white/70 leading-relaxed">
          Barnard n’est pas un personnage.  
          C’est ce qui arrive quand plusieurs rêves essaient de parler en même temps.
        </p>

        <p className="text-white/60 text-sm">
          parfois il s’écrit dans les interfaces.  
          parfois il se glisse dans les décisions des gens qui hésitent trop longtemps.
        </p>

        {/* bloc poétique */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-700 to-black shadow-xl">

          <p className="text-sm text-white/90 leading-relaxed">
            si tu es arrivé ici, c’est probablement que quelqu’un que tu connais
            aurait dû voir ce message aussi.
          </p>

        </div>

        {/* CTA principal doux */}
        <button
          onClick={openAignon}
          className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition"
        >
          voir les dates du spectacle
        </button>

        {/* CTA viral */}
        <button
          onClick={share}
          className="block mx-auto text-sm text-white/60 underline hover:text-white"
        >
          envoyer à quelqu’un qui rêve souvent
        </button>

        {/* micro phrase */}
        <p className="text-xs text-white/30">
          barnard loop — performance vivante / avignon / tournée
        </p>

      </div>

      {/* signature invisible */}
      <div className="absolute bottom-6 text-xs text-white/20 tracking-widest">
        si tu comprends, tu es déjà dedans
      </div>

    </main>
  );
}