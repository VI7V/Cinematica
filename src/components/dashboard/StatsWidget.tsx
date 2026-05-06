"use client";

import { FiFilm, FiTv, FiCheckCircle, FiEye, FiBookmark } from "react-icons/fi";
import { Stats } from "@/types";

export function StatsWidget({ stats }: { stats: Stats }) {
  const items = [
    { label: "Movies", value: stats.totalMovies, icon: FiFilm, color: "text-cinema-gold" },
    { label: "TV Shows", value: stats.totalTV, icon: FiTv, color: "text-blue-400" },
    { label: "Watched", value: stats.watched, icon: FiCheckCircle, color: "text-green-400" },
    { label: "Watching", value: stats.watching, icon: FiEye, color: "text-purple-400" },
    { label: "Planned", value: stats.planToWatch, icon: FiBookmark, color: "text-cinema-muted" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-cinema-charcoal border border-cinema-gold/10 rounded-xl p-4 flex flex-col items-center gap-2 hover:border-cinema-gold/25 transition-colors"
        >
          <item.icon className={`${item.color} text-xl`} />
          <p className={`text-2xl font-bold font-cinzel ${item.color}`}>{item.value}</p>
          <p className="text-xs text-cinema-muted">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
