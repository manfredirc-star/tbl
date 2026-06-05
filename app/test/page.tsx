"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TestPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [boot, setBoot] = useState(true);

  const [percent, setPercent] = useState(0);
  const finalPercent = Math.floor(Math.random() * 101);

  // 🌙 QUESTIONS (IA MIX)
  const allQuestions = [
    "Les objets que tu touches se souviennent-ils de toi ?",
    "As-tu déjà rêvé sans t’en rendre compte ?",
    "Le sucre t’appartient-il ou t’utilise-t-il ?",
    "Une cafetière peut-elle falsifier un souvenir ?",
    "Tu as dormi cette nuit ou tu as été remplacé brièvement ?",
    "Est-ce que tes pensées ont une odeur ?",
    "Quand tu fermes les yeux, qui continue de regarder ?",
    "As-tu déjà oublié quelque chose qui insistait pour exister ?",
    "Les murs de ta chambre changent-ils quand tu mens ?",
    "Est-ce que ton prénom te reconnaît encore ?"
  ];

  const [questions] = useState(() =>
    [...allQuestions]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5)
  );

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 1200);
    return () => clearTimeout(t);
  }, []);

  function answer(value: string) {
    setAnswers((prev) => [...prev, value]);
    setStep((prev) => prev + 1);
  }

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
      }, 20);
    }
  }, [step]);

  // 🧠 IA HALLUCINATION ENGINE
  function generateNarrative() {
    const hasYes = answers.filter(a => a === "oui").length;
    const hasNo = answers.filter(a => a === "non").length;

    const fragments = [
      "l’IA hésite à te reconnaître comme humain stable",
      "un clown administratif a validé ton existence partielle",
      "la souris confirme avoir déjà vu ton rêve en double exemplaire",
      "le lit qui grince affirme que tu n’as jamais vraiment quitté la chambre",
      "Barnard te range dans un dossier intitulé : ‘peut-être réel’",
      "une version de toi continue le test sans toi",
      "tu es probablement encore en train de répondre ailleurs",
      "tes réponses ont modifié la texture du monde"
    ];

    const selected = fragments
      .sort(() => Math.random() - 0.5)
      .slice(0, 4 + hasYes);

    return selected.join(". ");
  }

  function generateEntity() {
    const base = [
      "BARNARD",
      "LE CLOWN ADMINISTRATIF",
      "LA SOURIS QUI SAIT TOUT",
      "LE LIT QUI GRINCE",
      "MADAME RÉVEIL"
    ];

    // fusion hallucination
    const fusion = [
      "BARNARD + CLOWN = responsable des rêves perdus",
      "SOURIS + LIT = gardienne des micro-réveils",
      "RÉVEIL + BARNARD = erreur système consciente"
    ];

    return Math.random() > 0.5
      ? base[Math.floor(Math.random() * base.length)]
      : fusion[Math.floor(Math.random() * fusion.length)];
  }

  const entity = generateEntity();

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center text-white bg-black overflow-hidden">

      {/* BACKGROUND INSTABLE */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-black to-purple-900 opacity-40 animate-pulse" />

      {/* BOOT */}
      {boot && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <p className="text-white/60 tracking-widest animate-pulse">
            recalibration de ta réalité...
          </p>
        </div>
      )}

      <div className="relative z-10 max-w-md w-full">

        <h1 className="text-lg tracking-widest mb-8">
          IA HALLUCINATION TEST
        </h1>

        {/* QUESTIONS */}
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
          </>
        ) : (
          <div className="space-y-6">

            {/* 🧠 RESULTAT HALLUCINÉ */}
            <div className="p-6 rounded-xl bg-white/10 border border-white/20">
              <h2 className="text-xl font-bold mb-3">
                ENTITÉ DÉTECTÉE : {entity}
              </h2>

              <p className="text-sm leading-relaxed text-white/80">
                {generateNarrative()}
              </p>
            </div>

            {/* CONTAMINATION */}
            <p className="text-white/60">
              niveau de réalité instable :
              <span className="ml-2 text-white font-bold">
                {percent}%
              </span>
            </p>

            {/* CTA */}
            <button
              onClick={() => router.push("/reves")}
              className="px-6 py-3 border border-white/40 rounded hover:bg-white hover:text-black transition"
            >
              entrer dans la couche suivante du rêve
            </button>

          </div>
        )}
      </div>
    </main>
  );
}