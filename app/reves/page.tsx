"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Dream = {
  id: string;
  text: string;
  created_at: string;
};

export default function Reves() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 🌙 charger rêves
  async function loadDreams() {
    const { data } = await supabase
      .from("dreams")
      .select("*")
      .order("created_at", { ascending: false });

    setDreams(data || []);
  }

  useEffect(() => {
    loadDreams();

    // ⚡ realtime
    const channel = supabase
      .channel("dreams-live")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "dreams",
        },
        (payload) => {
          setDreams((prev) => [
            payload.new as Dream,
            ...prev,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✨ partager rêve
  async function addDream() {
    if (!input.trim()) return;

    const text = input;
    setInput("");

    const temp: Dream = {
      id: crypto.randomUUID(),
      text,
      created_at: new Date().toISOString(),
    };

    // apparition immédiate
    setDreams((prev) => [temp, ...prev]);

    setLoading(true);

    const { error } = await supabase.from("dreams").insert([
      { text },
    ]);

    setLoading(false);

    if (error) {
      setDreams((prev) => prev.filter((d) => d.id !== temp.id));
    }
  }

  return (
    <main className="h-screen flex flex-col relative overflow-hidden bg-black text-white">

      {/* 🌫 FOND ONIRIQUE ANIMÉ */}
      <div className="absolute inset-0 opacity-30 animate-pulse bg-gradient-to-b from-indigo-900 via-black to-purple-900" />

      {/* ✨ PARTICULES RÊVE (simple illusion) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-ping top-1/4 left-1/3" />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-10 animate-ping top-2/3 left-2/3" />
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-10 animate-ping top-1/2 left-1/4" />
      </div>

      {/* TITRE */}
      <header className="relative z-10 p-3 text-center border-b border-white/10">
        <h1 className="text-xl tracking-widest font-light">
          RÊVES COLLECTIFS
        </h1>
      </header>

      {/* LISTE RÊVES */}
      <section className="relative z-10 flex-1 overflow-y-auto px-3 py-3">
        <div className="max-w-md mx-auto space-y-2">

          {dreams.map((d) => (
            <div
              key={d.id}
              className="
                p-3 text-sm rounded-xl
                bg-white/10 backdrop-blur-md
                border border-white/10
                transition-all duration-500
                hover:scale-[1.02]
              "
            >
              {d.text}
            </div>
          ))}

        </div>
      </section>

      {/* INPUT FIXE ONIRIQUE */}
      <footer className="relative z-10 fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/40 backdrop-blur-xl p-2">
        <div className="max-w-md mx-auto flex gap-2">

          {/* INPUT VIVANT */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écris ton rêve..."
            className="
              flex-1 p-2 text-sm rounded-xl resize-none
              bg-white/10 text-white placeholder-white/40
              border border-white/10
              transition-all duration-300
              focus:scale-[1.03] focus:ring-2 focus:ring-purple-400
              focus:bg-white/20
            "
            rows={2}
          />

          {/* PARTAGER */}
          <button
            onClick={addDream}
            disabled={loading}
            className="
              px-3 rounded-xl text-sm
              bg-purple-500/80 hover:bg-purple-400
              transition-all
            "
          >
            {loading ? "..." : "Partager"}
          </button>

          {/* CONTINUER */}
          <button
            onClick={() => router.push("/final")}
            className="
              px-3 rounded-xl text-sm
              bg-white/10 border border-white/10
              hover:bg-white/20 transition-all
            "
          >
            Continuer
          </button>

        </div>
      </footer>

      {/* 💬 TEXTE QUI FLOTTÉ PENDANT L'ÉCRITURE */}
      {input && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="text-white/40 text-sm animate-bounce">
            {input}
          </div>
        </div>
      )}

    </main>
  );
}