"use client";

import { useState, useEffect } from "react";

export default function TestPage() {
  const questions = [
    "Les objets rêvent-ils quand personne ne les regarde ?",
    "As-tu déjà entendu un mur respirer ?",
    "Une cafetière peut-elle te juger silencieusement ?",
    "Ton reflet te reconnaît-il vraiment ?",
    "Les rêves ont-ils une mémoire ?",
  ];

  const characters = [
    { name: "BARNARD", text: "Classe les rêves oubliés." },
    { name: "CLOWN ADMIN", text: "Tamponne les émotions." },
    { name: "SOURIS", text: "Mange les pensées inutiles." },
  ];

  const [step, setStep] = useState(0);
  const [result, setResult] = useState(null);
  const [mounted, setMounted] = useState(false);

  // 🔥 FIX HYDRATION (IMPORTANT)
  useEffect(() => {
    setMounted(true);
  }, []);

  function answer() {
    const next = step + 1;

    if (next >= questions.length) {
      const r =
        characters[Math.floor(Math.random() * characters.length)];
      setResult(r);
    } else {
      setStep(next);
    }
  }

  // ⛔ évite rendu serveur mismatch
  if (!mounted) return null;

  // =========================
  // RESULT PAGE
  // =========================
  if (result) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          padding: 20,
          position: "relative",
        }}
      >
        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
          }}
        />

        {/* content */}
        <div style={{ position: "relative", maxWidth: 420 }}>

          <h1 style={{ fontSize: 22, opacity: 0.8 }}>
            TU ES...
          </h1>

          <h2 style={{ fontSize: 42, marginTop: 10 }}>
            {result.name}
          </h2>

          <div
            style={{
              marginTop: 20,
              padding: 15,
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            {result.text}
          </div>

          <p style={{ marginTop: 20, fontSize: 14, opacity: 0.7 }}>
            Quelqu’un d’autre a eu ce résultat ?
          </p>

          <p style={{ fontSize: 12, opacity: 0.5 }}>
            @dispensabarzotti
          </p>

          <button
            onClick={() => (window.location.href = "/final")}
            style={{
              marginTop: 25,
              padding: "12px 18px",
              borderRadius: 10,
              border: "1px solid white",
              background: "transparent",
              color: "white",
              cursor: "pointer",
            }}
          >
            découvrir le spectacle
          </button>
        </div>
      </main>
    );
  }

  // =========================
  // QUESTIONS PAGE
  // =========================
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
    </main>
  );
}