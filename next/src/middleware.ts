import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = ["/signin", "/signup", "/handler"];
  const path = request.nextUrl.pathname;

  // Allow public paths
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const user = await stackServerApp.getUser();
  if (!user && path !== "/") {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Configure the paths that trigger the middleware
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};