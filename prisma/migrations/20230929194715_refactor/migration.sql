/*
  Warnings:

  - The primary key for the `PlaygroundEquipment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PlaygroundEquipment` table. All the data in the column will be lost.
  - The primary key for the `UserPlayground` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserPlayground` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlaygroundEquipment" DROP CONSTRAINT "PlaygroundEquipment_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "PlaygroundEquipment_pkey" PRIMARY KEY ("playgroundId", "equipmentId");

-- AlterTable
ALTER TABLE "UserPlayground" DROP CONSTRAINT "UserPlayground_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserPlayground_pkey" PRIMARY KEY ("userId", "playgroundId");
