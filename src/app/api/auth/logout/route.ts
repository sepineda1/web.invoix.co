import { jsonOk, clearSession } from "@/lib/http";

export async function POST() {
  return clearSession(jsonOk());
}
