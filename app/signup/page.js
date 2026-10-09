import { redirect } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import SignUpForm from "@/components/SignUpForm";
import { getSession } from "@/lib/session";

export const metadata = { title: "সাইন আপ" };

export default async function SignUpPage() {
  const session = await getSession();
  if (session) redirect("/");

  return (
    <AuthCard title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <SignUpForm />
    </AuthCard>
  );
}
