"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authErrorMessage, signIn } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

const PROVIDERS = [
  { id: "google", label: "Google দিয়ে চালিয়ে যান", Icon: GoogleIcon },
  { id: "github", label: "GitHub দিয়ে চালিয়ে যান", Icon: GitHubIcon },
];

export default function SocialButtons({ callbackURL = "/" }) {
  const [loading, setLoading] = useState(null);

  async function handleSocial(provider) {
    setLoading(provider);
    const { error } = await signIn.social({ provider, callbackURL });
    // On success the browser is redirected to Google/GitHub, so we only handle errors here.
    if (error) {
      setLoading(null);
      toast.error(authErrorMessage(error, "সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন।"));
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2">
      {PROVIDERS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => handleSocial(id)}
          disabled={loading !== null}
          className="btn btn-outline border-base-300 bg-base-100 hover:bg-base-200 hover:border-base-300 text-base-content font-medium"
        >
          {loading === id ? <span className="loading loading-spinner loading-sm" /> : <Icon />}
          {label}
        </button>
      ))}
    </div>
  );
}
