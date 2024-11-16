// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/login", "/register"];

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname;

  // Check if the path is public
  const isPublicPath = publicRoutes.includes(path);

  // Get token from cookies
  const token = request.cookies.get("token")?.value || "";

  // Redirect logic for protected routes
  if (!isPublicPath && !token) {
    // Store the original intended URL to redirect back after login
    const url = new URL("/login", request.url);
    // url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Redirect logic for login page when user is already authenticated
  if (isPublicPath && token && path !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
