import { NextRequest, NextResponse } from "next/server";
import { searchMulti } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");
  const page = searchParams.get("page") || "1";

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  try {
    const data = await searchMulti(query, parseInt(page));
    // Filter to only movies and TV shows
    const results = data.results.filter(
      (r: any) => r.media_type === "movie" || r.media_type === "tv"
    );
    return NextResponse.json({ results, total_pages: data.total_pages, total_results: data.total_results });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
