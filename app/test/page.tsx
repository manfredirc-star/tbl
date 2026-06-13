"use client";

import { useState } from "react";

type Character = {
  name: string;
  text: string;
};

const questions = [
  { text: "Si ton rêve avait une odeur, laquelle serait-ce ?", tag: "absurde" },
  { text: "As-tu déjà vu un objet bouger quand tu fermes les yeux ?", tag: "objets" },
  { text: "Les rêves te reconnaissent-ils quand tu reviens ?", tag: "identité" },
  { text: "As-tu déjà perdu un souvenir en dormant ?", tag: "mémoire" },
  { text: "Les miroirs dorment-ils aussi ?", tag: "identité" },
  { text: "Un rêve peut-il te mentir ?", tag: "peur" },
  { text: "As-tu déjà entendu ton prénom dans un rêve ?", tag: "identité" },
  { text: "Les objets dans tes rêves te regardent-ils ?", tag: "objets" },
  { text: "Te réveilles-tu parfois dans un autre rêve ?", tag: "absurde" },
  { text: "Les rêves ont-ils une voix ?", tag: "mémoire" },
  // → on en met 50 au total (je peux te les compléter après si tu veux)
];

const characters: Record<string, Character> = {
  clown: {
    name: "LE CLOWN ASSASSIN",
    text:
      "Il rit quand tu dors.\nIl coupe les rêves en morceaux pour les recoller à l’envers.\nOn dit qu’il a déjà assassiné une insomnie.\nEt qu’il pleure des confettis noirs.",
  },

  barnard: {
    name: "BARNARD",
    text:
      "Il classe les souvenirs qui n’ont jamais existé.\nIl archive les rêves refusés par la réalité.\nOn le voit parfois ranger le silence dans des boîtes.\nPersonne ne sait s’il est humain ou erreur administrative.",
  },

  reveil: {
    name: "MADAME RÉVEIL",
    text:
      "Elle arrive toujours trop tôt ou trop tard.\nElle sent le café froid et les réalités ratées.\nElle réveille les rêves pour les gronder doucement.\nPuis elle disparaît dans une lumière qui sonne faux.",
  },

  ciuffino: {
    name: "CIUFFINO – LA PLANTE MAGICIENNE",
    text:
      "Il pousse dans les rêves abandonnés.\nIl murmure des souvenirs aux racines des pensées.\nSes feuilles changent de langue chaque nuit.\nOn dit qu’il fait pousser des souvenirs comestibles.",
  },

  ampoule: {
    name: "L’HOMME AMPOULE",
    text:
      "Son corps s’allume quand tu mens en dormant.\nIl éclaire les secrets que tu refuses de voir.\nIl chauffe les cauchemars pour les rendre supportables.\nMais parfois… il grille sans prévenir.",
  },

  souris: {
    name: "LA SOURIS QUI SAIT TOUT",
    text:
      "Elle vit dans les coins invisibles de tes rêves.\nElle a déjà lu toutes tes pensées avant que tu les penses.\nElle grignote les vérités trop lourdes.\nEt les remplace par des rumeurs plus douces.",
  },

  tiroir: {
    name: "LE TIROIR SANS FIN",
    text:
      "On l’ouvre et il continue ailleurs.\nIl contient tout ce que tu as oublié de rêver.\nOn y trouve des clés qui n’ouvrent rien.\nEt des souvenirs qui ne t’ont jamais appartenu.",
  },

  default: {
    name: "ENTITÉ FLOTTANTE",
    text:
      "Tu appartiens à un rêve qui ne sait pas encore qu’il existe.\nTu navigues entre les erreurs de mémoire.\nQuelque chose te dessine pendant que tu dors.\nMais il ne finit jamais son dessin.",
  },
};

export default function TestPage() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Character | null>(null);

  function answer() {
    const tag = questions[step].tag;

    setScore((prev) => ({
      ...prev,
      [tag]: (prev[tag] || 0) + 1,
    }));

    const next = step + 1;

    if (next >= questions.length) {
      generateResult();
    } else {
      setStep(next);
    }
  }

  function generateResult() {
    const dominant =
      Object.entries(score).sort((a, b) => b[1] - a[1])[0]?.[0];

    let character = characters.default;

    if (dominant === "peur") character = characters.clown;
    if (dominant === "mémoire") character = characters.barnard;
    if (dominant === "identité") character = characters.reveil;
    if (dominant === "objets") character = characters.ciuffino;
    if (dominant === "absurde") character = characters.tiroir;

    setResult(character);
  }

  function restart() {
    setStep(0);
    setScore({});
    setResult(null);
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

            <p style={styles.text}>{currentQuestion.text}</p>

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
            <h1 style={styles.sub}>PROFIL ÉTABLI</h1>

            <h2 style={styles.resultTitle}>{result.name}</h2>

            <p style={styles.text}>{result.text}</p>

            <button onClick={restart} style={styles.btn}>
              Recommencer
            </button>
          </>
        )}
      </div>
    </main>
  );
}

/* styles identiques à ta version précédente */
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

  container: { position: "relative", maxWidth: 520 },

  title: { opacity: 0.7, marginBottom: 20 },

  sub: { opacity: 0.6 },

  text: { fontSize: 18, marginTop: 20 },

  resultTitle: { fontSize: 32, marginTop: 10 },

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
};