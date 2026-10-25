<script setup lang="ts">
import avatar from '@/assets/avatar.webp'
import banner768Avif from '@/assets/banner-768.avif'
import banner768 from '@/assets/banner-768.webp'
import banner1280Avif from '@/assets/banner-1280.avif'
import banner1280 from '@/assets/banner-1280.webp'
import banner1920Avif from '@/assets/banner-1920.avif'
import banner1920 from '@/assets/banner-1920.webp'
import type { Profile } from '@/data/resume'

defineProps<{ profile: Profile }>()

// 支援 AVIF 的瀏覽器優先載入（檔案約小 40%），其餘退回 WebP
const avifSrcset = `${banner768Avif} 768w, ${banner1280Avif} 1280w, ${banner1920Avif} 1920w`
const srcset = `${banner768} 768w, ${banner1280} 1280w, ${banner1920} 1920w`
</script>

<template>
  <header class="hero">
    <div class="hero-art">
      <div class="hero-scroll">
        <picture>
          <source type="image/avif" :srcset="avifSrcset" sizes="100vw" />
          <img
            :src="banner1280"
            :srcset="srcset"
            sizes="100vw"
            width="1920"
            height="1080"
            alt="一群手繪角色在光芒下排成一列的插畫"
            fetchpriority="high"
          />
        </picture>
      </div>
    </div>

    <div class="hero-text">
      <div class="identity">
        <img class="avatar" :src="avatar" width="256" height="256" alt="手拿遊戲機、面帶微笑的狗獸人頭像插畫" />
        <h1>
          <span class="name-zh">{{ profile.name }}</span>
          <!-- 讓螢幕閱讀器與搜尋引擎讀到兩個名字之間的空格 -->
          <span class="visually-hidden">{{ ' ' }}</span>
          <span class="name-en" lang="en">{{ profile.nameEn }}</span>
        </h1>
      </div>
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

/* picture 本身不佔版面，讓 img 直接以 .hero-scroll 為尺寸基準 */
.hero-scroll picture {
  display: contents;
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

.identity {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 0.5rem + 1.5vw, 1.75rem);
}

/* 頭像高度約與名字的字高相同，外圈用背景色隔開插畫 */
.avatar {
  flex: none;
  width: clamp(4rem, 2.5rem + 4vw, 6rem);
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 4px solid var(--paper);
  box-shadow: 0 0 0 1px var(--line);
  background: var(--surface);
}

/* 中文名字比英文字母飽滿，字級不宜過大；字距稍微放寬較易讀 */
h1 {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.4em;
  font-size: clamp(2.5rem, 1.5rem + 4vw, 4.5rem);
  line-height: 1.1;
}

.name-zh {
  letter-spacing: 0.04em;
}

/* 英文名字：小字、內文字型、次要顏色，作為中文名字的補充 */
.name-en {
  font-family: var(--font-body);
  font-size: 0.36em;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--muted);
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
