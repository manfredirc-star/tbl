"use client";

import { useState } from "react";

type Character = {
  name: string;
  text: string;
};

export default function TestPage() {
  const questions: string[] = [
    "Les objets rêvent-ils quand personne ne les regarde ?",
    "As-tu déjà entendu un mur respirer ?",
    "Une cafetière peut-elle te juger silencieusement ?",
    "Ton reflet te reconnaît-il vraiment ?",
    "Les rêves ont-ils une mémoire ?",
  ];

  const characters: Character[] = [
    { name: "BARNARD", text: "Classe les rêves oubliés." },
    { name: "CLOWN ADMIN", text: "Tamponne les émotions." },
    { name: "SOURIS", text: "Mange les pensées inutiles." },
  ];

  const [step, setStep] = useState(0);
  const [result, setResult] = useState<Character | null>(null);

  function answer() {
    const nextStep = step + 1;

    if (nextStep >= questions.length) {
      const randomCharacter =
        characters[Math.floor(Math.random() * characters.length)];

      setResult(randomCharacter);
    } else {
      setStep(nextStep);
    }
  }

  function restart() {
    setStep(0);
    setResult(null);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 20,
      }}
    >
      {/* RESULT */}
      {result ? (
        <div>
          <h1>TU ES...</h1>
          <h2>{result.name}</h2>
          <p>{result.text}</p>

          <button onClick={restart} style={{ marginTop: 20 }}>
            Recommencer
          </button>
        </div>
      ) : (
        /* QUESTIONS */
        <div>
          <h1>TEST</h1>

          <p style={{ marginTop: 20 }}>
            {questions[step]}
          </p>

          <div style={{ marginTop: 20 }}>
            <button onClick={answer} style={{ marginRight: 10 }}>
              Oui
            </button>

            <button onClick={answer}>
              Non
            </button>
          </div>
        </div>
      )}
    </main>
  );
}