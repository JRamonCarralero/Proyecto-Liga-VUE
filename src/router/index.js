import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/noticias/:id?',
      name: 'noticias',
      component: () => import('@/views/NoticiasView.vue'),
    },
    {
      path: '/competicion',
      name: 'competicion',
      component: () => import('@/views/CompeticionView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
  ],
})

export default router
