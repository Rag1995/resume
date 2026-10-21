<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'

/** 相鄰兩個腳印的垂直距離（px） */
const STEP = 56

const trail = useTemplateRef<HTMLElement>('trail')
const { height } = useElementSize(trail)

// 依區塊高度決定腳印數量；左右交錯，再加一點緩慢擺動，看起來像真的在走
const prints = computed(() => {
  const count = Math.max(0, Math.floor(height.value / STEP))
  return Array.from({ length: count }, (_, i) => {
    const side = i % 2 === 0 ? -1 : 1
    return {
      top: i * STEP + 16,
      x: side * 7 + Math.sin(i / 4) * 4,
      // 180deg 讓腳趾朝下，代表往下走
      rotate: 180 - side * 10 + Math.cos(i / 4) * 8,
    }
  })
})
</script>

<template>
  <div ref="trail" class="paw-trail" aria-hidden="true">
    <span
      v-for="(print, i) in prints"
      :key="i"
      class="paw"
      :style="{ top: `${print.top}px`, '--x': `${print.x}px`, '--r': `${print.rotate}deg` }"
    >
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          d="M12 11.6c-3.1 0-6.4 3.6-6.4 6.5 0 2 1.6 2.9 3.3 2.9 1.4 0 2-.7 3.1-.7s1.7.7 3.1.7c1.7 0 3.3-.9 3.3-2.9 0-2.9-3.3-6.5-6.4-6.5z"
        />
        <ellipse cx="5.2" cy="10.4" rx="2" ry="2.5" transform="rotate(-25 5.2 10.4)" />
        <ellipse cx="9.3" cy="6.2" rx="2.1" ry="2.7" transform="rotate(-8 9.3 6.2)" />
        <ellipse cx="14.7" cy="6.2" rx="2.1" ry="2.7" transform="rotate(8 14.7 6.2)" />
        <ellipse cx="18.8" cy="10.4" rx="2" ry="2.5" transform="rotate(25 18.8 10.4)" />
      </svg>
    </span>
    <span class="paw-fade" />
  </div>
</template>

<style scoped>
/* 走在側邊導覽與內容之間的留白；手機版沒有留白，因此隱藏 */
.paw-trail {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: -3.2rem;
  width: 2rem;
  pointer-events: none;
}

@media (min-width: 960px) {
  .paw-trail {
    display: block;
  }
}

/* 腳印本身完全靜態，不綁任何動畫 */
.paw {
  position: absolute;
  left: 50%;
  width: 1.4rem;
  height: 1.4rem;
  margin-left: -0.7rem;
  transform: translateX(var(--x)) rotate(var(--r));
  opacity: 0.6;
}

.paw svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: color-mix(in srgb, var(--accent) 45%, var(--line));
}

.paw-fade {
  display: none;
}

/*
 * 出現／消失效果：一條固定在視窗上的漸層遮罩蓋在腳印欄位上，
 * 視窗上緣與下緣是背景色、中間透明。腳印捲進中段就「出現」，
 * 捲到上緣就「消失」。
 * 遮罩是 position: fixed 且 left 為 auto，水平位置會跟著腳印欄位；
 * 腳印本身沒有動畫，快速捲動時瀏覽器不需要逐一更新圖層。
 */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .paw {
      opacity: 1;
    }

    .paw-fade {
      display: block;
      position: fixed;
      top: 0;
      bottom: 0;
      width: 3.3rem;
      margin-left: -0.7rem;
      background: linear-gradient(to bottom, var(--paper) 12%, transparent 30%, transparent 74%, var(--paper) 82%);
      /* 主視覺還在畫面上時不要蓋到插畫，離開後才淡入 */
      animation: paw-fade-in linear both;
      animation-timeline: scroll(root block);
      animation-range: 0 60svh;
    }
  }
}

@keyframes paw-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
