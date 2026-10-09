"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authErrorMessage, updateUser } from "@/lib/auth-client";

export default function UpdateProfileForm({ currentName }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = name.trim();

    if (trimmed.length < 2) {
      const message = "নাম কমপক্ষে ২ অক্ষরের হতে হবে।";
      setError(message);
      toast.error(message);
      return;
    }
    if (trimmed === currentName) {
      toast("নামে কোনো পরিবর্তন করা হয়নি।", { icon: "ℹ️" });
      return;
    }

    setLoading(true);
    setError("");
    // BetterAuth: https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      const message = authErrorMessage(error, "তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন।");
      setError(message);
      toast.error(message);
      return;
    }

    toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে।");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <label className="block">
        <span className="text-sm font-medium">নাম</span>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          placeholder="যেমন: রহিম উদ্দিন"
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
        তথ্য আপডেট করুন
      </button>
    </form>
  );
}
