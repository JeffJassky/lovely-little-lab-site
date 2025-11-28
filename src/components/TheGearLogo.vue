<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const MOVEMENT_MAGNITUDE_PERCENT = 3; // tweak this to change how far shapes drift
const OPPOSITE_RATIO = 0.8; // how much the arch counters the circle
const BASE_ROTATION_DEG_PER_SEC = 6; // 1 rpm baseline
const ROTATION_BOOST_PER_PX = 0.1; // extra deg/sec per px/sec of scroll
const IDLE_RESET_MS = 0;
const VELOCITY_EPS = 2;
const SPRING_STRENGTH = 0.12;
const SPRING_FRAME_MS = 16.67;
const VELOCITY_CLAMP = 3;
const DIRECTION_DEADZONE = 0.01;

const offset = ref({ x: 0, y: 0 });
const rotationDeg = ref(0);
const directionFactor = ref(1); // 1 = down/clockwise, -1 = up/counter-clockwise

let mouseFrame = 0;
let spinFrame = 0;
let targetVelocity = 0;
let smoothVelocity = 0;
let lastScrollY = 0;
let lastScrollTime = 0;
let lastSpinTime = 0;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const handleMouseMove = (event: MouseEvent) => {
  const { clientX, clientY } = event;

  if (mouseFrame) return;

  mouseFrame = requestAnimationFrame(() => {
    mouseFrame = 0;
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

const spinTick = (timestamp: number) => {
  if (!lastSpinTime) {
    lastSpinTime = timestamp;
    spinFrame = requestAnimationFrame(spinTick);
    return;
  }

  const delta = timestamp - lastSpinTime;
  lastSpinTime = timestamp;

  if (lastScrollTime && timestamp - lastScrollTime > IDLE_RESET_MS) {
    targetVelocity = 0;
  }

  const smoothing = 1 - Math.pow(1 - SPRING_STRENGTH, delta / SPRING_FRAME_MS);
  smoothVelocity += (targetVelocity - smoothVelocity) * smoothing;
  if (Math.abs(smoothVelocity) < VELOCITY_EPS) smoothVelocity = 0;

  const velocityFactor = clamp(smoothVelocity / 1000, -VELOCITY_CLAMP, VELOCITY_CLAMP);
  if (velocityFactor < -DIRECTION_DEADZONE) directionFactor.value = -1;
  else if (velocityFactor > DIRECTION_DEADZONE) directionFactor.value = 1;

  const speed = BASE_ROTATION_DEG_PER_SEC + Math.abs(smoothVelocity) * ROTATION_BOOST_PER_PX;
  rotationDeg.value += directionFactor.value * speed * (delta / 1000);

  if (rotationDeg.value > 360 || rotationDeg.value < -360) {
    rotationDeg.value %= 360;
  }

  spinFrame = requestAnimationFrame(spinTick);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll, { passive: true });
  lastScrollY = window.scrollY;
  spinFrame = requestAnimationFrame(spinTick);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('scroll', handleScroll);
  if (mouseFrame) cancelAnimationFrame(mouseFrame);
  if (spinFrame) cancelAnimationFrame(spinFrame);
});

const gearStyle = computed(() => ({
  transform: `translate(${offset.value.x}%, ${offset.value.y}%)`
}));

const archStyle = computed(() => ({
  transform: `translate(${-offset.value.x * OPPOSITE_RATIO}%, ${-offset.value.y * OPPOSITE_RATIO}%)`
}));

const gearRotationStyle = computed(() => ({
  transform: `rotate(${rotationDeg.value}deg)`
}));
</script>

<template>
  <div class="logo-shapes">
    <div class="shape-wrapper" :style="gearStyle">
      <svg
        class="shape gear"
        viewBox="0 0 18 18"
        aria-hidden="true"
        focusable="false"
        :style="gearRotationStyle"
      >
        <path
          d="M17 7h-.76a1 1 0 0 1-.7-1.71l.53-.53a1.008 1.008 0 0 0 0-1.42l-1.41-1.41a1.008 1.008 0 0 0-1.42 0l-.51.51a.974.974 0 0 1-.73.32 1 1 0 0 1-1-1V1a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v.76a1 1 0 0 1-1 1 .974.974 0 0 1-.73-.32l-.51-.51a1.008 1.008 0 0 0-1.42 0L1.93 3.34a1.008 1.008 0 0 0 0 1.42c.19.19.4.37.58.57a.92.92 0 0 1 .25.67 1 1 0 0 1-1 1H1a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.76a1 1 0 0 1 1 1 .92.92 0 0 1-.25.67c-.18.2-.39.38-.58.57a1.008 1.008 0 0 0 0 1.42l1.41 1.41a1.008 1.008 0 0 0 1.42 0l.51-.51a.974.974 0 0 1 .73-.32 1 1 0 0 1 1 1V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.76a1 1 0 0 1 1-1 .974.974 0 0 1 .73.32l.51.51a1.008 1.008 0 0 0 1.42 0l1.41-1.41a1.008 1.008 0 0 0 0-1.42l-.53-.53a1 1 0 0 1 .7-1.71H17a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"
        />
      </svg>
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
  opacity: 0.9;
}

.gear {
  width: 66%;
  height: 66%;
  bottom: 0;
  right: 0;
  z-index: 100;
  transform-origin: center;
  color: var(--gear-color, #C8553D);
  display: block;
  opacity: 0.9;
  will-change: transform;
}

.gear path {
  fill: currentColor;
  /* stroke: currentColor;
  stroke-width: var(--gear-stroke, 1.5);
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke; */
}

.arch {
  width: 66%;
  height: 100%;
  background-color: #C8553D;
  border-radius: 200px 200px 0 0;
  top: 0;
  left: 0%;
  mix-blend-mode: multiply;
  animation: float 6s ease-in-out infinite;
  z-index: 0;
  position: absolute;
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
