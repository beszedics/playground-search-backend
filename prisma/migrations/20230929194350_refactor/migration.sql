/*
  Warnings:

  - You are about to drop the column `userId` on the `Playground` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Playground" DROP CONSTRAINT "Playground_userId_fkey";

-- AlterTable
ALTER TABLE "Playground" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "UserPlayground" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "playgroundId" INTEGER NOT NULL,

    CONSTRAINT "UserPlayground_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPlayground" ADD CONSTRAINT "UserPlayground_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlayground" ADD CONSTRAINT "UserPlayground_playgroundId_fkey" FOREIGN KEY ("playgroundId") REFERENCES "Playground"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
