/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Playground` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `Playground` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Playground_name_key" ON "Playground"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Playground_address_key" ON "Playground"("address");
