import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/requireAuth";

export async function POST(req: Request) {
  const { data, user } = await req.json();
  const { session, response } = await requireAuth();

  if (!session) return response!;

  const autoApprove =
    user.role === "STAFF" || user.role === "ADMIN";

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: session.user.id,
        roomId: data.roomId,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        guests: data.guests,
        status: autoApprove ? "APPROVED" : "PENDING",
        approvedById: autoApprove ? session.user.id : null,
      },
    });

    if (autoApprove) {
      await prisma.room.update({
        where: { id: data.roomId },
        data: { occupiedById: session.user.id, availability: false },
      });
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    console.error("Error while booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
