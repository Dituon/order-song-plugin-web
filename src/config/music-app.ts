import {MusicApp} from "@/impl/music-info";

interface MusicAppInfo {
    id: MusicApp,
    name: string,
    icon: string,
    color: string,
}

export const musicApps: MusicAppInfo[] = [
    {
        id: MusicApp.M163,
        name: '网易云',
        icon: 'mdi-music-circle',
        color: 'red',
    },
    {
        id: MusicApp.QQ,
        name: 'QQ 音乐',
        icon: 'mdi-qqchat',
        color: 'green',
    },
    {
        id: MusicApp.BILIBILI,
        name: '哔哩哔哩',
        icon: 'mdi-television-classic',
        color: 'blue',
    }
]

export const appMap = new Map<MusicApp, MusicAppInfo>(
    musicApps.map(app => [app.id, app])
)
