<template>
    <div class="w-100 d-flex flex-wrap">
        <div v-if="first" class="playing">
            <PlayingMusicCard
                :id="0"
                :item="first as MusicData"
            ></PlayingMusicCard>
        </div>
        <div class="w-100" v-else>
            <v-progress-linear indeterminate="true" :height="8"></v-progress-linear>
            <br><br>
            <h5 class="text-h5 text-center font-weight-bold w-100">
                这个频道没有在播放的音乐
            </h5>
        </div>
        <div v-if="other.length > 0" class="flex-fill">
            <draggable
                v-model="other"
                tag="v-card"
                v-bind="dragOptions"
                style="user-select: none; cursor: move;"
                @start="dragging = true"
                @end="dragging = false"
            >
                <template #item="{element, index}">
                    <MusicCard :list="other" :id="index" :item="element"></MusicCard>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup lang="ts">
import {decodeMusicMap, MusicData} from "@/impl/channel-info";
import {Ref, toRef, toRefs, watch} from "vue";
import {useRouter} from "vue-router";
import PlayingMusicCard from "@/components/PlayingMusicCard.vue";

const props = defineProps<{
    ws: Ref<WebSocket | undefined>
}>()

const {ws} = toRefs(props)

const router = useRouter()

let first = toRef<MusicData | undefined>(undefined)
let other = toRef([])
let dragging = toRef(false)
let loaded = toRef(false)

function getList() {
    return [first.value, ...other.value.filter(t => !t.removed)]
}

watch(ws, nv => {
    const ws = nv as WebSocket
    ws.addEventListener('open', () => {
        ws.send(JSON.stringify({
            type: 'ping',
            message: 'pong'
        }))
    })
    ws.addEventListener('message', msg => {
        const raw = JSON.parse(msg.data) as any
        if (raw.type === 'error') {
            router.push("/")
            return
        }
        if (raw.type === 'ping') {
            ws.send(JSON.stringify({
                type: 'ping',
                message: 'result'
            }))
            return
        }
        if (raw.type !== 'getMusicList') return
        const data = decodeMusicMap(raw.list) as MusicData[]
        first.value = data[0]
        other.value = data.slice(1)
        loaded.value = true
    })
})

defineExpose({
    first,
    other,
    dragging,
    loaded,
    getList
})
</script>

<script lang="ts">
import {decodeMusicMap, MusicData} from "@/impl/channel-info";
import {appMap} from "@/config/music-app";
import draggable from 'vuedraggable'
import MusicCard from "@/components/MusicCard.vue";
import {Ref} from "vue";

export default {
    name: "ChannelInfo",
    computed: {
        appMap() {
            return appMap
        },
        dragOptions: () => ({
            animation: 200,
            group: "musicCards",
            disabled: false,
            ghostClass: "ghost",
            scrollSensitivity: 200,
            forceFallback: true,
            scrollSpeed: 16,
        }),
    },
    components: {
        MusicCard,
        draggable,
    },
}

</script>

<style scoped>
.ghost {
    opacity: 0.5;
}

.playing {
    position: sticky;
    flex: 1 0 12em;
    top: 4em;
    height: 100%;
}

@media (max-width:870px) {
    .playing {
        position: unset;
        flex: 1 0 12em;
    }
}
</style>
