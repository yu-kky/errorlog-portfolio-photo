import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/PFHome.vue'),
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/pages/PFGallery.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
