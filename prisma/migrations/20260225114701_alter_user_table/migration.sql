-- AlterTable
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "externalId" TEXT;
UPDATE "users" SET "externalId" = "id" WHERE "externalId" IS NULL;
ALTER TABLE "users" ALTER COLUMN "externalId" SET NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS "users_externalId_key" ON "users"("externalId");
