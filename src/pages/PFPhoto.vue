<template>
  <div class="gallery-detail" v-if="item">
    <div class="gallery">
      <p>
        <span>{{ item.category }}</span>
        <strong>{{ item.title }}</strong>
        <span>{{ item.location.prefecture }} - {{ item.location.name }}</span>
        <span>{{ item.date }}</span>
      </p>
      <div class="grid">
        <div
          v-for="index in item?.imgNumber ?? 0"
          :key="index"
          :class="{ active: isActive(index) }"
          :ref="setImgRef(index - 1)"
        >
          <image-item :item="item" :index="index" />
        </div>
      </div>
      <p v-text="generateDescription(item)" class="description"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUpdate, onMounted, onUnmounted, ref, type ComponentPublicInstance } from 'vue'
import { useRoute } from 'vue-router'
import { findById, type GalleryItem } from '@/api/gallery'
import ImageItem from '@/components/atoms/ImageItem.vue'

const route = useRoute()
const id = Number(route.params.id)

const item = ref<null | GalleryItem | undefined>(null)
const scrollY = ref(0)
const imgScrollTop = ref<number[]>([])
const isScrollFixed = ref(false)

const imgRefs = ref<HTMLElement[]>([])
const setImgRef = (i: number) => (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLElement) {
    imgRefs.value[i] = el
  }
}

onBeforeUpdate(() => {
  imgRefs.value.length = 0
})

const fetchItem = () => {
  findById(id, (data: GalleryItem | undefined) => {
    item.value = data
  })
}

/**
 * 現在のスクロール位置を記録
 * 初回スクロール時の一度のみ、コンテンツの各写真のoffsetTopを記録しておく
 */
const handleScroll = () => {
  scrollY.value = window.scrollY

  if (!isScrollFixed.value) {
    imgScrollTop.value = imgRefs.value
      .filter((el): el is HTMLElement => el !== null)
      .map((el) => el.offsetTop)

    isScrollFixed.value = true
  }
}

/**
 * n番目の写真のoffsetTopが近づいてきたらtrueを返す
 * @param index
 */
const isActive = (index: number) => {
  return scrollY.value > (imgScrollTop.value[index - 1] ?? Infinity) - 500
}

const generateDescription = (item: GalleryItem) => {
  const parts = []

  parts.push(`撮影日時: ${item.date}`)

  if (item.category === 'cosplay') {
    if (item.work) parts.push(`作品名: ${item.work}`)
    if (item.characters?.length) parts.push(`キャラクター: ${item.characters.join('/')}`)
    if (item.costume) parts.push(`衣装: ${item.costume}`)

    if (item.cast?.length) {
      const castLines = item.cast.map(
        (c) => `　${c.character}: ${c.name}${c.account ? `(${c.account})` : ''}`,
      )
      parts.push(`被写体: \n${castLines.join('\n')}`)
    }
  }

  if (item.location?.name)
    parts.push(`${item.location.type === 'event' ? 'イベント' : '場所'}: ${item.location.name}`)

  const photoStr = item.photographer.join('/')
  parts.push(`撮影: ${photoStr}`)

  if (item.editor) parts.push(`編集: ${item.editor}`)

  return parts.join('\n')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  fetchItem()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
@use '@/assets/style/global' as *;
.gallery-detail {
  display: flex;
  justify-content: center;
  gap: 24px;

  padding-top: 150px;
  padding-bottom: 40px;

  .gallery {
    max-width: 800px;
    p {
      line-height: 1.2rem;

      & > * {
        display: block;
        font-weight: lighter;
      }

      & > span {
        font-size: 0.7rem;
        color: $gray;
      }

      &.description {
        font-size: 0.83rem;
        margin: 40px 0;
        white-space: pre;
        overflow-wrap: break-word;
      }
    }

    .grid {
      & > div {
        opacity: 0.85;
        -webkit-filter: grayscale(100%);
        transition:
          -webkit-filter 0.4s ease-in,
          opacity 0.4s ease-in;
        margin: 70px 0 0 0;

        &:first-child {
          opacity: 1;
          margin: 40px 0 0 0;
          filter: none;
        }

        &.active {
          opacity: 1;
          -webkit-filter: grayscale(0%);
          transition:
            -webkit-filter 0.4s ease-in,
            opacity 0.4s ease-in;
        }
      }
    }
  }
}
</style>
