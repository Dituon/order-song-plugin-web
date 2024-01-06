import {MusicApp} from "@/impl/music-info";

export interface MusicData {
    id: number
    platform: MusicApp
    title: string
    author: string
    picUrl: string
    cid: number
    bv: string | null
    nid: number | null
    songMid: string | null
    mediaMid: string | null
    iconUrl: string
    sender: SenderData
    removed?: boolean
}

export interface SenderData {
    senderName: string
    sender_vip: boolean
    senderAvatarUrl: string
    senderIdentifyNumber: number
    senderId: string
}

export function decodeMusicMap(data: object): MusicData[] {
    return Object.entries(data).map(([id, item]) => ({ ...item, id: +id }))
}
