import cbsShot from '@/assets/projects/cbs.webp'
import csqShot from '@/assets/projects/csq.webp'
import dginfraShot from '@/assets/projects/dginfra.webp'
import iotShot from '@/assets/projects/iot.webp'
import mhs2Shot from '@/assets/projects/mhs2.webp'
import slpShot from '@/assets/projects/slp.webp'
import slpAdminShot from '@/assets/projects/slp-admin.webp'

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
  /** 頭像插畫的繪師 */
  avatarCredit: { name: string; url: string }
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface ProjectImage {
  /** 用 import 引入圖片取得網址，例如 import shot from '@/assets/projects/xxx.webp' */
  src: string
  /** 描述圖片內容，給螢幕閱讀器與圖片載入失敗時使用 */
  alt: string
  /** 圖片下方的簡短說明（選填），例如「前台」「後台」 */
  caption?: string
}

export interface SourceLink {
  label: string
  url: string
}

export interface Project {
  title: string
  year: string
  summary: string
  highlights: string[]
  stack: string[]
  /** 作品截圖（選填），依原圖比例呈現；多張時桌面版並排顯示。建議寬 1200px 以上 */
  image?: ProjectImage | ProjectImage[]
  /** 網站已下線時設為 true：顯示「已下線」標籤，並隱藏線上版本連結 */
  offline?: boolean
  demo?: string
  /**
   * 原始碼連結（選填）。
   * 只有一個 repo 時直接填網址，連結文字為「查看原始碼」；
   * 前後端分開時填陣列，各自設定連結文字。
   */
  source?: string | SourceLink[]
}

export interface Experience {
  period: string
  company: string
  title: string
  highlights: string[]
}

export const profile: Profile = {
  name: '郭哲彣',
  role: '前端工程師',
  tagline: '把設計稿變成好用、好讀、載入快的介面。',
  location: '基隆',
  status: '正在尋找前端工程師職位',
  email: 'taipeiyyy@gmail.com',
  github: 'https://github.com/Rag1995',
  githubLabel: 'github.com/Rag1995',
  avatarCredit: { name: 'アル毛（@capybaraarumao）', url: 'https://x.com/capybaraarumao' },
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
    title: 'Tech Stack',
    items: ['Vite', 'Pinia', 'Vue Router 5', 'VueUse', 'i18n', 'Leaflet', 'ESLint', 'Prettier'],
  },
  {
    title: '樣式與 UI 套件',
    items: ['Tailwind CSS', 'UnoCSS', 'daisyUI', 'Naive UI', 'Bootstrap 5'],
  },
  {
    title: 'AI 工具',
    items: ['Claude', 'Codex', 'GitHub Copilot', 'Agent Skills（Superpowers、grilling、Ponytail）'],
  },
  {
    title: '工作方式',
    items: ['響應式設計', '網頁效能優化', 'Git 協作', 'Figma 交接'],
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
      '主視覺退場、狗腳印步道與經歷時間軸以 CSS scroll-driven animations 實作，零 JS 且不支援的瀏覽器自動退回靜態',
      '支援深色模式、鍵盤操作與 prefers-reduced-motion',
    ],
    stack: ['Vite', 'Vue 3', 'TypeScript', 'Claude'],
    source: 'https://github.com/Rag1995/my-resume',
  },
  {
    title: '軟體基盤平台',
    year: '2024',
    summary: '提供資訊服務業者算力、數據與程式碼資源的公共數位基礎設施',
    highlights: ['前端切版與API串接', '使用 Tailwind CSS 與 daisyUI 建立共用元件庫'],
    image: { src: dginfraShot, alt: '軟體數位基盤網站的計畫介紹頁，上方為導覽列與橫幅，下方為計畫緣起說明' },
    stack: ['Vite', 'Vue 3', 'Tailwind CSS', 'daisyUI'],
    offline: true,
  },
  {
    title: '道路交通安全講習系統',
    year: '2023-2024',
    summary:
      '公路局的道安講習線上系統。民眾可查詢全台受託單位的班次並自行預約講習；後台供管理受託單位、班期、師資與銷案作業。',
    highlights: [
      '負責民眾端預約流程、課後評量、以及前端頁面開發',
      '依地區、日期篩選全台受託單位的班次，讓民眾快速找到可報名的場次',
      '負責後台帳密權限管理、受託單位管理、班期管理、師資管理、銷案管理與評量，以及 QR Code 掃碼報到等功能',
    ],
    image: [
      {
        src: slpShot,
        alt: '道路交通安全講習系統首頁，提供預約違規講習、申請扣點講習、查詢或取消報名紀錄、各縣市講習班查詢四個入口',
        caption: '前台：民眾預約首頁',
      },
      {
        src: slpAdminShot,
        alt: '後台的編輯班期畫面，含班別、開班時間與授課講師設定，下方為學員報名清單與繳費、上課、銷案狀態（個資已模糊處理）',
        caption: '後台：班期與學員管理',
      },
    ],
    stack: ['Vite', 'Vue 3', 'TypeScript', 'Naive UI'],
    demo: 'https://slp.mvdis.gov.tw/user/',
  },
  {
    title: '災害告警細胞廣播訊息網',
    year: '2023-2024',
    summary: '彙整台灣透過細胞廣播發送到手機的災害告警訊息，民眾可查詢每則警訊的內容與發送範圍。',
    highlights: [
      '參與 Vue 2 專案維護，並協助將專案改寫為 Vue 3',
      '導入 vue-i18n 建立多語系架構，支援繁中與英文切換，並將既有頁面文字抽離為語系檔',
      '擴增警訊頁面的地圖資訊：將圖資轉換為 GeoJSON，以 Leaflet 繪製警報發送範圍，讓民眾一眼看出哪些地區收到警訊',
    ],
    image: {
      src: cbsShot,
      alt: '災防告警細胞廣播訊息網站首頁，主視覺為從手機發出警訊的擴音器插圖，右上角有英文版切換',
    },
    stack: ['Vue 2', 'Vite', 'Vue 3', 'i18n', 'Leaflet', 'Mapbox', 'GeoJSON'],
    demo: 'https://cbs.tw/',
  },
  {
    title: 'IoT 資訊彙整平台',
    year: '2022',
    summary: '災防示警機台的監控管理平台，將各地機台的狀態集中呈現在地圖與圖表上，協助管理人員即時掌握設備運作情形。',
    highlights: [
      '中途接手 Vue 2 版本的功能開發，同時參與從 Vue CLI 轉換到 Vite、Vue 3 與 TypeScript 的版本升級',
      '依客戶需求與 API 文件串接後端，以 Leaflet 在地圖上標示各地災防示警機台與連線狀態，便於監控與管理',
      '點選機台即可查看電量、溫度、訊號強度、SNR 等設備資訊，以 Highcharts 將數值視覺化，並以 Bootstrap 完成版面切版',
    ],
    image: {
      src: iotShot,
      alt: '資訊彙整平台管理畫面：左側為機台詳細資訊面板，含 Highcharts 儀表圖與電量、溫度、訊號強度等欄位；右側地圖以綠色點標示台灣各地的災防示警機台',
    },
    stack: ['Vue 2', 'Vite', 'Vue 3', 'TypeScript', 'Leaflet', 'Highcharts', 'Bootstrap'],
  },
  {
    title: '萌夯物語筆記',
    year: '2021',
    summary:
      'Side Project。結合興趣與專長，整理《魔物獵人物語 2：破滅之翼》的遊戲資料，打造可查詢的攻略資料網站。後端使用的免費託管服務（Heroku、Cyclic）陸續停止，加上遊戲熱度已過，目前不再更新。',
    highlights: [
      '獨立完成前後端：前端以 Vue 2 建置並部署於 GitHub Pages，後端以 Node.js、Express 開發 RESTful API',
      '以 Sequelize 設計資料模型，透過 migration 與 seeder 管理資料庫結構與遊戲資料',
      '後端分為 router、controller、service 三層；原部署於 Heroku，免費方案終止後遷移至 Cyclic，資料庫使用 Nhost 提供的 PostgreSQL',
    ],
    image: {
      src: mhs2Shot,
      alt: '萌夯物語筆記的基因盤畫面：左側為九宮格的基因配置，右側表格列出賓果加成數與對應的傷害倍率',
    },
    stack: ['Vue 2', 'Vuex', 'Vue.Draggable', 'Bootstrap', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL'],
    demo: 'https://rag1995.github.io/mhs2_note/#/',
    source: [
      { label: '查看前端原始碼', url: 'https://github.com/Rag1995/mhs2_note/tree/main' },
      { label: '查看後端 API 原始碼', url: 'https://github.com/Rag1995/mhs2_api' },
    ],
  },
  {
    title: '社團法人中華服務品質發展協會 - 形象官網',
    year: '2021',
    summary:
      '為公司計劃建置的形象官網，並開發簡易後台，讓同事能自行更新計畫成果。後端 API 因 Heroku 終止免費方案已停止服務，網站目前僅保留靜態內容。',
    highlights: [
      '獨立完成前後端開發與部署：前台以 Vue 2 建置並部署於 Netlify，後端 API 部署於 Heroku，資料存放於 MongoDB',
      '開發計畫成果管理後台，讓非技術背景的同事能自行新增與更新成果內容',
    ],
    image: {
      src: csqShot,
      alt: '形象官網首頁，主視覺為講座活動的大合照，中間為協會名稱與「與我們聯絡」按鈕',
    },
    stack: ['Vue 2', 'Node.js', 'Express', 'MongoDB', 'Netlify', 'Heroku'],
    demo: 'https://friendly-dubinsky-acd3ce.netlify.app/',
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
