<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { getLatest, getListWithPagination, type GalleryItem } from '@/api/gallery'
import GalleryListItem from './GalleryListItem.vue'

const props = withDefaults(defineProps<{ isPreview?: boolean }>(), { isPreview: false })

const page = ref(1)
const isLoading = ref(false)
const isScrollable = ref(true)
const list = ref<GalleryItem[]>([])

const sentinelRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const getLatestGallery = () => {
  getLatest((result: GalleryItem[]) => {
    list.value = result
    isScrollable.value = false
  })
}

/** 次ページ取得（多重発火防止 & 末尾判定） */
const fetchNextGallery = () => {
  if (isLoading.value || !isScrollable.value) return
  isLoading.value = true

  getListWithPagination('all', page.value, (result: GalleryItem[], isMoreAvailable: boolean) => {
    list.value = list.value.concat(result)
    page.value++
    isLoading.value = false
    if (!isMoreAvailable) {
      isScrollable.value = false
      // もう終端なら監視は不要
      if (observer) observer.disconnect()
    }
  })
}

/** IntersectionObserver 設定 */
const setupObserver = () => {
  if (observer) observer.disconnect()
  if (props.isPreview) return // プレビューでは無効化

  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        fetchNextGallery()
      }
    },
    {
      root: null, // viewport
      rootMargin: '100% 0px', // 600px手前で先読み
      threshold: 0,
    },
  )
  if (sentinelRef.value) observer.observe(sentinelRef.value)
}

onMounted(() => {
  if (props.isPreview) {
    getLatestGallery()
  } else {
    fetchNextGallery() // 初回ロード
    setupObserver()
  }
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

watch(sentinelRef, (el) => {
  if (!observer || props.isPreview) return
  observer.disconnect()
  if (el) observer.observe(el)
})

watch([page, list, isScrollable], ([p, l, s]) => {
  console.log('[Gallery]', { page: p, length: l.length, hasMore: s })
})
</script>

<template>
  <div v-if="list.length" class="category-wrapper">
    <div class="gallery-list">
      <div v-for="item in list" :key="item.id">
        <GalleryListItem :item="item" />
      </div>

      <!-- ローディング -->
      <div class="loading" v-if="isLoading">
        <img src="@/assets/loading.svg" />
      </div>
    </div>

    <!-- セントネル（最下部の監視対象） -->
    <div ref="sentinelRef" class="sentinel" aria-hidden="true" />
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

.sentinel {
  height: 1px; // 見えない当たり判定
  outline: 1px dashed rgba(0, 0, 0, 0.2); //debug
}

.category-wrapper {
  max-width: 920px;
  padding-bottom: 40px;
  @include max-tablet {
    width: 100%;
  }
}
</style>
