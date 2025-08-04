<script lang="ts">
import { defineComponent } from 'vue'
import GalleryListItem from '@/components/molecules/GalleryListItem.vue'
import { getListWithPagination, type GalleryItem } from '@/api/gallery'

export default defineComponent({
  components: { GalleryListItem },
  data() {
    return {
      list: [] as GalleryItem[],
      page: 1,
      isLoading: false,
      isScrollable: true,
    }
  },
  mounted() {
    this.fetchNextGallery()
  },
  created() {
    window.addEventListener('scroll', this.scroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.scroll)
  },
  methods: {
    fetchNextGallery() {
      if (!this.isLoading && this.isScrollable) {
        this.isLoading = true
        getListWithPagination('all', this.page, (list: GalleryItem[], isMoreAvailable: boolean) => {
          this.list = this.list.concat(list)
          this.page++
          this.isLoading = false
          if (!isMoreAvailable) {
            this.isScrollable = false
          }
        })
      }
    },
    scroll() {
      if (document.body.getBoundingClientRect().bottom < window.innerHeight) {
        this.fetchNextGallery()
      }
    },
  },
})
</script>

<template>
  <div v-if="list.length" class="category-wrapper">
    <h2>
      PHOTO GALLERY -
      <span> ポトレ・コスプレ・風景 その他いろいろ撮ったもの / 撮ってもらったもの </span>
    </h2>
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
s

<style scoped lang="scss">
.gallery-list {
  display: flex;
  flex-wrap: wrap;
  transition: opacity 0.6s ease-in;
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
