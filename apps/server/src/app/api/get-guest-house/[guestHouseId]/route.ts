import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ guestHouseId: string }> }
) {
  const { guestHouseId } = await params;
  const { session, response } = await requireAuth(req);

  if (!session) return response!;

  try {
    const guestHouse = await prisma.guestHouse.findUnique({
      where: { id: guestHouseId },
      include: { rooms: true },
    });

    return NextResponse.json(guestHouse, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest house:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest house" },
      { status: 500 }
    );
  }
}
