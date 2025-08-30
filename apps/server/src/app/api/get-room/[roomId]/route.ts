import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;
  
    const { session, response } = await requireAuth();
  
    if (!session) return response!;
  

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Failed to fetch room" },
      { status: 500 }
    );
  }
}
