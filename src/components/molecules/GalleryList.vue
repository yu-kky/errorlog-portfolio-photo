<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getLatest, getListWithPagination, type GalleryItem } from '@/api/gallery'
import GalleryListItem from './GalleryListItem.vue'

const props = withDefaults(
  defineProps<{
    isPreview?: boolean
  }>(),
  {
    isPreview: false,
  },
)
const page = ref(1)
const isLoading = ref(false)
const isScrollable = ref(true)
const list = ref([] as GalleryItem[])

const getLatestGallery = () => {
  getLatest((result: GalleryItem[]) => {
    list.value = result
  })
}
/**
 * ページング処理ありのギャラリー一覧取得
 */
const fetchNextGallery = () => {
  if (!isLoading.value && isScrollable.value) {
    isLoading.value = true
    getListWithPagination('all', page.value, (result: GalleryItem[], isMoreAvailable: boolean) => {
      list.value = list.value.concat(result)
      page.value++
      isLoading.value = false
      if (!isMoreAvailable) {
        isScrollable.value = false
      }
    })
  }
}

onMounted(() => {
  props.isPreview ? getLatestGallery() : fetchNextGallery()
})
</script>

<template>
  <div v-if="list.length" class="category-wrapper">
    <div class="gallery-list">
      <div v-for="item in list" :key="item.id">
        <GalleryListItem :item="item" />
      </div>

      <div class="loading" v-if="isLoading">
        <img src="@/assets/loading.svg" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/style/global' as *;
.gallery-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
.loading {
  width: 100%;
  img {
    width: 30px;
    margin: 0 auto;
    padding: 5vh 0;
  }
}
.category-wrapper {
  max-width: 920px;
  padding-bottom: 40px;
  @include max-tablet {
    width: 100%;
  }
}
</style>
