"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const [percent] = useState(() => Math.floor(Math.random() * 101));

  const questions = [
    "Les objets peuvent-ils se souvenir ?",
    "Les plantes vous observent-elles ?",
    "Une cafetière peut-elle mentir ?",
  ];

  function answer(value: string) {
    setAnswers((prev) => [...prev, value]);
    setStep((prev) => prev + 1);
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white overflow-hidden bg-black">

      {/* 🌌 BACKGROUND ONIRIQUE */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950 to-black animate-pulse opacity-80" />

      {/* 🌫 bruit / instabilité */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white,_transparent_70%)] animate-pulse" />

      {/* CONTENU */}
      <div className="relative z-10 w-full max-w-md">

        <h1 className="text-xl tracking-widest font-bold mb-10">
          TEST DE CONTAMINATION ONIRIQUE
        </h1>

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

            <h2 className="text-lg font-semibold">
              Analyse terminée
            </h2>

            <p className="text-white/60">
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

      {/* 🌫 effet global */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-gradient-to-tr from-indigo-500 via-transparent to-purple-500 animate-pulse" />

    </main>
  );
}