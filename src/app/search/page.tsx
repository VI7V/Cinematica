"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageLayout } from "@/components/layout/PageLayout";
import { SearchResultCard } from "@/components/ui/SearchResultCard";
import { GridSkeleton } from "@/components/ui/Skeletons";
import { FiSearch } from "react-icons/fi";

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type: "movie" | "tv";
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q: string) => {
    if (!q || q.trim().length < 2) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      setTotalResults(data.total_results || 0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (query) doSearch(query);
  }, [query, doSearch]);

  function getTitle(r: SearchResult) {
    return r.media_type === "movie" ? (r.title || "") : (r.name || "");
  }

  function getYear(r: SearchResult) {
    const date = r.media_type === "movie" ? r.release_date : r.first_air_date;
    return date ? date.slice(0, 4) : "";
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-cinema-muted text-xs font-cinzel tracking-widest uppercase mb-1">
          Discovery
        </p>
        <h1 className="text-3xl font-cinzel font-bold text-gold-gradient">
          {query ? `Results for "${query}"` : "Search"}
        </h1>
        {!loading && searched && (
          <p className="text-cinema-muted text-sm mt-2">
            {totalResults} results found
          </p>
        )}
        <div className="gold-divider max-w-xs mt-4" />
      </div>

      {/* Results grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <GridSkeleton count={12} />
        </div>
      ) : !searched ? (
        <div className="text-center py-24">
          <FiSearch className="text-cinema-gold text-5xl mx-auto mb-4 opacity-40" />
          <p className="text-cinema-muted font-cinzel">
            Use the search bar above to find movies and TV shows
          </p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-5xl mb-4">🎞️</p>
          <p className="text-cinema-muted font-cinzel">
            No results found for &ldquo;{query}&rdquo;
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {results.map((result) => (
            <SearchResultCard
              key={`${result.media_type}-${result.id}`}
              id={result.id}
              title={getTitle(result)}
              posterPath={result.poster_path}
              releaseYear={getYear(result)}
              type={result.media_type}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <PageLayout>
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            <GridSkeleton count={12} />
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </PageLayout>
  );
}
