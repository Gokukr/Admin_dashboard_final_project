/*
  Warnings:

  - A unique constraint covering the columns `[trainer_id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_trainer_id_key" ON "Course"("trainer_id");
