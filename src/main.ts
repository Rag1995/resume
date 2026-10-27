import './style.css'

import { createPinia } from 'pinia'
import { createApp, nextTick } from 'vue'

import App from './App.vue'
import { projects } from './data/resume'
import router from './router'
import { loadSubsetFonts } from './utils/fonts'
import { getProjectImages } from './utils/project'

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')

// 頁面渲染完成後，只載入畫面上用到的字
router.isReady().then(async () => {
  await nextTick()
  // 燈箱打開時才會渲染的圖說與張數
  const captions = projects.flatMap((project) => getProjectImages(project).map((image) => image.caption ?? ''))
  loadSubsetFonts(document.body, [{ family: 'Noto Sans TC', weight: 400, text: `${captions.join('')}0123456789/` }])
})
