<template>
  <div>
    <section class="gallery-container">
      <GalleryList mode="light" />
    </section>
  </div>
</template>

<script setup lang="ts">
import GalleryList from '@/components/molecules/GalleryList.vue'
</script>

<style lang="scss">
body {
  background-color: white;
  color: #272624;
}
</style>
<style scoped lang="scss">
.gallery-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 150px;
}
</style>
