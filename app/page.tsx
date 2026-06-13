'use client'

import { useEffect, useState } from "react";

const viralMessages = [
  "Je pense que ce site m’a reconnu.",
  "Je ne suis pas sûr d’être sorti du test.",
  "Quelqu’un d’autre a eu ce résultat ?",
  "On m’a assigné un rôle dans quelque chose que je ne comprends pas.",
  "J’ai l’impression que la boucle m’a remarqué."
];

const characters = [
  "LE GLITCH",
  "LE TÉMOIN",
  "LE PERDU",
  "LE RÉPÉTANT"
];

export default function Home() {
  const [character, setCharacter] = useState("LE GLITCH");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const c = characters[Math.floor(Math.random() * characters.length)];
    const m = viralMessages[Math.floor(Math.random() * viralMessages.length)];

    setCharacter(c);
    setMessage(m);
  }, []);

  const shareText = `J’ai fait le test The Barnard Loop.

Résultat : ${character}

"${message}"

Quelqu’un d’autre a eu ce résultat ?

https://tbl-mu.vercel.app/test`;

  const handleShare = async () => {
    await navigator.clipboard.writeText(shareText);
    alert("Message copié pour Instagram / WhatsApp");
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/reveil.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-lg">

        <div className="mb-6 text-xs tracking-[0.4em] text-red-400/80 animate-pulse">
          RÉSULTAT DU TEST
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-widest mb-8">
          THE BARNARD LOOP
        </h1>

        {/* CHARACTER */}
        <div className="mb-8 border border-white/20 bg-black/30 rounded-xl px-6 py-5 backdrop-blur-sm">

          <div className="text-sm text-white/60 mb-2">
            Vous êtes identifié comme :
          </div>

          <div className="text-3xl font-bold text-white">
            {character}
          </div>

        </div>

        {/* VIRAL MESSAGE */}
        <p className="text-lg italic text-white/80 mb-10">
          "{message}"
        </p>

        {/* SOCIAL HOOK */}
        <p className="text-sm text-white/60 mb-6">
          Quelqu’un d’autre a eu ce résultat ?
        </p>

        {/* SHARE BUTTON */}
        <button
          onClick={handleShare}
          className="inline-block px-8 py-4 border border-white/30 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-300"
        >
          partager mon résultat
        </button>

      </div>
    </main>
  );
}