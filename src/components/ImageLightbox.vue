<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'

import type { ProjectImage } from '@/data/resume'

/**
 * 截圖燈箱：用原生 <dialog> 實作，Esc 關閉、焦點自動限制在燈箱內。
 * 多張截圖時可用左右按鈕或鍵盤方向鍵切換。
 */
const props = defineProps<{ images: ProjectImage[]; title: string }>()

const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const index = ref(0)
// 燈箱開啟時才渲染圖片，避免頁面載入時就下載所有截圖
const isOpen = ref(false)
const current = computed(() => props.images[index.value])
const hasMany = computed(() => props.images.length > 1)

function open(i: number) {
  index.value = i
  isOpen.value = true
  dialog.value?.showModal()
}

function close() {
  dialog.value?.close()
}

function step(delta: number) {
  const total = props.images.length
  index.value = (index.value + delta + total) % total
}

function onKeydown(event: KeyboardEvent) {
  if (!hasMany.value) return
  if (event.key === 'ArrowRight') step(1)
  else if (event.key === 'ArrowLeft') step(-1)
}

// 點到圖片以外的暗色區域時關閉
function onClick(event: MouseEvent) {
  if (event.target === dialog.value) close()
}

defineExpose({ open })
</script>

<template>
  <dialog
    ref="dialog"
    class="lightbox"
    :aria-label="`${title} 截圖`"
    @click="onClick"
    @keydown="onKeydown"
    @close="isOpen = false"
  >
    <figure v-if="isOpen && current" class="frame">
      <img :src="current.src" :alt="current.alt" :width="current.width" :height="current.height" />
      <figcaption v-if="current.caption || hasMany">
        <span v-if="current.caption">{{ current.caption }}</span>
        <span v-if="hasMany" class="count">{{ index + 1 }} / {{ images.length }}</span>
      </figcaption>
    </figure>

    <button type="button" class="control close" aria-label="關閉" @click="close">
      <ITablerX aria-hidden="true" />
    </button>
    <template v-if="hasMany">
      <button type="button" class="control prev" aria-label="上一張" @click="step(-1)">
        <ITablerChevronLeft aria-hidden="true" />
      </button>
      <button type="button" class="control next" aria-label="下一張" @click="step(1)">
        <ITablerChevronRight aria-hidden="true" />
      </button>
    </template>
  </dialog>
</template>

<style scoped>
/* 讓 dialog 佔滿整個視窗，點到空白處（dialog 本身）即可關閉 */
.lightbox {
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 4rem 1rem 3rem;
  border: 0;
  background: transparent;
}

.lightbox[open] {
  display: grid;
  place-items: center;
}

.lightbox::backdrop {
  background: rgb(10 11 30 / 0.88);
}

.frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: min(100%, 1600px);
  margin: 0;
  animation: lightbox-in 0.2s ease-out;
}

.frame img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: calc(100dvh - 9rem);
  border-radius: var(--radius);
  background: var(--surface);
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 0.45);
}

figcaption {
  display: flex;
  gap: 1rem;
  color: #e8eafb;
  font-size: 0.9rem;
}

.count {
  font-variant-numeric: tabular-nums;
  opacity: 0.75;
}

.control {
  position: fixed;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.12);
  color: #fff;
  font-size: 1.4rem;
  cursor: pointer;
  transition: background 0.2s;
}

.control:hover {
  background: rgb(255 255 255 / 0.24);
}

.close {
  top: 1rem;
  right: 1rem;
}

.prev,
.next {
  top: 50%;
  transform: translateY(-50%);
}

.prev {
  left: 1rem;
}

.next {
  right: 1rem;
}

@keyframes lightbox-in {
  from {
    opacity: 0;
    transform: scale(0.97);
  }
}
</style>
