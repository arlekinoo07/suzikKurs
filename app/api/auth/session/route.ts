import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionUser } from "../../../../lib/db";

const SESSION_COOKIE = "bella-flower-session";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const user = getSessionUser(token);
  return NextResponse.json({ user: user ?? null });
}
