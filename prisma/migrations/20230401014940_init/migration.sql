/*
  Warnings:

  - You are about to drop the column `code` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `totalComments` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `totalLikes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "code",
DROP COLUMN "language",
DROP COLUMN "totalComments",
DROP COLUMN "totalLikes",
ADD COLUMN     "content" TEXT;
