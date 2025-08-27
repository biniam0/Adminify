import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
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
