<template>
  <router-link :to="`/gallery/${item.id}`">
    <div class="thumb">
      <image-item :item="item" :index="1" />
    </div>
    <p class="thumb-caption">
      <strong>{{ item.title }}</strong>
      <span class="location">{{ item.location.prefecture }} - {{ item.location.name }}</span>
      <span class="date">{{ item.date }}</span>
    </p>
  </router-link>
</template>

<script setup lang="ts">
import type { GalleryItem } from '@/api/gallery'
import ImageItem from '@/components/atoms/ImageItem.vue'

defineProps<{
  item: GalleryItem
}>()
</script>

<style scoped lang="scss">
@use '@/assets/style/global' as *;
.thumb {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.thumb-caption {
  margin: 0.5rem 0;

  & > * {
    display: block;
    font-size: 0.87rem;
    line-height: 1rem;
    font-weight: lighter;
    @include max-sp {
      font-size: 0.8rem;
    }
  }

  & > span {
    font-size: 0.65rem;
    color: $gray;
    @include max-sp {
      &.location {
        display: none;
      }
    }
  }
}
a {
  display: inline-block;
  color: $charcoal;
  text-decoration: none;
}
</style>
