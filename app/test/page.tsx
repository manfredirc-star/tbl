"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [boot, setBoot] = useState(true);

  const finalPercent = Math.floor(Math.random() * 101);

  const allQuestions = [
    "Les objets rêvent-ils quand personne ne les regarde ?",
    "As-tu déjà entendu un mur respirer ?",
    "Une cafetière peut-elle te juger silencieusement ?",
    "Tu as dormi cette nuit ou tu as juste cligné des yeux dans le futur ?",
    "Le sucre te reconnaît-il quand tu le touches ?",
    "Les rêves ont-ils un GPS ou ils se perdent volontairement ?",
    "Ton oreiller te raconte-t-il des secrets le matin ?",
    "Si tu fermes les yeux, est-ce que quelqu’un prend ta place ?",
    "Les escaliers montent-ils aussi les pensées ?",
    "Est-ce que ton reflet a déjà refusé de te suivre ?",
    "Tu préfères le sucre ou le chaos doux du matin ?",
    "Une chaise pense-t-elle à s’enfuir parfois ?",
    "Les rêves peuvent-ils mentir pour survivre ?",
    "As-tu déjà oublié un rêve pendant qu’il te regardait partir ?",
  ];

  const [questions] = useState(() => {
    return [...allQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
  });

  const characters = [
    {
      name: "BARNARD",
      color: "from-indigo-500 to-purple-700",
      text:
        "Barnard classe les rêves des autres dans des dossiers qu’il oublie immédiatement.",
    },
    {
      name: "LE CLOWN ADMINISTRATIF",
      color: "from-pink-500 to-orange-600",
      text:
        "Il tamponne les émotions avec sérieux et rit quand personne ne regarde.",
    },
    {
      name: "LA SOURIS QUI SAIT TOUT",
      color: "from-gray-400 to-gray-700",
      text: "Elle mange les pensées en trop et refuse de les expliquer.",
    },
    {
      name: "LE LIT QUI GRINCE",
      color: "from-yellow-600 to-amber-800",
      text: "Chaque craquement est une phrase mal comprise.",
    },
    {
      name: "MADAME RÉVEIL",
      color: "from-pink-500 to-red-600",
      text:
        "Elle sonne uniquement dans les mondes qui hésitent trop longtemps.",
    },
  ];

  const [result] = useState(
    () => characters[Math.floor(Math.random() * characters.length)]
  );

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step === questions.length) {
      let current = 0;

      const interval = setInterval(() => {
        current += 2;

        if (current >= finalPercent) {
          current = finalPercent;
          clearInterval(interval);
        }

        setPercent(current);
      }, 25);

      return () => clearInterval(interval);
    }
  }, [step]);

  function answer() {
    setStep((prev) => prev + 1);
  }

  // 📸 STORY INSTAGRAM
  function generateInstagramStory() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#0b0b0f");
    gradient.addColorStop(1, "#3b0a57");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "bold 70px Arial";
    ctx.fillText("TEST ONIRIQUE", canvas.width / 2, 300);

    ctx.font = "bold 90px Arial";
    ctx.fillText(result.name, canvas.width / 2, 800);

    ctx.font = "50px Arial";
    ctx.fillText(`${percent}% de contamination`, canvas.width / 2, 950);

    ctx.globalAlpha = 0.8;
    ctx.font = "30px Arial";
    ctx.fillText("Quel personnage es-tu ?", canvas.width / 2, 1100);

    const link = document.createElement("a");
    link.download = "story-onirique.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  async function shareFriend() {
    const text = `Je suis ${result.name} avec ${percent}% de contamination onirique ✨`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Test onirique",
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Lien copié !");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white overflow-hidden">

      {/* 🖼️ BACKGROUND IMAGE (TON IMAGE) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.jpg')",
        }}
      />

      {/* overlay sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/60" />

      {/* gradient ambiance */}
      <div className={`absolute inset-0 bg-gradient-to-b ${result.color} opacity-20`} />

      {boot && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <p className="animate-pulse text-white/70">
            synchronisation onirique...
          </p>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md">

        <h1 className="text-xl font-bold tracking-widest mb-10">
          TEST DE CONTAMINATION ONYRIQUE
        </h1>

        <div className="h-[1px] w-full bg-white/10 mb-8" />

        {step < questions.length ? (
          <>
            <p className="mb-8 text-lg">{questions[step]}</p>

            <div className="flex gap-4 justify-center">
              <button onClick={answer} className="px-6 py-3 border rounded">
                Oui
              </button>

              <button onClick={answer} className="px-6 py-3 border rounded">
                Non
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6">

            <div className={`p-6 rounded-xl bg-gradient-to-br ${result.color}`}>
              <h2 className="text-xl font-bold mb-3">{result.name}</h2>
              <p className="text-sm opacity-90">{result.text}</p>
            </div>

            <p className="text-white/70">
              CONTAMINATION : <b>{percent}%</b>
            </p>

            <div className="pt-4 border-t border-white/10 space-y-3">

              <button
                onClick={generateInstagramStory}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 font-semibold"
              >
                📸 Story Instagram
              </button>

              <button
                onClick={shareFriend}
                className="w-full py-3 rounded-xl border border-white/30"
              >
                📨 Envoyer à un ami
              </button>

            </div>

            <button
              onClick={() => router.push("/final")}
              className="px-6 py-3 border rounded hover:bg-white hover:text-black transition"
            >
              🎭 Découvrir le spectacle
            </button>

          </div>
        )}
      </div>
    </main>
  );
}