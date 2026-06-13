"use client";

import { useEffect, useState } from "react";

export default function ResultPage() {
  const [data, setData] = useState(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    try {
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
    } catch (e) {
      setData({
        character: "ERREUR",
        text: "Impossible de charger le résultat.",
      });
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Chargement...
      </div>
    );
  }

  const shareText = `TU ES : ${data.character}

“${data.text}”

👉 Quelqu’un d’autre a eu ce résultat ?

@dispensabarzotti
${url}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert("copié pour Instagram / WhatsApp");
    } catch (e) {
      console.log(e);
    }
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
        await copy();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* OVERLAY SAFE */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-black/80" />

      {/* CONTENT */}
      <div className="relative z-10 text-center max-w-md px-6">

        {/* HEADER */}
        <p className="text-lg mb-2">
          TU ES{" "}
          <span className="font-bold">
            {data.character}
          </span>
        </p>

        {/* TEXT BOX SAFE */}
        <div className="mb-10 border border-white/10 bg-white/5 backdrop-blur-md rounded-xl p-4">
          <p className="italic text-white/80">
            {data.text}
          </p>
        </div>

        {/* VIRAL HOOK */}
        <p className="text-sm text-white/60 mb-1">
          Quelqu’un d’autre a eu ce résultat ?
        </p>

        <p className="text-sm text-white/40 mb-10">
          @dispensabarzotti
        </p>

        {/* BUTTONS */}
        <div className="space-y-3">

          <button
            onClick={shareNative}
            className="w-full px-6 py-3 border border-white/30 rounded-xl"
          >
            partager
          </button>

          <button
            onClick={copy}
            className="w-full px-6 py-3 border border-white/20 rounded-xl"
          >
            copier le texte
          </button>

          <button
            onClick={() => (window.location.href = "/final")}
            className="w-full px-6 py-4 bg-white text-black rounded-xl font-semibold"
          >
            découvrir le spectacle
          </button>

        </div>

      </div>
    </main>
  );
}
