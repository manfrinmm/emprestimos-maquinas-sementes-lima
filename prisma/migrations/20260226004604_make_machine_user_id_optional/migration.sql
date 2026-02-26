-- DropForeignKey
ALTER TABLE "machines" DROP CONSTRAINT "machines_user_id_fkey";

-- AlterTable
ALTER TABLE "machines" ALTER COLUMN "user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "machines" ADD CONSTRAINT "machines_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
