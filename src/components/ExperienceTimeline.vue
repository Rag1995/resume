<script setup lang="ts">
import type { Experience } from '@/data/resume'

defineProps<{ items: Experience[] }>()
</script>

<template>
  <ol class="timeline">
    <li v-for="item in items" :key="item.company + item.period">
      <p class="period">{{ item.period }}</p>
      <h3>{{ item.title }}</h3>
      <p class="company">{{ item.company }}</p>
      <ul>
        <li v-for="point in item.highlights" :key="point">{{ point }}</li>
      </ul>
    </li>
  </ol>
</template>

<style scoped>
.timeline {
  list-style: none;
  padding: 0;
  border-left: 2px solid var(--line);
}

.timeline > li {
  position: relative;
  padding: 0 0 2.25rem 1.75rem;
}

.timeline > li:last-child {
  padding-bottom: 0;
}

.timeline > li::before {
  content: '';
  position: absolute;
  left: -0.45rem;
  top: 0.55rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid var(--accent);
}

.timeline > li:first-child::before {
  background: var(--accent);
}

.period {
  color: var(--muted);
  font-size: 0.9rem;
  font-variant-numeric: tabular-nums;
}

h3 {
  font-size: 1.35rem;
}

.company {
  color: var(--muted);
}

ul {
  margin-top: 0.5rem;
  padding-left: 1.2rem;
}
</style>
