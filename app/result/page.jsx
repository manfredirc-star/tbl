"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("");

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

    setUrl(window.location.href);
  }, []);

  if (!data) return null;

  // 🔥 TEXTE VIRAL (Instagram / WhatsApp)
  const shareText = `TU ES : ${data.character}

“${data.text}”

👉 Quelqu’un d’autre a eu ce résultat ?

@dispensabarzotti
${url}`;

  const copy = async () => {
    await navigator.clipboard.writeText(shareText);
    alert("copié pour Instagram / WhatsApp");
  };

  const shareNative = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "The Barnard Loop",
          text: shareText,
          url,
        });
      } else {
        copy();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.85)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-black/80" />

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-md px-6">

        <p className="text-[10px] tracking-[0.5em] text-white/50 mb-10">
          THE BARNARD LOOP
        </p>

        <p className="text-sm text-white/50 mb-2">
          TU ES
        </p>

        <h1 className="text-5xl font-bold tracking-[0.2em] mb-6">
          {data.character}
        </h1>

        <p className="italic text-white/80 mb-10 leading-relaxed">
          {data.text}
        </p>

        {/* VIRAL HOOK */}
        <p className="text-sm text-white/60 mb-2">
          Quelqu’un d’autre a eu ce résultat ?
        </p>

        <p className="text-sm text-white/40 mb-10">
          @dispensabarzotti
        </p>

        {/* ACTIONS */}
        <div className="space-y-3">

          <button
            onClick={shareNative}
            className="w-full px-6 py-3 border border-white/30 rounded-xl hover:bg-white hover:text-black transition"
          >
            partager (WhatsApp / Instagram)
          </button>

          <button
            onClick={async () => {
              await copy();
              window.location.href = "/final";
            }}
            className="w-full px-6 py-3 border border-white/20 rounded-xl text-white/70 hover:text-white transition"
          >
            copier le texte
          </button>

        </div>

        <p className="text-[10px] text-white/30 mt-8 tracking-wide">
          d’autres identités apparaissent dans la boucle...
        </p>

      </div>
    </main>
  );
}