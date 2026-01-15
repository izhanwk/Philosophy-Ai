import { NextResponse } from "next/server";
import { Prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const philosophers = await Prisma.philosophers.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        image_url: true,
        description: true,
      },
    });

    return NextResponse.json({ philosophers });
  } catch (error) {
    console.error("Failed to fetch philosophers", error);
    return NextResponse.json(
      { error: "Failed to fetch philosophers" },
      { status: 500 }
    );
  }
}
