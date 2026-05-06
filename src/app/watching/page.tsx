import { WatchlistPage } from "@/components/WatchlistPage";

export default function WatchingPage() {
  return (
    <WatchlistPage
      title="Currently Watching"
      subtitle="In Progress"
      filter="watching"
      emptyText="Nothing in progress. Mark something as Watching!"
    />
  );
}
