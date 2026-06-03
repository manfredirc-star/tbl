"use client";

export default function FinalPage() {

  const shareData = {
    title: "Barnard",
    text: "Barnard est coincé dans une boucle onirique à Avignon. Aide-le à s'en sortir.",
    url: typeof window !== "undefined" ? window.location.origin : "",
  };

  async function handleShare() {
    // 📱 Mobile natif (Instagram, WhatsApp, etc.)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // 💻 fallback : copier lien
      await navigator.clipboard.writeText(shareData.url);
      alert("Lien copié !");
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-6">

      {/* 🧠 TITRE */}
      <h1 className="text-2xl font-bold mb-6">
        Barnard est coincé dans une boucle onirique à Avignon.
      </h1>

      <h2 className="text-lg mb-6">
        Il pense que chaque jour est lundi.
      </h2>

      <h2 className="text-lg mb-6">
        Même le jeudi.
      </h2>

      {/* ⚠️ EXPLICATION */}
      <p className="text-lg mb-6">
        La seule façon de le réveiller, c’est de partager ce message.
      </p>

      {/* 🔥 BOUTON VIRAL */}
      <button
        onClick={handleShare}
        className="px-6 py-3 bg-black text-white rounded mb-10"
      >
        Partager le signal
      </button>

      {/* 📡 INSTRUCTION SOCIALE */}
      <p className="text-md text-gray-600 mb-10">
        Envoie ça à quelqu’un, on teste un truc.
      </p>

      <p className="text-md text-gray-600 mb-10">
        Bonne chance.
      </p>

      <p className="text-md text-gray-600 mb-10">
        Barnard compte sur toi.
      </p>

      {/* 🌙 FIN */}
      <p className="text-sm text-gray-400">
        Bonne nuit.
      </p>

    </main>
  );
}