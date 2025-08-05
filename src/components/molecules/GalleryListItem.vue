<template>
  <router-link :to="`/gallery/${item.id}`">
    <image-item :item="item" :index="1" />
    <p>
      <strong>{{ item.title }}</strong>
      <span class="location">{{ item.location }}</span>
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
@use '@/assets/sass/global' as *;
.gallery-list {
  & > div {
    width: calc(100% / 3);
    margin: 1.5rem 0 0;
    box-sizing: border-box;
    @include max-sp {
      width: 50%;
      margin: 1rem 0 0;
    }
    &:nth-child(3n + 1) {
      padding: 0 4% 0 0;
    }
    &:nth-child(3n + 2) {
      padding: 0 2% 0 2%;
    }
    &:nth-child(3n) {
      padding: 0 0 0 4%;
    }
    @include max-sp {
      &:nth-child(2n + 1) {
        padding: 0 1% 0 0;
      }
      &:nth-child(2n) {
        padding: 0 0 0 1%;
      }
    }
  }

  p {
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
}
</style>
