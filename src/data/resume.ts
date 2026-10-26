import cbeShot from '@/assets/projects/cbe.webp'
import cbsShot from '@/assets/projects/cbs.webp'
import csqShot from '@/assets/projects/csq.webp'
import dginfraShot from '@/assets/projects/dginfra.webp'
import iotShot from '@/assets/projects/iot.webp'
import kpiShot from '@/assets/projects/kpi.webp'
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
  /** 英文名字，顯示在中文名字旁 */
  nameEn: string
  role: string
  tagline: string
  location: string
  status: string
  email: string
  github: string
  githubLabel: string
  /** 主視覺與頭像插畫的繪師 */
  illustrationCredit: { name: string; url: string }
}

export interface SkillGroup {
  title: string
  /** 組名下方的小字說明（選填），例如使用情境 */
  note?: string
  items: string[]
}

export interface ProjectImage {
  /** 用 import 引入圖片取得網址，例如 import shot from '@/assets/projects/xxx.webp' */
  src: string
  /** 描述圖片內容，給螢幕閱讀器與圖片載入失敗時使用 */
  alt: string
  /** 圖片下方的簡短說明（選填），例如「前台」「後台」 */
  caption?: string
  /** 原圖寬高：讓瀏覽器在圖片載入前先預留空間，避免版面跳動 */
  width: number
  height: number
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
  /** 設為 true 時移到「其他作品」精簡列表，只顯示標題、年份、介紹、技術與連結 */
  compact?: boolean
}

export interface Experience {
  period: string
  company: string
  title: string
  highlights: string[]
}

export const profile: Profile = {
  name: '郭哲彣',
  nameEn: 'Taylor Kuo',
  role: '前端工程師',
  tagline: '從興趣開始的前端工程師，現在專注 Vue，擅長管理平台與地圖應用。',
  location: '基隆',
  status: '正在尋找前端工程師職位，偏好遠端或混合辦公',
  email: 'taipeiyyy@gmail.com',
  github: 'https://github.com/Rag1995',
  githubLabel: 'github.com/Rag1995',
  illustrationCredit: { name: 'アル毛（@capybaraarumao）', url: 'https://x.com/capybaraarumao' },
}

export const about: string[] = [
  '我是一名前端工程師，專注於 Vue 與 TypeScript。職涯從數據專員起步，以 VBA 與 Power BI 將報表和排班自動化，之後轉職前端；自 2022 年起參與災防告警、道安講習、績效管理等政府與企業平台的開發，2023 年後以接案方式持續合作。',
  '接手既有專案並推進升級，經歷過 Vue 2 遷移至 Vue 3；也熟悉 Leaflet 地圖應用，做過警報範圍繪製與機台監控地圖。後端 API 尚未完成時，我會自建模擬 API 讓前端先行開發，讓客戶及早看到進度。',
  '以 AI 協助開發：由我規劃需求與方向，AI 協助實作，我再負責測試、審查與最終決定。',
]

export const skillGroups: SkillGroup[] = [
  {
    title: '語言與框架',
    items: ['Vue 3', 'TypeScript', 'JavaScript', 'HTML', 'CSS / SCSS'],
  },
  {
    title: '工具與函式庫',
    items: ['Vite', 'Pinia', 'Vue Router 5', 'VueUse', 'i18n', 'Leaflet', 'ESLint', 'Prettier'],
  },
  {
    title: '樣式與 UI 套件',
    items: ['Tailwind CSS', 'UnoCSS', 'daisyUI', 'Naive UI', 'Bootstrap 5'],
  },
  {
    // 主要用於模擬 API 與 Side Project，寫清楚用途，避免被當成專職後端
    title: '後端',
    // Side 與 Project 之間用不換行空格，避免在兩字之間斷行
    note: '模擬 API 與 Side\u00a0Project',
    items: ['Node.js', 'Express', 'NestJS', 'Sequelize', 'TypeORM', 'PostgreSQL', 'MongoDB', 'Swagger', 'JWT'],
  },
  {
    title: 'AI 工具',
    items: ['Claude', 'Codex', 'GitHub Copilot', 'Agent Skills（Superpowers、grilling、Ponytail）'],
  },
  {
    title: '工作方式',
    items: ['響應式設計 RWD', 'Git 協作', 'Figma 交接'],
  },
]

export const projects: Project[] = [
  {
    title: '個人履歷網站',
    year: '2026',
    summary:
      '你正在看的這個網站。過去的專案一直沒有好好彙整，因此做了這份線上履歷；以 Vue 3 + TypeScript 打造，內容與畫面分離，改一個資料檔就能更新。',
    highlights: [
      '以自建的 Vue 3 專案範本起始，預先整合 Vite、TypeScript、Tailwind CSS、ESLint／Prettier、自動匯入與檔案式路由',
      '首次以 Claude Code 進行 AI 協作開發：由我規劃需求與設計方向、實測並回報問題，再與 AI 迭代修正',
      '在 Mac 與 Windows 的 Edge 實測，發現並回報快速捲動卡頓、觸控板回彈露出空白、遮罩蓋住頁尾文字等問題',
      '網站包含 AVIF 響應式主視覺、捲動特效、截圖燈箱、深色模式與減少動態效果支援',
    ],
    stack: ['Vite', 'Vue 3', 'TypeScript', 'Claude'],
    source: [
      { label: '查看原始碼', url: 'https://github.com/Rag1995/my-resume' },
      { label: '查看專案範本', url: 'https://github.com/Rag1995/vite-template' },
    ],
  },
  {
    title: '線上績效管理系統平台',
    year: '2025',
    summary: '管理資訊服務廠商與其客戶的績效管理平台，可追蹤各廠商的 KPI 達成率，並審核廠商提報的客戶資料。',
    highlights: [
      '負責前端頁面切版與 API 串接，包含廠商與客戶管理、KPI 統計、客戶審核與帳號管理',
      '開發階段以 Node.js 建立模擬 API：用 Faker 快速產生假資料、Swagger 產生 API 文件，並以 bcrypt 雜湊密碼建立帳號、JWT 實作登入驗證，讓客戶在正式 API 完成前即可操作 demo',
    ],
    image: {
      src: kpiShot,
      alt: '線上績效管理系統的資服廠商列表：上方為廠商總數、KPI 數值、已過審客戶、待審核客戶與 KPI 達成率等統計卡片，下方為可切換狀態、查看客戶與審核的廠商表格（資料已模糊處理）',
      width: 1600,
      height: 786,
    },
    stack: ['Node.js', 'Faker', 'Swagger', 'bcrypt', 'JWT'],
  },
  {
    title: '災害訊息廣播平台',
    year: '2024-2025',
    summary: '災害告警訊息的收發管理平台，管理人員可設定告警的發送區域，並管理訊息發布、帳號權限與歷史紀錄。',
    highlights: [
      '負責平台全部功能的前端頁面開發並串接 API，包含訊息發布、告警監控儀表板、帳號與權限管理、報表與歷史資料查詢',
      '以 Leaflet-Geoman 實作地圖圈選工具，讓使用者繪製、編輯、裁切告警的發送範圍，並可依縣市、區域、鄉鎮選擇行政區',
      '後端 API 尚待與客戶確認資料庫轉移與權限設計時，以 NestJS 搭配 TypeORM 建立模擬 API 與假資料，讓前端先行開發並即時向客戶展示進度；正式 API 完成後，只需調整路徑與欄位即可切換',
    ],
    image: {
      src: cbeShot,
      alt: '災害訊息廣播平台的區域代碼設定畫面：右側資料維護視窗可選擇縣市、區域與鄉鎮，下方地圖以 Leaflet-Geoman 工具列繪製彰化、南投與臺中的發送範圍',
      width: 960,
      height: 560,
    },
    stack: ['Vue 3', 'Tailwind CSS', 'daisyUI', 'Leaflet', 'Leaflet-Geoman', 'NestJS', 'TypeORM'],
  },
  {
    compact: true,
    title: '軟體基盤平台',
    year: '2024',
    summary: '提供資訊服務業者算力、數據與程式碼資源的公共數位基礎設施',
    highlights: ['前端切版與API串接', '使用 Tailwind CSS 與 daisyUI 建立共用元件庫'],
    image: {
      src: dginfraShot,
      alt: '軟體數位基盤網站的計畫介紹頁，上方為導覽列與橫幅，下方為計畫緣起說明',
      width: 1600,
      height: 743,
    },
    stack: ['Vite', 'Vue 3', 'Tailwind CSS', 'daisyUI'],
    offline: true,
  },
  {
    title: '道路交通安全講習系統',
    year: '2023-2024',
    summary:
      '公路局的道安講習線上系統。民眾可查詢全台受託單位的班次並自行預約講習；後台供管理受託單位、班期、師資與銷案作業。',
    highlights: [
      '負責民眾端預約流程、課後評量、以及前端頁面開發，依地區、日期篩選全台受託單位的班次，讓民眾快速找到可報名的場次',
      '負責後台帳密權限管理、受託單位管理、班期管理、師資管理、銷案管理與評量，以及 QR Code 掃碼報到等功能',
    ],
    image: [
      {
        src: slpShot,
        alt: '道路交通安全講習系統首頁，提供預約違規講習、申請扣點講習、查詢或取消報名紀錄、各縣市講習班查詢四個入口',
        width: 1600,
        height: 900,
        caption: '前台：民眾預約首頁',
      },
      {
        src: slpAdminShot,
        alt: '後台的編輯班期畫面，含班別、開班時間與授課講師設定，下方為學員報名清單與繳費、上課、銷案狀態（個資已模糊處理）',
        width: 945,
        height: 532,
        caption: '後台：班期與學員管理',
      },
    ],
    stack: ['Vite', 'Vue 3', 'TypeScript', 'Naive UI'],
    demo: 'https://slp.mvdis.gov.tw/user/',
  },
  {
    title: '災害告警細胞廣播訊息網',
    year: '2023-2024',
    summary: '彙整台灣以細胞廣播發送的災害告警訊息，民眾可查詢每則警訊的內容與發送範圍。',
    highlights: [
      '參與 Vue 2 專案維護，並協助將專案改寫為 Vue 3',
      '導入 vue-i18n 建立多語系架構，支援繁中與英文切換，並將既有頁面文字抽離為語系檔',
      '擴增警訊頁面的地圖資訊：將圖資轉換為 GeoJSON，以 Leaflet 繪製警報發送範圍讓民眾一眼看出哪些地區收到警訊',
      '依客戶需求將底圖由 OpenStreetMap 替換為 Mapbox，並以 Mapbox Studio 自訂樣式，修正行政區名稱錯誤與英文標籤，讓民眾能正確辨識地名',
    ],
    image: {
      src: cbsShot,
      alt: '災防告警細胞廣播訊息網站首頁，主視覺為從手機發出警訊的擴音器插圖，右上角有英文版切換',
      width: 1600,
      height: 747,
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
      width: 1600,
      height: 874,
    },
    stack: ['Vue 2', 'Vite', 'Vue 3', 'TypeScript', 'Leaflet', 'Highcharts', 'Bootstrap'],
  },
  {
    compact: true,
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
      width: 704,
      height: 394,
    },
    stack: ['Vue 2', 'Vuex', 'Vue.Draggable', 'Bootstrap', 'Node.js', 'Express', 'Sequelize', 'PostgreSQL'],
    demo: 'https://rag1995.github.io/mhs2_note/#/',
    source: [
      { label: '查看前端原始碼', url: 'https://github.com/Rag1995/mhs2_note/tree/main' },
      { label: '查看後端 API 原始碼', url: 'https://github.com/Rag1995/mhs2_api' },
    ],
  },
  {
    compact: true,
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
      width: 704,
      height: 396,
    },
    stack: ['Vue 2', 'Node.js', 'Express', 'MongoDB', 'Netlify', 'Heroku'],
    demo: 'https://friendly-dubinsky-acd3ce.netlify.app/',
  },
  {
    compact: true,
    title: '口罩地圖',
    year: '2020',
    summary:
      '轉職初期學習 Vue 的練習專案。疫情期間串接口罩即時庫存資料，在地圖上查詢附近藥局的口罩存量。資料 API 架設於 Heroku，隨免費方案終止而停止服務。',
    highlights: [
      '以 Leaflet 搭配 CARTO 圖資標示全台藥局，並用 Marker Cluster 將大量標記聚合，改善地圖效能',
      '實作載入時的骨架畫面、藥局詳細資料抽屜與營業時間表，並支援手機瀏覽',
    ],
    stack: ['Vue 2', 'Vuex', 'Leaflet', 'Leaflet.markercluster', 'CARTO'],
    offline: true,
    source: 'https://github.com/Rag1995/mask_map',
  },
]

export const experiences: Experience[] = [
  {
    period: '2023 – 2025',
    company: '自由接案（遠端）',
    title: '前端工程師',
    highlights: [
      '轉為接案後持續與光沅數位創意合作，以遠端方式負責政府與企業專案的前端開發',
      '參與道路交通安全講習系統、災害訊息廣播平台、線上績效管理系統平台等專案，負責前端頁面開發與 API 串接',
      '在後端 API 尚未完成時，以 Node.js 自建模擬 API 與假資料，讓前端先行開發並即時向客戶展示進度',
    ],
  },
  {
    period: '2022 – 2023',
    company: '光沅數位創意 Kyart Creative',
    title: '前端工程師',
    highlights: [
      '以 Vue 2／Vue 3、Vite 與 TypeScript 開發並維護國家災防資訊彙整平台與管理平台',
      '參與 Vue 2 專案遷移至 Vue 3',
    ],
  },
  {
    period: '2019 – 2021',
    company: '全鋒汽車股份有限公司',
    title: '數據專員',
    highlights: [
      '以 Power BI 與 VBA 自動化客服月報，將 2–3 人、3–4 個工作天的彙整縮短為約半天',
      '導入 Power BI 建立服務量能、專案績效與客戶服務等儀表板，讓主管隨時查詢數據、作為決策依據',
      '以 VBA 自動從 NAS 讀取各部門 Excel 並彙整報表。開發排班工具，依歷年各季話務量預估人力需求並產生班表雛形',
      '開發專案形象官網，以 Vue 2 建置並部署於 Netlify',
    ],
  },
]
