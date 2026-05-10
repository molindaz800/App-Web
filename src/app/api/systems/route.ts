import { NextResponse } from "next/server";
import { systems } from "@/lib/systems";

export async function GET() {
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    systems: systems.map(({ icon: _icon, ...system }) => system)
  });
}
