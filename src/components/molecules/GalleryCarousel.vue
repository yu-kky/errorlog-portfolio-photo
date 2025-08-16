<script setup lang="ts">
import type { GalleryItem } from '@/api/gallery'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import ImageItem from '../atoms/ImageItem.vue'

const props = withDefaults(
  defineProps<{
    items: GalleryItem[]
    alt?: string
    auto?: boolean
    interval?: number
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
const count = () => props.items.length
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
    <transition-group name="xfade" tag="div" class="stage">
      <ImageItem :key="i" :item="items[i]" :index="1" />
    </transition-group>

    <div class="dots" role="tablist" aria-label="Slides">
      <button
        v-for="(src, idx) in items"
        :key="idx"
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
.stage {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  & > .slide {
    position: absolute;
    inset: 0;
  }
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
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
