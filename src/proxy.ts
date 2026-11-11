import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import { getAuthSecret } from "@/lib/auth-secret";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: getAuthSecret(),
  });

  const { pathname } = request.nextUrl;

  // Bỏ qua tất cả các API route
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Nếu đã có token và vào /login, chuyển về trang chủ
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Bypass xác thực cho bản demo UI/UX: Cho phép truy cập trực tiếp bằng tài khoản mặc định
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
