import { NextRequest } from "next/server";

export async function GET(params: NextRequest) {
  return Response.json({ message: "Success" }, { status: 200 });
}
