import { redirect } from "next/navigation";
import AuthCard, { safeRedirect } from "@/components/AuthCard";
import SignInForm from "@/components/SignInForm";
import { getSession } from "@/lib/session";

export const metadata = { title: "সাইন ইন" };

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const redirectTo = safeRedirect(params?.redirect);

  // Already logged in → no need to see the form
  const session = await getSession();
  if (session) redirect(redirectTo);

  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে আপনার অ্যাকাউন্টে ঢুকুন।"
    >
      <SignInForm redirectTo={redirectTo} fromProtected={Boolean(params?.redirect)} />
    </AuthCard>
  );
}
