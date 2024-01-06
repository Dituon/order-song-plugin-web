<template>
    <v-container class="fill-height">
        <v-responsive class="align-center text-center fill-height">
            <v-timeline side="end">
                <!--                <v-expand-transition>-->
                <v-timeline-item dot-color="#fff" v-show="!hide">
                    <template v-slot:icon>
                        <v-btn
                            height="100%"
                            width="100%"
                            variant="text"
                            icon="mdi-close"
                            color="black-lighten-2"
                            @click="hide=true; console.log(1)"
                        ></v-btn>
                    </template>
                    <template v-slot:opposite>
                        <v-chip
                            variant="outlined"
                            :prepend-icon="getIconFromTimestamp(Date.now())"
                        >
                            {{ formatTimestampToHHMM(Date.now()) }}
                        </v-chip>
                    </template>
                    <v-card>
                        <v-card-title class="text-h5">
                            音乐
                        </v-card-title>
                        <v-card-text>介绍</v-card-text>
                    </v-card>
                </v-timeline-item>
                <!--                </v-expand-transition>-->

                <v-timeline-item dot-color="#fff">
                    <template v-slot:icon>
                        <v-btn
                            height="100%"
                            width="100%"
                            variant="text"
                            icon="mdi-close"
                            color="black-lighten-2"
                        ></v-btn>
                    </template>
                    <template v-slot:opposite>
                        <v-chip
                            variant="outlined"
                            :prepend-icon="getIconFromTimestamp(Date.now())"
                        >
                            {{ formatTimestampToHHMM(Date.now()) }}
                        </v-chip>
                    </template>
                    <v-card>
                        <v-card-title class="text-h5">
                            音乐
                        </v-card-title>
                        <v-card-text>介绍</v-card-text>
                    </v-card>
                </v-timeline-item>

                <v-timeline-item dot-color="#fff">
                    <template v-slot:icon>
                        <v-btn
                            height="100%"
                            width="100%"
                            variant="text"
                            icon="mdi-plus"
                            color="black-lighten-2"
                            @click="router().push('/start')"
                        ></v-btn>
                    </template>
                </v-timeline-item>
            </v-timeline>
        </v-responsive>
    </v-container>
</template>

<script lang="ts">
import router from "@/router";

export default {
    name: "TimeLine",
    methods: {
        router() {
            return router
        }
    },
    data() {
        return {
            hide: false,
            getIconFromTimestamp,
            formatTimestampToHHMM
        }
    }
}

function formatTimestampToHHMM(timestamp: number): string {
    const date = new Date(timestamp)

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${hours} : ${minutes} : ${seconds}`
}

function getIconFromTimestamp(timestamp: number): string {
    return 'mdi-clock-time-' + getHourFromTimestamp(timestamp) + '-outline'
}

function getHourFromTimestamp(timestamp: number): string {
    const hoursMapping: { [key: number]: string } = {
        0: "twelve", 1: "one", 2: "two", 3: "three", 4: "four", 5: "five",
        6: "six", 7: "seven", 8: "eight", 9: "nine", 10: "ten", 11: "eleven",
        12: "twelve", 13: "one", 14: "two", 15: "three", 16: "four", 17: "five",
        18: "six", 19: "seven", 20: "eight", 21: "nine", 22: "ten", 23: "eleven",
    }

    const hour = new Date(timestamp).getHours()
    return hoursMapping[hour] || 'three'
}
</script>

<style scoped>

</style>
