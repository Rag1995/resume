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
  position: relative;
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

/*
 * 捲動進度：紫色線的尖端對齊視窗由上往下約 60% 的位置，
 * 讀到哪一段，線就畫到哪裡；經過的節點會被填滿。
 * 不支援 scroll-driven animations 或偏好減少動態時，維持靜態樣式。
 */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .timeline {
      view-timeline: --timeline block;
      /* 預設 auto 會把 html 的 scroll-padding-top 算進去，讓判斷線偏移 */
      view-timeline-inset: 0;
    }

    .timeline::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: -2px;
      width: 2px;
      background: var(--accent);
      transform-origin: top;
      animation: draw-line linear both;
      animation-timeline: --timeline;
      animation-range: cover 40vh cover calc(100% - 60vh);
    }

    .timeline > li {
      view-timeline: --item block;
      view-timeline-inset: 0;
    }

    /* 空心圓要疊在進度線之上 */
    .timeline > li::before {
      z-index: 1;
    }

    .timeline > li:first-child::before {
      background: var(--paper);
    }

    /* 疊在空心圓上的實心圓，只動 opacity，避免每幀重繪 background */
    .timeline > li::after {
      content: '';
      position: absolute;
      z-index: 1;
      left: -0.45rem;
      top: 0.55rem;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background: var(--accent);
      animation: fill-dot linear both;
      animation-timeline: --item;
      animation-range: cover calc(40vh + 0.4rem) cover calc(40vh + 1.2rem);
    }
  }
}

@keyframes draw-line {
  from {
    transform: scaleY(0);
  }
  to {
    transform: scaleY(1);
  }
}

@keyframes fill-dot {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
