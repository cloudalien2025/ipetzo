-- AlterTable
ALTER TABLE "app_users"
ADD COLUMN "current_pet_id" TEXT;

-- CreateIndex
CREATE INDEX "app_users_current_pet_id_idx" ON "app_users"("current_pet_id");

-- AddForeignKey
ALTER TABLE "app_users"
ADD CONSTRAINT "app_users_current_pet_id_fkey"
FOREIGN KEY ("current_pet_id") REFERENCES "pets"("id") ON DELETE SET NULL ON UPDATE CASCADE;
