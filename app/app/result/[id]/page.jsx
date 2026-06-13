"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // on récupère le résultat du test
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
    <main className="relative min-h-screen flex items-center justify-center text-white p-6">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-md">

        <p className="text-xs tracking-[0.4em] text-white/60 mb-10">
          THE BARNARD LOOP
        </p>

        <p className="text-sm text-white/60 mb-2">TU ES</p>

        <h1 className="text-4xl font-bold mb-6">
          {data.character}
        </h1>

        <p className="italic text-white/80 mb-10">
          {data.text}
        </p>

        <p className="text-sm text-white/60 mb-2">
          Quelqu’un d’autre a eu ce résultat ?
        </p>

        <p className="text-sm text-white/50 mb-8">
          @dispensabarzotti
        </p>

        {/* SHARE BUTTON */}
        <button
          onClick={copy}
          className="px-6 py-3 border rounded"
        >
          partager sur WhatsApp / Instagram
        </button>

      </div>
    </main>
  );
}