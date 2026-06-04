"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Dream = {
  id: string;
  text: string;
  created_at: string;
  likes: number;
};

export default function Reves() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // 📥 load dreams
  async function loadDreams() {
    const { data } = await supabase
      .from("dreams")
      .select("*")
      .order("created_at", { ascending: false });

    setDreams(data || []);
  }

  useEffect(() => {
    loadDreams();

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
          setDreams((prev) => [payload.new as Dream, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✨ publier nouveau rêve
  async function addDream() {
    if (!input.trim()) return;

    const text = input;
    setInput("");

    const temp: Dream = {
      id: crypto.randomUUID(),
      text,
      created_at: new Date().toISOString(),
      likes: 0,
    };

    setDreams((prev) => [temp, ...prev]);

    setLoading(true);

    const { error } = await supabase.from("dreams").insert([
      { text, likes: 0 },
    ]);

    setLoading(false);

    if (error) {
      setDreams((prev) => prev.filter((d) => d.id !== temp.id));
    }
  }

  // ❤️ like
  async function likeDream(id: string, currentLikes: number) {
    const newLikes = currentLikes + 1;

    setDreams((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, likes: newLikes } : d
      )
    );

    await supabase
      .from("dreams")
      .update({ likes: newLikes })
      .eq("id", id);
  }

  // 🌙 continuer rêve (ajoute du texte en bas)
  function continueDream(text: string) {
    setInput((prev) => (prev ? prev + " " + text : text));
  }

  return (
    <main className="h-screen flex flex-col relative overflow-hidden bg-black text-white">

      {/* 🌫 background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-black to-purple-950 opacity-60" />

      {/* TITLE */}
      <header className="relative z-10 p-3 text-center border-b border-white/10">
        <h1 className="text-lg tracking-widest">RÊVES COLLECTIFS</h1>
      </header>

      {/* LIST */}
      <section className="relative z-10 flex-1 overflow-y-auto px-3 py-3">
        <div className="max-w-md mx-auto space-y-3">

          {dreams.map((d) => (
            <div
              key={d.id}
              className="
                p-3 text-sm rounded-xl
                bg-white/10 backdrop-blur-md
                border border-white/10
              "
            >
              {/* texte */}
              <p className="mb-3">{d.text}</p>

              {/* actions */}
              <div className="flex justify-between items-center">

                {/* ❤️ LIKE */}
                <button
                  onClick={() => likeDream(d.id, d.likes || 0)}
                  className="text-sm flex items-center gap-1 opacity-80 hover:opacity-100"
                >
                  ❤️ {d.likes || 0}
                </button>

                {/* CONTINUER */}
                <button
                  onClick={() => continueDream(d.text)}
                  className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
                >
                  Continuer
                </button>

              </div>
            </div>
          ))}

        </div>
      </section>

      {/* INPUT BAS */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-black/60 backdrop-blur-xl p-2">
        <div className="max-w-md mx-auto flex gap-2">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écris ton rêve ou continue un rêve..."
            className="
              flex-1 p-2 text-sm rounded-xl resize-none
              bg-white/10 text-white
              border border-white/10
              focus:ring-2 focus:ring-purple-400
            "
            rows={2}
          />

          <button
            onClick={addDream}
            disabled={loading}
            className="px-3 rounded-xl bg-purple-500"
          >
            {loading ? "..." : "Partager"}
          </button>

        </div>
      </footer>

    </main>
  );
}