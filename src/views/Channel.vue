<template>
    <v-container class="px-4 h-100">
        <ChannelInfo :ws="ws" ref="info"></ChannelInfo>
        <div class="nav-btns">
            <v-tooltip text="拖拽以删除" v-if="$refs?.info?.loaded">
                <template v-slot:activator="{ props }">
                    <DeleteMusicCardBtn
                        v-bind="props"
                        :list="$refs.info.other as any"
                        :dragging="childDragging"
                    ></DeleteMusicCardBtn>
                </template>
            </v-tooltip>

            <v-tooltip text="保存修改" v-if="$refs.info && $refs.info.loaded">
                <template v-slot:activator="{ props }">
                    <SaveMusicSortBtn
                        v-bind="props"
                        :ws="ws"
                        :list="$refs.info.getList()"
                    ></SaveMusicSortBtn>
                </template>
            </v-tooltip>
        </div>

    </v-container>
</template>

<script lang="ts">
import ChannelInfo from "@/components/ChannelInfo.vue";
import router from "@/router";
import draggable from "vuedraggable";
import DeleteMusicCardBtn from "@/components/DeleteMusicCardBtn.vue";
import SaveMusicSortBtn from "@/components/SaveMusicSortBtn.vue";
import {ref} from "vue";
import {config} from "../../config";

export default {
    name: "Channel",
    methods: {
        router() {
            return router
        }
    },
    components: {SaveMusicSortBtn, DeleteMusicCardBtn, ChannelInfo, draggable},
    data: () => ({
        childDragging: false,
        ws: ref<WebSocket>()
    }),
    mounted() {
        this.$watch(() => this.$refs.info.dragging, n => {
            this.childDragging = n
        })
        this.ws = ref(
            new WebSocket(`${config.api}/${this.$route.params.id}`)
        )
    },
    created() {
    }
}
</script>

<style scoped>
.nav-btns {
    position: fixed;
    margin: 0.6em 1.6em;
    right: 0;
    bottom: 0;
}

.nav-btns .v-btn {
    margin: 1em 0;
}
</style>
