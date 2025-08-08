<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

import hero1 from '@/assets/img/hero1.jpg'
import hero2 from '@/assets/img/hero2.jpg'
import hero3 from '@/assets/img/hero3.jpg'

const bgList = [hero1, hero2, hero3]

const scrollY = ref(0)
const currentIndex = ref(0)
const prevIndex = ref(0)
const isFadingBg = ref(false)

// ★ ヒーロー滞在時間（vhベースの目安）
const spacerVH = 150 // ← 100〜200の間で好みへ。まずは150vhくらい
// ★ セクション1の上余白（vh）
const firstSectionOffsetVH = 40 // ← 30〜60あたりが自然

// px換算
const spacerHeight = (spacerVH / 100) * window.innerHeight

// フェード開始/終了を spacer に合わせて調整
const hideStart = spacerHeight // spacerの終端で開始
const hideEnd = spacerHeight + 0.6 * window.innerHeight // 0.6画面分で完全に消える

const heroHideProgress = computed(() => {
  const p = (scrollY.value - hideStart) / (hideEnd - hideStart)
  return Math.max(0, Math.min(1, p)) // 0〜1に制限
})

const parallaxY = computed(() => scrollY.value * 0.3)

const heroOpacity = computed(() => 1 - heroHideProgress.value)
const heroTranslateY = computed(() => `translateY(${-heroHideProgress.value * 20}vh)`)
const heroGone = computed(() => heroHideProgress.value >= 1)

let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    scrollY.value = window.scrollY
    ticking = false
  })
}

function onIntersect(entries: IntersectionObserverEntry[]) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const idx = Number(entry.target.getAttribute('data-index'))
      if (!Number.isNaN(idx) && idx !== currentIndex.value) {
        prevIndex.value = currentIndex.value
        currentIndex.value = idx
        isFadingBg.value = true
        setTimeout(() => (isFadingBg.value = false), 800)
      }
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const io = new IntersectionObserver(onIntersect, {
    threshold: 0.5,
    rootMargin: '-50% 0px -50% 0px',
  })
  document.querySelectorAll('.trigger-section').forEach((el) => io.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div>
    <!-- 固定ヒーロー -->
    <section
      class="hero fixed"
      :style="{
        opacity: String(heroOpacity),
        transform: heroTranslateY,
        visibility: heroGone ? 'hidden' : 'visible',
        pointerEvents: heroGone ? 'none' : 'auto',
      }"
    >
      <div class="hero-bg-wrapper">
        <div
          class="hero-bg"
          :style="{
            backgroundImage: `url(${bgList[prevIndex]})`,
            transform: `translateY(${parallaxY}px)`,
            opacity: isFadingBg ? 1 : 0,
          }"
        />
        <div
          class="hero-bg"
          :style="{
            backgroundImage: `url(${bgList[currentIndex]})`,
            transform: `translateY(${parallaxY}px)`,
            opacity: 1,
          }"
        />
      </div>
      <div class="hero-content">
        <!-- 必要に応じて表示切替 -->
        <h1 v-if="currentIndex === 0">ポートフォリオへようこそ</h1>
      </div>
    </section>

    <!-- spacerでヒーロー滞在時間を確保 -->
    <div class="hero-spacer" :style="{ height: spacerHeight + 'px' }"></div>

    <!-- 通常のセクション -->
    <section
      v-for="(_, i) in bgList"
      :key="i"
      class="trigger-section"
      :data-index="i"
      :style="i === 0 ? { paddingTop: `${firstSectionOffsetVH}vh` } : undefined"
    >
      <div class="section-content">セクション {{ i + 1 }}</div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.hero.fixed {
  position: fixed;
  inset: 0 0 auto 0;
  height: 100vh;
  z-index: 10;
  will-change: opacity, transform;
  overflow: hidden;
}

.hero-bg-wrapper {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.hero-bg {
  position: absolute;
  inset: -5%;
  background-size: cover;
  background-position: center;
  will-change: transform, opacity;
  transition: opacity 0.8s ease;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  text-align: center;
  padding-top: 40vh;
}

.hero-spacer {
  width: 100%;
}

.trigger-section {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #272624;
  color: white;
}
</style>
