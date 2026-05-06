export interface WatchlistItem {
  tmdbId: number;
  title: string;
  type: "movie" | "tv";
  status: "watching" | "watched" | "plan_to_watch";
  poster: string;
  addedAt: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  media_type?: "movie";
}

export interface TMDBShow {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
  overview: string;
  vote_average: number;
  media_type?: "tv";
}

export type TMDBResult = (TMDBMovie | TMDBShow) & { media_type: "movie" | "tv" };

export interface Stats {
  totalMovies: number;
  totalTV: number;
  watched: number;
  watching: number;
  planToWatch: number;
}
