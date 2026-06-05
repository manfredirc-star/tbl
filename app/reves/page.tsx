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

type Comment = {
  id: string;
  dream_id: string;
  text: string;
  created_at: string;
};

export default function Reves() {
  const router = useRouter();

  const [dreams, setDreams] = useState<Dream[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [input, setInput] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [activeComment, setActiveComment] = useState<string | null>(null);

  // =====================
  // LOAD
  // =====================
  async function loadAll() {
    const [{ data: dreamsData }, { data: commentsData }] = await Promise.all([
      supabase
        .from("dreams")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("dream_comments")
        .select("*")
        .order("created_at", { ascending: true }),
    ]);

    if (dreamsData) setDreams(dreamsData);
    if (commentsData) setComments(commentsData);
  }

  useEffect(() => {
    loadAll();

    const channel = supabase
      .channel("dreams-live")

      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "dreams" },
        (payload) => {
          setDreams((prev) => [payload.new as Dream, ...prev]);
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
        { event: "INSERT", schema: "public", table: "dream_comments" },
        (payload) => {
          setComments((prev) => [...prev, payload.new as Comment]);
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // =====================
  // ADD DREAM
  // =====================
  async function addDream() {
    if (!input.trim()) return;

    await supabase.from("dreams").insert([
      {
        text: input,
        likes: 0,
      },
    ]);

    setInput("");
  }

  // =====================
  // LIKE
  // =====================
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

  // =====================
  // COMMENT
  // =====================
  async function sendComment(dreamId: string) {
    if (!commentInput.trim()) return;

    await supabase.from("dream_comments").insert([
      {
        dream_id: dreamId,
        text: commentInput,
      },
    ]);

    setCommentInput("");
    setActiveComment(null);
  }

  // =====================
  // UI
  // =====================
  return (
    <main className="h-screen flex flex-col bg-black text-white">

      {/* HEADER */}
      <header className="p-3 text-center border-b border-white/10">
        <h1 className="text-xs tracking-[0.3em]">
          RÊVES COLLECTIFS
        </h1>
      </header>

      {/* FEED */}
      <section className="flex-1 overflow-y-auto p-3 space-y-3 pb-24">

        {dreams.map((d) => (
          <div
            key={d.id}
            className="bg-white/10 border border-white/10 rounded-xl p-3"
          >
            <p className="text-sm mb-2">{d.text}</p>

            <div className="flex justify-between text-xs">
              <button onClick={() => likeDream(d.id)}>
                ❤️ {d.likes}
              </button>

              <button
                onClick={() =>
                  setActiveComment(activeComment === d.id ? null : d.id)
                }
                className="bg-white/10 px-2 py-1 rounded"
              >
                💬 commenter
              </button>
            </div>

            {/* COMMENTS */}
            <div className="mt-2 space-y-1">
              {comments
                .filter((c) => c.dream_id === d.id)
                .map((c) => (
                  <div
                    key={c.id}
                    className="text-xs bg-black/40 p-2 rounded"
                  >
                    {c.text}
                  </div>
                ))}
            </div>

            {/* INPUT COMMENT */}
            {activeComment === d.id && (
              <div className="mt-2 flex gap-2">
                <input
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="continuer ce rêve..."
                  className="flex-1 text-xs p-2 rounded bg-white/10"
                />
                <button
                  onClick={() => sendComment(d.id)}
                  className="text-xs px-2 bg-purple-500 rounded"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* INPUT DREAM */}
      <footer className="p-2 border-t border-white/10 bg-black/70 backdrop-blur-md">
        <div className="flex gap-2">

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
            partager
          </button>

          <button
            onClick={() => router.push("/final")}
            className="px-3 bg-white/10 border border-white/10 rounded text-sm"
          >
            suite
          </button>

        </div>
      </footer>

    </main>
  );
}