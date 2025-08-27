<template>
  <div>
    <h2 class="gallery-heading">Gallery <span>(2016 - 2024)</span></h2>
    <section class="gallery-container">
      <GalleryList mode="light" />
    </section>
  </div>
</template>

<script setup lang="ts">
import GalleryList from '@/components/molecules/GalleryList.vue'
</script>

<style scoped lang="scss">
@use '@/assets/style/global' as vp;

.gallery-heading {
  max-width: 920px;
  margin: 0 auto 2rem;
  font-family: 'Poppins', sans-serif;

  padding-top: 110px;
  padding-inline: 9%;
  @include vp.up(md) {
    padding-top: 90px;
    padding-inline: 8%;
  }

  @include vp.up(lg) {
    padding-top: 70px;
    padding-inline: 24px;
  }

  span {
    font-size: 1rem;
  }
}
.gallery-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
