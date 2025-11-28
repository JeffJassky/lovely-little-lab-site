<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

const BASE_VELOCITY_DEFAULT = 200; // base px/sec glide speed when idle
const IDLE_RESET_MS = 250; // after this long without scroll, treat velocity as stopped
const VELOCITY_EPS = 2; // velocities below this are clamped to zero to kill drift
const SPRING_STRENGTH = 0.12; // smoothing factor for scroll velocity easing
const SPRING_FRAME_MS = 16.67; // assumed frame time (60fps) for spring math
const VELOCITY_CLAMP = 3; // cap on normalized velocity factor to avoid runaway speeds
const BOOST_PER_PX = 0.3; // multiplier converting px/sec scroll into added speed
const DIRECTION_DEADZONE = 0.01; // small buffer before flipping scroll direction
const SKEW_INPUT = 1000; // max |scroll velocity| mapped into skew
const SKEW_OUTPUT_DEG = 25; // max skew degrees at peak scroll velocity
const MAX_BLUR_PX = 14; // max blur radius when scrolling fast

const MAX_BLUR_OPACITY = 0.8; // max opacity of the blur layer
const MAX_BLUR_STRETCH = 0.05; // extra x-scale on the blur layer to elongate motion
const MAX_BLUR_OFFSET_PX = 10; // how far the blur trails behind movement
const BLUR_BRIGHTNESS = 1.35; // brightness boost on the blur to feel more intense
const DRAG_FALLOFF_MS = 120; // how long drag input keeps influencing before idling

const props = withDefaults(
  defineProps<{
    items: string[];
    baseVelocity?: number; // px per second, before scroll boost
  }>(),
  { baseVelocity: BASE_VELOCITY_DEFAULT }
);

const marqueeItems = computed(() => [...props.items, ...props.items]);

const containerRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const offsetX = ref(0);
const skewDeg = ref(0);
const blurAmount = ref(0);
const blurOpacity = ref(0);
const blurStretch = ref(0);
const blurOffsetX = ref(0);
const directionFactor = ref(1); // 1 = scroll down (right-to-left), -1 = scroll up (left-to-right)
const travelDirection = ref(-1); // actual marquee travel for this frame: -1 = left, 1 = right
const isDragging = ref(false);

let frame = 0;
let cycleWidth = 0;
let targetVelocity = 0;
let smoothVelocity = 0;
let lastScrollY = 0;
let lastScrollTime = 0;
let lastFrameTime = 0;
let lastInputTime = 0;
let activePointerId: number | null = null;
let dragLastX = 0;
let dragLastTime = 0;
let dragVelocity = 0;

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

const applyWrap = () => {
  const wrapWidth = cycleWidth || (trackRef.value?.scrollWidth ?? 0) / 2;
  if (wrapWidth > 0) {
    if (offsetX.value <= -wrapWidth) offsetX.value += wrapWidth;
    else if (offsetX.value >= 0) offsetX.value -= wrapWidth;
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
  lastInputTime = now;
};

const handlePointerDown = (event: PointerEvent) => {
  if (activePointerId !== null) return;
  activePointerId = event.pointerId;
  isDragging.value = true;
  dragLastX = event.clientX;
  dragLastTime = performance.now();
  dragVelocity = 0;
  lastInputTime = dragLastTime;
  containerRef.value?.setPointerCapture?.(event.pointerId);
};

const handlePointerMove = (event: PointerEvent) => {
  if (!isDragging.value || event.pointerId !== activePointerId) return;
  const now = performance.now();
  const dx = event.clientX - dragLastX;
  offsetX.value += dx;
  applyWrap();

  const deltaT = now - dragLastTime || 1;
  dragVelocity = (dx / deltaT) * 1000;
  targetVelocity = -dragVelocity; // left drag -> positive travel left

  dragLastX = event.clientX;
  dragLastTime = now;
  lastInputTime = now;
  event.preventDefault();
};

const handlePointerUp = (event: PointerEvent) => {
  if (event.pointerId !== activePointerId) return;
  activePointerId = null;
  isDragging.value = false;
  containerRef.value?.releasePointerCapture?.(event.pointerId);
};

const tick = (timestamp: number) => {
  if (!lastFrameTime) {
    lastFrameTime = timestamp;
    frame = requestAnimationFrame(tick);
    return;
  }

  const delta = timestamp - lastFrameTime;
  lastFrameTime = timestamp;

  const lastEventTime = isDragging.value ? dragLastTime : Math.max(lastScrollTime, lastInputTime);
  if (!isDragging.value && lastEventTime && timestamp - lastEventTime > Math.max(IDLE_RESET_MS, DRAG_FALLOFF_MS)) {
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
  travelDirection.value = direction;
  // baseline speed plus scroll-driven boost
  const speed = props.baseVelocity + Math.abs(smoothVelocity) * BOOST_PER_PX;
  const deltaX = direction * speed * (delta / 1000);

  if (!isDragging.value) {
    offsetX.value += deltaX;
    applyWrap();
  }

  skewDeg.value = mapRange(smoothVelocity, -SKEW_INPUT, SKEW_INPUT, SKEW_OUTPUT_DEG, -SKEW_OUTPUT_DEG);
  const speedAbs = Math.abs(smoothVelocity);
  const blurProgress = clamp(speedAbs / SKEW_INPUT, 0, 1);
  blurAmount.value = mapRange(speedAbs, 0, SKEW_INPUT, 0, MAX_BLUR_PX);
  blurOpacity.value = blurProgress * MAX_BLUR_OPACITY;
  blurStretch.value = blurProgress * MAX_BLUR_STRETCH;
  blurOffsetX.value = -travelDirection.value * blurProgress * MAX_BLUR_OFFSET_PX;

  frame = requestAnimationFrame(tick);
};

onMounted(async () => {
  await nextTick();
  updateCycleWidth();
  lastScrollY = window.scrollY;
  window.addEventListener('resize', updateCycleWidth);
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: false });
  window.addEventListener('pointerup', handlePointerUp);
  window.addEventListener('pointercancel', handlePointerUp);
  containerRef.value?.addEventListener('pointerdown', handlePointerDown);
  frame = requestAnimationFrame(tick);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateCycleWidth);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerup', handlePointerUp);
  window.removeEventListener('pointercancel', handlePointerUp);
  containerRef.value?.removeEventListener('pointerdown', handlePointerDown);
  if (frame) cancelAnimationFrame(frame);
});

const transformStyle = computed(
  () => `translateX(${offsetX.value}px) skewX(${skewDeg.value.toFixed(2)}deg)`
);

const blurStyle = computed(() => ({
  transform: `${transformStyle.value} translateX(${blurOffsetX.value.toFixed(2)}px)`,
  '--blur-stretch': (1 + blurStretch.value).toFixed(3),
  filter: `blur(${blurAmount.value.toFixed(2)}px) brightness(${BLUR_BRIGHTNESS})`,
  opacity: blurOpacity.value.toFixed(2)
}));
</script>

<template>
  <div class="marquee-container" ref="containerRef">
    <div class="marquee marquee-blur" :style="blurStyle" aria-hidden="true">
      <span
        v-for="(item, index) in marqueeItems"
        :key="`blur-${item}-${index}`"
      >
        {{ item }} <span class="separator">✦</span>
      </span>
    </div>
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
  position: relative;
  touch-action: pan-y;
}

.marquee {
  display: inline-flex;
  will-change: transform;
  position: relative;
  z-index: 1;
  user-select: none;
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

.marquee-container:hover .marquee span,
.marquee-container:hover .marquee-blur span {
  color: #C8553D;
}

.marquee-container:hover .separator {
  -webkit-text-stroke: 2px #eee;
  color: transparent;
  -webkit-text-fill-color: transparent;
}

.marquee-blur {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  mix-blend-mode: screen;
  will-change: transform, filter, opacity;
}

.marquee-blur span {
  transform: scaleX(var(--blur-stretch, 1));
  transform-origin: center;
}

.separator {
  color: #C8553D;
  font-weight: 400;
}
</style>
