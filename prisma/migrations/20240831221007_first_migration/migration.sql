-- CreateTable
CREATE TABLE "Streamer" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "display_name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "broadcaster_type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "profile_image_url" TEXT NOT NULL,
    "offline_image_url" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Streamer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clip" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "embed_url" TEXT NOT NULL,
    "broadcaster_id" TEXT NOT NULL,
    "broadcaster_name" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "creator_name" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "game_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "view_count" INTEGER NOT NULL,
    "created_at" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "vod_offseat" INTEGER,
    "is_featured" BOOLEAN NOT NULL,
    "streamer_name" TEXT NOT NULL,

    CONSTRAINT "Clip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_id_key" ON "Streamer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Streamer_login_key" ON "Streamer"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Clip_id_key" ON "Clip"("id");

-- AddForeignKey
ALTER TABLE "Clip" ADD CONSTRAINT "Clip_streamer_name_fkey" FOREIGN KEY ("streamer_name") REFERENCES "Streamer"("login") ON DELETE RESTRICT ON UPDATE CASCADE;
