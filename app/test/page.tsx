"use client";

import { useState } from "react";

type Character = {
  name: string;
  text: string;
};

export default function TestPage() {
  const questions = [
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
    const next = step + 1;

    if (next >= questions.length) {
      const random =
        characters[Math.floor(Math.random() * characters.length)];
      setResult(random);
    } else {
      setStep(next);
    }
  }

  function restart() {
    setStep(0);
    setResult(null);
  }

  function shareWhatsApp() {
    const text = "J’ai découvert un étrange test… essaie ici : " + window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  function shareInstagram() {
    // Instagram ne permet pas un partage direct comme WhatsApp
    // donc on copie le lien
    navigator.clipboard.writeText(window.location.href);
    alert("Lien copié ! Tu peux le coller sur Instagram.");
  }

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
        textAlign: "center",
        color: "white",
        fontFamily: "sans-serif",
        padding: 20,
      }}
    >
      {/* overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
        }}
      />

      <div style={{ position: "relative", maxWidth: 500 }}>
        {/* QUESTIONS */}
        {!result && (
          <>
            <h1>TEST</h1>

            <p style={{ marginTop: 20, fontSize: 18 }}>
              {questions[step]}
            </p>

            <div style={{ marginTop: 30 }}>
              <button onClick={answer} style={btnStyle}>
                Oui
              </button>

              <button onClick={answer} style={btnStyle}>
                Non
              </button>
            </div>
          </>
        )}

        {/* RESULT */}
        {result && (
          <>
            <h1>TU ES...</h1>
            <h2 style={{ fontSize: 40 }}>{result.name}</h2>

            <p style={{ marginTop: 15, opacity: 0.8 }}>
              {result.text}
            </p>

            {/* SHARE BUTTONS */}
            <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 10 }}>
              
              <button onClick={shareInstagram} style={btnStyle}>
                Partager sur Instagram
              </button>

              <button onClick={shareWhatsApp} style={btnStyle}>
                Partager sur WhatsApp
              </button>

              <button
                onClick={() => (window.location.href = "/final")}
                style={{
                  ...btnStyle,
                  background: "white",
                  color: "black",
                }}
              >
                Découvrir le spectacle
              </button>
            </div>

            <button onClick={restart} style={{ marginTop: 20, opacity: 0.7 }}>
              Recommencer
            </button>
          </>
        )}
      </div>
    </main>
  );
}

const btnStyle = {
  padding: "12px 18px",
  borderRadius: 10,
  border: "1px solid white",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  width: "100%",
};