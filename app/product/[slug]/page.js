import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getPriceSummary, getProductBySlug } from "@/lib/api";
import { changeInfo, formatBnNumber, formatBnPrice, unitLabel, unitShort } from "@/lib/bn";
import { getSession } from "@/lib/session";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  return { title: product ? `${product.nameBn}-এর আজকের দাম` : "পণ্য পাওয়া যায়নি" };
}

function SummaryCard({ label, value, note, tone }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-4 sm:p-5">
      <p className="text-sm opacity-70">{label}</p>
      <p className={`mt-1 text-2xl sm:text-3xl font-bold ${tone}`}>
        {formatBnNumber(value)} <span className="text-base font-medium">টাকা</span>
      </p>
      {note && <p className="mt-1 text-xs opacity-70">{note}</p>}
    </div>
  );
}

export default async function ProductDetailsPage({ params }) {
  const { slug } = await params;

  // Protected route — logged-out visitors go to sign in and come back here afterwards.
  const session = await getSession();
  if (!session) redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const summary = getPriceSummary(product);
  const change = changeInfo(product.change);
  const diff = product.today - product.yesterday;
  const unit = unitShort(product.unit);

  const history = [
    { label: "আজ", value: product.today },
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ].filter((item) => item.value != null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb */}
      <nav className="breadcrumbs text-sm py-0" aria-label="ব্রেডক্রাম্ব">
        <ul>
          <li><Link href="/">হোম</Link></li>
          <li><Link href={`/category/${product.category}`}>{product.categoryNameBn}</Link></li>
          <li className="opacity-70">{product.nameBn}</li>
        </ul>
      </nav>

      {/* Summary */}
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-7 flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
          <span className="grid place-items-center size-16 sm:size-20 rounded-2xl bg-base-200 text-4xl sm:text-5xl shrink-0" aria-hidden>
            {product.image}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-4xl font-bold leading-tight">{product.nameBn}</h1>
            <p className="mt-1 text-sm opacity-70">
              {unitLabel(product.unit)} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm">
              গতকালের তুলনায় আজ দাম <strong>{change.word}</strong>
              {diff !== 0 && <> · {formatBnNumber(Math.abs(diff))} টাকা</>}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href={`/category/${product.category}`} className="badge badge-outline badge-primary">
                {product.categoryIcon} {product.categoryNameBn}
              </Link>
              <span className="badge badge-ghost">{unitLabel(product.unit)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-base-200 px-6 py-4 text-center md:min-w-48">
          <p className="text-sm opacity-70">আজকের দাম</p>
          <p className="text-4xl font-bold">{formatBnNumber(product.today)}</p>
          <p className="text-sm opacity-80">টাকা / {unit}</p>
          <ChangeBadge change={product.change} className="mt-2" />
        </div>
      </section>

      {/* Price summary */}
      <section className="rounded-3xl border border-base-300 bg-base-100 p-5 sm:p-7">
        <h2 className="text-xl font-bold mb-4">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <SummaryCard
            label="সর্বনিম্ন দাম"
            value={summary.min}
            tone="text-primary"
            note={summary.cheapest ? `সবচেয়ে কম দামের বাজার: ${summary.cheapest.market}` : null}
          />
          <SummaryCard
            label="সর্বাধিক দাম"
            value={summary.max}
            tone="text-error"
            note={summary.costliest ? `সবচেয়ে বেশি দামের বাজার: ${summary.costliest.market}` : null}
          />
          <SummaryCard
            label="গড় দাম"
            value={Math.round(summary.avg * 100) / 100}
            tone="text-primary"
            note={`${unitLabel(product.unit)}-এর হিসাবে`}
          />
        </div>

        {history.length > 1 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {history.map((item) => (
              <div key={item.label} className="rounded-xl bg-base-200 px-4 py-3">
                <p className="text-xs opacity-70">{item.label}</p>
                <p className="font-semibold">{formatBnPrice(item.value)}</p>
              </div>
            ))}
          </div>
        )}

        {/* Market-wise prices */}
        <h2 className="text-xl font-bold mt-8 mb-4">বাজারভিত্তিক আজকের দাম</h2>
        {summary.markets.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="table table-zebra">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {summary.markets.map((market) => (
                  <tr key={`${market.market}-${market.division}`}>
                    <td className="font-medium whitespace-nowrap">{market.market}</td>
                    <td className="whitespace-nowrap">{market.division}</td>
                    <td className="text-right whitespace-nowrap">{formatBnPrice(market.min)}</td>
                    <td className="text-right whitespace-nowrap">{formatBnPrice(market.max)}</td>
                    <td className="text-right whitespace-nowrap font-semibold">{formatBnPrice(market.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="opacity-70">এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।</p>
        )}
      </section>
    </div>
  );
}
