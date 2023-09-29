/*
  Warnings:

  - Added the required column `updatedAt` to the `PlaygroundEquipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserPlayground` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlaygroundEquipment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserPlayground" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
