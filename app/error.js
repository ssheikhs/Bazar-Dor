"use client";

export default function Error({ reset }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center">
      <p className="text-5xl" aria-hidden>📡</p>
      <h1 className="mt-4 text-2xl font-bold">দামের তথ্য লোড করা যায়নি</h1>
      <p className="mt-2 opacity-70">ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।</p>
      <button type="button" onClick={() => reset()} className="btn btn-primary mt-6">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
