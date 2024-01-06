<template>
    <v-btn
        :icon="true"
        variant="elevated"
        size="large"
        :color="changed ? 'green-darken-3' : ''"
        block="true"
        :loading="loading"
        @click="update"
    >
        <v-icon icon="mdi-content-save"></v-icon>
        <v-snackbar
            v-model="snackbar"
            timeout="1000"
        >
            {{ snackbarInfo }}

            <template v-slot:actions>
                <v-btn
                    color="pink"
                    variant="text"
                    @click="snackbar = false"
                >
                    知道了
                </v-btn>
            </template>
        </v-snackbar>
    </v-btn>
</template>

<script setup lang="ts">
import {MusicData} from "@/impl/channel-info";
import {toRef, toRefs, watch} from "vue";
import {Ref} from "vue/dist/vue";

let changed = false
let snackbar = toRef(false)
let snackbarInfo = ''
let loading = toRef(false)

const props = defineProps<{
    list: MusicData[],
    ws: Ref<WebSocket | undefined>
}>()

const rawList = toRef([...props.list])
const { list, ws } = toRefs(props)

watch(list, nv => {
    changed = nv.length !== rawList.value.length || !nv.every((element, index) => element === rawList.value[index])
}, {deep: true})

async function update() {
    if (!changed) return
    loading.value = true
    ws.value?.send(JSON.stringify({
        type: 'update',
        list: list.value.map(t => t.id)
    }))
    const success = await new Promise(res => {
        const wss = ws.value as WebSocket
        const listener = msg => {
            const raw = JSON.parse(msg.data)
            if (raw.type !== 'updateStatus') return
            wss.removeEventListener('message', listener)
            res(raw.success)
        }
        wss.addEventListener('message', listener)
    })
    rawList.value = [...list.value]
    changed = false
    loading.value = false
    snackbar.value = true
    snackbarInfo = success ? '保存成功' : '保存失败'
}
</script>

<style scoped>

</style>
