// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('@/layouts/default/Default.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: 'start',
                name: 'Start',
                component: () => import('@/views/Start.vue'),
            },
            {
                path: 'channel/:id',
                name: 'Channel',
                component: () => import('@/views/Channel.vue'),
            }
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
