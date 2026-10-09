import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// Read an env variable without stray spaces/new lines (easy to add by accident when pasting keys).
const env = (name) => process.env[name]?.trim() || undefined;

// One MongoDB client per server instance (reused across hot reloads in development).
const globalForMongo = globalThis;
const client =
  globalForMongo._bazarDorMongo ??
  new MongoClient(env("MONGODB_URI") || "mongodb://127.0.0.1:27017/bazardor");
if (process.env.NODE_ENV !== "production") globalForMongo._bazarDorMongo = client;

const db = client.db(env("MONGODB_DB") || "bazardor");

// Only enable a social provider when its keys are configured.
const socialProviders = {};
if (env("GOOGLE_CLIENT_ID") && env("GOOGLE_CLIENT_SECRET")) {
  socialProviders.google = {
    clientId: env("GOOGLE_CLIENT_ID"),
    clientSecret: env("GOOGLE_CLIENT_SECRET"),
  };
}
if (env("GITHUB_CLIENT_ID") && env("GITHUB_CLIENT_SECRET")) {
  socialProviders.github = {
    clientId: env("GITHUB_CLIENT_ID"),
    clientSecret: env("GITHUB_CLIENT_SECRET"),
  };
}

/** Return a clean origin ("https://example.com") or undefined if the value isn't a valid URL. */
function toOrigin(value) {
  if (!value) return undefined;
  try {
    const url = new URL(value.trim().startsWith("http") ? value.trim() : `https://${value.trim()}`);
    return url.origin;
  } catch {
    return undefined;
  }
}

const productionOrigin = toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL);

// Prefer BETTER_AUTH_URL, fall back to Vercel's production domain, otherwise let BetterAuth use the request origin.
const baseURL = toOrigin(process.env.BETTER_AUTH_URL) ?? productionOrigin;

const trustedOrigins = [
  baseURL,
  productionOrigin,
  toOrigin(process.env.VERCEL_URL),
  toOrigin(process.env.VERCEL_BRANCH_URL),
].filter(Boolean);

export const auth = betterAuth({
  appName: "বাজার দর",
  ...(baseURL ? { baseURL } : {}),
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // After sign up the user is sent to the sign in page, so don't log in automatically.
    autoSignIn: false,
  },
  socialProviders,
  trustedOrigins,
  plugins: [nextCookies()], // keep last
});
