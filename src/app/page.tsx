"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { DashboardRow } from "@/components/dashboard/DashboardRow";
import { WatchlistItem, Stats } from "@/types";

type WatchlistItemWithId = WatchlistItem & { _id: string };

export default function Dashboard() {
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

  function handleUpdate(id: string, status: string) {
    setWatchlist((prev) =>
      prev.map((item) => item._id === id ? { ...item, status: status as any } : item)
    );
  }

  function handleRemove(id: string) {
    setWatchlist((prev) => prev.filter((item) => item._id !== id));
  }

  const movies = watchlist.filter((i) => i.type === "movie");
  const tvShows = watchlist.filter((i) => i.type === "tv");
  const watching = watchlist.filter((i) => i.status === "watching");
  const watched = watchlist.filter((i) => i.status === "watched");

  const stats: Stats = {
    totalMovies: movies.length,
    totalTV: tvShows.length,
    watched: watched.length,
    watching: watching.length,
    planToWatch: watchlist.filter((i) => i.status === "plan_to_watch").length,
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="text-cinema-gold font-cinzel animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome header */}
        <div className="text-center py-6">
          <p className="text-cinema-muted text-sm font-cinzel tracking-widest uppercase mb-2">
            Welcome back
          </p>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-gold-gradient">
            {session?.user?.name || "Cinema Vault"}
          </h1>
          <div className="gold-divider max-w-xs mx-auto mt-4" />
        </div>

        {/* Stats */}
        <section>
          <h2 className="font-cinzel text-cinema-gold/70 text-xs tracking-widest uppercase mb-3">
            Your Library
          </h2>
          <StatsWidget stats={stats} />
        </section>

        {/* Dashboard rows */}
        <DashboardRow
          title="Movies"
          href="/movies"
          items={movies}
          loading={loading}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
          emptyText="No movies yet — search and add some!"
        />

        <DashboardRow
          title="TV Shows"
          href="/tv"
          items={tvShows}
          loading={loading}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
          emptyText="No TV shows yet — search and add some!"
        />

        <DashboardRow
          title="Currently Watching"
          href="/watching"
          items={watching}
          loading={loading}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
          emptyText="Not watching anything right now"
        />

        <DashboardRow
          title="Watched & Completed"
          href="/watched"
          items={watched}
          loading={loading}
          onUpdate={handleUpdate}
          onRemove={handleRemove}
          emptyText="Nothing completed yet — keep watching!"
        />
      </div>
    </PageLayout>
  );
}
