"use client";

import { useEffect, useState } from "react";
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

  // 🔄 charger les rêves
  async function loadDreams() {
    const { data, error } = await supabase
      .from("dreams")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setDreams(data || []);
  }

  useEffect(() => {
    loadDreams();

    // 🔥 REALTIME
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

  // ✍️ publier un rêve
  async function addDream() {
    if (!input.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("dreams").insert([
      {
        text: input,
      },
    ]);

    if (error) {
      console.log(error);
      alert("Erreur: " + error.message);
    } else {
      setInput("");
    }

    setLoading(false);
  }

  return (
    <main className="h-screen flex flex-col">

      {/* TITRE */}
      <header className="p-6 border-b text-center text-3xl font-bold">
        RÊVES
      </header>

      {/* LISTE */}
      <section className="flex-1 overflow-y-auto p-4 space-y-3">
        {dreams.map((d) => (
          <div
            key={d.id}
            className="p-4 border rounded bg-gray-50"
          >
            {d.text}
          </div>
        ))}
      </section>

      {/* INPUT EN BAS */}
      <footer className="p-4 border-t flex gap-2">
        <textarea
          className="flex-1 border p-2 rounded"
          placeholder="Écris ton rêve..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={addDream}
          disabled={loading}
          className="px-4 bg-black text-white rounded"
        >
          {loading ? "..." : "Envoyer"}
        </button>
      </footer>

    </main>
  );
}