/*
  Warnings:

  - A unique constraint covering the columns `[trainer_id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `trainer_id` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "trainer_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Trainer" (
    "trainer_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("trainer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_trainer_id_key" ON "Course"("trainer_id");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("trainer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
