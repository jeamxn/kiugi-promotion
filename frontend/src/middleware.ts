import { NextRequest, NextResponse } from "next/server";
import { serverInstance } from "./utils/instance";

export const middleware = async (request: Readonly<NextRequest>) => {
  const origin = request.nextUrl.origin;
  const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("x-url", request.url);

  const response = NextResponse.next({
    request: {
      ...request,
      headers: requestHeaders,
    },
  });

  try {
    const userAgent = requestHeaders.get("user-agent");
    if (userAgent?.includes("KAKAOTALK")) {
      return NextResponse.redirect(`kakaotalk://web/openExternal?url=${encodeURIComponent(request.url)}`);
    }
    const exclude = ["/login", "/signup"];
    const isAuth = exclude.some((path) => request.url.includes(path));
    const { data } = await serverInstance.post(
      "/auth/check",
      {
        refresh_token: request.cookies.get("refresh_token")?.value ?? "",
      },
      {
        validateStatus: () => true,
      },
    );
    if (isAuth && data.success) {
      return NextResponse.redirect(new URL("/", origin));
    } else if (!isAuth && !data.success) {
      return NextResponse.redirect(new URL("/login", origin));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", origin));
  }
  return response;
};

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|public|cron|manifest.json).*)",
};
