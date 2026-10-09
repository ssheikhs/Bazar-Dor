"use client";

import { useMemo, useState } from "react";
import { toBnDigits } from "@/lib/bn";
import ProductGrid from "./ProductGrid";

const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortableProducts({ products }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    // Prices are numbers in the API — sort numerically, then show them in Bangla digits.
    const list = [...products];
    if (sort === "price-asc") list.sort((a, b) => Number(a.today) - Number(b.today));
    if (sort === "price-desc") list.sort((a, b) => Number(b.today) - Number(a.today));
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="rounded-2xl border border-base-300 bg-base-100 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm opacity-70">মোট {toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে</p>

        <label className="flex items-center gap-2 text-sm">
          <span className="font-medium">সাজান</span>
          <select
            className="select select-sm sm:select-md w-52"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5">
        <ProductGrid products={sorted} />
      </div>
    </>
  );
}
