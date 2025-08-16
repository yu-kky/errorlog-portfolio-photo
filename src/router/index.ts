import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/PFHome.vue'),
  },
  {
    path: '/gallery/:id',
    name: 'photo',
    component: () => import('@/pages/PFPhoto.vue'),
    props: (route) => ({
      id: Number(route.params.id),
    }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 300)
    })
  },
})

export default router
