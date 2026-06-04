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

  // 📥 charger initialement
  async function loadDreams() {
    const { data, error } = await supabase
      .from("dreams")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setDreams(data || []);
    }
  }

  useEffect(() => {
    loadDreams();

    // ⚡ REALTIME
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
          const newDream = payload.new as Dream;

          // ❌ éviter doublons (important)
          setDreams((current) => {
            const exists = current.find((d) => d.id === newDream.id);
            if (exists) return current;
            return [newDream, ...current];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✍️ AJOUT (optimistic UI + Supabase)
  async function addDream() {
    if (!input.trim()) return;

    const text = input;

    // ⚡ affichage immédiat
    const tempId = crypto.randomUUID();

    const tempDream: Dream = {
      id: tempId,
      text,
      created_at: new Date().toISOString(),
    };

    setDreams((prev) => [tempDream, ...prev]);
    setInput("");
    setLoading(true);

    // ⚡ envoi Supabase
    const { error } = await supabase.from("dreams").insert([
      {
        text,
      },
    ]);

    setLoading(false);

    // ❌ rollback si erreur
    if (error) {
      console.error(error);
      setDreams((prev) => prev.filter((d) => d.id !== tempId));
    }
  }

  return (
    <main className="h-screen flex flex-col bg-white">

      {/* TITRE */}
      <header className="p-4 border-b text-center">
        <h1 className="text-2xl font-bold">RÊVES</h1>
      </header>

      {/* LISTE (mobile clean) */}
      <section className="flex-1 overflow-y-auto px-3 py-3">
        <div className="max-w-md mx-auto space-y-2">

          {dreams.map((d) => (
            <div
              key={d.id}
              className="p-3 text-sm border rounded-xl bg-gray-50 shadow-sm"
            >
              {d.text}
            </div>
          ))}

        </div>
      </section>

      {/* INPUT FIXE EN BAS */}
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