import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { getAuthSecret } from "@/lib/auth-secret";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: getAuthSecret(),
  });

  const { pathname } = request.nextUrl;

  // Bỏ qua tất cả các API route, để API route tự xử lý status 401 hoặc session
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "callbackUrl",
      `${pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
