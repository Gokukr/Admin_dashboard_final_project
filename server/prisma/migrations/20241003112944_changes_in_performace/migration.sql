/*
  Warnings:

  - You are about to drop the column `avg_mark` on the `Performance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "avg_mark",
ALTER COLUMN "mark2" DROP NOT NULL;
