"use client";

import { useEffect } from "react";

export default function FinalPage() {
  function openAvignon() {
    window.open(
      "https://festivaloffavignon.com/spectacles/the-barnard-loop",
      "_blank"
    );
  }

  function share() {
    const text =
      "The Barnard Loop m’a laissé un truc bizarre en tête… je ne sais pas si j’ai vu un spectacle ou une expérience. À Avignon cet été.";

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

  useEffect(() => {
    const audio = document.getElementById("dream-audio") as HTMLAudioElement;

    if (audio) {
      audio.volume = 0.25;
      audio.play().catch(() => {});
    }
  }, []);

  return (
    <main className="min-h-screen text-white flex items-center justify-center px-6 py-12 relative overflow-hidden">

      {/* MUSIC */}
      <audio id="dream-audio" autoPlay loop>
        <source src="/dream-ambient.mp3" type="audio/mpeg" />
      </audio>

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/faccia.jpg')" }}
      />

      {/* DARK LAYERS */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.25),transparent_60%)]" />

      {/* CONTENT */}
      <div className="max-w-xl text-center relative z-10">

        {/* HEADER (SEULE INFO HAUTE) */}
        <p className="text-xs md:text-sm text-white/70 mb-8 tracking-wide">
          The Barnard Loop • Théâtre de l’Entrepôt • Festival OFF Avignon 2026 • 19h10
        </p>

        {/* TITLE */}
        <h1 className="text-4xl md:text-6xl font-semibold tracking-wide mb-10">
          THE BARNARD LOOP
        </h1>

        {/* SINGLE LINE INFO */}
        <p className="text-white/70 mb-10 text-sm md:text-base">
          expérience limitée • chaque représentation est une surprise
        </p>

        {/* CTA */}
        <button
          onClick={openAvignon}
          className="w-full py-5 rounded-2xl bg-white text-black text-lg font-semibold hover:scale-105 transition mb-3"
        >
          🎟️ réserver ma place
        </button>

        {/* INFO FOOTER */}
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

      </div>
    </main>
  );
}