import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/anggota",
  "/super-admin",
];

export function middleware(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname;

  const isProtected =
    protectedRoutes.some(route =>
      pathname.startsWith(route)
    );

  if (!isProtected)
    return NextResponse.next();

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/anggota/:path*",
    "/super-admin/:path*",
  ],
};