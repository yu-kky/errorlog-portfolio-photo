<script setup lang="ts">
import logo from '@/assets/logo.png'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isScrolled = ref(false)
const isActive = ref(false)

function scroll() {
  isScrolled.value = document.body.getBoundingClientRect().top < -65
}

function toggleMenu() {
  isActive.value = !isActive.value
}

onMounted(() => {
  window.addEventListener('scroll', scroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scroll)
})
</script>

<template>
  <div id="app" :class="{ 'is-active': isActive }">
    <header v-bind:class="{ scroll: isScrolled }">
      <div class="logo-img"><img :src="logo" /></div>
      <h1><router-link :to="`/`">ERRORLOG Design Works.</router-link></h1>
      <nav class="pc-nav">
        <router-link :to="`/about`">ABOUT</router-link>
        <router-link :to="`/gallery`">GALLERY</router-link>
      </nav>
      <nav class="mob-nav">
        <div class="bars" v-on:click="toggleMenu"><font-awesome-icon icon="bars" /></div>
        <div class="mobile-menu">
          <img :src="logo" />
          <h1 v-on:click="toggleMenu">
            <router-link :to="`/`">ERRORLOG Design Works.</router-link>
          </h1>
          <div v-on:click="toggleMenu"><router-link :to="`/about`">ABOUT</router-link></div>
          <div v-on:click="toggleMenu"><router-link :to="`/gallery`">GALLERY</router-link></div>
        </div>
      </nav>
    </header>
    <breadcrumbs />
    <div class="main">
      <div class="wrapper">
        <transition name="view">
          <router-view />
        </transition>
      </div>
    </div>

    <div class="copyright">
      <div class="logo-img"><img :src="logo" /></div>
      <h1>© 2015-2019 ERRORLOG design works.</h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
body,
html {
  font-size: 15px;
  letter-spacing: 0.1rem;
  color: $charcoal;
  font-family:
    proxima-nova, dnp-shuei-gothic-kin-std, '游ゴシック', 'Yu Gothic', YuGothic,
    'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 'メイリオ', Meiryo, 'ＭＳ ゴシック',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
}
header {
  height: auto;
  position: fixed;
  display: flex;
  z-index: 1000;
  width: 100%;
  .logo-img {
    display: none;
  }
  h1 {
    width: 50%;
    font-size: 1.2rem;
    padding: 35px 0 0 130px;
    a {
      padding: 10px;
      display: inline-block;
      color: $charcoal;
      background-color: $white;
      text-decoration: none;
      @include max-sp {
        padding: 0;
      }
    }
    @include max-sp {
      width: 100%;
      font-size: 0.9rem;
      padding: 1.6rem 0 0 10px;
    }
  }
  .pc-nav {
    width: 50%;
    text-align: right;
    padding: 40px 50px 0 0;
    a {
      display: inline-block;
      border-bottom: 10px solid $silver;
      background: $white;
      color: $charcoal;
      text-decoration: none;
      text-align: center;
      padding: 10px 5px 0 5px;
      margin: 0 10px;
      line-height: 0.3rem;
    }
    @include max-sp {
      display: none;
    }
  }
  @include max-sp {
    background: $white;
    border-bottom: 3px solid $silver;
    .logo-img {
      display: block;
      width: 85px;
      padding: 8px 0 8px 20px;
      img {
        display: block;
      }
    }
  }
  .mob-nav {
    .bars {
      position: absolute;
      padding: 10px;
      top: 7px;
      right: 10px;
      font-size: 1.8rem;
      z-index: 2000;
    }
    .mobile-menu {
      position: absolute;
      top: 0;
      right: 0;
      background: $white;
      width: 100%;
      height: 100vh;
      overflow-y: scroll;
      z-index: 1000;
      text-align: center;
      padding: 40px 0;

      img {
        width: 70px;
        margin: 0 auto;
      }
      > div {
        padding: 10px 0;
        a {
          display: inline-block;
          color: $white;
          background: black;
          padding: 10px;
          text-decoration: none;
        }
      }
      h1 + div {
        padding-top: 30px;
      }
    }
  }
  @include min-sp {
    &.scroll {
      h1 a {
        background: black;
        color: $white;
        transition:
          color,
          background-color 0.8s ease-in;
      }
      .pc-nav {
        a {
          background: black;
          color: $white;
          border-bottom: 10px solid black;
          transition:
            color,
            background-color,
            border-bottom-color 0.8s ease-in;
        }
      }
    }
  }
  .mob-nav {
    display: none;
    @include max-sp {
      display: block;
    }
  }
}
#app {
  .mobile-menu {
    right: -100vw;
    transition: 0.5s ease-in;
  }
}
#app.is-active {
  overflow: hidden;
  height: 100vh;
  .mobile-menu {
    right: 0;
  }
}
.copyright {
  position: fixed;
  width: 140px;
  height: 100vh;
  top: 0;
  left: 0;
  text-align: center;
  writing-mode: vertical-rl;
  @include max-sp {
    position: relative;
    width: 100%;
    height: auto;
    writing-mode: horizontal-tb;
  }
  .logo-img {
    width: 80px;
    position: absolute;
    top: 20px;
    left: 30px;
    @include max-sp {
      display: none;
    }
  }
  h1 {
    display: inline-block;
    line-height: 0.2rem;
    letter-spacing: 0.2rem;
    text-align: center;
    font-weight: lighter;
    border-left: 10px solid $silver;
    margin-right: calc(140px / 2 - 0.6rem);
    @include max-sp {
      line-height: inherit;
      letter-spacing: inherit;
      width: 100%;
      height: 10rem;
      border-left: none;
      margin: 0;
      padding-top: 4.5rem;
      background: $silver;
      font-size: 0.8rem;
    }
  }
}
.breadcrumb {
  position: fixed;
  font-size: 0.65rem;
  line-height: 0.65rem;
  width: 50px;
  height: 100vh;
  right: 0;
  top: 0;
  writing-mode: vertical-rl;
  text-align: center;
  @include max-sp {
    position: relative;
    width: 100%;
    height: auto;
    padding: 80px 0 1rem 0;
    writing-mode: horizontal-tb;
  }
  span {
    display: inline-block;
    margin-right: 19px;
    padding-bottom: 10px;
    @include max-sp {
      margin: 0;
      padding: 0;
    }
    &:before {
      content: '/';
      padding-bottom: 10px;
    }
    &:first-child:before {
      content: none;
    }
  }
}
.main {
  margin-left: 140px;
  margin-right: 50px;
  @include max-sp {
    margin: 0;
    padding: 20px 20px 0;
  }
  .wrapper {
    opacity: 1;
    transition: opacity 1s;
    padding-top: 150px;
    @include max-sp {
      padding: 0;
    }
    h2 {
      font-weight: lighter;
      span {
        font-size: 0.8rem;
        @include max-sp {
          font-size: 0.7rem;
        }
      }
    }
  }
}
img {
  width: 100%;
  display: block;
}
.view-enter-active {
  transition: opacity 1.5s ease-in;
}
.view-leave-active {
  transition: opacity 0.6s ease-in;
}
.view-enter,
.view-leave-to {
  opacity: 0;
}
</style>
