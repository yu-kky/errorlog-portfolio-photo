<template>
  <div class="top-container">
    <!-- ファーストビュー -->
    <section class="hero" ref="hero">
      <div class="hero-bg" ref="heroBg"></div>
      <div class="hero-content">
        <h1>Between failure and creation.</h1>
      </div>
    </section>

    <!-- 白背景のセクション -->
    <section class="white-section">
      <div class="carousel-wrapper">
        <div class="carousel">
          <GalleryCarousel alt="work preview" :auto="true" />
        </div>
      </div>
      <div class="gallery-wrapper">
        <div class="gallery">
          <GalleryList :is-preview="true" />
          <div class="gallery-more">
            <RouterLink to="/gallery">All Works →</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import GalleryCarousel from '@/components/molecules/GalleryCarousel.vue'
import GalleryList from '@/components/molecules/GalleryList.vue'

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
<style scoped lang="scss">
@use '@/assets/style/global' as vp;
.top-container {
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow: hidden;
  padding-bottom: 100px;
}

.hero {
  position: relative;
  height: 100vh;
  min-height: 100vh;
  min-height: 100svh;
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
    font-size: 6rem;
    line-height: 8rem;
    @include vp.up(md) {
      font-size: 8rem;
      line-height: 10rem;
    }
    @include vp.up(lg) {
      font-size: 10rem;
      line-height: 12rem;
    }
    @include vp.up(xl) {
      font-size: 12rem;
      line-height: 13rem;
    }
    color: #27262420;
    font-family: 'Poppins', sans-serif;
    -webkit-text-stroke: 1px #fff;
  }
}

.white-section {
  scroll-snap-align: start;
}
.carousel-wrapper {
  height: 100vh;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;

  .carousel {
    width: min(800px, 80vw);
    aspect-ratio: 16 / 9;
  }
}
.gallery-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gallery-more {
  text-align: right;
  margin-top: -20px;

  margin-right: 9%;
  @include vp.up(md) {
    margin-right: 8%;
  }

  @include vp.up(lg) {
    margin-right: 24px;
  }

  a {
    display: inline-block;
    border: 1.5px solid #272624;
    padding: 5px 15px;
    font-size: 0.8rem;
    text-decoration: none;
    color: #272624;
  }
}

@include vp.down(md) {
  .top-container {
    scroll-snap-type: none;
  }
}
</style>
