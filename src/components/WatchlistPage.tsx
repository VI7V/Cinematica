"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { PosterCard } from "@/components/ui/PosterCard";
import { GridSkeleton } from "@/components/ui/Skeletons";
import { WatchlistItem } from "@/types";

type WatchlistItemWithId = WatchlistItem & { _id: string };

interface WatchlistPageProps {
  title: string;
  subtitle: string;
  filterFn: (item: WatchlistItemWithId) => boolean;
  emptyText: string;
}

export function WatchlistPage({ title, subtitle, filterFn, emptyText }: WatchlistPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [watchlist, setWatchlist] = useState<WatchlistItemWithId[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
  }, [status, router]);

  const fetchWatchlist = useCallback(async () => {
    try {
      const res = await fetch("/api/watchlist");
      if (!res.ok) return;
      const data = await res.json();
      setWatchlist(data.watchlist || []);
    } catch {
      console.error("Failed to fetch watchlist");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) fetchWatchlist();
  }, [session, fetchWatchlist]);

  function handleUpdate(id: string, newStatus: string) {
    setWatchlist((prev) =>
      prev.map((item) => item._id === id ? { ...item, status: newStatus as any } : item)
    );
  }

  function handleRemove(id: string) {
    setWatchlist((prev) => prev.filter((item) => item._id !== id));
  }

  const filtered = watchlist.filter(filterFn);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="text-cinema-gold font-cinzel animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <p className="text-cinema-muted text-xs font-cinzel tracking-widest uppercase mb-1">
            {subtitle}
          </p>
          <h1 className="text-3xl font-cinzel font-bold text-gold-gradient">{title}</h1>
          <div className="gold-divider max-w-xs mt-4" />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <GridSkeleton count={12} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🎬</p>
            <p className="text-cinema-muted font-cinzel">{emptyText}</p>
          </div>
        ) : (
          <>
            <p className="text-cinema-muted text-sm mb-4">
              {filtered.length} {filtered.length === 1 ? "title" : "titles"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {filtered.map((item) => (
                <div key={item._id} className="flex justify-center">
                  <PosterCard
                    item={item}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PageLayout>
  );
}
