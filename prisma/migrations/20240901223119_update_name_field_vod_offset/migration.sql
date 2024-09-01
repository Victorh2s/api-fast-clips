/*
  Warnings:

  - You are about to drop the column `vod_offseat` on the `Clip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Clip" DROP COLUMN "vod_offseat",
ADD COLUMN     "vod_offset" INTEGER;
