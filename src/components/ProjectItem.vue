<script setup lang="ts">
import { computed } from 'vue'

import type { Project, ProjectImage, SourceLink } from '@/data/resume'

const props = defineProps<{ project: Project }>()

// 截圖可以是單張或多張，統一轉成陣列處理
const images = computed<ProjectImage[]>(() => {
  const { image } = props.project
  if (!image) return []
  return Array.isArray(image) ? image : [image]
})

// 單一網址轉成一個「查看原始碼」連結；陣列則照原樣使用
const sourceLinks = computed<SourceLink[]>(() => {
  const { source } = props.project
  if (!source) return []
  return typeof source === 'string' ? [{ label: '查看原始碼', url: source }] : source
})
</script>

<template>
  <article class="project">
    <div class="project-head">
      <h3>{{ project.title }}</h3>
      <span class="meta">
        <span v-if="project.offline" class="badge">已下線</span>
        <span class="year">{{ project.year }}</span>
      </span>
    </div>
    <div v-if="images.length" class="shots" :class="{ multi: images.length > 1 }">
      <figure v-for="img in images" :key="img.src" class="shot">
        <img :src="img.src" :alt="img.alt" loading="lazy" decoding="async" />
        <figcaption v-if="img.caption">{{ img.caption }}</figcaption>
      </figure>
    </div>
    <p class="summary">{{ project.summary }}</p>
    <ul class="highlights">
      <li v-for="item in project.highlights" :key="item">{{ item }}</li>
    </ul>
    <p class="stack">
      <span class="visually-hidden">使用技術：</span>
      <span v-for="tech in project.stack" :key="tech" class="tech">{{ tech }}</span>
    </p>
    <p v-if="(project.demo && !project.offline) || sourceLinks.length" class="links">
      <a v-if="project.demo && !project.offline" :href="project.demo" target="_blank" rel="noreferrer">
        <ITablerWorld class="icon" aria-hidden="true" />查看線上版本<span class="visually-hidden"
          >（{{ project.title }}，另開新視窗）</span
        >
      </a>
      <a v-for="link in sourceLinks" :key="link.url" :href="link.url" target="_blank" rel="noreferrer">
        <ITablerBrandGithub class="icon" aria-hidden="true" />{{ link.label
        }}<span class="visually-hidden">（{{ project.title }}，另開新視窗）</span>
      </a>
    </p>
  </article>
</template>

<style scoped>
.project {
  padding-block: 1.75rem;
  border-top: 1px solid var(--line);
}

.project-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

h3 {
  font-size: 1.5rem;
}

.meta {
  display: inline-flex;
  flex: none;
  align-items: baseline;
  gap: 0.6rem;
}

/* 已下線：低調的灰框標籤，不搶標題的注意力 */
.badge {
  padding: 0.05rem 0.55rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  font-size: 0.8rem;
  white-space: nowrap;
}

.year {
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

/* 作品截圖：依原圖比例完整呈現，不裁切；多張時桌面版並排 */
.shots {
  display: grid;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

@media (min-width: 640px) {
  .shots.multi {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }
}

.shot {
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: var(--surface);
}

.shot img {
  display: block;
  width: 100%;
  height: auto;
}

.shot figcaption {
  padding: 0.35rem 0.75rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.85rem;
}

.summary {
  margin-top: 0.75rem;
}

.highlights {
  margin-top: 0.75rem;
  padding-left: 1.2rem;
  color: var(--muted);
}

.highlights li + li {
  margin-top: 0.25rem;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
}

.tech {
  padding: 0.1rem 0.6rem;
  border-radius: var(--radius);
  background: var(--accent-soft);
  font-size: 0.85rem;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
  font-weight: 500;
}

.links a {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
}

/* 圖示跟著連結文字的顏色與大小 */
.icon {
  flex: none;
  width: 1.15em;
  height: 1.15em;
}
</style>
