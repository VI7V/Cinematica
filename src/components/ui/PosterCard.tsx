"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiTrash2, FiEye, FiCheckCircle, FiBookmark } from "react-icons/fi";
import { getPosterUrl } from "@/lib/tmdb";
import { WatchlistItem } from "@/types";
import toast from "react-hot-toast";

interface PosterCardProps {
  item: WatchlistItem & { _id: string };
  onUpdate: (id: string, status: string) => void;
  onRemove: (id: string) => void;
  compact?: boolean;
}

const statusConfig = {
  plan_to_watch: { label: "Watchlist", color: "text-cinema-muted", bg: "bg-cinema-muted/20" },
  watching: { label: "Watching", color: "text-blue-400", bg: "bg-blue-400/20" },
  watched: { label: "Watched", color: "text-cinema-gold", bg: "bg-cinema-gold/20" },
};

export function PosterCard({ item, onUpdate, onRemove, compact = false }: PosterCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const width = compact ? 120 : 160;
  const height = compact ? 180 : 240;

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  async function handleStatus(status: string) {
    setLoading(true);
    setMenuOpen(false);
    try {
      const res = await fetch(`/api/watchlist/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      onUpdate(item._id, status);
      toast.success(`Marked as ${statusConfig[status as keyof typeof statusConfig].label}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove() {
    setLoading(true);
    setMenuOpen(false);
    try {
      const res = await fetch(`/api/watchlist/${item._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      onRemove(item._id);
      toast.success("Removed from watchlist");
    } catch {
      toast.error("Failed to remove");
    } finally {
      setLoading(false);
    }
  }

  const cfg = statusConfig[item.status as keyof typeof statusConfig];

  return (
    <div
      ref={cardRef}
      className="poster-card relative group"
      style={{ width }}
    >
      {/* Poster */}
      <div
        className="relative rounded-lg overflow-hidden bg-cinema-charcoal border border-cinema-gold/10 group-hover:border-cinema-gold/30 transition-colors"
        style={{ width, height }}
      >
        <Image
          src={getPosterUrl(item.poster || null)}
          alt={item.title}
          fill
          sizes={`${width}px`}
          className="object-cover"
          unoptimized={item.poster?.startsWith("http")}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex items-center justify-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-cinema-gold rounded-full text-cinema-black hover:bg-cinema-gold-light"
            disabled={loading}
          >
            <FiMoreVertical size={16} />
          </button>
        </div>
        {/* Status badge */}
        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium ${cfg.bg} ${cfg.color}`}>
          {cfg.label}
        </div>
        {/* Type badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs bg-black/60 text-cinema-muted">
          {item.type === "movie" ? "Film" : "TV"}
        </div>
      </div>

      {/* Title */}
      <p className="mt-2 text-xs text-cinema-cream leading-tight line-clamp-2 px-0.5">
        {item.title}
      </p>

      {/* Dropdown menu — outside overflow-hidden poster div to prevent clipping */}
      {menuOpen && (
        <div className="absolute z-50 top-0 left-1/2 -translate-x-1/2 w-44 bg-cinema-charcoal border border-cinema-gold/20 rounded-lg shadow-card overflow-hidden"
          style={{ marginTop: "-8px", transform: "translateX(-50%) translateY(-100%)" }}
        >
          <p className="px-3 py-2 text-xs text-cinema-muted border-b border-cinema-gold/10">Change status</p>
          <button
            onClick={() => handleStatus("watching")}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-blue-400 hover:bg-cinema-dark transition-colors"
          >
            <FiEye size={12} /> Mark Watching
          </button>
          <button
            onClick={() => handleStatus("watched")}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-cinema-gold hover:bg-cinema-dark transition-colors"
          >
            <FiCheckCircle size={12} /> Mark Watched
          </button>
          <button
            onClick={() => handleStatus("plan_to_watch")}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-cinema-muted hover:bg-cinema-dark transition-colors"
          >
            <FiBookmark size={12} /> Watchlist
          </button>
          <div className="border-t border-cinema-gold/10" />
          <button
            onClick={handleRemove}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-cinema-dark transition-colors"
          >
            <FiTrash2 size={12} /> Remove
          </button>
        </div>
      )}
    </div>
  );
}
