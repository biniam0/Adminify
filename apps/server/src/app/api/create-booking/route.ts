import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { data, user } = await req.json();

  // const { session, response } = await requireAuth();
  // if (!session) return response!;

  const autoApprove = user.role === "STAFF" || user.role === "ADMIN";

  try {
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        roomId: data.roomId,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        guests: data.guests,
        status: autoApprove ? "APPROVED" : "PENDING",
        approvedById: autoApprove ? user.id : null,
      },
    });

    if (autoApprove) {
      await prisma.room.update({
        where: { id: data.roomId },
        data: { occupiedById: user.id, availability: false },
      });
    }

    await prisma.activity.create({
      data: {
        action: "BOOKED",
        userId: user.id,
        bookingId: booking.id,
        roomId: data.roomId,
        guestHouseId: data.guestHouseId,
        details: {
          autoApproved: autoApprove,
          status: booking.status,
        },
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    console.error("Error while booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
