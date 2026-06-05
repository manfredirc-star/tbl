"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  const [percent, setPercent] = useState(0);
  const finalPercent = Math.floor(Math.random() * 101);

  const [boot, setBoot] = useState(true);

  // 🎲 QUESTIONS (POOL + RANDOM PICK 5)
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
    "As-tu déjà oublié un rêve pendant qu’il te regardait partir ?"
  ];

  // shuffle + pick 5
  const [questions] = useState(() => {
    return [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
  });

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
    }
  }, [step]);

  function answer() {
    setStep((prev) => prev + 1);
  }

  // 🎭 PERSONNAGES (EXPANDUS + PLUS DRÔLES)
  const characters = [
    {
      name: "BARNARD",
      color: "from-indigo-500 to-purple-700",
      text:
        "Barnard classe les rêves des autres dans des dossiers qu’il oublie immédiatement. Il est très organisé émotionnellement mais complètement perdu dans le réel.",
    },
    {
      name: "LE CLOWN ADMINISTRATIF",
      color: "from-pink-500 to-orange-600",
      text:
        "Il tamponne les émotions avec sérieux. Il rit uniquement quand personne ne regarde. Il pense être un formulaire officiel du rêve.",
    },
    {
      name: "LA SOURIS QUI SAIT TOUT",
      color: "from-gray-400 to-gray-700",
      text:
        "Elle connaît tous les rêves mais refuse de les répéter correctement. Elle vit sous les idées des gens et mange les pensées en trop.",
    },
    {
      name: "LE LIT QUI GRINCE",
      color: "from-yellow-600 to-amber-800",
      text:
        "Il parle la nuit en craquant. Chaque bruit est une phrase qu’on ne comprend qu’en dormant mal.",
    },
    {
      name: "MADAME RÉVEIL",
      color: "from-pink-500 to-red-600",
      text:
        "Elle sonne uniquement dans les mondes qui hésitent trop longtemps. Elle est fatiguée de réveiller des gens qui ne partent jamais.",
    }
  ];

  const [result] = useState(
    () => characters[Math.floor(Math.random() * characters.length)]
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white overflow-hidden bg-black">

      {/* BACKGROUND */}
      <div className={`absolute inset-0 bg-gradient-to-b ${result.color} opacity-30`} />

      {/* BOOT */}
      {boot && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <p className="text-white/70 tracking-widest animate-pulse">
            synchronisation onirique...
          </p>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md">

        <h1 className="text-xl tracking-widest font-bold mb-10">
          TEST DE CONTAMINATION ONYRIQUE
        </h1>

        {/* PROGRESS BAR */}
        <div className="h-[1px] w-full bg-white/10 mb-8 overflow-hidden">
          <div className="h-full bg-white/60 animate-pulse w-1/2" />
        </div>

        {step < questions.length ? (
          <>
            <p className="text-lg mb-8 text-white/90">
              {questions[step]}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={answer}
                className="px-6 py-3 border border-white/40 rounded hover:bg-white hover:text-black transition"
              >
                Oui
              </button>

              <button
                onClick={answer}
                className="px-6 py-3 border border-white/20 text-white/70 rounded hover:bg-white hover:text-black transition"
              >
                Non
              </button>
            </div>
          </>
        ) : (
          <div className="space-y-6">

            <div className={`p-6 rounded-xl bg-gradient-to-br ${result.color} text-white shadow-lg`}>
              <h2 className="text-xl font-bold mb-3">{result.name}</h2>
              <p className="text-sm leading-relaxed opacity-90">
                {result.text}
              </p>
            </div>

            <p className="text-white/60 mt-4">
              CONTAMINATION ONYRIQUE :
              <span className="font-bold text-white ml-2">
                {percent}%
              </span>
            </p>

            <button
              onClick={() => router.push("/reves")}
              className="px-6 py-3 border border-white/40 rounded hover:bg-white hover:text-black transition"
            >
              entrer dans le monde onirique
            </button>

          </div>
        )}
      </div>
    </main>
  );
}