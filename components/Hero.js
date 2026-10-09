import Image from "next/image";
import { bnToday, toBnDigits } from "@/lib/bn";

export default function Hero({ productCount = 0, marketCount = 0, divisionCount = 0 }) {
  const stats = [
    { label: "পণ্য", value: productCount, note: "নিত্যপ্রয়োজনীয় পণ্য" },
    { label: "বাজার", value: marketCount, note: "অন্তর্ভুক্ত বাজার" },
    { label: "বিভাগ", value: divisionCount, note: "বিভাগের তথ্য" },
  ];

  return (
    <section className="rounded-3xl border border-base-300 bg-base-100 p-6 sm:p-10 grid md:grid-cols-[1fr_auto] items-center gap-8 overflow-hidden">
      <div>
        <span className="inline-block rounded-full bg-accent text-accent-content text-sm font-medium px-3 py-1">
          {bnToday()}
        </span>

        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-4 text-base sm:text-lg opacity-80 max-w-2xl">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
          সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {/* Anchor link — scrolls to the all-products section on the same page */}
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">
            সব পণ্য দেখুন
          </a>
          <a href="#দাম-বেড়েছে" className="btn btn-outline btn-sm sm:btn-md">
            ⚖️ আজকের পরিবর্তন
          </a>
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-3 max-w-md">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-base-200 p-3">
              <dt className="text-xs opacity-70">{stat.label}</dt>
              <dd className="text-2xl font-bold text-primary">{toBnDigits(stat.value)}</dd>
              <dd className="text-[11px] opacity-70 leading-tight">{stat.note}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid place-items-center h-48 md:h-72 md:w-72 rounded-3xl bg-accent">
        <Image
          src="/bazar-hero.png"
          alt="সবজি ও ফলভর্তি বাজারের ঝুড়ি"
          width={315}
          height={263}
          priority
          className="w-44 md:w-60 h-auto"
        />
      </div>
    </section>
  );
}
