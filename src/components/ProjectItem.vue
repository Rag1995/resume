<script setup lang="ts">
import type { Project } from '@/data/resume'

defineProps<{ project: Project }>()
</script>

<template>
  <article class="project">
    <div class="project-head">
      <h3>{{ project.title }}</h3>
      <span class="year">{{ project.year }}</span>
    </div>
    <p class="summary">{{ project.summary }}</p>
    <ul class="highlights">
      <li v-for="item in project.highlights" :key="item">{{ item }}</li>
    </ul>
    <p class="stack">
      <span class="visually-hidden">使用技術：</span>
      <span v-for="tech in project.stack" :key="tech" class="tech">{{ tech }}</span>
    </p>
    <p v-if="project.demo || project.source" class="links">
      <a v-if="project.demo" :href="project.demo" target="_blank" rel="noreferrer">
        查看線上版本<span class="visually-hidden">（{{ project.title }}，另開新視窗）</span>
      </a>
      <a v-if="project.source" :href="project.source" target="_blank" rel="noreferrer">
        查看原始碼<span class="visually-hidden">（{{ project.title }}，另開新視窗）</span>
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

.year {
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.summary {
  margin-top: 0.5rem;
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
</style>
