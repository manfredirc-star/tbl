"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Dream = {
  id: string;
  text: string;
};

export default function Reves() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
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
  }, []);

  async function postDream() {
    if (!input.trim()) return;

    setLoading(true);

    const { error } = await supabase.from("dreams").insert([
      { text: input }
    ]);

    setLoading(false);

    // 👉 on redirige QUOI QU’IL ARRIVE si pas d’erreur critique
    router.push("/final");
  }

  return (
    <main className="min-h-screen bg-white text-black p-6">

      <h1 className="text-3xl font-bold mb-6">
        Les rêves collectifs
      </h1>

      <textarea
        className="w-full p-3 border rounded"
        placeholder="Écris ton rêve..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={postDream}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-black text-white rounded"
      >
        {loading ? "Publication..." : "Publier"}
      </button>

      <div className="mt-10 space-y-3">
        {dreams.map((d) => (
          <div
            key={d.id}
            className="p-3 border rounded bg-gray-50"
          >
            {d.text}
          </div>
        ))}
      </div>
    </main>
  );
}