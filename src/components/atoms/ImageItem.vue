<template>
  <img :src="imgUrl" alt="Gallery Image" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'
import type { GalleryItem } from '@/api/gallery'

const props = defineProps<{
  item: GalleryItem
  index: number
}>()

const storage = getStorage()

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
