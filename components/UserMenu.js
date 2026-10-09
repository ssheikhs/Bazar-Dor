"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";
import Avatar from "./Avatar";

export default function UserMenu({ user }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const menuRef = useRef(null);

  // Close the menu on outside click or Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (event) => {
      if (!menuRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function handleSignOut() {
    setSigningOut(true);
    const { error } = await signOut();
    setSigningOut(false);

    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }
    setOpen(false);
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  }

  const firstName = user.name?.split(" ")[0] || "প্রোফাইল";

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-xl px-1.5 py-1 hover:bg-base-200"
      >
        <Avatar user={user} size="size-9" />
        <span className="hidden sm:block max-w-32 truncate font-medium">{firstName}</span>
        <span className="text-xs opacity-70" aria-hidden>▾</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-60 rounded-2xl border border-base-300 bg-base-100 shadow-lg p-2 z-50"
        >
          <div className="px-3 py-2 border-b border-base-300 mb-1">
            <p className="font-semibold truncate">{user.name}</p>
            <p className="text-xs opacity-70 truncate">{user.email}</p>
          </div>
          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm hover:bg-base-200"
          >
            👤 আমার প্রোফাইল
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full text-left rounded-lg px-3 py-2 text-sm text-error hover:bg-error/10 disabled:opacity-60"
          >
            {signingOut ? "সাইন আউট হচ্ছে…" : "↩ সাইন আউট"}
          </button>
        </div>
      )}
    </div>
  );
}
