<template>
  <MinimalFrame :mode="mode" :key="$route.fullPath" />
  <transition name="view">
    <router-view />
  </transition>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import MinimalFrame from './components/molecules/MinimalFrame.vue'

const route = useRoute()
console.log(route.meta.mode)
const mode = computed(() => (route.meta.mode as string) || 'light')
</script>

<style lang="scss">
@use '@/assets/style/global' as *;
html,
body {
  font-size: 15px;
  letter-spacing: 0.1rem;
  font-family:
    proxima-nova, dnp-shuei-gothic-kin-std, '游ゴシック', 'Yu Gothic', YuGothic,
    'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'ＭＳ ゴシック',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
