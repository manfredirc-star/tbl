"use client";

import { useEffect, useState } from "react";

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
    { name: "ARCHIVISTE DES CHOSES INVISIBLES", text: "Tu collectes le silence des objets." },
    { name: "SURVEILLANT DES FAIBLES FRÉQUENCES", text: "Tu entends ce que le monde oublie d’émettre." },
    { name: "JUGE DES PENSÉES DOMESTIQUES", text: "Même les objets te semblent vivants." },
    { name: "MÉMOIRE FLOTTANTE", text: "Tu dérives entre souvenirs et fiction." },
    { name: "CORPS DE RÊVE", text: "Tu n’habites pas le réel, seulement ses reflets." },
  ];

  const [step, setStep] = useState(0);
  const [result, setResult] = useState<Character | null>(null);
  const [displayText, setDisplayText] = useState("");
  const [animating, setAnimating] = useState(false);

  // 🔊 petit son "machine"
  function playBeep() {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = 600;

      gain.gain.value = 0.03;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {}
  }

  // 🎬 glitch typing effect
  function typeText(text: string, callback?: () => void) {
    setDisplayText("");
    setAnimating(true);

    let i = 0;

    const interval = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;

      playBeep();

      if (i > text.length) {
        clearInterval(interval);
        setAnimating(false);
        callback?.();
      }
    }, 25);
  }

  function answer() {
    const next = step + 1;

    if (next >= questions.length) {
      const random =
        characters[Math.floor(Math.random() * characters.length)];

      // transition finale
      typeText("ANALYSE TERMINÉE...", () => {
        setTimeout(() => setResult(random), 600);
      });
    } else {
      typeText("LECTURE...", () => {
        setStep(next);
      });
    }
  }

  function restart() {
    setStep(0);
    setResult(null);
    setDisplayText("");
  }

  function shareWhatsApp() {
    const text =
      "J’ai été analysé par une machine étrange… essaie ici : " +
      window.location.href;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }

  function shareInstagram() {
    navigator.clipboard.writeText(window.location.href);
    alert("Lien copié. Colle-le dans Instagram.");
  }

  const currentQuestion = questions[step];

  return (
    <main style={styles.main}>
      {/* overlay ciné */}
      <div style={styles.overlay} />

      {/* scanlines effet écran */}
      <div style={styles.scanlines} />

      <div style={styles.container}>
        {/* INTRO / QUESTIONS */}
        {!result && (
          <>
            <h1 style={styles.title}>ANALYSE PSYCHIQUE</h1>

            <p style={styles.text}>
              {displayText || currentQuestion}
            </p>

            <div style={styles.btnRow}>
              <button onClick={answer} style={styles.btn}>
                Oui
              </button>
              <button onClick={answer} style={styles.btn}>
                Non
              </button>
            </div>

            <p style={styles.progress}>
              {step + 1} / {questions.length}
            </p>
          </>
        )}

        {/* RESULT */}
        {result && (
          <>
            <h1 style={styles.sub}>PROFIL ÉTABLI</h1>

            <h2 style={styles.resultTitle}>{result.name}</h2>

            <p style={styles.text}>{result.text}</p>

            <div style={styles.share}>
              <button onClick={shareInstagram} style={styles.btn}>
                Instagram
              </button>

              <button onClick={shareWhatsApp} style={styles.btn}>
                WhatsApp
              </button>

              <button
                onClick={() => (window.location.href = "/final")}
                style={{ ...styles.btn, background: "white", color: "black" }}
              >
                Découvrir le spectacle
              </button>
            </div>

            <button onClick={restart} style={styles.restart}>
              Recommencer
            </button>
          </>
        )}
      </div>
    </main>
  );
}

/* 🎨 STYLES CINÉMATIQUES */
const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "sans-serif",
    textAlign: "center",
    padding: 20,
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
  },

  scanlines: {
    position: "absolute",
    inset: 0,
    background:
      "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(0,0,0,0.03) 2px)",
    pointerEvents: "none",
  },

  container: {
    position: "relative",
    maxWidth: 520,
  },

  title: {
    letterSpacing: 2,
    opacity: 0.7,
    marginBottom: 20,
  },

  sub: {
    opacity: 0.6,
  },

  text: {
    fontSize: 18,
    marginTop: 20,
    minHeight: 60,
  },

  resultTitle: {
    fontSize: 32,
    marginTop: 10,
  },

  btnRow: {
    marginTop: 30,
    display: "flex",
    gap: 10,
    justifyContent: "center",
  },

  btn: {
    padding: "12px 18px",
    borderRadius: 10,
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    flex: 1,
  },

  share: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  restart: {
    marginTop: 20,
    opacity: 0.6,
    background: "transparent",
    border: "none",
    color: "white",
  },

  progress: {
    marginTop: 15,
    fontSize: 12,
    opacity: 0.5,
  },
};