/*
  Warnings:

  - You are about to drop the column `playgroundId` on the `Equipment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Equipment" DROP CONSTRAINT "Equipment_playgroundId_fkey";

-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "playgroundId";

-- CreateTable
CREATE TABLE "_EquipmentToPlayground" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EquipmentToPlayground_AB_unique" ON "_EquipmentToPlayground"("A", "B");

-- CreateIndex
CREATE INDEX "_EquipmentToPlayground_B_index" ON "_EquipmentToPlayground"("B");

-- AddForeignKey
ALTER TABLE "_EquipmentToPlayground" ADD CONSTRAINT "_EquipmentToPlayground_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EquipmentToPlayground" ADD CONSTRAINT "_EquipmentToPlayground_B_fkey" FOREIGN KEY ("B") REFERENCES "Playground"("id") ON DELETE CASCADE ON UPDATE CASCADE;
