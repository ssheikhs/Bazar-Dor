import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// One MongoDB client per server instance (reused across hot reloads in development).
const globalForMongo = globalThis;
const client =
  globalForMongo._bazarDorMongo ??
  new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bazardor");
if (process.env.NODE_ENV !== "production") globalForMongo._bazarDorMongo = client;

const db = client.db(process.env.MONGODB_DB || "bazardor");

// Only enable a social provider when its keys are configured.
const socialProviders = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

const trustedOrigins = [
  process.env.BETTER_AUTH_URL,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
].filter(Boolean);

export const auth = betterAuth({
  appName: "বাজার দর",
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
