import Link from "next/link";

export default function EmptyState({
  code,
  icon = "🧺",
  title = "কোনো পণ্য পাওয়া যায়নি",
  message = "এই বিভাগে এখন কোনো পণ্যের দাম নেই।",
}) {
  return (
    <div className="rounded-3xl border border-base-300 bg-base-100 px-6 py-16 text-center">
      {code ? (
        <p className="text-7xl sm:text-8xl font-bold text-primary/80">{code}</p>
      ) : (
        <p className="text-6xl" aria-hidden>{icon}</p>
      )}
      <h1 className="mt-4 text-2xl font-bold">{title}</h1>
      <p className="mt-2 opacity-70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
