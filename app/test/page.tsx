const [result] = useState(
  () => characters[Math.floor(Math.random() * characters.length)]
);

// PARTAGE
async function shareResult() {
  const text = `Je suis ${result.name} avec ${percent}% de contamination onirique.\n\nQuel personnage es-tu ?`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Test de contamination onirique",
        text,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(
        `${text}\n${window.location.href}`
      );
      alert("Lien copié !");
    }
  } catch (err) {
    console.error(err);
  }
}

function shareInstagram() {
  const text = `Je suis ${result.name} avec ${percent}% de contamination onirique ✨`;

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(
        "Texte copié ✨\nFais une capture d'écran du résultat puis colle le texte dans ta Story Instagram."
      );
    })
    .catch(() => {
      alert(
        "Fais une capture d'écran du résultat et partage-la dans ta Story Instagram ✨"
      );
    });
}