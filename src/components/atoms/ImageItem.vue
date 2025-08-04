<template>
  <img :src="imgUrl" alt="Gallery Image" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import type { GalleryItem } from '@/api/gallery'

// props 定義
const props = defineProps<{
  item: GalleryItem
  index: number
}>()

// Firebase Storage 初期化
const storage = getStorage()

// 表示する画像のURL
const imgUrl = ref<string>(new URL('@/assets/default.jpg', import.meta.url).href)

onMounted(async () => {
  const imageRef = storageRef(storage, `photo/${props.item.imgDir}/${props.index}.jpg`)
  getDownloadURL(imageRef)
    .then((url) => {
      imgUrl.value = url
    })
    .catch((error) => {
      console.warn('画像の取得に失敗:', error)
    })
})
</script>

<style scoped>
img {
  max-width: 100%;
  display: block;
}
</style>
