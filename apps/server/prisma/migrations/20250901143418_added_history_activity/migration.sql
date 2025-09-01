-- CreateEnum
CREATE TYPE "public"."ActivityAction" AS ENUM ('BOOKED', 'UPDATED_BOOKING', 'CANCELLED_BOOKING', 'APPROVED_BOOKING', 'REJECTED_BOOKING', 'CHECKED_IN', 'CHECKED_OUT', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'USER_BANNED', 'USER_UNBANNED');

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_roomId_fkey";

-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "guestHouseId" TEXT;

-- AlterTable
ALTER TABLE "public"."GuestHouse" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."history" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "totalRooms" INTEGER NOT NULL,
    "occupiedRooms" INTEGER NOT NULL,
    "occupancyRate" DOUBLE PRECISION NOT NULL,
    "totalReservations" INTEGER NOT NULL,
    "totalIncome" DOUBLE PRECISION NOT NULL,
    "averageDailyRate" DOUBLE PRECISION NOT NULL,
    "revPAR" DOUBLE PRECISION NOT NULL,
    "totalProfit" DOUBLE PRECISION NOT NULL,
    "gopPAR" DOUBLE PRECISION,
    "averageLengthOfStay" DOUBLE PRECISION,
    "bookingPace" INTEGER,
    "averageLeadTime" DOUBLE PRECISION,
    "directBookings" INTEGER,
    "otaBookings" INTEGER,
    "groupBookings" INTEGER,
    "avgRating" DOUBLE PRECISION,
    "npsScore" DOUBLE PRECISION,
    "guestHouseId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."activity" (
    "id" TEXT NOT NULL,
    "action" "public"."ActivityAction" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "bookingId" TEXT,
    "roomId" TEXT,
    "guestHouseId" TEXT,
    "historyId" TEXT,
    "details" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "history_date_key" ON "public"."history"("date");

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."history" ADD CONSTRAINT "history_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."activity" ADD CONSTRAINT "activity_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "public"."history"("id") ON DELETE SET NULL ON UPDATE CASCADE;
