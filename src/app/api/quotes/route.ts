export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { db, schema } from "@/lib/db";

export async function GET() {
  const data = await db.select().from(schema.quotes);
  return NextResponse.json(data);
}
