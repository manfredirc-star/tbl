"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  // 🎯 pourcentage généré une seule fois
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
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      
      <h1 className="text-2xl font-bold mb-8">
        TEST DE CONTAMINATION ONYRIQUE
      </h1>

      {step < questions.length ? (
        <>
          <p className="text-lg mb-8">{questions[step]}</p>

          <div className="flex gap-4">
            <button
              onClick={() => answer("oui")}
              className="px-6 py-3 bg-black text-white rounded"
            >
              Oui
            </button>

            <button
              onClick={() => answer("non")}
              className="px-6 py-3 bg-gray-300 rounded"
            >
              Non
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Question {step + 1} / {questions.length}
          </p>
        </>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Analyse terminée
          </h2>

          <p className="text-gray-600 mb-6">
            CONTAMINATION ONYRIQUE:{" "}
            <span className="font-bold">{percent}%</span>
          </p>

          <button
            onClick={() => router.push("/reves")}
            className="px-6 py-3 bg-black text-white rounded"
          >
            Rentrer dans le monde onirique
          </button>
        </div>
      )}
    </main>
  );
}