<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    images: string[] // 画像URL配列
    alt?: string // altの共通文言
    auto?: boolean // 自動再生するか
    interval?: number // 自動再生の間隔(ms)
    startIndex?: number
  }>(),
  {
    alt: '',
    auto: false,
    interval: 4000,
    startIndex: 0,
  },
)

const i = ref(props.startIndex)
const count = () => props.images.length
const next = () => (i.value = (i.value + 1) % count())
const prev = () => (i.value = (i.value - 1 + count()) % count())

let timer: number | null = null
const start = () => {
  if (!props.auto || timer) return
  timer = window.setInterval(next, props.interval)
}
const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(start)
onBeforeUnmount(stop)
watch(
  () => props.auto,
  (v) => (v ? start() : stop()),
)

/* スワイプ（ボックス内のみ） */
let downX = 0,
  downY = 0,
  dragging = false
const onPointerDown = (e: PointerEvent) => {
  dragging = true
  downX = e.clientX
  downY = e.clientY
}
const onPointerMove = (e: PointerEvent) => {
  if (!dragging) return
  // 横方向のみ反応。縦はページスクロールを優先
}
const onPointerUp = (e: PointerEvent) => {
  if (!dragging) return
  dragging = false
  const dx = e.clientX - downX
  const dy = e.clientY - downY
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
    dx < 0 ? next() : prev()
  }
}
</script>

<template>
  <!-- 親の四角（額縁）に対して width/height:100% で埋め込む前提 -->
  <div
    class="inline-carousel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @mouseenter="stop"
    @mouseleave="start"
  >
    <transition name="fade" mode="out-in">
      <img :key="i" class="slide" :src="images[i]" :alt="alt" decoding="async" loading="lazy" />
    </transition>

    <!-- 矢印（必要なければ外してOK） -->
    <button class="arrow left" @click="prev" aria-label="Previous">‹</button>
    <button class="arrow right" @click="next" aria-label="Next">›</button>

    <!-- ドット（任意） -->
    <div class="dots" role="tablist" aria-label="Slides">
      <button
        v-for="(src, idx) in images"
        :key="src + idx"
        class="dot"
        :class="{ active: idx === i }"
        @click="i = idx"
        role="tab"
        :aria-selected="idx === i"
      />
    </div>
  </div>
</template>

<style scoped>
.inline-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* 重要：縦スクロールは許可、横は自前で扱う */
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}

.slide {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 四角の中でちょうど良くトリミング */
  display: block;
}

/* フェード */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 矢印（細線・currentColor） */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid currentColor;
  background: transparent;
  color: currentColor;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  opacity: 0.9;
}
.arrow.left {
  left: 8px;
}
.arrow.right {
  right: 8px;
}

/* ドット */
.dots {
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
}
.dot {
  width: 7px;
  height: 7px;
  border: 1px solid currentColor;
  border-radius: 50%;
  background: transparent;
  opacity: 0.6;
  cursor: pointer;
}
.dot.active {
  background: currentColor;
  opacity: 1;
}

/* 低モーション配慮 */
@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
