import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/requireAuth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ pendingBookId: string }> }
) {
  const { pendingBookId } = await params;
  const { status } = await req.json();
  const { session, response } = await requireAuth();

  if (!session) return response!;

  if (session.user.role !== "STAFF" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: pendingBookId },
      data: {
        status,
        approvedById: session.user.id,
      },
      include: {
        user: true,
        room: true,
      },
    });

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error fetching guest house:", error);
    return NextResponse.json(
      { error: "Failed to fetch guest house" },
      { status: 500 }
    );
  }
}
