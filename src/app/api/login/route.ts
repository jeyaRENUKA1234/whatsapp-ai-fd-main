// src/app/api/login/route.ts
import { NextResponse } from "next/server";

const VALID_EMAIL = "admin@demo.com";
const VALID_PASSWORD = "password123";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const email = body?.email;
  const password = body?.password;

  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    return NextResponse.json(
      { success: false, message: "Invalid email or password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    success: true,
    message: "Logged in",
  });

  // Very simple session cookie (for demo)
  res.cookies.set("admin_session", "logged-in", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 4, // 4 hours
  });

  return res;
}
