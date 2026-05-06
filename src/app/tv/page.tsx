import { WatchlistPage } from "@/components/WatchlistPage";

export default function TVPage() {
  return (
    <WatchlistPage
      title="TV Shows"
      subtitle="Your Series Collection"
      filterFn={(item) => item.type === "tv"}
      emptyText="No TV shows yet. Use search to add some!"
    />
  );
}
