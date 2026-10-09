import Image from "next/image";
import Link from "next/link";
import { bnToday } from "@/lib/bn";
import CategoryNav from "./CategoryNav";
import NavAuth from "./NavAuth";

export default function Navbar({ categories = [], user = null }) {
  return (
    <header className="bg-base-100 border-b border-base-300 sticky top-0 z-40">
      {/* Row 1 — logo + date / auth */}
      <div className="max-w-6xl mx-auto px-4 h-16 sm:h-[68px] flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5 min-w-0" aria-label="বাজার দর — হোম">
          <span className="grid place-items-center size-10 rounded-xl bg-primary shrink-0">
            <Image src="/logo-icon.png" alt="" width={22} height={22} className="brightness-0 invert" priority />
          </span>
          <span className="min-w-0">
            <span className="block text-lg sm:text-xl font-bold leading-tight">বাজার দর</span>
            <span className="block text-[11px] sm:text-xs opacity-70 truncate">{bnToday()}</span>
          </span>
        </Link>

        <NavAuth user={user} />
      </div>

      {/* Row 2 — category links */}
      <div className="border-t border-base-300">
        <CategoryNav categories={categories} />
      </div>
    </header>
  );
}
