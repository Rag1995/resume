<script setup lang="ts">
import banner768 from '@/assets/banner-768.webp'
import banner1280 from '@/assets/banner-1280.webp'
import banner1920 from '@/assets/banner-1920.webp'
import type { Profile } from '@/data/resume'

defineProps<{ profile: Profile }>()

const srcset = `${banner768} 768w, ${banner1280} 1280w, ${banner1920} 1920w`
</script>

<template>
  <header class="hero">
    <div class="hero-art">
      <div class="hero-scroll">
        <img
          :src="banner1280"
          :srcset="srcset"
          sizes="100vw"
          width="1920"
          height="1080"
          alt="一群手繪角色在光芒下排成一列的插畫"
          fetchpriority="high"
        />
      </div>
    </div>

    <div class="hero-text">
      <h1>{{ profile.name }}</h1>
      <p class="role">{{ profile.role }}，{{ profile.location }}</p>
      <p class="tagline">{{ profile.tagline }}</p>
      <p class="status">
        <span class="status-dot" aria-hidden="true" />
        {{ profile.status }}
      </p>
    </div>
  </header>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
}

.hero-art {
  position: relative;
  height: min(82svh, 56.25vw + 6rem);
  min-height: 22rem;
  overflow: hidden;
}

.hero-scroll {
  height: 100%;
}

.hero-art img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 35%;
  animation: settle 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

/* 讓插畫底部的反光地板直接融進頁面背景 */
.hero-art::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 55%;
  background: linear-gradient(to bottom, transparent, var(--paper) 80%);
  pointer-events: none;
}

.hero-text {
  position: relative;
  z-index: 1;
  width: min(100% - 2rem, 68rem);
  margin: -5rem auto 0;
  animation: rise 0.9s 0.35s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

h1 {
  font-size: clamp(3.5rem, 2rem + 8vw, 7.5rem);
  line-height: 1;
  letter-spacing: -0.01em;
}

.role {
  margin-top: 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
  color: var(--muted);
}

.tagline {
  margin-top: 1rem;
  max-width: var(--measure);
  font-size: 1.125rem;
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.5rem;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.9rem;
  color: var(--muted);
}

.status-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--gold) 25%, transparent);
}

@keyframes settle {
  from {
    transform: scale(1.06);
    filter: brightness(1.25) saturate(0.8);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
}

/*
 * 捲動退場：主視覺隨頁面往下捲時以較慢的速度下沉並淡出（視差）。
 * 純 CSS scroll-driven animation，不支援的瀏覽器維持靜態。
 * 動畫掛在外層 .hero-scroll，避免和 img 的載入動畫搶 transform。
 */
@supports (animation-timeline: scroll()) {
  @media (prefers-reduced-motion: no-preference) {
    .hero-scroll {
      transform-origin: 50% 100%;
      animation: hero-exit linear both;
      animation-timeline: scroll(root block);
      animation-range: 0 80svh;
    }
  }
}

@keyframes hero-exit {
  to {
    transform: translateY(18%) scale(1.04);
    opacity: 0.35;
  }
}

@media (max-width: 640px) {
  .hero-art {
    min-height: 16rem;
    height: 62vw;
  }

  .hero-text {
    margin-top: -2.5rem;
  }
}
</style>
