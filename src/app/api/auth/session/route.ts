import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/session";

export async function GET() {
  const token = cookies().get("novaix_session")?.value;
  const session = await verifySessionToken(token, process.env.JWT_SECRET);

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    operator: session.sub,
    role: session.role
  });
}
