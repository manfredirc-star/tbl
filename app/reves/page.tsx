"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Dream = {
  id: string;
  text: string;
  created_at: string;
  likes?: number;
};

type Reply = {
  id: string;
  dreamId: string;
  text: string;
};

export default function Reves() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [input, setInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

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

  // ✨ nouveau rêve
  async function addDream() {
    if (!input.trim()) return;

    const text = input;
    setInput("");

    const { error } = await supabase.from("dreams").insert([{ text }]);

    if (error) console.error(error);
  }

  // 💬 continuer un rêve (thread)
  function openReply(id: string) {
    setActiveReplyId(id);
  }

  function sendReply(dreamId: string) {
    if (!replyInput.trim()) return;

    const newReply: Reply = {
      id: crypto.randomUUID(),
      dreamId,
      text: replyInput,
    };

    setReplies((prev) => [...prev, newReply]);
    setReplyInput("");
    setActiveReplyId(null);
  }

  return (
    <main className="h-screen flex flex-col bg-black text-white">

      {/* TITRE */}
      <header className="p-3 text-center border-b border-white/10">
        <h1 className="text-lg tracking-widest">RÊVES COLLECTIFS</h1>
      </header>

      {/* LISTE */}
      <section className="flex-1 overflow-y-auto p-3 space-y-4">

        {dreams.map((d) => (
          <div
            key={d.id}
            className="bg-white/10 border border-white/10 rounded-xl p-3"
          >
            {/* rêve */}
            <p className="text-sm mb-2">{d.text}</p>

            {/* actions */}
            <div className="flex justify-between text-xs">

              <button className="opacity-70">
                ❤️ {d.likes || 0}
              </button>

              <button
                onClick={() => openReply(d.id)}
                className="bg-white/10 px-2 py-1 rounded"
              >
                Continuer
              </button>
            </div>

            {/* 💬 ZONE THREAD (style messagerie) */}
            {activeReplyId === d.id && (
              <div className="mt-3 border-t border-white/10 pt-2">

                {/* anciens replies */}
                <div className="space-y-1 mb-2">
                  {replies
                    .filter((r) => r.dreamId === d.id)
                    .map((r) => (
                      <div
                        key={r.id}
                        className="text-xs bg-black/30 p-2 rounded"
                      >
                        {r.text}
                      </div>
                    ))}
                </div>

                {/* input continuation */}
                <div className="flex gap-2">
                  <input
                    value={replyInput}
                    onChange={(e) => setReplyInput(e.target.value)}
                    placeholder="continuer ce rêve..."
                    className="flex-1 text-xs p-2 rounded bg-white/10 border border-white/10"
                  />

                  <button
                    onClick={() => sendReply(d.id)}
                    className="text-xs px-2 bg-purple-500 rounded"
                  >
                    OK
                  </button>
                </div>

              </div>
            )}

          </div>
        ))}

      </section>

      {/* INPUT GLOBAL */}
      <footer className="p-2 border-t border-white/10 bg-black/60">
        <div className="flex gap-2">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="écris un nouveau rêve..."
            className="flex-1 p-2 text-sm bg-white/10 rounded"
          />

          <button
            onClick={addDream}
            className="px-3 bg-purple-500 rounded text-sm"
          >
            Partager
          </button>

        </div>
      </footer>

    </main>
  );
}