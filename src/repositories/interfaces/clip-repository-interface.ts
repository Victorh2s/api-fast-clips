import { Clip } from "@prisma/client";

export interface ClipRepositoryInterface {
    getClipsSaves(): Promise<Clip[]>
    saveClip(clip: Clip): Promise<void>
    removeClip(clipId: string): Promise<void>
    findClipById(clipId: string): Promise<Clip | null>
}