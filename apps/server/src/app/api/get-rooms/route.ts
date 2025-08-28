import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  
    const { session, response } = await requireAuth(req);
  
    if (!session) return response!;
  
  try {
    const rooms = await prisma.room.findMany();

    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest houses:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest houses" },
      { status: 500 }
    );
  }
}
