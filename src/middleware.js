import { NextResponse } from "next/server";
import { StorageKeys } from "./constants/storage-keys";

export function middleware(request) {
  const token = request?.cookies?.get(StorageKeys.Token)?.value;

  const allowedRoutes = ["/home", "/orders", "/sales", "/checkout", "/account"];

  let isAllowedRoute = false;

  allowedRoutes.forEach((route) => {
    if (request.nextUrl.pathname.startsWith(route)) {
      isAllowedRoute = true;
      return;
    }
  });
  if (isAllowedRoute) {
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

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
