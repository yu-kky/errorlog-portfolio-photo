<script setup lang="ts">
import logo from '@/assets/logo.png'

import { ref, onMounted, onBeforeUnmount } from 'vue'

const isScrolled = ref(false)
const isActive = ref(false)

function scroll() {
  isScrolled.value = document.body.getBoundingClientRect().top < -65
}

function toggleMenu() {
  isActive.value = !isActive.value
}

onMounted(() => {
  window.addEventListener('scroll', scroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scroll)
})
</script>

<template>
  <transition name="view">
    <router-view />
  </transition>
</template>

<style scoped lang="scss">
@use '@/assets/style/global' as *;
html,
body {
  font-size: 15px;
  letter-spacing: 0.1rem;
  color: $charcoal;
  font-family:
    proxima-nova, dnp-shuei-gothic-kin-std, '游ゴシック', 'Yu Gothic', YuGothic,
    'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'ＭＳ ゴシック',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  border: 10px solid #b10056;
}
</style>
