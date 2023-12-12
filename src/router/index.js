import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      path: '/',
      name: 'Reports',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: "Reports"
      }
    }
  ]

const router = createRouter({
    base: '/',
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

export default router