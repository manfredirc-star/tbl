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

  const [dreamInput, setDreamInput] = useState("");

  // input par commentaire
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>(
    {}
  );

  // 2 states séparés = IMPORTANT
  const [activeDreamComment, setActiveDreamComment] = useState<string | null>(
    null
  );
  const [activeReplyComment, setActiveReplyComment] = useState<string | null>(
    null
  );

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
          setComments((prev) => {
            const exists = prev.find((c) => c.id === payload.new.id);
            if (exists) return prev;
            return [...prev, payload.new as Comment];
          });
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // =====================
  // DREAM
  // =====================
  async function addDream() {
    if (!dreamInput.trim()) return;

    await supabase.from("dreams").insert([
      {
        text: dreamInput,
        likes: 0,
      },
    ]);

    setDreamInput("");
  }

  async function likeDream(id: string) {
    const dream = dreams.find((d) => d.id === id);
    if (!dream) return;

    const newLikes = (dream.likes || 0) + 1;

    setDreams((prev) =>
      prev.map((d) => (d.id === id ? { ...d, likes: newLikes } : d))
    );

    await supabase.from("dreams").update({ likes: newLikes }).eq("id", id);
  }

  // =====================
  // COMMENT SYSTEM FIXED
  // =====================
  function setCommentInput(id: string, value: string) {
    setCommentInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function sendComment(
    dreamId: string,
    parentId: string | null = null
  ) {
    const key = parentId ?? dreamId;
    const text = commentInputs[key];

    if (!text || !text.trim()) return;

    await supabase.from("dream_comments").insert([
      {
        dream_id: dreamId,
        parent_id: parentId,
        text,
      },
    ]);

    setCommentInputs((prev) => ({ ...prev, [key]: "" }));
    setActiveReplyComment(null);
  }

  // =====================
  // RENDER COMMENTS TREE
  // =====================
  function renderComments(
    dreamId: string,
    parentId: string | null = null
  ) {
    return comments
      .filter(
        (c) => c.dream_id === dreamId && c.parent_id === parentId
      )
      .map((c) => (
        <div
          key={c.id}
          className="ml-3 mt-2 border-l border-white/10 pl-2"
        >
          <p className="text-xs">{c.text}</p>

          <button
            className="text-[10px] text-white/50 mt-1"
            onClick={() =>
              setActiveReplyComment(
                activeReplyComment === c.id ? null : c.id
              )
            }
          >
            répondre
          </button>

          {activeReplyComment === c.id && (
            <div className="flex gap-1 mt-1">
              <input
                value={commentInputs[c.id] || ""}
                onChange={(e) =>
                  setCommentInput(c.id, e.target.value)
                }
                className="text-xs bg-white/10 p-1 rounded flex-1"
                placeholder="réponse..."
              />

              <button
                onClick={() => sendComment(dreamId, c.id)}
                className="text-xs bg-purple-500 px-2 rounded"
              >
                ok
              </button>
            </div>
          )}

          {renderComments(dreamId, c.id)}
        </div>
      ));
  }

  // =====================
  // UI
  // =====================
  return (
    <main className="h-screen flex flex-col bg-black text-white">

      <header className="p-3 text-center border-b border-white/10">
        <h1 className="text-xs tracking-[0.3em]">
          RÊVES COLLECTIFS
        </h1>
      </header>

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
                  setActiveDreamComment(
                    activeDreamComment === d.id ? null : d.id
                  )
                }
                className="bg-white/10 px-2 py-1 rounded"
              >
                💬 commenter
              </button>
            </div>

            {activeDreamComment === d.id && (
              <div className="flex gap-2 mt-2">
                <input
                  value={commentInputs[d.id] || ""}
                  onChange={(e) =>
                    setCommentInput(d.id, e.target.value)
                  }
                  placeholder="écrire un commentaire..."
                  className="flex-1 text-xs p-2 bg-white/10 rounded"
                />

                <button
                  onClick={() => sendComment(d.id, null)}
                  className="text-xs px-2 bg-purple-500 rounded"
                >
                  envoyer
                </button>
              </div>
            )}

            <div className="mt-2">
              {renderComments(d.id)}
            </div>
          </div>
        ))}
      </section>

      <footer className="p-2 border-t border-white/10 bg-black/70 backdrop-blur-md">
        <div className="flex gap-2">
          <input
            value={dreamInput}
            onChange={(e) => setDreamInput(e.target.value)}
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