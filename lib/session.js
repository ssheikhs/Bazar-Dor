import { headers } from "next/headers";
import { auth } from "./auth";

/** Current session on the server, or null when logged out / auth unavailable. */
export async function getSession() {
  // Read headers outside the try/catch so Next.js still treats the page as dynamic.
  const requestHeaders = await headers();

  try {
    return await auth.api.getSession({ headers: requestHeaders });
  } catch (error) {
    console.error("[auth] getSession failed:", error?.message);
    return null;
  }
}
