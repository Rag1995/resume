<script setup lang="ts">
import type { NavItem } from '@/data/resume'

defineProps<{ items: NavItem[]; activeId: string }>()
</script>

<template>
  <nav class="section-nav" aria-label="頁面段落">
    <ul>
      <li v-for="item in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          :class="{ active: item.id === activeId }"
          :aria-current="item.id === activeId ? 'location' : undefined"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

a {
  display: block;
  padding: 0.3rem 0 0.3rem 1rem;
  border-left: 2px solid var(--line);
  color: var(--muted);
  text-decoration: none;
  transition:
    color 0.2s,
    border-color 0.2s;
}

a:hover {
  color: var(--ink);
}

a.active {
  color: var(--ink);
  font-weight: 500;
  border-left-color: var(--accent);
}

@media (max-width: 959px) {
  .section-nav {
    overflow-x: auto;
    scrollbar-width: none;
  }

  ul {
    flex-direction: row;
    gap: 1.25rem;
  }

  a {
    padding: 0.75rem 0;
    border-left: 0;
    border-bottom: 2px solid transparent;
    white-space: nowrap;
  }

  a.active {
    border-bottom-color: var(--accent);
  }
}
</style>
