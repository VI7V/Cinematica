const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const POSTER_SIZES = {
  sm: `${TMDB_IMAGE_BASE}/w185`,
  md: `${TMDB_IMAGE_BASE}/w342`,
  lg: `${TMDB_IMAGE_BASE}/w500`,
  original: `${TMDB_IMAGE_BASE}/original`,
};

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function searchMovies(query: string, page = 1) {
  const res = await fetch(
    `${TMDB_BASE}/search/movie?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error("TMDB movie search failed");
  return res.json();
}

export async function searchTV(query: string, page = 1) {
  const res = await fetch(
    `${TMDB_BASE}/search/tv?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error("TMDB TV search failed");
  return res.json();
}

export async function searchMulti(query: string, page = 1) {
  const res = await fetch(
    `${TMDB_BASE}/search/multi?query=${encodeURIComponent(query)}&page=${page}&include_adult=false`,
    { headers: getHeaders() }
  );
  if (!res.ok) throw new Error("TMDB multi search failed");
  return res.json();
}

export async function getTrendingMovies() {
  const res = await fetch(`${TMDB_BASE}/trending/movie/week`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("TMDB trending movies failed");
  return res.json();
}

export async function getTrendingTV() {
  const res = await fetch(`${TMDB_BASE}/trending/tv/week`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("TMDB trending TV failed");
  return res.json();
}

export function getPosterUrl(path: string | null, size: keyof typeof POSTER_SIZES = "md") {
  if (!path) return "/placeholder-poster.svg";
  return `${POSTER_SIZES[size]}${path}`;
}
