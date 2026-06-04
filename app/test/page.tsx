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

  // 🧠 IA GRATUITE (LOCALE + MÉTAPHORIQUE)
  function interpret(answers: string[]) {
    const yes = answers.filter((a) => a === "oui").length;

    const messages = [
      {
        title: "SILENCE DES OBJETS",
        text: "Les objets ont répondu mais ont oublié de te le dire.",
      },
      {
        title: "CAFETIÈRE SUSPECTE",
        text: "Un appareil domestique a été surpris en train de rêver de toi.",
      },
      {
        title: "CONTAMINATION LÉGÈRE",
        text: "Les plantes te regardent mais font semblant de ne pas comprendre.",
      },
      {
        title: "RÉALITÉ INSTABLE",
        text: "Tu es devenu une variable dans un système qui s’ennuie.",
      },
      {
        title: "BARNARD LOOP ACTIF",
        text: "Le monde te reconnaît comme une erreur intéressante.",
      },
    ];

    if (yes === 0) return messages[0];
    if (yes === 1) return messages[1];
    if (yes === 2) return messages[2];
    return messages[4];
  }

  const result = interpret(answers);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white overflow-hidden bg-black">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black animate-pulse opacity-80" />

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)] animate-pulse" />

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

            <h2 className="text-lg font-semibold animate-pulse">
              {result.title}
            </h2>

            <p className="text-white/70">
              {result.text}
            </p>

            <p className="text-white/60 mt-4">
              CONTAMINATION ONYRIQUE :
              <span className="font-bold text-white ml-2">
                {percent}%
              </span>
            </p>

            <div className="h-[1px] w-full bg-white/10 overflow-hidden">
              <div className="h-full bg-white/70 animate-pulse w-full" />
            </div>

            <button
              onClick={() => router.push("/reves")}
              className="px-6 py-3 border border-white/40 rounded hover:bg-white hover:text-black transition"
            >
              rentrer dans le monde onirique
            </button>

          </div>
        )}

      </div>

      <div className="absolute inset-0 pointer-events-none opacity-10 bg-gradient-to-tr from-indigo-500 via-transparent to-purple-500 animate-pulse" />

    </main>
  );
}