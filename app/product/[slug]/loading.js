export default function ProductLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-4 w-48" />
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-7 flex flex-col md:flex-row gap-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="skeleton size-20 rounded-2xl" />
          <div className="space-y-3 flex-1">
            <div className="skeleton h-9 w-1/2" />
            <div className="skeleton h-4 w-1/3" />
            <div className="skeleton h-4 w-2/3" />
          </div>
        </div>
        <div className="skeleton h-32 md:w-48 rounded-2xl" />
      </div>
      <div className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-7 space-y-4">
        <div className="skeleton h-6 w-40" />
        <div className="grid sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => <div key={i} className="skeleton h-24 rounded-2xl" />)}
        </div>
        <div className="skeleton h-6 w-56 mt-6" />
        {[0, 1, 2, 3, 4].map((i) => <div key={i} className="skeleton h-10 w-full" />)}
      </div>
      <span className="sr-only">লোড হচ্ছে…</span>
    </div>
  );
}
