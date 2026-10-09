import { ProductGridSkeleton } from "@/components/Skeletons";

export default function CategoryLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-5">
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6 flex items-center gap-4">
        <div className="skeleton size-14 rounded-2xl" />
        <div className="space-y-2">
          <div className="skeleton h-7 w-32" />
          <div className="skeleton h-4 w-48" />
        </div>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 px-4 py-3 flex items-center justify-between">
        <div className="skeleton h-4 w-40" />
        <div className="skeleton h-9 w-52" />
      </div>
      <p className="text-sm opacity-70">লোড হচ্ছে…</p>
      <ProductGridSkeleton count={6} />
    </div>
  );
}
