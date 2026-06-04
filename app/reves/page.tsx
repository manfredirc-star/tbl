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

  // 📥 load initial
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

  // ✨ partage
  async function addDream() {
    if (!input.trim()) return;

    const text = input;
    setInput("");

    const temp: Dream = {
      id: crypto.randomUUID(),
      text,
      created_at: new Date().toISOString(),
    };

    // apparition instantanée
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
    <main className="h-screen flex flex-col bg-white">

      {/* TITRE */}
      <header className="p-3 border-b text-center">
        <h1 className="text-xl font-bold">RÊVES</h1>
      </header>

      {/* LISTE */}
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

      {/* INPUT FIXE */}
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white p-2">
        <div className="max-w-md mx-auto flex gap-2">

          {/* 🌫 INPUT QUI “RESPIRE + FLOTTANT” */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écris ton rêve..."
            className="
              flex-1 border rounded-lg p-2 text-sm resize-none
              transition-all duration-300
              focus:scale-[1.02] focus:shadow-lg focus:ring-2 focus:ring-black
            "
            rows={2}
          />

          {/* BOUTON PARTAGER */}
          <button
            onClick={addDream}
            disabled={loading}
            className="px-3 bg-black text-white rounded-lg text-sm"
          >
            {loading ? "..." : "Partager"}
          </button>

          {/* BOUTON CONTINUER */}
          <button
            onClick={() => router.push("/final")}
            className="px-3 bg-gray-800 text-white rounded-lg text-sm"
          >
            Continuer
          </button>

        </div>
      </footer>

      {/* 🌙 TEXTE FLOTTANT (EFFET ONIRIQUE) */}
      {input && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="text-sm text-gray-400 animate-bounce opacity-70">
            {input}
          </div>
        </div>
      )}

      {/* espace bas */}
      <div className="h-20" />

    </main>
  );
}