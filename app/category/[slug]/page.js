import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import SortableProducts from "@/components/SortableProducts";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBnDigits } from "@/lib/bn";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug).catch(() => null);
  return { title: category ? `${category.nameBn}-এর দাম` : "বিভাগ পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const [category, products] = await Promise.all([getCategory(slug), getProductsByCategory(slug)]);

  // Invalid category slug → friendly 404 page
  if (!category) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-5">
      <header className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6 flex items-center gap-4">
        <span className="grid place-items-center size-14 rounded-2xl bg-base-200 text-3xl" aria-hidden>
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-sm opacity-70">
            {toBnDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </header>

      {products.length > 0 ? (
        <SortableProducts products={products} />
      ) : (
        <EmptyState
          code="৪০৪"
          title="এই বিভাগে কোনো পণ্য পাওয়া যায়নি"
          message="অনুগ্রহ করে অন্য একটি বিভাগ বেছে নিন।"
        />
      )}
    </div>
  );
}
