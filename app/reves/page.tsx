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
  const router = useRouter();

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
        { event: "INSERT", schema: "public", table: "dreams" },
        (payload) => {
          setDreams((prev) => [payload.new as Dream, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function addDream() {
    if (!input.trim()) return;

    const text = input;
    setInput("");

    // UI instant
    setDreams((prev) => [
      {
        id: crypto.randomUUID(),
        text,
        created_at: new Date().toISOString(),
        likes: 0,
      },
      ...prev,
    ]);

    await supabase.from("dreams").insert([{ text }]);
  }

  return (
    <main className="h-screen flex flex-col bg-black text-white overflow-hidden">

      {/* HEADER */}
      <header className="p-2 text-center border-b border-white/10">
        <h1 className="text-sm tracking-widest">RÊVES COLLECTIFS</h1>
      </header>

      {/* LISTE (IMPORTANT: flex-1 + overflow) */}
      <section className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {dreams.map((d) => (
          <div
            key={d.id}
            className="bg-white/10 border border-white/10 rounded-xl p-3 text-sm"
          >
            {d.text}
          </div>
        ))}
      </section>

      {/* INPUT ULTRA COLLÉ AUX RÊVES (FIX IMPORTANT) */}
      <footer className="border-t border-white/10 bg-black/70 backdrop-blur-md p-2">

        <div className="flex gap-2 max-w-md mx-auto">

          {/* INPUT */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écris ton rêve..."
            className="
              flex-1 p-2 text-sm rounded-lg
              bg-white/10 text-white
              border border-white/10
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
            "
          />

          {/* BOUTON PARTAGER */}
          <button
            onClick={addDream}
            className="px-3 bg-purple-500 rounded-lg text-sm"
          >
            Partager
          </button>

          {/* BOUTON CONTINUER → /final */}
          <button
            onClick={() => router.push("/final")}
            className="px-3 bg-white/10 border border-white/10 rounded-lg text-sm"
          >
            Continuer
          </button>

        </div>

      </footer>

    </main>
  );
}