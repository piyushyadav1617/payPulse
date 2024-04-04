/*
  Warnings:

  - A unique constraint covering the columns `[balanceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balanceId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "balanceId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_balanceId_key" ON "User"("balanceId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "Balance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
