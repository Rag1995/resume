import type { Project, ProjectImage, SourceLink } from '@/data/resume'

/** 截圖可以是單張或多張，統一轉成陣列 */
export function getProjectImages(project: Project): ProjectImage[] {
  const { image } = project
  if (!image) return []
  return Array.isArray(image) ? image : [image]
}

/** 單一網址轉成一個「查看原始碼」連結；陣列則照原樣使用 */
export function getSourceLinks(project: Project): SourceLink[] {
  const { source } = project
  if (!source) return []
  return typeof source === 'string' ? [{ label: '查看原始碼', url: source }] : source
}

/** 已下線的作品不顯示線上版本連結 */
export function getDemoLink(project: Project): string | undefined {
  return project.offline ? undefined : project.demo
}
