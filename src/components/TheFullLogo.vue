<script setup lang="ts">
import TheLogo from './TheGearLogo.vue';
</script>

<template>
  <div class="the-full-logo-container">
    <div class="the-full-logo">
      <TheLogo class="logo-mark" />
      <h1 class="logo-text">
        <span class="block">LOVELY</span>
        <span class="block indent">LAB</span>
      </h1>
    </div>
  </div>
</template>

<style scoped lang="less">
.the-full-logo-container{
	width: 100%;
}
.the-full-logo {
  position: relative;
  width: 100%;
  display: flex;
  max-width: 100%;
  margin: 0 auto;
  container-type: inline-size;
}

.logo-mark {
  position: absolute;
  /* 50cqw = 50% of the container’s inline width; no min/max so it can scale freely smaller or larger */
  width: 30cqw;
  top: -7%;
  z-index: 0;
  pointer-events: auto;
  transition: width 0.4s ease, transform 0.4s ease;
}

.logo-text {
  font-family: 'Syne', var(--font-display, sans-serif);
  font-weight: 800;
  letter-spacing: 0.04em;
  transform-origin: center;
  /* 10cqw = 10% of the container’s inline width; mirrors mark scaling with no min/max caps */
  font-size: 10cqw;
  line-height: 0.85;
  text-transform: uppercase;
  color: var(--ink, #111);
  margin: 0;
  position: relative;
  z-index: 1;
  transition: font-size 0.4s ease;
  pointer-events: none;
  text-align: center;
  left: 23%;
  span {
      margin-left: 0ch;
      display: block;
      color: transparent;
      -webkit-text-stroke: 2px var(--ink, #111);
	  font-size: 1.25em;
    &.indent {
	  font-size: 2em;
      color: var(--ink);
    }
  }
}

@supports not (font-size: clamp(3rem, 10cqw, 10rem)) {
  /* Viewport fallback when container units are unavailable */
  .logo-mark {
    width: 50vw;
  }

  .logo-text {
    font-size: 10vw;
  }
}
</style>
