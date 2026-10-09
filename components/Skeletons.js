export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4" aria-hidden>
      <div className="flex items-center gap-3">
        <div className="skeleton size-12 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>
      <div className="skeleton h-3 w-16 mt-5" />
      <div className="flex items-center justify-between mt-2">
        <div className="skeleton h-6 w-24" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" role="status" aria-label="লোড হচ্ছে…">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
      <span className="sr-only">লোড হচ্ছে…</span>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-10 grid md:grid-cols-[1fr_auto] gap-8" aria-hidden>
      <div className="space-y-4">
        <div className="skeleton h-6 w-40 rounded-full" />
        <div className="skeleton h-10 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-2/3" />
        <div className="skeleton h-11 w-36 mt-6" />
      </div>
      <div className="skeleton h-48 md:h-72 md:w-72 rounded-3xl" />
    </div>
  );
}
