<template>
  <MinimalFrame :mode="mode" :key="$route.fullPath" />
  <router-view v-slot="{ Component }">
    <transition name="view" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import MinimalFrame from './components/molecules/MinimalFrame.vue'

const route = useRoute()
const mode = computed(() => (route.meta.mode as string) || 'light')
</script>

<style lang="scss">
@use '@/assets/style/global' as *;
</style>
