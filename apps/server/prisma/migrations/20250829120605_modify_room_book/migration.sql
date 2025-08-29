/*
  Warnings:

  - The `images` column on the `GuestHouse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `facilities` column on the `GuestHouse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `amenities` on the `Room` table. All the data in the column will be lost.
  - The `images` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `contact` on table `GuestHouse` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `accessibility` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beds` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hygiene_features` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kitchen_features` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `living_features` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `max_occupancy` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `square_meters` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `availability` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_roomId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "paymentStatus" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "transactionRef" TEXT;

-- AlterTable
ALTER TABLE "public"."GuestHouse" ADD COLUMN     "feedbacks" JSONB,
DROP COLUMN "images",
ADD COLUMN     "images" JSONB[],
DROP COLUMN "facilities",
ADD COLUMN     "facilities" TEXT[],
ALTER COLUMN "contact" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "amenities",
ADD COLUMN     "accessibility" JSONB NOT NULL,
ADD COLUMN     "beds" JSONB NOT NULL,
ADD COLUMN     "hygiene_features" JSONB NOT NULL,
ADD COLUMN     "kitchen_features" JSONB NOT NULL,
ADD COLUMN     "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "living_features" JSONB NOT NULL,
ADD COLUMN     "max_occupancy" INTEGER NOT NULL,
ADD COLUMN     "square_meters" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL,
DROP COLUMN "images",
ADD COLUMN     "images" JSONB[],
DROP COLUMN "availability",
ADD COLUMN     "availability" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "public"."About" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "guestHouseId" TEXT NOT NULL,

    CONSTRAINT "About_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Review" (
    "id" TEXT NOT NULL,
    "averageRating" DOUBLE PRECISION NOT NULL,
    "totalReviewers" INTEGER NOT NULL,
    "aboutId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Location" (
    "id" TEXT NOT NULL,
    "continent" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "subcity" TEXT NOT NULL,
    "nearby" TEXT,
    "guestHouseId" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "About_guestHouseId_key" ON "public"."About"("guestHouseId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_aboutId_key" ON "public"."Review"("aboutId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_guestHouseId_key" ON "public"."Location"("guestHouseId");

-- AddForeignKey
ALTER TABLE "public"."About" ADD CONSTRAINT "About_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Review" ADD CONSTRAINT "Review_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "public"."About"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Location" ADD CONSTRAINT "Location_guestHouseId_fkey" FOREIGN KEY ("guestHouseId") REFERENCES "public"."GuestHouse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
