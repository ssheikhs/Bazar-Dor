"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authErrorMessage, signIn } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm({ redirectTo = "/", fromProtected = false }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Explain why the user landed here when a protected page sent them
  useEffect(() => {
    if (fromProtected) {
      toast("বিস্তারিত দাম দেখতে আগে সাইন ইন করুন।", { icon: "🔒", id: "protected-route" });
    }
  }, [fromProtected]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    if (!email || !password) {
      const message = "ইমেইল ও পাসওয়ার্ড দুটোই লিখুন।";
      setError(message);
      toast.error(message);
      return;
    }

    setLoading(true);
    setError("");
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const message = authErrorMessage(error);
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে। স্বাগতম!");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block">
          <span className="text-sm font-medium">ইমেইল</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input w-full mt-1"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">পাসওয়ার্ড</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input w-full mt-1"
            required
          />
        </label>

        {error && (
          <p role="alert" className="text-sm text-error bg-error/10 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>

      <div className="divider text-xs opacity-70 my-5">অথবা</div>
      <SocialButtons callbackURL={redirectTo} />

      <p className="text-center text-sm mt-5">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="link link-primary font-semibold">
          সাইন আপ করুন
        </Link>
      </p>
    </>
  );
}
