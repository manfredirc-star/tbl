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

type Reply = {
  id: string;
  dream_id: string;
  text: string;
  created_at: string;
};

export default function Reves() {
  const router = useRouter();

  const [dreams, setDreams] = useState<Dream[]>([]);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [input, setInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [activeReply, setActiveReply] = useState<string | null>(null);
  const [floatingText, setFloatingText] = useState("");

  // 📥 LOAD DREAMS (SOURCE OF TRUTH)
  async function loadDreams() {
    const { data, error } = await supabase
      .from("dreams")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setDreams(data || []);
  }

  // 📥 LOAD REPLIES (SOURCE OF TRUTH)
  async function loadReplies() {
    const { data, error } = await supabase
      .from("dream_replies")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error) setReplies(data || []);
  }

  useEffect(() => {
    loadDreams();
    loadReplies();

    // ⚡ REALTIME SYNC
    const channel = supabase
      .channel("dreams-live")

      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "dreams" },
        (payload) => {
          setDreams((prev) => {
            const exists = prev.find((d) => d.id === payload.new.id);
            if (exists) return prev;
            return [payload.new as Dream, ...prev];
          });
        }
      )

      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "dreams" },
        (payload) => {
          setDreams((prev) =>
            prev.map((d) =>
              d.id === payload.new.id ? (payload.new as Dream) : d
            )
          );
        }
      )

      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "dream_replies" },
        (payload) => {
          setReplies((prev) => [...prev, payload.new as Reply]);
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✨ ADD DREAM (optimistic + DB sync)
  async function addDream() {
    if (!input.trim()) return;

    const text = input;
    setInput("");
    setFloatingText(text);

    const temp: Dream = {
      id: crypto.randomUUID(),
      text,
      created_at: new Date().toISOString(),
      likes: 0,
    };

    setDreams((prev) => [temp, ...prev]);

    const { data, error } = await supabase
      .from("dreams")
      .insert([{ text, likes: 0 }])
      .select()
      .single();

    if (!error && data) {
      setDreams((prev) =>
        prev.map((d) => (d.id === temp.id ? data : d))
      );
    }
  }

  // ❤️ LIKE (persistant + instant UI)
  async function likeDream(id: string) {
    const dream = dreams.find((d) => d.id === id);
    if (!dream) return;

    const newLikes = (dream.likes || 0) + 1;

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

  // 💬 CONTINUE DREAM (reply persisté)
  async function sendReply(dreamId: string) {
    if (!replyInput.trim()) return;

    const text = replyInput;
    setReplyInput("");
    setActiveReply(null);
    setFloatingText(text);

    const { data, error } = await supabase
      .from("dream_replies")
      .insert([{ dream_id: dreamId, text }])
      .select()
      .single();

    if (!error && data) {
      setReplies((prev) => [...prev, data]);
    }
  }

  return (
    <main className="h-screen flex flex-col bg-black text-white relative overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-black to-purple-950 opacity-70 animate-pulse" />

      {/* HEADER */}
      <header className="relative z-10 p-3 text-center border-b border-white/10">
        <h1 className="text-sm tracking-[0.3em]">RÊVES COLLECTIFS</h1>
      </header>

      {/* LIST (IMPORTANT: pb-24 = input collé mobile) */}
      <section className="relative z-10 flex-1 overflow-y-auto p-3 pb-24 space-y-3">

        {dreams.map((d) => (
          <div
            key={d.id}
            className="bg-white/10 border border-white/10 rounded-xl p-3"
          >
            <p className="text-sm mb-2">{d.text}</p>

            {/* ACTIONS */}
            <div className="flex justify-between items-center text-xs">

              <button onClick={() => likeDream(d.id)}>
                ❤️ {d.likes}
              </button>

              <button
                onClick={() =>
                  setActiveReply(activeReply === d.id ? null : d.id)
                }
                className="bg-white/10 px-2 py-1 rounded"
              >
                Continuer
              </button>

            </div>

            {/* REPLIES (persistants + reload OK) */}
            <div className="mt-2 space-y-1">
              {replies
                .filter((r) => r.dream_id === d.id)
                .map((r) => (
                  <div
                    key={r.id}
                    className="text-xs bg-black/40 p-2 rounded"
                  >
                    {r.text}
                  </div>
                ))}
            </div>

            {/* INPUT CONTINUE */}
            {activeReply === d.id && (
              <div className="mt-2 flex gap-2">
                <input
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  placeholder="continuer le rêve..."
                  className="flex-1 text-xs p-2 rounded bg-white/10"
                />

                <button
                  onClick={() => sendReply(d.id)}
                  className="text-xs px-2 bg-purple-500 rounded"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        ))}

      </section>

      {/* 🌫 FLOATING TEXT */}
      {floatingText && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 text-white/40 text-sm animate-bounce pointer-events-none">
          {floatingText}
        </div>
      )}

      {/* FOOTER MOBILE */}
      <footer className="relative z-10 p-2 border-t border-white/10 bg-black/70 backdrop-blur-md">
        <div className="flex gap-2 max-w-md mx-auto">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="écris un rêve..."
            className="flex-1 p-2 text-sm bg-white/10 rounded"
          />

          <button
            onClick={addDream}
            className="px-3 bg-purple-500 rounded text-sm"
          >
            Partager
          </button>

          <button
            onClick={() => router.push("/final")}
            className="px-3 bg-white/10 border border-white/10 rounded text-sm"
          >
            Continuer
          </button>

        </div>
      </footer>

    </main>
  );
}