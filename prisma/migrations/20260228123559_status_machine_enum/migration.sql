/*
  Warnings:

  - You are about to drop the column `maintenance` on the `machines` table. All the data in the column will be lost.
  - The `status` column on the `machines` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "MachineStatus" AS ENUM ('available', 'maintenance', 'disabled', 'using');

-- AlterTable
ALTER TABLE "machines" DROP COLUMN "maintenance",
DROP COLUMN "status",
ADD COLUMN     "status" "MachineStatus" NOT NULL DEFAULT 'available';
