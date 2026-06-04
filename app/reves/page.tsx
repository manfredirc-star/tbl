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

  async function addDream() {
    if (!input.trim()) return;

    const text = input;
    setInput("");

    const tempId = crypto.randomUUID();

    // ⚡ affichage instantané
    setDreams((prev) => [
      { id: tempId, text, created_at: new Date().toISOString() },
      ...prev,
    ]);

    setLoading(true);

    const { error } = await supabase.from("dreams").insert([
      { text },
    ]);

    setLoading(false);

    if (error) {
      setDreams((prev) => prev.filter((d) => d.id !== tempId));
    }
  }

  return (
    <main className="h-screen flex flex-col bg-white">

      {/* TITRE */}
      <header className="p-3 border-b text-center">
        <h1 className="text-xl font-bold">RÊVES</h1>
      </header>

      {/* LISTE PLUS COMPACTE */}
      <section className="flex-1 overflow-y-auto px-3 py-2">
        <div className="max-w-md mx-auto space-y-2">

          {dreams.map((d) => (
            <div
              key={d.id}
              className="p-2 text-sm border rounded-lg bg-gray-50"
            >
              {d.text}
            </div>
          ))}

        </div>
      </section>

      {/* INPUT FIXÉ EN BAS (MOBILE STYLE) */}
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white p-2">
        <div className="max-w-md mx-auto flex gap-2">

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écris ton rêve..."
            className="flex-1 border rounded-lg p-2 text-sm resize-none"
            rows={2}
          />

          <button
            onClick={addDream}
            disabled={loading}
            className="px-4 bg-black text-white rounded-lg text-sm"
          >
            {loading ? "..." : "Partager"}
          </button>

        </div>
      </footer>

      {/* ESPACE POUR ÉVITER QUE LE FOOTER CACHE LE CONTENU */}
      <div className="h-20" />

    </main>
  );
}