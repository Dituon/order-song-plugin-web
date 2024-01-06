<template>
    <MusicCard v-if="first" :id="0" :item="first as MusicData"></MusicCard>
    <div class="w-100" v-else>
        <v-progress-linear indeterminate="true" :height="8"></v-progress-linear>
        <br><br>
        <h5 class="text-h5 text-center font-weight-bold w-100">
            这个频道没有在播放的音乐
        </h5>
    </div>
    <draggable
        v-model="other"
        tag="v-card"
        v-bind="dragOptions"
        style="user-select: none; cursor: move;"
        @start="dragging = true"
        @end="dragging = false"
    >
        <template #item="{element, index}">
            <MusicCard :id="index + 1" :item="element"></MusicCard>
        </template>
    </draggable>
</template>

<script setup lang="ts">
import {decodeMusicMap, MusicData} from "@/impl/channel-info";
import {Ref, toRef, toRefs, watch} from "vue";
import {useRouter} from "vue-router";

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
    let timer = 0
    ws.addEventListener('open', () => {
        timer = setInterval(() => {
            ws.send(JSON.stringify({
                type: 'ping',
                message: 'pong'
            }))
        }, 5000)
    })
    ws.addEventListener('close', () => {
        clearInterval(timer)
    })
    ws.addEventListener('message', msg => {
        const raw = JSON.parse(msg.data) as any
        if (raw.type === 'error') {
            router.push("/")
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
            ghostClass: "ghost"
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
</style>