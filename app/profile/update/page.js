import Link from "next/link";
import { redirect } from "next/navigation";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getSession } from "@/lib/session";

export const metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?redirect=/profile/update");

  return (
    <div className="max-w-xl mx-auto px-4 py-8 sm:py-10">
      <Link href="/profile" className="link link-hover text-sm opacity-80">
        ← আমার প্রোফাইল
      </Link>
      <h1 className="mt-3 text-3xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="mt-1 text-sm opacity-70">আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।</p>

      <div className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-7">
        <UpdateProfileForm currentName={session.user.name ?? ""} />
      </div>
    </div>
  );
}
