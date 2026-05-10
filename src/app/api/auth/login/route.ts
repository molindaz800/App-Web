import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { createSessionToken } from "@/lib/session";

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as { username?: string; password?: string };
  const expectedUser = process.env.NOVAIX_USER;
  const expectedPassword = process.env.NOVAIX_PASSWORD;
  const sessionSecret = process.env.JWT_SECRET;

  if (!expectedUser || !expectedPassword || !sessionSecret) {
    return NextResponse.json({ message: "NOVAIX OS no tiene credenciales privadas configuradas" }, { status: 503 });
  }

  const pool = getPool();
  if (pool) {
    await pool.query(
      "create table if not exists login_events (id bigserial primary key, username text not null, created_at timestamptz default now())"
    );
    await pool.query("insert into login_events (username) values ($1)", [username ?? "unknown"]);
  }

  if (username !== expectedUser || password !== expectedPassword) {
    return NextResponse.json({ message: "Credenciales no autorizadas" }, { status: 401 });
  }

  const token = await createSessionToken(username, sessionSecret);

  const response = NextResponse.json({
    operator: "PRIME ACCESS",
    message: "Bienvenido a la infraestructura cognitiva"
  });

  response.cookies.set("novaix_session", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60
  });

  return response;
}
