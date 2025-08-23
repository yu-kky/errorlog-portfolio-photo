import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/PFHome.vue'),
    meta: {
      mode: 'dark',
    },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/pages/PFGallery.vue'),
    meta: {
      mode: 'light',
    },
  },
  {
    path: '/gallery/:id',
    name: 'photo',
    component: () => import('@/pages/PFPhoto.vue'),
    props: (route) => ({
      id: Number(route.params.id),
    }),
    meta: {
      mode: 'light',
    },
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

router.afterEach((to) => {
  const mode = (to.meta.mode as string) || 'light'
  document.body.classList.remove('light', 'dark')
  document.body.classList.add(mode)
})

export default router
