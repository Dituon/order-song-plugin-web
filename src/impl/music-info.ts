export enum MusicApp {
    M163 = '网易云',
    QQ = 'QQ音乐',
    BILIBILI = 'B站',
}

export interface MusicInfo {
    app: MusicApp
    id: string
    name: string
    author: string
    description: string
    tags: string[]
    url: string
    image: string
    time: number
}
