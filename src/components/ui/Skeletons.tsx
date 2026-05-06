export function PosterSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex-shrink-0" style={{ width: 160 }}>
          <div className="skeleton rounded-lg" style={{ width: 160, height: 240 }} />
          <div className="skeleton rounded mt-2" style={{ height: 12, width: "80%" }} />
          <div className="skeleton rounded mt-1" style={{ height: 12, width: "50%" }} />
        </div>
      ))}
    </>
  );
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col bg-cinema-charcoal rounded-xl overflow-hidden border border-cinema-gold/10">
          <div className="skeleton aspect-[2/3]" />
          <div className="p-3 flex flex-col gap-2">
            <div className="skeleton rounded" style={{ height: 14 }} />
            <div className="skeleton rounded" style={{ height: 12, width: "60%" }} />
            <div className="skeleton rounded mt-1" style={{ height: 32 }} />
          </div>
        </div>
      ))}
    </>
  );
}
