import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { readAccessToken } from "@/lib/authCookies";

export async function proxy(req: NextRequest) {
  const tokenFromCookie = readAccessToken(req);
  const token = tokenFromCookie;

  const jwtSecret = process.env.JWT_SECRET;
  if (token && token !== "undefined" && token !== "null" && jwtSecret) {
    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      const requestHeaders = new Headers(req.headers);
      if (decoded?.userId !== undefined && decoded?.userId !== null) {
        requestHeaders.set("x-user-id", String(decoded.userId));
      }
      if (decoded?.email) {
        requestHeaders.set("x-user-email", String(decoded.email));
      }
      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    } catch {
      // fall through to denied response
    }
  }

  return NextResponse.json({ message: "Token failed" }, { status: 403 });
}

export const config = {
  matcher: ["/api/token", "/api/chat", "/api/chat/history"],
};
