<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { getStorage, ref as sRef, listAll, getDownloadURL } from 'firebase/storage'

const props = withDefaults(
  defineProps<{
    /** Storage 上のフォルダパス（末尾スラッシュ推奨） */
    path?: string
    auto?: boolean
    interval?: number
    startIndex?: number
  }>(),
  {
    path: 'carousel/',
    auto: false,
    interval: 4000,
    startIndex: 0,
  },
)

const urls = ref<string[]>([])
const i = ref(props.startIndex)

const count = () => urls.value.length
const next = () => {
  if (count() === 0) return
  i.value = (i.value + 1) % count()
}
const prev = () => {
  if (count() === 0) return
  i.value = (i.value - 1 + count()) % count()
}

let timer: number | null = null
const start = () => {
  if (!props.auto || timer || count() === 0) return
  timer = window.setInterval(next, props.interval)
}
const stop = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 画像の事前読み込み（ふわっと切替を滑らかに）
const preload = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })

onMounted(async () => {
  const storage = getStorage()
  const listRef = sRef(storage, props.path)
  const res = await listAll(listRef)

  const sorted = [...res.items].sort((a, b) =>
    a.name.localeCompare(b.name, 'en', { numeric: true, sensitivity: 'base' }),
  )

  const fetched = await Promise.all(sorted.map((ref) => getDownloadURL(ref)))

  // 先に少しプリロード（全件でもOK：枚数6なら誤差）
  await Promise.all(fetched.map(preload))

  urls.value = fetched
})

// 画像数の変化に応じてインデックス補正＆オート開始
watch(
  () => urls.value.length,
  (len) => {
    if (len === 0) {
      i.value = 0
      stop()
      return
    }
    if (i.value >= len) i.value = 0
    if (props.auto) start()
  },
  { immediate: true },
)

// auto の切り替えに追従
watch(
  () => props.auto,
  (v) => (v ? start() : stop()),
)

onBeforeUnmount(stop)

// --- swipe 操作（既存そのまま） ---
let downX = 0,
  downY = 0,
  dragging = false
const onPointerDown = (e: PointerEvent) => {
  dragging = true
  downX = e.clientX
  downY = e.clientY
}
const onPointerMove = () => {
  if (!dragging) return
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
  <div
    class="inline-carousel"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @mouseenter="stop"
    @mouseleave="start"
  >
    <transition name="xfade">
      <img
        v-if="urls[i]"
        :key="i"
        class="slide"
        :src="urls[i]"
        :alt="'carousel image'"
        decoding="async"
        loading="eager"
        draggable="false"
      />
    </transition>

    <div class="dots" role="tablist" aria-label="Slides" v-if="urls.length > 1">
      <button
        v-for="(_, idx) in urls"
        :key="idx"
        class="dot"
        :class="{ active: idx === i }"
        @click="i = idx"
        role="tab"
        :aria-selected="idx === i"
        :aria-label="`Slide ${idx + 1}`"
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
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}
.slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.xfade-enter-active,
.xfade-leave-active {
  transition: opacity 480ms cubic-bezier(0.22, 0.61, 0.36, 1);
}
.xfade-enter-from {
  opacity: 0;
}
.xfade-leave-to {
  opacity: 0;
}

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
  border: 1px solid white;
  border-radius: 50%;
  background: transparent;
  opacity: 0.6;
  cursor: pointer;
}
.dot.active {
  background: white;
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) {
  .xfade-enter-active,
  .xfade-leave-active {
    transition: none;
  }
}
</style>
