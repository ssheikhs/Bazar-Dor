"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton({ className = "" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const { error } = await signOut();
    setLoading(false);

    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`btn btn-outline btn-error btn-sm sm:btn-md ${className}`}
    >
      {loading ? <span className="loading loading-spinner loading-sm" /> : "↩"} সাইন আউট
    </button>
  );
}
