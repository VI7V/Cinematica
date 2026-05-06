"use client";

import Image from "next/image";
import { useState } from "react";
import { FiPlus, FiCheck } from "react-icons/fi";
import { getPosterUrl } from "@/lib/tmdb";
import toast from "react-hot-toast";

interface SearchResultCardProps {
  id: number;
  title: string;
  posterPath: string | null;
  releaseYear: string;
  type: "movie" | "tv";
  inWatchlist?: boolean;
  onAdded?: () => void;
}

export function SearchResultCard({
  id,
  title,
  posterPath,
  releaseYear,
  type,
  inWatchlist = false,
  onAdded,
}: SearchResultCardProps) {
  const [added, setAdded] = useState(inWatchlist);
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (added) return;
    setLoading(true);
    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId: id,
          title,
          type,
          poster: posterPath || "",
        }),
      });
      if (res.status === 409) {
        toast("Already in your watchlist", { icon: "ℹ️" });
        setAdded(true);
        return;
      }
      if (!res.ok) throw new Error();
      setAdded(true);
      toast.success(`"${title}" added to watchlist`);
      onAdded?.();
    } catch {
      toast.error("Failed to add. Sign in first?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="poster-card group relative flex flex-col bg-cinema-charcoal rounded-xl border border-cinema-gold/10 hover:border-cinema-gold/30 transition-colors overflow-hidden">
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-cinema-dark overflow-hidden">
        <Image
          src={getPosterUrl(posterPath)}
          alt={title}
          fill
          sizes="200px"
          className="object-cover"
        />
        {/* Type badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs bg-black/70 text-cinema-gold border border-cinema-gold/30">
          {type === "movie" ? "Film" : "TV"}
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-sm text-cinema-cream font-medium line-clamp-2 leading-snug">{title}</p>
          {releaseYear && (
            <p className="text-xs text-cinema-muted mt-0.5">{releaseYear}</p>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={added || loading}
          className={`mt-auto flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
            added
              ? "bg-cinema-gold/20 text-cinema-gold border border-cinema-gold/30 cursor-default"
              : "btn-gold"
          }`}
        >
          {loading ? (
            <span className="animate-spin">⟳</span>
          ) : added ? (
            <><FiCheck size={12} /> In Watchlist</>
          ) : (
            <><FiPlus size={12} /> Add to Watchlist</>
          )}
        </button>
      </div>
    </div>
  );
}
