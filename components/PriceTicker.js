import Link from "next/link";
import { changeInfo, formatBnNumber, unitShort } from "@/lib/bn";

function TickerItem({ product }) {
  const change = changeInfo(product.change);
  const color =
    change.dir === "up" ? "text-error" : change.dir === "down" ? "text-primary" : "text-base-content/60";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex items-center gap-2 px-4 py-2 border-r border-base-300 whitespace-nowrap text-sm hover:bg-base-200"
    >
      <span aria-hidden>{product.image}</span>
      <span className="font-semibold">{product.nameBn}</span>
      <span className="opacity-80">
        {formatBnNumber(product.today)} টাকা/{unitShort(product.unit)}
      </span>
      <span className={`font-semibold ${color}`}>{change.label}</span>
    </Link>
  );
}

export default function PriceTicker({ products = [] }) {
  if (products.length === 0) return null;

  return (
    <div className="bg-base-100 border-b border-base-300 overflow-hidden" aria-label="আজকের দামের টিকার">
      {/* The list is rendered twice so the -50% translate loops seamlessly */}
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex" aria-hidden={copy === 1}>
            {products.map((product) => (
              <TickerItem key={`${copy}-${product.id}`} product={product} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
