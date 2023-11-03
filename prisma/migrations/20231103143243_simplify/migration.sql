/*
  Warnings:

  - You are about to drop the `StravaUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstname` to the `StravaToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `StravaToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_medium` to the `StravaToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StravaToken" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "profile_medium" TEXT NOT NULL;

-- DropTable
DROP TABLE "StravaUser";
