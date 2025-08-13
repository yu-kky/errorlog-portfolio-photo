<template>
  <div id="app" class="snap">
    <!-- ファーストビュー -->
    <section class="hero" ref="hero">
      <div class="hero-bg" ref="heroBg"></div>
      <div class="hero-content">
        <h1>Between failure and creation.</h1>
      </div>
    </section>

    <section class="typo-frame">
      <div class="edge-top">
        <img :src="logo" class="logo-img" alt="ERRORLOG" />
      </div>
      <span class="typo-anchor edge-left"><span class="typo-vertical">ERRORLOG</span></span>
      <span class="typo-anchor edge-right"><span class="typo-vertical">Design Works.</span></span>
      <div class="edge-bottom">
        <div class="scroll-guide">Scroll ↓</div>
        <span class="copyright">@ERRORLOG 2025</span>
        <div class="brand-sign">
          <img :src="logo" alt="ERRORLOGロゴ" class="brand-logo" />
          <span>ERRORLOG</span>
        </div>
      </div>
    </section>

    <!-- 白背景のセクション -->
    <section class="white-section">
      <div class="main">
        <p>ここから作品やコンテンツを表示</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logo from '@/assets/logo.png'

const hero = ref<HTMLElement | null>(null)
const heroBg = ref<HTMLElement | null>(null)
const heroText = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle('white-bg', entry.isIntersecting === false)
    },
    { threshold: 0.1 },
  )
  if (hero.value) observer.observe(hero.value)

  // パララックス用スクロールイベント
  window.addEventListener('scroll', handleParallax)
})

onBeforeUnmount(() => {
  if (hero.value && observer) observer.unobserve(hero.value)
  window.removeEventListener('scroll', handleParallax)
})

/**
 * パララックス時の背景アニメーション
 */
function handleParallax() {
  const scrollY = window.scrollY
  if (hero.value) {
    const ratio = Math.min(1, window.scrollY / window.innerHeight)
    hero.value.style.opacity = String(1 - ratio)
    hero.value.style.backgroundPositionY = `${scrollY * 0.4}px`
  }
  const scale = 1 + (scrollY / window.innerHeight) * 0.08
  if (heroBg.value) {
    heroBg.value.style.transform = `scale(${scale}) translate3d(0, ${scrollY * 0.3}px, 0)`
  }
  if (heroText.value) {
    heroText.value.style.transform = `translate3d(0, ${scrollY * 0.6}px, 0)`
  }
}
</script>

<style>
@keyframes scrollBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
body {
  transition: background-color 0.6s ease;
  background-color: #272624;
  color: white;

  &.white-bg {
    background-color: white;
    color: #272624;
  }
}
.snap {
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
}

/* ファーストビュー */
.hero {
  position: relative;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
    transition: opacity 1s ease;
    pointer-events: none;
    opacity: 1;
  }
  .white-bg & {
    opacity: 0;
  }
}
.hero-bg {
  position: absolute;
  inset: 0;
  background: url('@/assets/img/hero1.jpg') center/cover no-repeat; /* coverキープ */
  will-change: transform;
  transform-origin: center center;
}
.hero-content {
  position: relative;
  z-index: 1;
  will-change: transform;
  text-align: center;
  padding: 3rem;

  h1 {
    font-size: 10rem;
    color: #27262420;
    font-family: 'Poppins', sans-serif;
    -webkit-text-stroke: 1px #fff;
  }
}

/** ロゴ枠 */
.typo-frame {
  position: fixed;
  inset: 0;
  height: 100svh;
  height: 100dvh;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
}
.edge-top,
.edge-bottom {
  padding: 1.5rem;
}
.logo-img {
  filter: invert(1);
  transition: filter 0.4s ease;
  width: 4rem;

  .white-bg & {
    filter: none;
  }
}
.typo-anchor,
.typo-anchor {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.edge-left {
    left: var(--edge-gap, 3rem);
  }
  &.edge-right {
    right: var(--edge-gap, 3rem);
  }
}
.typo-vertical {
  writing-mode: vertical-rl;
  text-orientation: sideways;
  white-space: nowrap;
  line-height: 1;
  font-size: 1rem;
  letter-spacing: 1.2rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
}
.edge-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: grid;
  justify-content: center;

  .copyright {
    font-size: 0.7rem;
    letter-spacing: 0.3rem;
  }

  .scroll-guide {
    position: fixed;
    left: 24px;
    bottom: 24px;
    display: inline-block; /* transformの効きを安定させる */
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    opacity: 0.8;
    animation-name: scrollBounce;
    animation-duration: 1.6s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    will-change: transform; /* パフォーマンス向上 */
  }
}
.brand-sign {
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  opacity: 0.85;
}
.brand-logo {
  filter: invert(1);
  transition: filter 0.4s ease;
  width: 2rem;

  .white-bg & {
    filter: none;
  }
}

/* 白背景セクション */
.white-section {
  min-height: 100vh;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main {
  border: 2px solid black;
  padding: 2rem;
}
</style>
