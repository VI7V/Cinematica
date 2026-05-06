"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { WatchlistItem } from "@/types";
import { PosterCard } from "@/components/ui/PosterCard";
import { PosterSkeleton } from "@/components/ui/Skeletons";

interface DashboardRowProps {
  title: string;
  href: string;
  items: (WatchlistItem & { _id: string })[];
  loading?: boolean;
  onUpdate: (id: string, status: string) => void;
  onRemove: (id: string) => void;
  emptyText?: string;
}

export function DashboardRow({
  title,
  href,
  items,
  loading,
  onUpdate,
  onRemove,
  emptyText = "Nothing here yet",
}: DashboardRowProps) {
  return (
    <section className="bg-cinema-charcoal/50 border border-cinema-gold/10 rounded-2xl p-5">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href={href}
          className="flex items-center gap-2 group"
        >
          <h2 className="font-cinzel text-cinema-gold text-lg font-semibold tracking-wider group-hover:text-cinema-gold-light transition-colors">
            {title}
          </h2>
          <FiChevronRight className="text-cinema-gold/50 group-hover:text-cinema-gold transition-colors group-hover:translate-x-0.5 transform" />
        </Link>
        <span className="text-xs text-cinema-muted">
          {loading ? "Loading..." : `${items.length} ${items.length === 1 ? "title" : "titles"}`}
        </span>
      </div>

      <div className="gold-divider mb-4" />

      {/* Scroll row */}
      <div className="scroll-row">
        {loading ? (
          <PosterSkeleton count={6} />
        ) : items.length === 0 ? (
          <div className="w-full py-8 text-center text-cinema-muted text-sm italic">
            {emptyText}
          </div>
        ) : (
          items.slice(0, 10).map((item) => (
            <PosterCard
              key={item._id}
              item={item}
              onUpdate={onUpdate}
              onRemove={onRemove}
              compact
            />
          ))
        )}
      </div>
    </section>
  );
}
