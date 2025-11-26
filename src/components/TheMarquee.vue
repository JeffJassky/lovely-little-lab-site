<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

const BASE_VELOCITY_DEFAULT = 200; // base px/sec glide speed when idle
const IDLE_RESET_MS = 200; // after this long without scroll, treat velocity as stopped
const VELOCITY_EPS = 2; // velocities below this are clamped to zero to kill drift
const SPRING_STRENGTH = 0.12; // smoothing factor for scroll velocity easing
const SPRING_FRAME_MS = 16.67; // assumed frame time (60fps) for spring math
const VELOCITY_CLAMP = 3; // cap on normalized velocity factor to avoid runaway speeds
const BOOST_PER_PX = 0.08; // multiplier converting px/sec scroll into added speed
const DIRECTION_DEADZONE = 0.01; // small buffer before flipping scroll direction
const SKEW_INPUT = 1000; // max |scroll velocity| mapped into skew
const SKEW_OUTPUT_DEG = 10; // max skew degrees at peak scroll velocity

const props = withDefaults(
  defineProps<{
    items: string[];
    baseVelocity?: number; // px per second, before scroll boost
  }>(),
  { baseVelocity: BASE_VELOCITY_DEFAULT }
);

const marqueeItems = computed(() => [...props.items, ...props.items]);

const trackRef = ref<HTMLElement | null>(null);
const offsetX = ref(0);
const skewDeg = ref(0);
const directionFactor = ref(1); // 1 = scroll down (right-to-left), -1 = scroll up (left-to-right)

let frame = 0;
let cycleWidth = 0;
let targetVelocity = 0;
let smoothVelocity = 0;
let lastScrollY = 0;
let lastScrollTime = 0;
let lastFrameTime = 0;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  const clamped = clamp(value, inMin, inMax);
  const progress = (clamped - inMin) / (inMax - inMin);
  return outMin + progress * (outMax - outMin);
};

const updateCycleWidth = () => {
  if (trackRef.value) {
    cycleWidth = trackRef.value.scrollWidth / 2;
  }
};

const handleScroll = () => {
  const now = performance.now();
  const currentY = window.scrollY;

  if (!lastScrollTime) {
    lastScrollTime = now;
    lastScrollY = currentY;
    return;
  }

  const deltaY = currentY - lastScrollY;
  const deltaT = now - lastScrollTime || 1;
  targetVelocity = (deltaY / deltaT) * 1000; // px per second

  lastScrollY = currentY;
  lastScrollTime = now;
};

const tick = (timestamp: number) => {
  if (!lastFrameTime) {
    lastFrameTime = timestamp;
    frame = requestAnimationFrame(tick);
    return;
  }

  const delta = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  if (lastScrollTime && timestamp - lastScrollTime > IDLE_RESET_MS) {
    targetVelocity = 0;
  }

  // Spring-style smoothing on the scroll velocity to avoid jitter.
  const smoothing = 1 - Math.pow(1 - SPRING_STRENGTH, delta / SPRING_FRAME_MS);
  smoothVelocity += (targetVelocity - smoothVelocity) * smoothing;
  if (Math.abs(smoothVelocity) < VELOCITY_EPS) smoothVelocity = 0;

  const velocityFactor = clamp(smoothVelocity / 1000, -VELOCITY_CLAMP, VELOCITY_CLAMP);
  if (velocityFactor < -DIRECTION_DEADZONE) directionFactor.value = -1;
  else if (velocityFactor > DIRECTION_DEADZONE) directionFactor.value = 1;

  const direction = directionFactor.value === 1 ? -1 : 1; // down -> left, up -> right
  // baseline speed plus scroll-driven boost
  const speed = props.baseVelocity + Math.abs(smoothVelocity) * BOOST_PER_PX;
  const deltaX = direction * speed * (delta / 1000);

  offsetX.value += deltaX;

  const wrapWidth = cycleWidth || (trackRef.value?.scrollWidth ?? 0) / 2;
  if (wrapWidth > 0) {
    if (offsetX.value <= -wrapWidth) offsetX.value += wrapWidth;
    else if (offsetX.value >= 0) offsetX.value -= wrapWidth;
  }

  skewDeg.value = mapRange(smoothVelocity, -SKEW_INPUT, SKEW_INPUT, -SKEW_OUTPUT_DEG, SKEW_OUTPUT_DEG);

  frame = requestAnimationFrame(tick);
};

onMounted(async () => {
  await nextTick();
  updateCycleWidth();
  lastScrollY = window.scrollY;
  window.addEventListener('resize', updateCycleWidth);
  window.addEventListener('scroll', handleScroll, { passive: true });
  frame = requestAnimationFrame(tick);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateCycleWidth);
  window.removeEventListener('scroll', handleScroll);
  if (frame) cancelAnimationFrame(frame);
});

const transformStyle = computed(
  () => `translateX(${offsetX.value}px) skewX(${skewDeg.value.toFixed(2)}deg)`
);
</script>

<template>
  <div class="marquee-container">
    <div class="marquee" :style="{ transform: transformStyle }" ref="trackRef">
      <span v-for="(item, index) in marqueeItems" :key="`${item}-${index}`">
        {{ item }} <span class="separator">✦</span>
      </span>
    </div>
  </div>
</template>

<style scoped lang="less">
.marquee-container {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  white-space: nowrap;
  background: #111;
  color: #F2F0E9;
}

.marquee {
  display: inline-flex;
  will-change: transform;
}

.marquee span {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(1.5rem, 6vw, 4rem);
  font-weight: 700;
  text-transform: uppercase;
  margin-right: 2rem;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  display: inline-block;
  transition: all 0.8s ease;
}

.marquee span:hover {
  color: #C8553D;
  .separator {
    -webkit-text-stroke: 2px #eee;
    color: transparent;
  }
}

.separator {
  color: #C8553D;
  font-weight: 400;
}
</style>
