import Link from "next/link";
import { formatBnNumber, unitLabel } from "@/lib/bn";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span className="grid place-items-center size-12 rounded-xl bg-base-200 text-2xl shrink-0" aria-hidden>
          {product.image}
        </span>
        <div className="min-w-0">
          <h3 className="font-semibold text-lg leading-snug truncate group-hover:text-primary">
            {product.nameBn}
          </h3>
          <p className="text-sm opacity-70">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs opacity-70">আজকের দাম</p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-lg">
          <span className="text-2xl font-bold">{formatBnNumber(product.today)}</span> টাকা
        </p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
