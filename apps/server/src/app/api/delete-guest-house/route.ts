import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ guestHouseId: string }> }
) {
  const { guestHouseId } = await params;
  const user = await req.json();

  try {
    const guestHouse = await prisma.guestHouse.delete({
      where: { id: guestHouseId },
    });

    await prisma.activity.create({
      data: {
        action: "DELETE_GUEST_HOUSE",
        userId: user.id,
        guestHouseId: guestHouse.id,
        details: {
          status: "DELETE_GUEST_HOUSE",
          guestHouseName: guestHouse.name,
        },
      },
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
