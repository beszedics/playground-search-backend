/*
  Warnings:

  - You are about to drop the `_EquipmentToPlayground` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EquipmentToPlayground" DROP CONSTRAINT "_EquipmentToPlayground_A_fkey";

-- DropForeignKey
ALTER TABLE "_EquipmentToPlayground" DROP CONSTRAINT "_EquipmentToPlayground_B_fkey";

-- DropTable
DROP TABLE "_EquipmentToPlayground";

-- CreateTable
CREATE TABLE "PlaygroundEquipment" (
    "id" SERIAL NOT NULL,
    "playgroundId" INTEGER NOT NULL,
    "equipmentId" INTEGER NOT NULL,

    CONSTRAINT "PlaygroundEquipment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlaygroundEquipment" ADD CONSTRAINT "PlaygroundEquipment_playgroundId_fkey" FOREIGN KEY ("playgroundId") REFERENCES "Playground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaygroundEquipment" ADD CONSTRAINT "PlaygroundEquipment_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
