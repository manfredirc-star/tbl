"use client";

import { useMemo, useState } from "react";

type Character = {
  name: string;
  text: string;
};

type Question = {
  text: string;
};

/* 🌙 QUESTIONS */
const allQuestions: Question[] = [
  { text: "Si ton rêve avait une odeur, laquelle serait-ce ?" },
  { text: "As-tu déjà vu un objet bouger quand tu fermes les yeux ?" },
  { text: "Les rêves te reconnaissent-ils quand tu reviens ?" },
  { text: "As-tu déjà perdu un souvenir en dormant ?" },
  { text: "Les miroirs dorment-ils aussi ?" },
  { text: "Un rêve peut-il te mentir ?" },
  { text: "As-tu déjà entendu ton prénom dans un rêve ?" },
  { text: "Les objets dans tes rêves te regardent-ils ?" },
  { text: "Te réveilles-tu parfois dans un autre rêve ?" },
  { text: "Les rêves ont-ils une voix ?" },
  { text: "Les murs respirent-ils quand tu dors ?" },
  { text: "Un souvenir peut-il changer de forme ?" },
  { text: "Les objets se souviennent-ils de toi ?" },
  { text: "Ton reflet t’a-t-il déjà menti ?" },
  { text: "As-tu déjà rêvé d’un endroit impossible ?" },
];

/* 🌙 PROFILS */
const characters: Character[] = [
  {
    name: "LE CLOWN ASSASSIN",
    text:
      "Il rit dans les cauchemars comme dans une fête sans sortie.\nIl découpe les peurs pour les rendre dansables.\nOn dit qu’il maquille les insomnies pour les rendre belles.\nMais son rire n’appartient à personne.",
  },
  {
    name: "BARNARD",
    text:
      "Il archive les rêves que la réalité refuse de signer.\nChaque souvenir est classé dans une erreur douce.\nIl parle aux souvenirs comme à des employés fatigués.\nEt parfois, ils lui répondent.",
  },
  {
    name: "MADAME RÉVEIL",
    text:
      "Elle sonne dans des mondes qui ne sont pas encore prêts.\nElle corrige les rêves comme des fautes de vie.\nElle sent la lumière froide et les fins ratées.\nPuis elle disparaît avant la compréhension.",
  },
  {
    name: "CIUFFINO – LA PLANTE MAGICIENNE",
    text:
      "Il pousse dans les rêves abandonnés.\nSes racines traduisent les pensées oubliées.\nIl fait pousser des souvenirs comestibles.\nEt parfois il te rêve en retour.",
  },
  {
    name: "L’HOMME AMPOULE",
    text:
      "Il s’allume quand tes pensées deviennent trop vraies.\nIl éclaire les secrets que tu caches même dans le noir.\nSon corps chauffe les rêves jusqu’à les fissurer.\nMais il consomme ton silence pour survivre.",
  },
  {
    name: "LA SOURIS QUI SAIT TOUT",
    text:
      "Elle vit entre les erreurs de ton esprit.\nElle connaît les réponses avant les questions.\nElle grignote les vérités pour les rendre supportables.\nEt te laisse croire que tu as choisi.",
  },
  {
    name: "LE TIROIR SANS FIN",
    text:
      "On l’ouvre et il ouvre ailleurs.\nIl contient les rêves que tu n’as jamais osé finir.\nChaque objet y est légèrement faux.\nEt pourtant parfaitement vrai.",
  },
];

export default function TestPage() {
  const questions = useMemo(() => {
    return [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
  }, []);

  const [step, setStep] = useState(0);
  const [result, setResult] = useState<Character | null>(null);

  function playSound() {
    try {
      const ctx = new AudioContext();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = 520;
      gain.gain.value = 0.04;

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {}
  }

  function answer() {
    playSound();

    const next = step + 1;

    if (next >= questions.length) {
      generateResult();
    } else {
      setStep(next);
    }
  }

  function generateResult() {
    const randomCharacter =
      characters[Math.floor(Math.random() * characters.length)];

    setResult(randomCharacter);
  }

  function shareWhatsApp() {
    const text =
      "Je viens d’être analysé par une étrange machine à rêves… essaie ici : " +
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
      <div style={styles.overlay} />
      <div style={styles.scanlines} />

      <div style={styles.container}>
        {!result ? (
          <>
            <h1 style={styles.title}>ANALYSE ONYRIQUE</h1>

            <p style={styles.text}>
              {currentQuestion.text}
            </p>

            <div style={styles.btnRow}>
              <button onClick={answer} style={styles.btn}>
                Oui
              </button>

              <button onClick={answer} style={styles.btn}>
                Non
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 style={styles.sub}>
              PROFIL ÉTABLI
            </h1>

            <h2 style={styles.resultTitle}>
              {result.name}
            </h2>

            <p
              style={{
                ...styles.text,
                whiteSpace: "pre-line",
              }}
            >
              {result.text}
            </p>

            <div style={styles.share}>
              <button
                onClick={shareInstagram}
                style={styles.btn}
              >
                Partager sur Instagram
              </button>

              <button
                onClick={shareWhatsApp}
                style={styles.btn}
              >
                Partager sur WhatsApp
              </button>

              <button
                onClick={() =>
                  (window.location.href = "/final")
                }
                style={{
                  ...styles.btn,
                  background: "white",
                  color: "black",
                }}
              >
                Découvrir le spectacle
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

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
    opacity: 0.7,
    marginBottom: 20,
  },

  sub: {
    opacity: 0.6,
  },

  text: {
    fontSize: 18,
    marginTop: 20,
  },

  resultTitle: {
    fontSize: 32,
    marginTop: 10,
  },

  btnRow: {
    marginTop: 30,
    display: "flex",
    gap: 10,
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
};