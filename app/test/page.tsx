"use client";

import { useState, useEffect } from "react";

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

  const [step, setStep] = useState<number>(0);
  const [result, setResult] = useState<Character | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function answer() {
    const next = step + 1;

    if (next >= questions.length) {
      const random =
        characters[Math.floor(Math.random() * characters.length)];
      setResult(random);
    } else {
      setStep(next);
    }
  }

  if (!mounted) return null;

  if (result) {
    return (
      <main style={{ color: "white", textAlign: "center" }}>
        <h1>TU ES...</h1>
        <h2>{result.name}</h2>
        <p>{result.text}</p>

        <button onClick={() => window.location.reload()}>
          Recommencer
        </button>
      </main>
    );
  }

  return (
    <main style={{ color: "white", textAlign: "center" }}>
      <h1>TEST</h1>
      <p>{questions[step]}</p>

      <button onClick={answer}>Oui</button>
      <button onClick={answer}>Non</button>
    </main>
  );
}