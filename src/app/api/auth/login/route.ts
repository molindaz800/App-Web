import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(request: Request) {
  const { username, password } = (await request.json()) as { username?: string; password?: string };
  const expectedUser = process.env.NOVAIX_USER ?? "prime";
  const expectedPassword = process.env.NOVAIX_PASSWORD ?? "novaix";

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

  const token = jwt.sign(
    {
      sub: username,
      role: "operator",
      platform: "NOVAIX OS"
    },
    process.env.JWT_SECRET ?? "novaix-local-development-secret",
    { expiresIn: "8h" }
  );

  return NextResponse.json({
    token,
    operator: "PRIME ACCESS",
    message: "Bienvenido a la infraestructura cognitiva"
  });
}
