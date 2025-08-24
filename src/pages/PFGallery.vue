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
.gallery-heading {
  max-width: 920px;
  margin: 0 auto 2rem;
  padding: 70px 0 0;
  font-family: 'Poppins', sans-serif;

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
