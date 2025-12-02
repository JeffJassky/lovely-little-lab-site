<script setup lang="ts">
import TheLogo from './TheGearLogo.vue';

const props = withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'stacked';
  }>(),
  { orientation: 'horizontal' }
);
</script>

<template>
  <div class="the-full-logo-container">
    <div class="the-full-logo" :class="`orientation-${props.orientation}`">
      <TheLogo class="logo-mark" />
      <h1 class="logo-text">
        <span class="block">LOVELY</span>
        <span class="block indent">LAB</span>
      </h1>
    </div>
  </div>
</template>

<style scoped lang="less">
.the-full-logo-container {
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

.orientation-horizontal .logo-mark {
  position: absolute;
  /* 50cqw = 50% of the container’s inline width; no min/max so it can scale freely smaller or larger */
  width: 30cqw;
  top: -7%;
  z-index: 0;
  pointer-events: auto;
  transition: width 0.4s ease, transform 0.4s ease;
}

.orientation-stacked {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(0.25rem, 2cqw, 1rem);
  padding: clamp(0.5rem, 3cqw, 1.5rem) 0;
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
  transition: font-size 0.4s ease;
  pointer-events: none;
  text-align: center;
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

.orientation-stacked .logo-mark {
  position: relative;
  width: 40cqw;
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  top: auto;
  z-index: 0;
}

.orientation-stacked .logo-text {
  position: static;
  left: 0;
  width: 100%;
  font-size: 12cqw;
  line-height: 0.92;
  z-index: auto;
  margin-top: clamp(0.25rem, 2cqw, 0.75rem);
}

.orientation-stacked .logo-text span {
  -webkit-text-stroke: 1.5px var(--ink, #111);
}

.orientation-horizontal .logo-text {
  position: relative;
  z-index: 1;
  left: 23%;
}

@supports not (font-size: clamp(3rem, 10cqw, 10rem)) {
  /* Viewport fallback when container units are unavailable */
  .orientation-horizontal .logo-mark {
    width: 50vw;
  }

  .logo-text {
    font-size: 10vw;
  }
}
</style>
