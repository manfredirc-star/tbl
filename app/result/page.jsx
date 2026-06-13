"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const result = localStorage.getItem("barnard_result");

    if (result) {
      setData(JSON.parse(result));
    } else {
      setData({
        character: "ENTITÉ INCONNUE",
        text: "La boucle n’a pas terminé son observation.",
      });
    }
  }, []);

  if (!data) return null;

  const shareText = `TU ES : ${data.character}

“${data.text}”

Quelqu’un d’autre a eu ce résultat ?

@dispensabarzotti
https://tbl-mu.vercel.app/result`;

  const copy = async () => {
    await navigator.clipboard.writeText(shareText);
    alert("copié pour Instagram / WhatsApp");
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* 🌌 BACKGROUND IMAGE (SPECTACLE) */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* 🌫 DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* 🎬 VIGNETTE CINÉMA (IMPORTANT POUR VIRALITÉ) */}
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />

      {/* ✨ LIGHT GRADIENT MYSTÉRIEUX */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-black/80" />

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-md px-6">

        {/* SMALL TITLE */}
        <p className="text-[10px] tracking-[0.5em] text-white/50 mb-10">
          THE BARNARD LOOP
        </p>

        {/* MAIN LABEL */}
        <p className="text-sm text-white/50 mb-2">
          TU ES
        </p>

        {/* CHARACTER */}
        <h1 className="text-5xl font-bold tracking-[0.2em] mb-6">
          {data.character}
        </h1>

        {/* DESCRIPTION */}
        <p className="italic text-white/80 mb-10 leading-relaxed">
          {data.text}
        </p>

        {/* VIRAL QUESTION */}
        <p className="text-sm text-white/60 mb-2">
          Quelqu’un d’autre a eu ce résultat ?
        </p>

        {/* INSTAGRAM SIGNATURE */}
        <p className="text-sm text-white/40 mb-10">
          @dispensabarzotti
        </p>

        {/* CTA SHARE */}
        <button
          onClick={copy}
          className="w-full px-6 py-3 border border-white/30 rounded-xl hover:bg-white hover:text-black transition"
        >
          partager le résultat
        </button>

        {/* SUBTLE FOOTER (VIRALITY BOOST) */}
        <p className="text-[10px] text-white/30 mt-8 tracking-wide">
          d’autres identités apparaissent dans la boucle...
        </p>

      </div>
    </main>
  );
}
