<template>
  <div class="hero">
    <img :src="hero" />
  </div>
</template>

<script setup lang="ts">
import hero from '@/assets/img/hero.jpg'
</script>

<style scoped lang="scss">
@use '@/assets/style/global' as *;
.hero {
  @include max-sp {
  }
}
</style>
