import { NextRequest, NextResponse } from "next/server";
import { getUserInfo } from "./services/authService";
import { appUrl } from "./app/config";

const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};
export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const userInfo = await getUserInfo();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`${appUrl}/login?redirectPath=${pathname}`, request.url),
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role]) {
    const routes = roleBasedPrivateRoutes[userInfo.role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL(`${appUrl}`, request.url));
};

export const config = {
  matcher: [
    "/login",
    "/create-shop",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};
