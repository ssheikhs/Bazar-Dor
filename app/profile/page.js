import Link from "next/link";
import { redirect } from "next/navigation";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { bnToday } from "@/lib/bn";
import { getSession } from "@/lib/session";

export const metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?redirect=/profile");

  const { user } = session;
  const joined = user.createdAt ? bnToday(new Date(user.createdAt)) : "—";

  const rows = [
    { label: "নাম", value: user.name || "—" },
    { label: "ইমেইল", value: user.email },
    { label: "অ্যাকাউন্ট খোলার তারিখ", value: joined },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-10 space-y-5">
      <div>
        <h1 className="text-3xl font-bold">আমার প্রোফাইল</h1>
        <p className="mt-1 text-sm opacity-70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <Avatar user={user} size="size-16" text="text-2xl" />
        <div className="flex-1 min-w-0">
          <p className="text-xl font-bold truncate">{user.name}</p>
          <p className="text-sm opacity-70 truncate">{user.email}</p>
        </div>
        <SignOutButton />
      </section>

      <section className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-bold">তথ্য</h2>
          <Link href="/profile/update" className="btn btn-primary btn-sm sm:btn-md">
            ✏️ তথ্য আপডেট করুন
          </Link>
        </div>

        <dl className="divide-y divide-base-300">
          {rows.map((row) => (
            <div key={row.label} className="py-3 grid sm:grid-cols-3 gap-1">
              <dt className="text-sm opacity-70">{row.label}</dt>
              <dd className="sm:col-span-2 font-medium break-all">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
