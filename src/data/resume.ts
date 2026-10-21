/**
 * 履歷內容集中在這個檔案。
 * 標記 TODO 的欄位是示範內容，正式投遞前請換成你自己的資料。
 */

export interface NavItem {
  id: string
  label: string
}

export interface Profile {
  name: string
  role: string
  tagline: string
  location: string
  status: string
  email: string
  github: string
  githubLabel: string
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface Project {
  title: string
  year: string
  summary: string
  highlights: string[]
  stack: string[]
  demo?: string
  source?: string
}

export interface Experience {
  period: string
  company: string
  title: string
  highlights: string[]
}

export const profile: Profile = {
  name: 'Rag', // TODO: 換成你的中文或英文姓名
  role: '前端工程師',
  tagline: '把設計稿變成好用、好讀、載入快的介面。',
  location: '台北',
  status: '正在尋找前端工程師職位',
  email: 'you@example.com', // TODO: 換成你的聯絡信箱
  github: 'https://github.com/Rag1995',
  githubLabel: 'github.com/Rag1995',
}

// TODO: 依照你的經歷改寫自我介紹
export const about: string[] = [
  '我是一名專注於 Vue 與 TypeScript 的前端工程師，喜歡把複雜的流程整理成使用者一看就懂的畫面。',
  '寫介面時，我在意的不只是「長得像設計稿」，還有鍵盤能不能操作、手機上好不好點、首次載入要等多久。這個網站本身就是一個例子：圖片經過壓縮與響應式載入，支援深色模式與減少動態效果設定。',
]

export const skillGroups: SkillGroup[] = [
  {
    title: '語言與框架',
    items: ['Vue 3', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'],
  },
  {
    title: '生態系與工具',
    items: ['Vite', 'Pinia', 'Vue Router', 'Tailwind CSS', 'VueUse', 'ESLint', 'Prettier'],
  },
  {
    title: '工作方式',
    items: ['響應式設計', '無障礙 (a11y)', '網頁效能優化', 'Git 協作', 'Figma 交接'],
  },
]

export const projects: Project[] = [
  {
    title: '個人履歷網站',
    year: '2026',
    summary: '你正在看的這個網站。以 Vue 3 + TypeScript 打造，內容與畫面分離，改一個資料檔就能更新履歷。',
    highlights: [
      '主視覺圖片從 2.1 MB 壓縮到 270 KB 以下，並依螢幕寬度載入不同尺寸',
      '側邊導覽會隨捲動標示目前閱讀的段落',
      '主視覺退場與經歷時間軸以 CSS scroll-driven animations 實作，零 JS 且不支援的瀏覽器自動退回靜態',
      '支援深色模式、鍵盤操作與 prefers-reduced-motion',
    ],
    stack: ['Vue 3', 'TypeScript', 'Vite', 'unplugin-vue-router'],
    source: 'https://github.com/Rag1995/my-resume',
  },
  {
    // TODO: 換成你的真實作品
    title: '訂單管理後台',
    year: '2025',
    summary: '為內部營運團隊打造的訂單查詢與出貨管理介面，取代原本以試算表交接的流程。',
    highlights: [
      '設計可重用的表格、篩選與分頁元件，三個頁面共用同一套邏輯',
      '以虛擬捲動處理上萬筆資料，列表捲動維持流暢',
    ],
    stack: ['Vue 3', 'Pinia', 'TypeScript', 'Element Plus'],
    demo: 'https://example.com',
  },
  {
    // TODO: 換成你的真實作品
    title: '活動報名頁',
    year: '2024',
    summary: '行動裝置優先的活動報名流程，從瀏覽活動到完成報名控制在三個步驟內。',
    highlights: ['表單即時驗證並以文字說明錯誤原因，降低送出失敗', 'Lighthouse 效能與無障礙分數皆達 95 以上'],
    stack: ['Vue 3', 'Vite', 'Tailwind CSS'],
    demo: 'https://example.com',
    source: 'https://github.com/Rag1995',
  },
]

// TODO: 換成你的真實經歷（由新到舊）
export const experiences: Experience[] = [
  {
    period: '2024 年至今',
    company: '某科技公司',
    title: '前端工程師',
    highlights: ['負責後台系統的前端開發與元件庫維護', '導入 TypeScript 與 ESLint 規範，減少上線後的型別相關錯誤'],
  },
  {
    period: '2022 – 2024',
    company: '某數位設計工作室',
    title: '網頁設計與切版',
    highlights: ['與設計師合作完成多個品牌形象網站的切版與互動', '建立共用的 SCSS 變數與 RWD 斷點規範'],
  },
]
