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
        <div v-for="index in item?.imgNumber ?? 0" :key="index" ref="imgRefs" class="img-box">
          <image-item :item="item" :index="index" />
        </div>
      </div>
      <p v-text="generateDescription(item)" class="description"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { findById, type GalleryItem } from '@/api/gallery'
import ImageItem from '@/components/atoms/ImageItem.vue'

const route = useRoute()
const id = Number(route.params.id)

const item = ref<GalleryItem | null | undefined>(null)
const imgRefs = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (observer) observer.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1,
    },
  )
}

onMounted(() => {
  setupObserver()
  fetchItem()
})

onUnmounted(() => {
  observer?.disconnect()
})

watch(
  item,
  async (val) => {
    if (!val) return
    await nextTick()
    imgRefs.value.forEach((el) => observer?.observe(el))
  },
  { immediate: false },
)

const fetchItem = () => {
  findById(id, (data) => {
    item.value = data
  })
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
</script>

<style scoped lang="scss">
@use '@/assets/style/global' as vp;

.gallery-detail {
  display: flex;
  justify-content: center;
  gap: 24px;

  padding-top: 100px;
  padding-bottom: 40px;

  padding-inline: 9%;
  @include vp.up(md) {
    padding-inline: 8%;
  }
  @include vp.up(lg) {
    padding-inline: 0;
  }

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
        color: vp.$gray;
      }

      &.description {
        font-size: 0.83rem;
        margin: 40px 0;
        white-space: pre;
        overflow-wrap: break-word;
      }
    }
  }
}

.grid > .img-box {
  opacity: 0.85;
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  transition:
    filter 0.4s ease-in,
    -webkit-filter 0.4s ease-in,
    opacity 0.4s ease-in;
  margin: 70px 0 0 0;

  &:first-child {
    opacity: 1;
    margin: 40px 0 0 0;
    filter: none;
    -webkit-filter: none;
  }

  &.active {
    opacity: 1;
    filter: grayscale(0%);
    -webkit-filter: grayscale(0%);
  }
}
</style>
