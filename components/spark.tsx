"use client";

import { useEffect, useState } from "react";

/**
 * A hidden collectible "bit". Quiet until noticed; clicking collects it
 * (handled globally by SparkHunt) and reveals a fact about Ahmad.
 */
export function Spark({ id, fact }: { id: string; fact: string }) {
  const [found, setFound] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        const arr: string[] = JSON.parse(localStorage.getItem("byte-bits") ?? "[]");
        setFound(arr.includes(id));
      } catch {}
    };
    check();
    window.addEventListener("spark-sync", check);
    return () => window.removeEventListener("spark-sync", check);
  }, [id]);

  return (
    <button
      type="button"
      aria-label="A hidden bit"
      title={found ? "bit collected" : "?"}
      onClick={() => window.dispatchEvent(new CustomEvent("spark-collect", { detail: { id, fact } }))}
      className={`inline-grid h-6 w-6 place-items-center align-middle font-mono text-sm transition-all duration-200 ${
        found ? "text-mint" : "text-cyan/30 hover:scale-125 hover:text-cyan"
      }`}
    >
      ✦
    </button>
  );
}
