<template>
    <v-expand-transition>
        <v-card
            :color="`${appMap.get(item.platform).color}-darken-4`"
            class="ma-4 flex-fill"
            style="transition: background-color 0s;"
            theme="dark"
            v-show="!item.removed"
        >
            <div class="d-flex flex-no-wrap justify-space-between">
                <div class="flex-fill">
                    <v-card-title
                        class="text-wrap pb-0 title"
                    >
                        {{ item.title }}
                        <v-chip size="small" prepend-icon="mdi-play" v-if="id === 0">正在播放</v-chip>
                    </v-card-title>

                    <v-card-subtitle style="margin-top: 0.5rem">{{ item.author }}</v-card-subtitle>

                    <v-card-text>
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
                    </v-card-text>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                    <v-img
                        referrerpolicy="no-referrer"
                        :src="item.picUrl"
                    ></v-img>
                </v-avatar>
            </div>
        </v-card>
    </v-expand-transition>
</template>

<script setup lang="ts">
import {MusicData} from "@/impl/channel-info";

const props = defineProps<{
    item: MusicData,
    id: number
}>();
</script>

<script lang="ts">
import {appMap} from "@/config/music-app";
import {MusicData} from "@/impl/channel-info";

export default {
    name: "MusicCard",
    computed: {
        appMap() {
            return appMap
        }
    }
};
</script>

<style scoped>
.title {
    width: 100%;
    max-width: 14em;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>
