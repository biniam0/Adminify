import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";
import { NextResponse } from "next/server";

export async function GET() {
  const { session, response } = await requireAuth();
  if (!session) return response!;

  try {
    const guestHouses = await prisma.guestHouse.findMany({
      include: {
        rooms: true,
      },
    });

    return NextResponse.json(guestHouses, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest houses:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest houses" },
      { status: 500 }
    );
  }
}
