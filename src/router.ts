import { createRouter, createWebHistory } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const router = createRouter({
  // 依 vite.config.ts 的 base 設定網站的根路徑
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
