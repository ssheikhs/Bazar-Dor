import { HeroSkeleton, ProductGridSkeleton } from "@/components/Skeletons";

export default function HomeLoading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-14">
      <HeroSkeleton />
      <section>
        <div className="skeleton h-7 w-48 mb-5" />
        <ProductGridSkeleton count={6} />
      </section>
      <section>
        <div className="skeleton h-7 w-48 mb-5" />
        <ProductGridSkeleton count={6} />
      </section>
    </div>
  );
}
