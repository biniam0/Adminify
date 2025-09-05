-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."ActivityAction" ADD VALUE 'DELETE_GUEST_HOUSE';
ALTER TYPE "public"."ActivityAction" ADD VALUE 'UPDATE_GUEST_HOUSE';
ALTER TYPE "public"."ActivityAction" ADD VALUE 'DELETE_ROOM';
ALTER TYPE "public"."ActivityAction" ADD VALUE 'UPDATE_ROOM';
