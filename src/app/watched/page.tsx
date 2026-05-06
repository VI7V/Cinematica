import { WatchlistPage } from "@/components/WatchlistPage";

export default function WatchedPage() {
  return (
    <WatchlistPage
      title="Watched & Completed"
      subtitle="Your Achievements"
      filterFn={(item) => item.status === "watched"}
      emptyText="Nothing completed yet. Keep watching!"
    />
  );
}
