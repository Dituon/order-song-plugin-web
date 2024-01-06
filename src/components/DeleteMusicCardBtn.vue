<template>
    <v-btn
        icon="mdi-plus"
        variant="elevated"
        size="large"
        block="true"
        :elevation="dragging ? 16 : 2"
        :color="dragging ? 'orange-darken-4' : ''"
        :disabled="list.length === 0"
    >
        <v-icon
            :icon="'mdi-' + (list.length === 0 ? 'delete-off' : (dragging ? 'delete-empty' : 'delete'))"
        ></v-icon>
        <v-dialog
            activator="parent"
            width="auto"
            v-model="dialog"
        >
            <v-card>
                <v-card-text>
                    清除播放表列?
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="dialog = false">算了</v-btn>
                    <v-btn color="red" @click="list.length = 0; dialog = false;">清除</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <draggable
            class="list-group"
            :list="removedList"
            ghost-class="d-none"
            group="musicCards"
            style="width: 100%; height: 100%; position: absolute;"
        >
            <template #item="{ element, index }">
                <!--                        <div class="list-group-item">{{ element.name }} {{ index }}</div>-->
            </template>
        </draggable>
    </v-btn>
</template>

<script lang="ts">
import draggable from "vuedraggable";

export default {
    name: "DeleteMusicCardBtn",
    components: {draggable},
    computed: {
        removedList: [],
    },
    data: () => ({
        dialog: false,
    }),
    props: {
        dragging: Boolean,
        list: Array,
    }
}
</script>

<style scoped>

</style>
