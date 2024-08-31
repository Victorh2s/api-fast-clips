import { Streamer } from "@prisma/client";

export interface StreamerRepositoryInterface {
    findUnique(id: string): Promise<Streamer | null>
    findByUsername(username: string): Promise<Streamer | null>
    addStreamer(data: Streamer): Promise<void>
    removeStreamer(username: string): Promise<void>
    findManyStreamer(): Promise<Streamer[]>
}