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

export default function Reves() {
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [input, setInput] = useState("");
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
            prev.map((d)