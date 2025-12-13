import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader && authHeader.slice(7).trim();
  const secret = process.env.JWT_SECRET;
  if (token && secret) {
    try {
      const decoded = jwt.verify(token, secret) as JwtPayload;
      return Response.json({ message: decoded.email }, { status: 200 });
    } catch {
      return Response.json({ message: "Error" }, { status: 404 });
    }
  }
}
