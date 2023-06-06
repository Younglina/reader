import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/rssData', name: 'rssData', component: () => import('@/views/rssData.vue') },
  { path: '/search', name: 'Search', component: () => import('@/views/search.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
