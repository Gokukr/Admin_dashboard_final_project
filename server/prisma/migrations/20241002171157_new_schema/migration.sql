/*
  Warnings:

  - You are about to drop the column `user_id` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_trainer_id_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "user_id",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "trainer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("trainer_id") ON DELETE SET NULL ON UPDATE CASCADE;
