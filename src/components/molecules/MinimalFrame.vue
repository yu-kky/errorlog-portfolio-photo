<template>
  <div>
    <section class="typo-frame">
      <div class="edge-top">
        <RouterLink to="/" class="top-logo"
          ><img :src="logo" class="logo-img" alt="ERRORLOG" :data-mode="mode"
        /></RouterLink>

        <nav class="top-menu" aria-label="Main">
          <ul>
            <li><RouterLink to="/about">ABOUT</RouterLink></li>
            <li><RouterLink to="/gallery">GALLERY</RouterLink></li>
            <li><RouterLink to="/contact">CONTACT</RouterLink></li>
          </ul>
        </nav>
      </div>
      <span class="typo-anchor edge-left"><span class="typo-vertical">ERRORLOG</span></span>
      <span class="typo-anchor edge-right"><span class="typo-vertical">Design Works.</span></span>
      <div class="edge-bottom">
        <div class="scroll-guide">Scroll ↓</div>
        <span class="copyright">@ERRORLOG 2025</span>
        <div class="brand-sign">
          <img :src="logo" alt="ERRORLOGロゴ" class="brand-logo" :data-mode="mode" />
          <span>ERRORLOG</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
const props = defineProps({
  mode: {
    type: String,
    default: 'light',
  },
})
const mode = props.mode
</script>

<style scoped lang="scss">
@keyframes scrollBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.typo-frame {
  position: fixed;
  inset: 0;
  height: 100svh;
  height: 100dvh;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
}
.edge-top,
.edge-bottom {
  padding: 1.5rem;
}
.logo-img,
.brand-logo {
  filter: none;

  &[data-mode='dark'] {
    filter: invert(1);
    transition: filter 0.4s ease;

    .white-bg & {
      filter: none;
    }
  }
}
.top-logo {
  display: block;
  pointer-events: auto;

  .logo-img {
    width: 4rem;
  }
}
.top-menu {
  position: fixed;
  top: calc(env(safe-area-inset-top, 0px) + 20px);
  right: calc(env(safe-area-inset-right, 0px) + 24px);
  z-index: 1200;
  pointer-events: auto;

  ul {
    display: flex;
    gap: clamp(16px, 2.4vw, 32px);
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    display: inline-block;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    letter-spacing: 0.18em;
    font-size: 0.8rem;
    text-decoration: none;
    color: currentColor;
    opacity: 0.9;
    line-height: 1;
    padding-bottom: 4px; /* 下線の余白 */
    position: relative;
  }
}
.typo-anchor,
.typo-anchor {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.edge-left {
    left: var(--edge-gap, 3rem);
  }
  &.edge-right {
    right: var(--edge-gap, 3rem);
  }
}
.typo-vertical {
  writing-mode: vertical-rl;
  text-orientation: sideways;
  white-space: nowrap;
  line-height: 1;
  font-size: 1rem;
  letter-spacing: 1.2rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}
.edge-bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  display: grid;
  justify-content: center;

  .copyright {
    font-size: 0.7rem;
    letter-spacing: 0.3rem;
  }

  .scroll-guide {
    position: fixed;
    left: 24px;
    bottom: 24px;
    display: inline-block; /* transformの効きを安定させる */
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    opacity: 0.8;
    animation-name: scrollBounce;
    animation-duration: 1.6s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    will-change: transform; /* パフォーマンス向上 */
  }
}
.brand-sign {
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
  opacity: 0.85;
}
.brand-logo {
  width: 2rem;
}
</style>
