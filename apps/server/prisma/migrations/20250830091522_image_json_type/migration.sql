/*
  Warnings:

  - Changed the type of `images` on the `GuestHouse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `images` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."GuestHouse" DROP COLUMN "images",
ADD COLUMN     "images" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "public"."Room" DROP COLUMN "images",
ADD COLUMN     "images" JSONB NOT NULL;
