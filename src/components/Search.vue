<template>
    <v-container class="fill-height">
        <v-responsive class="align-center text-center fill-height">

            <v-card
                class="mx-auto"
                variant="elevated"
                border="true"
                :color="`${this.app.color}-lighten-4`"
            >
                <v-card-text>
                    <v-row>
                        <v-col cols="2" style="min-width: 3.6rem" class="pr-0">
                            <v-select
                                variant="solo"
                                v-model="app"
                                :items="musicApps()"
                                menu-icon=""
                                :prepend-inner-icon="this.app.icon"
                                :item-props="item => ({
                                title: item.name,
                                color: item.color,
                                prependIcon: item.icon,
                            })"
                                hide-details
                            >
                            </v-select>
                        </v-col>

                        <v-col>
                            <v-text-field
                                :loading="loading"
                                density="default"
                                variant="solo"
                                placeholder="关键词 / URL"
                                append-inner-icon="mdi-magnify"
                                hide-details
                                clearable="true"
                                @click:append-inner="onChange"
                                @change="onChange"
                            ></v-text-field>
                        </v-col>
                    </v-row>

                    <v-expand-transition>
                        <v-row v-show="loaded">
                            <v-col>
                                <v-card
                                    height="100"
                                    class="mt-0">
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-expand-transition>


                </v-card-text>
                <v-card-actions style="padding: 1rem">
                    <v-row>
                        <v-col class="d-flex justify-end">
                            <v-btn
                                icon="mdi-trash-can"
                                variant="outlined"
                                :color="`${this.app.color}-darken-2`"
                            >
                            </v-btn>
                            <v-btn
                                icon="mdi-plus"
                                variant="flat"
                                :color="`${this.app.color}-darken-2`"
                            >
                            </v-btn>

                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-responsive>
    </v-container>
</template>

<script lang="ts">
import {musicApps} from "@/config/music-app";

export default {
    data: () => ({
        loaded: false,
        loading: false,
        app: musicApps[0]
    }),

    methods: {
        musicApps() {
            return musicApps
        },
        onChange() {
            this.loading = true

            setTimeout(() => {
                this.loading = false
                this.loaded = true
            }, 2000)
        },
    },
}
</script>
