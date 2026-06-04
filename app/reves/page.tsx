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

  // 📥 charger les rêves
  async function loadDreams() {
    const { data } = await supabase
      .from("dreams")
      .select("*")
      .order("created_at", { ascending: false });

    setDreams(data || []);
  }

  useEffect(() => {
    loadDreams();

    // ⚡ REALTIME LIVE
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
          setDreams((current) => [
            payload.new as Dream,
            ...current,
          ]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✍️ publier
  async function addDream() {
    if (!input.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("dreams").insert([
      {
        text: input,
      },
    ]);

    setLoading(false);

    if (!error) {
      setInput(""); // 👈 nettoyage input
    }
  }

  return (
    <main className="h-screen flex flex-col bg-white">

      {/* TITRE */}
      <header className="p-4 text-center border-b">
        <h1 className="text-2xl font-bold">RÊVES</h1>
      </header>

      {/* LISTE (VERSION MOBILE COOL) */}
      <section className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-2 max-w-md mx-auto">

          {dreams.map((d) => (
            <div
              key={d.id}
              className="bg-gray-50 border rounded-xl p-3 text-sm shadow-sm"
            >
              {d.text}
            </div>
          ))}

        </div>
      </section>

      {/* INPUT BAS ÉCRAN MOBILE STYLE */}
      <footer className="border-t p-3 bg-white">
        <div className="max-w-md mx-auto flex gap-2">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écris ton rêve..."
            className="flex-1 border rounded-xl p-2 text-sm resize-none"
            rows={2}
          />

          <button
            onClick={addDream}
            disabled={loading}
            className="px-4 bg-black text-white rounded-xl text-sm"
          >
            {loading ? "..." : "OK"}
          </button>

        </div>
      </footer>

    </main>
  );
}