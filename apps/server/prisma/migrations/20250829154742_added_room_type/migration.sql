/*
  Warnings:

  - The `type` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."GuestHouseType" AS ENUM ('PRIVATE', 'SHARED');

-- CreateEnum
CREATE TYPE "public"."EachRoomType" AS ENUM ('SINGLE', 'DOUBLE', 'TWIN', 'DELUXE', 'SUITE', 'FAMILY', 'STUDIO', 'EXECUTIVE', 'PRESIDENTIAL');

-- AlterTable
ALTER TABLE "public"."GuestHouse" ADD COLUMN     "type" "public"."GuestHouseType" NOT NULL DEFAULT 'SHARED';

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "type",
ADD COLUMN     "type" "public"."EachRoomType" NOT NULL DEFAULT 'SINGLE';
