<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

import type { NavItem } from '@/data/resume'
import { about, experiences, profile, projects, skillGroups } from '@/data/resume'

// 主要作品完整呈現；標記 compact 的作品放到「其他作品」精簡列表
const mainProjects = projects.filter((project) => !project.compact)
const otherProjects = projects.filter((project) => project.compact)

const navItems: NavItem[] = [
  { id: 'about', label: '關於我' },
  { id: 'skills', label: '技能' },
  { id: 'projects', label: '作品' },
  { id: 'experience', label: '經歷' },
  { id: 'contact', label: '聯絡' },
]

const activeId = ref('about')
let offsets: { id: string; top: number }[] = []
let frame = 0
let resizeObserver: ResizeObserver | undefined

// 版面改變時才量一次各段落的位置；捲動時只做數字比對，避免強制重新排版
function measure() {
  offsets = navItems.flatMap(({ id }) => {
    const el = document.getElementById(id)
    return el ? [{ id, top: el.getBoundingClientRect().top + window.scrollY }] : []
  })
  updateActive()
}

// 以視窗上方約 1/3 處當作「正在閱讀」的位置：取最後一個頂端已經越過該線的段落
function updateActive() {
  frame = 0
  const line = window.scrollY + window.innerHeight * 0.33
  let current = 'about'
  for (const { id, top } of offsets) {
    if (top <= line) current = id
  }
  // 捲到底時，最後一段可能永遠碰不到判斷線
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
    current = 'contact'
  }
  activeId.value = current
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(updateActive)
}

onMounted(() => {
  measure()
  resizeObserver = new ResizeObserver(measure)
  resizeObserver.observe(document.body)
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<template>
  <HeroBanner :profile="profile" />

  <div class="layout">
    <aside class="sidebar">
      <SectionNav :items="navItems" :active-id="activeId" />
      <div class="sidebar-contact">
        <a :href="`mailto:${profile.email}`"> <ITablerMail class="icon" aria-hidden="true" />{{ profile.email }} </a>
        <a :href="profile.github" target="_blank" rel="noreferrer">
          <ITablerBrandGithub class="icon" aria-hidden="true" />{{ profile.githubLabel }}
        </a>
      </div>
    </aside>

    <main class="content">
      <!-- 腳印只走到「作品」結束，經歷區塊交給時間軸動畫 -->
      <div class="trail-zone">
        <PawTrail />

        <section id="about" aria-labelledby="about-title">
          <h2 id="about-title">關於我</h2>
          <div class="prose">
            <p v-for="paragraph in about" :key="paragraph">{{ paragraph }}</p>
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-title">
          <h2 id="skills-title">技能</h2>
          <dl class="skills">
            <div v-for="group in skillGroups" :key="group.title" class="skill-group">
              <dt>{{ group.title }}</dt>
              <dd>
                <ul>
                  <li v-for="skill in group.items" :key="skill">{{ skill }}</li>
                </ul>
              </dd>
            </div>
          </dl>
        </section>

        <section id="projects" aria-labelledby="projects-title">
          <h2 id="projects-title">作品</h2>
          <ProjectItem v-for="project in mainProjects" :key="project.title" :project="project" />
          <div v-if="otherProjects.length" class="other-projects">
            <h3>其他作品</h3>
            <ProjectCompact v-for="project in otherProjects" :key="project.title" :project="project" />
          </div>
        </section>
      </div>

      <section id="experience" aria-labelledby="experience-title">
        <h2 id="experience-title">經歷</h2>
        <ExperienceTimeline :items="experiences" />
      </section>

      <section id="contact" class="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">聯絡</h2>
        <p class="contact-lead">{{ profile.status }}，歡迎來信聊聊職缺或合作。</p>
        <div class="contact-actions">
          <a class="button" :href="`mailto:${profile.email}`">
            <ITablerMail class="icon" aria-hidden="true" />寄信給我
          </a>
          <a :href="profile.github" target="_blank" rel="noreferrer">
            <ITablerBrandGithub class="icon" aria-hidden="true" />
            在 GitHub 上看更多
            <span class="visually-hidden"> （另開新視窗）</span>
          </a>
        </div>
      </section>
    </main>
  </div>

  <footer class="footer">
    <p>© {{ new Date().getFullYear() }} {{ profile.name }}，以 Vue 3 與 TypeScript 製作。</p>
    <!-- prettier-ignore -->
    <p>頭像插畫：<a :href="profile.avatarCredit.url" target="_blank" rel="noreferrer">{{ profile.avatarCredit.name }}<span class="visually-hidden">（X，另開新視窗）</span></a></p>
  </footer>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  width: min(100% - 2rem, 68rem);
  margin: 2rem auto 0;
}

.sidebar {
  position: sticky;
  top: 0;
  z-index: 2;
  margin-inline: -1rem;
  padding-inline: 1rem;
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
}

.sidebar-contact {
  display: none;
}

/* 圖示跟著連結文字的顏色與大小 */
.icon {
  flex: none;
  width: 1.15em;
  height: 1.15em;
}

.sidebar-contact a,
.contact-actions a {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
}

.trail-zone {
  position: relative;
}

.content {
  min-width: 0;
}

section {
  padding-block: 3.5rem;
}

h2 {
  font-size: clamp(1.75rem, 1.4rem + 1.2vw, 2.4rem);
  margin-bottom: 1.5rem;
}

/* 其他作品：和主要作品之間拉開距離，標題較小 */
.other-projects {
  margin-top: 3rem;
}

.other-projects h3 {
  margin-bottom: 0.5rem;
  font-size: 1.35rem;
  color: var(--muted);
}

.prose {
  max-width: var(--measure);
}

.prose p + p {
  margin-top: 1rem;
}

/* 技能 */
.skills {
  margin: 0;
  display: grid;
  gap: 1.5rem;
}

.skill-group {
  display: grid;
  grid-template-columns: 8rem 1fr;
  gap: 1rem;
  align-items: baseline;
}

dt {
  color: var(--muted);
}

dd {
  margin: 0;
}

dd ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

dd li {
  padding: 0.2rem 0.75rem;
  border-radius: var(--radius);
  background: var(--surface);
}

/* 聯絡 */
.contact-lead {
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 1.1rem + 1vw, 1.9rem);
  line-height: 1.5;
  max-width: 28ch;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 2rem;
  margin-top: 2rem;
  font-weight: 500;
}

.button {
  padding: 0.7rem 1.6rem;
  border-radius: var(--radius);
  background: var(--accent);
  color: var(--paper);
  text-decoration: none;
  transition: background 0.2s;
}

.button:hover {
  background: color-mix(in srgb, var(--accent) 85%, var(--ink));
}

.footer {
  width: min(100% - 2rem, 68rem);
  margin: 2rem auto 0;
  padding-block: 2rem 3rem;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.875rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 2rem;
}

@media (min-width: 960px) {
  .layout {
    grid-template-columns: 12rem 1fr;
    gap: 4rem;
    margin-top: 4rem;
  }

  .sidebar {
    align-self: start;
    top: 2rem;
    margin: 3.5rem 0 0;
    padding: 0;
    background: none;
    backdrop-filter: none;
    border: 0;
  }

  .sidebar-contact {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-top: 2rem;
    font-size: 0.85rem;
    overflow-wrap: anywhere;
  }
}

@media (max-width: 560px) {
  .skill-group {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>
