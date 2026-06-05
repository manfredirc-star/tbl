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
  parent_id: string | null;
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
  // LOAD DATA
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
      .channel("reves-live")

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
  // LIKE DREAM
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
  // COMMENT / REPLY (THREADS)
  // =====================
  async function sendComment(
    dreamId: string,
    parentId: string | null = null
  ) {
    if (!commentInput.trim()) return;

    await supabase.from("dream_comments").insert([
      {
        dream_id: dreamId,
        parent_id: parentId,
        text: commentInput,
      },
    ]);

    setCommentInput("");
    setActiveComment(null);
  }

  // =====================
  // RECURSIVE RENDER
  // =====================
  function renderComments(
    dreamId: string,
    parentId: string | null = null
  ) {
    return comments
      .filter(
        (c) =>
          c.dream_id === dreamId &&
          c.parent_id === parentId
      )
      .map((c) => (
        <div
          key={c.id}
          className="ml-3 mt-2 border-l border-white/10 pl-2"
        >
          <p className="text-xs">{c.text}</p>

          <button
            className="text-[10px] text-white/50 mt-1"
            onClick={() => setActiveComment(c.id)}
          >
            répondre
          </button>

          {/* INPUT REPLY */}
          {activeComment === c.id && (
            <div className="flex gap-1 mt-1">
              <input
                value={commentInput}
                onChange={(e) =>
                  setCommentInput(e.target.value)
                }
                className="text-xs bg-white/10 p-1 rounded flex-1"
                placeholder="réponse..."
              />

              <button
                onClick={() =>
                  sendComment(dreamId, c.id)
                }
                className="text-xs bg-purple-500 px-2 rounded"
              >
                ok
              </button>
            </div>
          )}

          {/* RECURSION */}
          {renderComments(dreamId, c.id)}
        </div>
      ));
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
                  setActiveComment(
                    activeComment === d.id ? null : d.id
                  )
                }
                className="bg-white/10 px-2 py-1 rounded"
              >
                💬 commenter
              </button>
            </div>

            {/* COMMENTS TREE */}
            <div className="mt-2">
              {renderComments(d.id)}
            </div>
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