/*
  Warnings:

  - You are about to drop the `Trainer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_trainer_id_fkey";

-- DropTable
DROP TABLE "Trainer";
