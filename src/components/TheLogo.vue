<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const MOVEMENT_MAGNITUDE_PERCENT = 3; // tweak this to change how far shapes drift
const OPPOSITE_RATIO = 0.8; // how much the arch counters the circle
const offset = ref({ x: 0, y: 0 });
let frame = 0;

const handleMouseMove = (event: MouseEvent) => {
  const { clientX, clientY } = event;

  if (frame) return;

  frame = requestAnimationFrame(() => {
    frame = 0;
    const { innerWidth, innerHeight } = window;
    if (!innerWidth || !innerHeight) return;

    const normX = (clientX / innerWidth - 0.5) * 2;
    const normY = (clientY / innerHeight - 0.5) * 2;

    offset.value = {
      x: normX * MOVEMENT_MAGNITUDE_PERCENT,
      y: normY * MOVEMENT_MAGNITUDE_PERCENT
    };
  });
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  if (frame) cancelAnimationFrame(frame);
});

const circleStyle = computed(() => ({
  transform: `translate(${offset.value.x}%, ${offset.value.y}%)`
}));

const archStyle = computed(() => ({
  transform: `translate(${-offset.value.x * OPPOSITE_RATIO}%, ${-offset.value.y * OPPOSITE_RATIO}%)`
}));
</script>

<template>
  <div class="logo-shapes">
    <div class="shape-wrapper" :style="circleStyle">
      <div class="shape circle"></div>
    </div>
    <div class="shape-wrapper" :style="archStyle">
      <div class="shape arch"></div>
    </div>
  </div>
</template>

<style scoped>
.logo-shapes {
  position: relative;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  aspect-ratio: 1;
}

.shape-wrapper {
  position: absolute;
  inset: 0;
  transition: transform 140ms ease-out;
  will-change: transform;
}

.shape {
  position: absolute;
  opacity: 0.8;
}

.circle {
  width: 66%;
  height: 66%;
  border: 1.5px dashed var(--ink, #111);
  border-radius: 50%;
  bottom: 0%;
  right: 0%;
  animation: rotate 60s linear infinite;
  z-index: 100;
  position: absolute;
  opacity: 1;
}

.arch {
  width: 66%;
  height: 100%;
  background-color: #C8553D;
  border-radius: 10000px 10000px 0 0;
  top: 0;
  left: 0%;
  mix-blend-mode: multiply;
  animation: float 6s ease-in-out infinite;
  z-index: 0;
  position: absolute;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5%);
  }
}
</style>
