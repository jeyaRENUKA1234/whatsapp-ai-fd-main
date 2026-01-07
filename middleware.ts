// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/login";
  const isRootRoute = pathname === "/home";

  const hasSession = req.cookies.get("admin_session")?.value === "logged-in";

  // Root route redirect
  if (isRootRoute && !hasSession) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/home";
    return NextResponse.redirect(loginUrl);
  }
  // Protect /admin routes
  if (isAdminRoute && !hasSession) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname); // optional: where user came from
    return NextResponse.redirect(loginUrl);
  }

  // If already logged in, redirect /login -> /admin
  if (isLoginRoute && hasSession) {
    const dashboardUrl = req.nextUrl.clone();
    dashboardUrl.pathname = "/admin";
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};

