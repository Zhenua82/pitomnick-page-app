import { cookies } from "next/headers";

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "true";
}
