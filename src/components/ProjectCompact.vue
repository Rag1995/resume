<script setup lang="ts">
import { computed } from 'vue'

import type { Project } from '@/data/resume'
import { getDemoLink, getSourceLinks } from '@/utils/project'

/** 「其他作品」的精簡版：只顯示標題、年份、介紹、技術與連結 */
const props = defineProps<{ project: Project }>()

const sourceLinks = computed(() => getSourceLinks(props.project))
const demo = computed(() => getDemoLink(props.project))
</script>

<template>
  <article class="compact">
    <div class="head">
      <h4>{{ project.title }}</h4>
      <span class="meta">
        <span v-if="project.offline" class="badge">已下線</span>
        <span class="year">{{ project.year }}</span>
      </span>
    </div>
    <p class="summary">{{ project.summary }}</p>
    <p class="stack">
      <span class="visually-hidden">使用技術：</span>
      <span v-for="tech in project.stack" :key="tech" class="tech">{{ tech }}</span>
    </p>
    <p v-if="demo || sourceLinks.length" class="links">
      <a v-if="demo" :href="demo" target="_blank" rel="noreferrer">
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
.compact {
  padding-block: 1.25rem;
  border-top: 1px solid var(--line);
}

.head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

h4 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.15rem;
  line-height: 1.35;
}

.meta {
  display: inline-flex;
  flex: none;
  align-items: baseline;
  gap: 0.6rem;
}

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
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
}

.summary {
  margin-top: 0.35rem;
  color: var(--muted);
  font-size: 0.95rem;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.6rem;
}

.tech {
  padding: 0.05rem 0.5rem;
  border-radius: var(--radius);
  background: var(--accent-soft);
  font-size: 0.8rem;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  margin-top: 0.6rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.links a {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
}

.icon {
  flex: none;
  width: 1.1em;
  height: 1.1em;
}
</style>
