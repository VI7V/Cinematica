import { WatchlistPage } from "@/components/WatchlistPage";

export default function MoviesPage() {
  return (
    <WatchlistPage
      title="Movies"
      subtitle="Your Cinema Collection"
      filter="movie"
      emptyText="No movies yet. Use search to add some!"
    />
  );
}
