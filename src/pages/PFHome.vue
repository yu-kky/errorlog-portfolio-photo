<template>
  <div class="gallery-wrapper">
    <section>
      <h2>FEATURED</h2>
    </section>

    <section>
      <h2>NEWS</h2>
      <p>
        2019.05.03：gallery + 1<br />
        2019.02.24：サイトリニューアル<br />
        2018.11.10：gallery + 3
      </p>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use '@/assets/sass/global' as *;
.gallery-wrapper {
  height: calc(100vh - (20px + 10rem + 80px + 1rem + 0.65rem));
  max-width: 1000px;
  margin: 0 auto;

  @include max-sp {
    height: auto;
    padding-bottom: 40px;
  }
}
section + section {
  padding-top: 40px;
}
p {
  font-size: 0.83rem;
  line-height: 1.5rem;
  border-left: 3px solid $silver;
  padding-left: 10px;
  margin-top: 20px;
}
</style>
