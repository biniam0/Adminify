/*
  Warnings:

  - The `contact` column on the `GuestHouse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('GUEST', 'STAFF', 'ADMIN');

-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_guestHouseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Room" DROP CONSTRAINT "Room_occupiedById_fkey";

-- AlterTable
ALTER TABLE "public"."GuestHouse" DROP COLUMN "contact",
ADD COLUMN     "contact" JSONB;

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "role",
ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'GUEST';

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "guests" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "approvedById" TEXT,
    "paymentInfo" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Room" ADD CONSTRAINT "Room_occupiedById_fkey" FOREIGN KEY ("occupiedById") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
