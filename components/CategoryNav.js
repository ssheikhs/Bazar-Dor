"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav({ categories }) {
  const pathname = usePathname();

  return (
    <nav aria-label="বিভাগসমূহ" className="max-w-6xl mx-auto px-4">
      <ul className="flex items-center gap-1 overflow-x-auto no-scrollbar py-2">
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const active = pathname === href;

          return (
            <li key={category.slug} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-content shadow-sm"
                    : "hover:bg-base-200 text-base-content/85"
                }`}
              >
                <span aria-hidden>{category.icon}</span>
                {category.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
