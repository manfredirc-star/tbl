async function shareResult() {
  const text = `Je suis ${result.name} avec ${percent}% de contamination onirique.\n\nQuel personnage es-tu ?`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Test de contamination onirique",
        text,
        url: window.location.href,
      });
    } catch {}
  } else {
    navigator.clipboard.writeText(
      `${text}\n${window.location.href}`
    );
    alert("Lien copié !");
  }
}

function shareInstagram() {
  alert(
    "Fais une capture d'écran de ton résultat et partage-la dans ta Story Instagram ✨"
  );
}