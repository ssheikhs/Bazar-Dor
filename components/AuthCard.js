import Link from "next/link";

export default function AuthCard({ title, subtitle, children }) {
  return (
    <div className="max-w-md mx-auto px-4 py-10 sm:py-14">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-1 text-sm opacity-70">{subtitle}</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-7 shadow-sm">
        {children}
      </div>

      <p className="text-center mt-6">
        <Link href="/" className="link link-hover text-sm opacity-80">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}

/** Only allow internal paths as a post-login redirect target. */
export function safeRedirect(value, fallback = "/") {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
