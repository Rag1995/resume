/**
 * 依畫面實際使用的文字載入 Google Fonts 子集。
 *
 * 中文字型完整載入需要數 MB，但這個網站每種字型、字重只用到幾十到幾百個字。
 * 頁面渲染後掃描所有文字節點，依「字型 + 字重」分組收集用到的字，
 * 再透過 Google Fonts 的 `text` 參數，只下載包含這些字的字型檔。
 */

const FONT_API = 'https://fonts.googleapis.com/css2'

/** 需要從 Google Fonts 載入的字型，其餘（系統字型）略過 */
const WEB_FONTS = ['LXGW WenKai TC', 'Noto Sans TC']

/** 頁面載入時還沒渲染、之後才會出現的文字，例如燈箱的圖說 */
export interface ExtraText {
  family: string
  weight: number
  text: string
}

function collectText(root: HTMLElement): Map<string, Set<string>> {
  const groups = new Map<string, Set<string>>()
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent?.replace(/\s/g, '')
    const parent = node.parentElement
    if (!text || !parent) continue

    const style = getComputedStyle(parent)
    const family = style.fontFamily.split(',')[0].trim().replace(/["']/g, '')
    if (!WEB_FONTS.includes(family)) continue

    const key = `${family}:${style.fontWeight}`
    const chars = groups.get(key) ?? new Set<string>()
    for (const char of text) chars.add(char)
    groups.set(key, chars)
  }

  return groups
}

export function loadSubsetFonts(root: HTMLElement = document.body, extras: ExtraText[] = []) {
  const groups = collectText(root)

  for (const { family, weight, text } of extras) {
    const key = `${family}:${weight}`
    const chars = groups.get(key) ?? new Set<string>()
    for (const char of text.replace(/\s/g, '')) chars.add(char)
    groups.set(key, chars)
  }

  for (const [key, chars] of groups) {
    const [family, weight] = key.split(':')
    // 排序讓相同內容產生相同網址，瀏覽器與 Google 的快取才能重複使用
    const text = [...chars].sort().join('')
    const params = new URLSearchParams({ family: `${family}:wght@${weight}`, text, display: 'swap' })

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = `${FONT_API}?${params}`
    document.head.append(link)
  }
}
