"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const [percent, setPercent] = useState(0);
  const finalPercent = Math.floor(Math.random() * 101);

  const [boot, setBoot] = useState(true);

  const questions = [
    "Les objets peuvent-ils se souvenir ?",
    "Les plantes vous observent-elles ?",
    "Une cafetière peut-elle mentir ?",
  ];

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

  function answer(value: string) {
    setAnswers((prev) => [...prev, value]);
    setStep((prev) => prev + 1);
  }

  // 🎲 PERSONNAGES ONIRIQUES
  const characters = [
    {
      name: "BARNARD",
      color: "from-indigo-500 to-purple-700",
      text:
        "Barnard est une anomalie administrative du rêve. Il classe les pensées des autres pendant qu’il oublie les siennes.",
    },
    {
      name: "L’HOMME PLANTE",
      color: "from-green-500 to-emerald-800",
      text:
        "Il pousse lentement dans les conversations. On raconte qu’il absorbe les silences pour survivre.",
    },
    {
      name: "L’HOMME AMPOULE",
      color: "from-yellow-400 to-orange-600",
      text:
        "Il s’allume quand quelqu’un doute. Son énergie dépend du niveau de confusion ambiant.",
    },
    {
      name: "MADAME RÉVEIL",
      color: "from-pink-500 to-red-600",
      text:
        "Elle sonne uniquement quand personne ne dort. Elle est le souvenir d’un monde qui refuse de commencer.",
    },
  ];

  // 🎲 résultat ALÉATOIRE (change à chaque fin)
  const [result] = useState(
    () => characters[Math.floor(Math.random() * characters.length)]
  );

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white overflow-hidden bg-black">

      {/* 🌌 BACKGROUND GLOBAL FIXE */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${result.color} opacity-30`}
      />

      {/* BOOT */}
      {boot && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <p className="text-white/70 tracking-widest animate-pulse">
            synchronisation onirique...
          </p>
        </div>
      )}

      {/* CONTENU */}
      <div className="relative z-10 w-full max-w-md">

        <h1 className="text-xl tracking-widest font-bold mb-10">
          TEST DE CONTAMINATION ONYRIQUE
        </h1>

        {/* BAR */}
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
                onClick={() => answer("oui")}
                className="px-6 py-3 border border-white/40 rounded hover:bg-white hover:text-black transition"
              >
                Oui
              </button>

              <button
                onClick={() => answer("non")}
                className="px-6 py-3 border border-white/20 text-white/70 rounded hover:bg-white hover:text-black transition"
              >
                Non
              </button>
            </div>

            <p className="mt-6 text-sm text-white/40">
              Question {step + 1} / {questions.length}
            </p>
          </>
        ) : (
          <div className="space-y-6">

            {/* 🌈 ÉCRAN FINAL COLORÉ STABLE */}
            <div
              className={`p-6 rounded-xl bg-gradient-to-br ${result.color} text-white shadow-lg`}
            >
              <h2 className="text-xl font-bold mb-3">
                {result.name}
              </h2>

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
              rentrer dans le monde onirique
            </button>

          </div>
        )}
      </div>
    </main>
  );
}