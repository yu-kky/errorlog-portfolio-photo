<template>
  <div :class="{ tall: isTall }" class="img-container">
    <img
      :src="imgUrl"
      alt="Gallery Image"
      @load="onImageLoad"
      :style="item.objectPosition ? { objectPosition: item.objectPosition } : {}"
    />
  </div>
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
const isTall = ref(false)

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

const onImageLoad = (e: Event) => {
  const img = e.target as HTMLImageElement
  isTall.value = img.naturalHeight > img.naturalWidth
}
</script>

<style scoped lang="scss">
@use '@/assets/style/global' as vp;
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  display: block;
}
.img-container {
  width: 100%;
  height: 100%;
  position: relative;
}
.tall {
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    @include vp.up(md) {
      width: 450px;
    }
  }
}
</style>
