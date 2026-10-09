import { headers } from "next/headers";
import { auth } from "./auth";

/** Current session on the server, or null when logged out / auth unavailable. */
export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch {
    return null;
  }
}
