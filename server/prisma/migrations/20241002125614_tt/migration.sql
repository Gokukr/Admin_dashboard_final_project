/*
  Warnings:

  - You are about to drop the column `trainer_id` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Course_trainer_id_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "trainer_id";
