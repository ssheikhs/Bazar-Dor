"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authErrorMessage, signUp } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ name, email, password, confirmPassword }) {
  if (!name || !email || !password || !confirmPassword) return "সব ঘর পূরণ করুন।";
  if (name.length < 2) return "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
  if (!EMAIL_PATTERN.test(email)) return "সঠিক ইমেইল ঠিকানা লিখুন।";
  if (password.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
  if (password !== confirmPassword) return "দুটি পাসওয়ার্ড মিলছে না।";
  return "";
}

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      name: form.get("name").trim(),
      email: form.get("email").trim(),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    };

    const validationError = validate(values);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setLoading(true);
    setError("");
    const { error } = await signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setLoading(false);

    if (error) {
      const message = authErrorMessage(error);
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <label className="block">
          <span className="text-sm font-medium">নাম</span>
          <input name="name" type="text" autoComplete="name" placeholder="যেমন: রহিম উদ্দিন" className="input w-full mt-1" required />
        </label>

        <label className="block">
          <span className="text-sm font-medium">ইমেইল</span>
          <input name="email" type="email" autoComplete="email" placeholder="you@example.com" className="input w-full mt-1" required />
        </label>

        <label className="block">
          <span className="text-sm font-medium">পাসওয়ার্ড</span>
          <input name="password" type="password" autoComplete="new-password" placeholder="কমপক্ষে ৮ অক্ষর" className="input w-full mt-1" required minLength={8} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input name="confirmPassword" type="password" autoComplete="new-password" placeholder="আবার লিখুন" className="input w-full mt-1" required />
        </label>

        {error && (
          <p role="alert" className="text-sm text-error bg-error/10 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <div className="divider text-xs opacity-70 my-5">অথবা</div>
      <SocialButtons callbackURL="/" />

      <p className="text-center text-sm mt-5">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="link link-primary font-semibold">
          সাইন ইন করুন
        </Link>
      </p>
    </>
  );
}
