<template>
  <div class="gallery-detail" v-if="item">
    <div class="gallery">
      <p>
        <strong>{{ item.title }}</strong>
        <span>{{ item.location }}</span>
        <span>{{ item.date }}</span>
      </p>
      <div class="grid">
        <div
          v-for="index in item.imgNumber"
          :key="index"
          :id="index.toString()"
          :class="{ active: isActive(index) }"
        >
          <image-item :item="item" :index="index" />
        </div>
      </div>
      <p v-text="item.description" class="description"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { findById, type GalleryItem } from '@/api/gallery'
import ImageItem from '@/components/atoms/ImageItem.vue'

const route = useRoute()
const id = Number(route.params.id)

const item = ref<null | GalleryItem | undefined>(null)
const scrollY = ref(0)
const imgScrollTop = ref<number[]>([])
const isScrollFixed = ref(false)

const fetchItem = () => {
  findById(id, (data: GalleryItem | undefined) => {
    item.value = data
  })
}

const handleScroll = () => {
  scrollY.value = window.scrollY
  if (!isScrollFixed.value && item.value) {
    const positions: number[] = []
    for (let i = 1; i <= item.value.imgNumber; i++) {
      const el = document.getElementById(i.toString())
      if (el) {
        positions.push(el.offsetTop)
      }
    }
    imgScrollTop.value = positions
    isScrollFixed.value = true
  }
}

const isActive = (index: number) => {
  return scrollY.value > (imgScrollTop.value[index - 1] ?? Infinity) - 500
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
@use '@/assets/sass/global' as *;
.gallery-detail {
  .gallery {
    max-width: 920px;
    @include max-sp {
      width: 100%;
    }

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
