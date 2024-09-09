-- DropForeignKey
ALTER TABLE "Clip" DROP CONSTRAINT "Clip_streamer_name_fkey";

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_streamer_name_fkey" FOREIGN KEY ("streamer_name") REFERENCES "Streamer"("login") ON DELETE CASCADE ON UPDATE CASCADE;
