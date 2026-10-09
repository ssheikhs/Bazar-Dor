import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;

// Friendly Bangla messages for common BetterAuth error codes.
const ERROR_MESSAGES = {
  USER_ALREADY_EXISTS: "এই ইমেইল দিয়ে আগেই একটি অ্যাকাউন্ট খোলা হয়েছে।",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "এই ইমেইল দিয়ে আগেই একটি অ্যাকাউন্ট খোলা হয়েছে।",
  INVALID_EMAIL_OR_PASSWORD: "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।",
  INVALID_EMAIL: "সঠিক ইমেইল ঠিকানা লিখুন।",
  PASSWORD_TOO_SHORT: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
  PASSWORD_TOO_LONG: "পাসওয়ার্ড অনেক বড় হয়ে গেছে।",
};

export function authErrorMessage(error, fallback = "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।") {
  if (!error) return fallback;
  return ERROR_MESSAGES[error.code] ?? error.message ?? fallback;
}
