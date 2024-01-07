<template>
    <v-expand-transition>
        <v-card
            :color="`${appMap.get(item.platform).color}-darken-4`"
            class="ma-4 flex-fill"
            style="transition: background-color 0s;"
            theme="dark"
            v-show="!item.removed"
        >
            <div class="mt-4 pa-8 w-100 d-flex justify-center">
                <div class="position-relative">
                    <div>
                        <div class="position-absolute">
                            <v-avatar size="260" rounded="1">
                                <v-img class="m-bg" src="../assets/playing-bg.png"/>
                            </v-avatar>
                        </div>
                        <div>
                            <v-avatar
                                size="260"
                                class="m-rotate"
                                rounded="1"
                            >
                                <v-img
                                    referrerpolicy="no-referrer"
                                    :src="item.picUrl"
                                ></v-img>
                            </v-avatar>
                        </div>
                    </div>
                    <img
                        class="p-rotate"
                        src="../assets/playing-point.png"
                        alt=""
                    >
                </div>
            </div>


            <div class="d-flex flex-no-wrap justify-space-between text-center flex-column">
                    <v-card-title
                        class="text-wrap pb-0 title text-h3 px-10"
                    >
                        {{ item.title }}
                    </v-card-title>

                    <v-card-subtitle
                        class="mt-8 text-h6"
                    >
                        {{ item.author }}
                        <br />
                        <br />
                        <br />
                        <v-chip size="large" prepend-icon="mdi-play">正在播放</v-chip>
                        <br />
                        <br />
                    </v-card-subtitle>

                    <v-card-text class="text-left">
                        <v-divider></v-divider>
                        <br />
                        <b>用户 </b> &nbsp;
                        <v-chip variant="outlined" class="my-2">
                            <v-avatar start="true">
                                <v-img
                                    referrerpolicy="no-referrer"
                                    :src="item.sender.senderAvatarUrl"
                                ></v-img>
                            </v-avatar>
                            {{ item.sender.senderName }}
                            <span class="text-medium-emphasis">
                                #{{ item.sender.senderIdentifyNumber }}
                            </span>
                        </v-chip>
                        <br />
                        <b>平台 </b> &nbsp;
                        <v-chip variant="outlined" class="my-2">
                            <v-avatar start="true">
                                <v-img
                                    referrerpolicy="no-referrer"
                                    :src="item.iconUrl"
                                ></v-img>
                            </v-avatar>
                            {{ appMap.get(item.platform).name }}
                            <span class="text-medium-emphasis">
                                #{{ item.bv || item.nid || item.cid || item.songMid }}
                            </span>
                        </v-chip>
                    </v-card-text>
                </div>
        </v-card>
    </v-expand-transition>
</template>

<script setup lang="ts">
import {MusicData} from "@/impl/channel-info";
import {appMap} from "@/config/music-app";

const props = defineProps<{
    item: MusicData,
    id: number
}>();
</script>

<script lang="ts">
import {appMap} from "@/config/music-app";
import {MusicData} from "@/impl/channel-info";

export default {
    name: "PlayingMusicCard",
    computed: {
        appMap() {
            return appMap
        }
    }
};
</script>

<style scoped>
.title {
    line-height: 1.2em !important;
    font-family: SimSun,serif !important;
    font-weight: bold;
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.avatar {
    border-radius: 50%;
}

.m-bg {
    pointer-events: none;
    -webkit-user-drag:none;
    user-select: none;
}

.m-rotate {
    user-select: none;
    animation: m-rotate 4s linear infinite;
}

@keyframes m-rotate {
    0% {
        transform: rotate(0) scale(0.67);
    }
    100% {
        transform: rotate(360deg) scale(0.67);
    }
}

.p-rotate {
    pointer-events: none;
    -webkit-user-drag:none;
    user-select: none;

    position: absolute;
    top: -64px;
    right: 38px;
    width: 100px;
    transform-origin: left top;
    animation: p-rotate 10s ease-in alternate-reverse infinite;
}

@keyframes p-rotate {
    0% {
        transform: rotate(-6deg) scale(0.9);
    }
    100% {
        transform: rotate(2deg) scale(0.9);
    }
}
</style>
