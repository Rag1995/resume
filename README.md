# 郭哲彣 Taylor Kuo｜前端工程師履歷

我的個人履歷網站。過去的專案一直沒有好好彙整，因此做了這份線上履歷，集中介紹我的經歷、技能與作品。

🔗 **網站：** https://rag1995.github.io/my-resume/

## 技術

- **框架：** Vue 3（`<script setup>`）、TypeScript
- **建置：** Vite，以自建的 [Vue 3 專案範本](https://github.com/Rag1995/vite-template) 起始
- **路由：** Vue Router 5（檔案式路由）
- **圖示：** unplugin-icons + Tabler Icons，打包時轉為 inline SVG
- **程式碼規範：** ESLint、Prettier
- **部署：** GitHub Actions 自動部署到 GitHub Pages
- **開發方式：** 以 Claude Code 進行 AI 協作開發，由我規劃需求與設計方向、實測並回報問題，再與 AI 迭代修正

## 網站特色

- 主視覺以 `<picture>` 優先提供 AVIF、並以 WebP 備援，依螢幕寬度載入不同尺寸
- 主視覺退場與經歷時間軸使用 CSS scroll-driven animations，不支援的瀏覽器自動退回靜態
- 作品截圖可點擊放大，以原生 `<dialog>` 製作燈箱，支援鍵盤操作與多張切換
- 支援深色模式、鍵盤操作與「減少動態效果」設定

## 本機開發

```bash
npm install
npm run dev      # 開發伺服器：http://localhost:5173/my-resume/
npm run build    # 型別檢查並打包到 dist/
npm run preview  # 預覽打包結果
```

> 因為部署在 GitHub Pages 的子路徑底下，`vite.config.ts` 設定了 `base: '/my-resume/'`，本機網址也需要加上 `/my-resume/`。

## 更新履歷內容

所有內容都集中在 [`src/data/resume.ts`](src/data/resume.ts)，修改這個檔案就能更新網站，不需要動到元件。

| 匯出 | 內容 |
| --- | --- |
| `profile` | 姓名、職稱、一句話介紹、求職狀態、聯絡方式 |
| `about` | 「關於我」的段落 |
| `skillGroups` | 技能分組；`note` 可在組名下方加上小字說明 |
| `projects` | 作品 |
| `experiences` | 經歷，由新到舊排列 |

### 作品的欄位

| 欄位 | 說明 |
| --- | --- |
| `image` | 截圖，可放一張或多張。`width`、`height` 為必填，用來預留空間、避免版面跳動；`caption` 可加上「前台」「後台」等說明 |
| `demo` | 線上版本的網址 |
| `source` | 原始碼連結。一個 repo 直接填網址；前後端分開時填 `{ label, url }` 陣列 |
| `offline` | 網站已下線時設為 `true`，會顯示「已下線」標籤並隱藏線上版本連結 |
| `compact` | 設為 `true` 時移到「其他作品」精簡列表 |

### 新增作品截圖

1. 將截圖壓縮成寬 1600px 左右的 WebP，放進 `src/assets/projects/`
2. 在 `resume.ts` 開頭 `import` 圖片，並在作品中加上：

```ts
import shot from '@/assets/projects/example.webp'

image: {
  src: shot,
  alt: '描述截圖的內容',
  width: 1600,
  height: 900,
},
```

政府或企業專案的截圖，請先確認可以公開，並將個資與敏感資訊模糊處理。

## 專案結構

```
src/
├── assets/          # 主視覺、頭像與作品截圖
├── components/      # 主視覺、導覽、作品、時間軸、燈箱、腳印步道等元件
├── data/resume.ts   # 履歷內容
├── pages/index.vue  # 首頁，組合各個區塊
├── utils/           # 作品資料的共用處理函式
└── style.css        # 全域樣式、色彩與版面寬度變數
public/              # favicon 等不經打包處理的檔案
.github/workflows/   # 自動部署設定
```

## 部署

push 到 `main` 分支時，GitHub Actions 會自動打包並部署到 GitHub Pages，也可以在 repo 的 **Actions** 分頁手動觸發。

首次使用前，需在 repo 的 **Settings → Pages** 將 **Source** 設為 **GitHub Actions**。

## 致謝

主視覺與頭像插畫：[アル毛（@capybaraarumao）](https://x.com/capybaraarumao)
