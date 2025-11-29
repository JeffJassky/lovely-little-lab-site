<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';

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

const BASE_GRAVITY = 1600;
const TILT_GRAVITY = 1100;
const RESTITUTION = 0.63;
const AIR_DRAG = 0.994;
const FLOOR_DRAG = 0.9;
const SNAP_DURATION = 650;
const PLAY_TIME_MS = 9500;
const RETURN_PROXIMITY = 18;
const RETURN_SPEED_EPS = 30;
const TILT_SMOOTHING = 0.1;
const HINT_KEY = 'lll-gear-toy-hint';
const FLOOR_MARGIN = 12;
const HEART_FLIP_COOLDOWN_MS = 10000;
const HEART_FLIP_DURATION_MS = 2400;
const INITIAL_UPRIGHT_DURATION_MS = 2000;

const offset = ref({ x: 0, y: 0 });
const rotationDeg = ref(0);
const directionFactor = ref(1); // 1 = down/clockwise, -1 = up/counter-clockwise

const physicsPos = ref({ x: 0, y: 0 });
const physicsVel = ref({ x: 0, y: 0 });
const physicsAngle = ref(0);
const physicsAngularVel = ref(0);
const tilt = ref({ x: 0, y: 0 });

const isPlaying = ref(false);
const isReturning = ref(false);
const archGlowing = ref(false);
const hintVisible = ref(false);
const hasShownHint = ref(false);
const isHeartFlipping = ref(false);
const showInitialUpright = ref(true);

const gearWrapper = ref<HTMLDivElement | null>(null);
const gearSvg = ref<SVGSVGElement | null>(null);
const archEl = ref<HTMLDivElement | null>(null);

let mouseFrame = 0;
let spinFrame = 0;
let targetVelocity = 0;
let smoothVelocity = 0;
let lastScrollY = 0;
let lastScrollTime = 0;
let lastSpinTime = 0;

let physicsFrame = 0;
let snapFrame = 0;
let lastPhysicsTime = 0;
let resetTimer: number | undefined;
let playStartedAt = 0;
let heartFlipTimeout: number | undefined;
let initialUprightTimer: number | undefined;
let nextHeartFlipAllowedAt = 0;

let homeGearRect: DOMRect | null = null;
let wrapperRect: DOMRect | null = null;
let gearOffsetInWrapper = { x: 0, y: 0 };
let orientationAttached = false;
let targetTilt = { x: 0, y: 0 };
let lastTap = 0;

const windowClickDebug = (event: MouseEvent) => {
  if (!gearWrapper.value) return;
  const target = event.target as HTMLElement | null;
  if (gearWrapper.value.contains(target)) {
    console.log('[gear-toy] window click captured on gear wrapper', {
      targetTag: target?.tagName,
      fromWindowListener: true
    });
  }
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

const isPhysicsActive = computed(() => isPlaying.value || isReturning.value);

const captureRects = () => {
  if (!gearSvg.value || !gearWrapper.value) return false;
  homeGearRect = gearSvg.value.getBoundingClientRect();
  wrapperRect = gearWrapper.value.getBoundingClientRect();
  gearOffsetInWrapper = {
    x: homeGearRect.left - wrapperRect.left,
    y: homeGearRect.top - wrapperRect.top
  };
  physicsPos.value = { x: homeGearRect.left, y: homeGearRect.top };
  physicsAngle.value = rotationDeg.value;
  console.log('[gear-toy] rects captured', {
    home: homeGearRect.toJSON ? homeGearRect.toJSON() : homeGearRect,
    wrapper: wrapperRect.toJSON ? wrapperRect.toJSON() : wrapperRect
  });
  return true;
};

const shouldSnapHome = () => {
  if (!homeGearRect) return false;
  if (!playStartedAt) return false;
  const dx = physicsPos.value.x - homeGearRect.left;
  const dy = physicsPos.value.y - homeGearRect.top;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const speed = Math.sqrt(physicsVel.value.x ** 2 + physicsVel.value.y ** 2);
  if (performance.now() - playStartedAt < 700) return false;
  return distance < RETURN_PROXIMITY && speed < RETURN_SPEED_EPS;
};

const showHintOnce = () => {
  if (hasShownHint.value) return;
  hasShownHint.value = true;
  hintVisible.value = true;
  try {
    window.localStorage.setItem(HINT_KEY, 'seen');
  } catch (error) {
    console.warn('Unable to persist hint flag', error);
  }
  window.setTimeout(() => {
    hintVisible.value = false;
  }, 2400);
};

const handleOrientation = (event: DeviceOrientationEvent) => {
  const beta = event.beta ?? 0;
  const gamma = event.gamma ?? 0;
  const nextX = clamp(gamma / 35, -1.6, 1.6);
  const nextY = clamp(beta / 35, -1.6, 1.6);
  targetTilt = { x: nextX, y: nextY };
  console.log('[gear-toy] tilt', targetTilt);
};

const enableOrientation = async () => {
  if (orientationAttached) return;
  if (typeof window === 'undefined' || typeof DeviceOrientationEvent === 'undefined') return;
  const needsPermission = typeof (DeviceOrientationEvent as any).requestPermission === 'function';

  if (needsPermission) {
    try {
      const response = await (DeviceOrientationEvent as any).requestPermission();
      if (response !== 'granted') return;
    } catch (error) {
      console.warn('Orientation permission blocked', error);
      return;
    }
  }

  window.addEventListener('deviceorientation', handleOrientation, true);
  orientationAttached = true;
  console.log('[gear-toy] device orientation enabled');
};

const disableOrientation = () => {
  if (orientationAttached) {
    window.removeEventListener('deviceorientation', handleOrientation, true);
    orientationAttached = false;
  }
  targetTilt = { x: 0, y: 0 };
  tilt.value = { x: 0, y: 0 };
};

const triggerHeartFlip = () => {
  if (isPhysicsActive.value || isHeartFlipping.value) return false;
  showInitialUpright.value = false;
  isHeartFlipping.value = true;
  heartFlipTimeout = window.setTimeout(() => {
    isHeartFlipping.value = false;
    heartFlipTimeout = undefined;
  }, HEART_FLIP_DURATION_MS);
  return true;
};

const cancelHeartFlip = async () => {
  if (heartFlipTimeout) {
    window.clearTimeout(heartFlipTimeout);
    heartFlipTimeout = undefined;
  }
  if (isHeartFlipping.value) {
    isHeartFlipping.value = false;
    await nextTick();
  }
};

const scheduleReset = () => {
  if (resetTimer) window.clearTimeout(resetTimer);
  resetTimer = window.setTimeout(() => snapHome(), PLAY_TIME_MS);
};

const stopPhysicsLoop = () => {
  if (physicsFrame) cancelAnimationFrame(physicsFrame);
  physicsFrame = 0;
  lastPhysicsTime = 0;
};

const physicsTick = (timestamp: number) => {
  if (!isPlaying.value) return;
  if (!homeGearRect && !captureRects()) return;

  if (!lastPhysicsTime) {
    lastPhysicsTime = timestamp;
    physicsFrame = requestAnimationFrame(physicsTick);
    return;
  }

  const dt = Math.min((timestamp - lastPhysicsTime) / 1000, 0.05);
  lastPhysicsTime = timestamp;

  tilt.value = {
    x: tilt.value.x + (targetTilt.x - tilt.value.x) * TILT_SMOOTHING,
    y: tilt.value.y + (targetTilt.y - tilt.value.y) * TILT_SMOOTHING
  };

  const gravityX = tilt.value.x * TILT_GRAVITY;
  const gravityY = BASE_GRAVITY + tilt.value.y * TILT_GRAVITY;

  physicsVel.value.x += gravityX * dt;
  physicsVel.value.y += gravityY * dt;

  physicsPos.value.x += physicsVel.value.x * dt;
  physicsPos.value.y += physicsVel.value.y * dt;

  physicsVel.value.x *= AIR_DRAG;
  physicsVel.value.y *= AIR_DRAG;

  const width = homeGearRect?.width ?? 32;
  const height = homeGearRect?.height ?? 32;

  const bounds = {
    minX: 6,
    minY: 6,
    maxX: window.innerWidth - 6,
    maxY: window.innerHeight - FLOOR_MARGIN
  };

  if (physicsPos.value.x <= bounds.minX) {
    physicsPos.value.x = bounds.minX;
    physicsVel.value.x = Math.abs(physicsVel.value.x) * RESTITUTION;
    physicsAngularVel.value += physicsVel.value.y * 0.015;
  } else if (physicsPos.value.x + width >= bounds.maxX) {
    physicsPos.value.x = bounds.maxX - width;
    physicsVel.value.x = -Math.abs(physicsVel.value.x) * RESTITUTION;
    physicsAngularVel.value += physicsVel.value.y * 0.015;
  }

  if (physicsPos.value.y <= bounds.minY) {
    physicsPos.value.y = bounds.minY;
    physicsVel.value.y = Math.abs(physicsVel.value.y) * RESTITUTION;
  } else if (physicsPos.value.y + height >= bounds.maxY) {
    physicsPos.value.y = bounds.maxY - height;
    physicsVel.value.y = -Math.abs(physicsVel.value.y) * RESTITUTION;
    physicsVel.value.x *= FLOOR_DRAG;
    if (Math.abs(physicsVel.value.y) < RETURN_SPEED_EPS) physicsVel.value.y = 0;
  }

  physicsAngularVel.value += physicsVel.value.x * 0.03;
  physicsAngle.value += physicsAngularVel.value * dt;
  physicsAngularVel.value *= AIR_DRAG;

  if (shouldSnapHome()) {
    snapHome();
    return;
  }

  physicsFrame = requestAnimationFrame(physicsTick);
};

const snapHome = () => {
  if (resetTimer) window.clearTimeout(resetTimer);
  resetTimer = undefined;
  if (!homeGearRect && !captureRects()) return;

  const startPos = { ...physicsPos.value };
  const startAngle = physicsAngle.value;
  const endPos = { x: homeGearRect!.left, y: homeGearRect!.top };
  const endAngle = rotationDeg.value;
  const start = performance.now();

  isPlaying.value = false;
  isReturning.value = true;
  stopPhysicsLoop();

  const animate = (ts: number) => {
    const progress = clamp((ts - start) / SNAP_DURATION, 0, 1);
    const eased = easeOutBack(progress);

    physicsPos.value.x = startPos.x + (endPos.x - startPos.x) * eased;
    physicsPos.value.y = startPos.y + (endPos.y - startPos.y) * eased;
    physicsAngle.value = startAngle + (endAngle - startAngle) * eased;

    if (progress < 1) {
      snapFrame = requestAnimationFrame(animate);
    } else {
      isReturning.value = false;
      archGlowing.value = true;
      window.setTimeout(() => {
        archGlowing.value = false;
      }, 700);
    }
  };

  if (snapFrame) cancelAnimationFrame(snapFrame);
  snapFrame = requestAnimationFrame(animate);
};

const handleGearTap = async () => {
  console.log('[gear-toy] tap', {
    playing: isPlaying.value,
    returning: isReturning.value
  });
  if (isReturning.value) return;

  await cancelHeartFlip();

  if (isPlaying.value) {
    physicsVel.value.y -= 160;
    physicsAngularVel.value += 90;
    scheduleReset();
    console.log('[gear-toy] nudge while playing');
    return;
  }

  if (!captureRects()) {
    console.warn('[gear-toy] unable to capture rects');
    return;
  }

  showHintOnce();
  await enableOrientation();

  playStartedAt = performance.now();
  isPlaying.value = true;
  isReturning.value = false;
  physicsVel.value = { x: (Math.random() - 0.5) * 260, y: -120 };
  physicsAngularVel.value = physicsVel.value.x * 0.25;
  lastPhysicsTime = 0;
  scheduleReset();
  physicsFrame = requestAnimationFrame(physicsTick);
  console.log('[gear-toy] physics started', {
    pos: physicsPos.value,
    vel: physicsVel.value,
    angle: physicsAngle.value
  });
};

const handleDoubleClick = () => {
  if (isPhysicsActive.value) snapHome();
};

const handleTouchEnd = () => {
  const now = Date.now();
  if (isPhysicsActive.value && now - lastTap < 320) snapHome();
  lastTap = now;
};

const handleHoverEnter = () => {
  if (isPhysicsActive.value) return;
  const now = performance.now();
  if (now < nextHeartFlipAllowedAt) return;
  if (triggerHeartFlip()) {
    nextHeartFlipAllowedAt = now + HEART_FLIP_COOLDOWN_MS;
  }
};

const handleHoverLeave = () => {
  if (isPhysicsActive.value) return;
  // let the flip animation finish naturally
};

const handleMouseMove = (event: MouseEvent) => {
  if (isPhysicsActive.value) return;
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

  if (isPhysicsActive.value) {
    spinFrame = requestAnimationFrame(spinTick);
    return;
  }

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

const handleVisibility = () => {
  if (document.hidden && isPhysicsActive.value) {
    snapHome();
  }
};

const handleResize = () => {
  if (isPhysicsActive.value) {
    snapHome();
  } else {
    captureRects();
  }
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('visibilitychange', handleVisibility);
  window.addEventListener('resize', handleResize);
  window.addEventListener('dblclick', handleDoubleClick);
  window.addEventListener('touchend', handleTouchEnd, { passive: true });
  window.addEventListener('click', windowClickDebug, true);
  initialUprightTimer = window.setTimeout(() => {
    showInitialUpright.value = false;
  }, INITIAL_UPRIGHT_DURATION_MS);

  try {
    hasShownHint.value = window.localStorage.getItem(HINT_KEY) === 'seen';
  } catch (error) {
    console.warn('Unable to read hint flag', error);
  }

  lastScrollY = window.scrollY;
  captureRects();
  spinFrame = requestAnimationFrame(spinTick);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('visibilitychange', handleVisibility);
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('dblclick', handleDoubleClick);
  window.removeEventListener('touchend', handleTouchEnd);
  window.removeEventListener('click', windowClickDebug, true);
  disableOrientation();
  if (mouseFrame) cancelAnimationFrame(mouseFrame);
  if (spinFrame) cancelAnimationFrame(spinFrame);
  stopPhysicsLoop();
  if (snapFrame) cancelAnimationFrame(snapFrame);
  if (resetTimer) window.clearTimeout(resetTimer);
  if (heartFlipTimeout) window.clearTimeout(heartFlipTimeout);
  if (initialUprightTimer) window.clearTimeout(initialUprightTimer);
});

const gearStyle = computed(() => {
  if (isPhysicsActive.value && wrapperRect) {
    const x = physicsPos.value.x - wrapperRect.left - gearOffsetInWrapper.x;
    const y = physicsPos.value.y - wrapperRect.top - gearOffsetInWrapper.y;
    return {
      transform: `translate3d(${x}px, ${y}px, 0)`,
      transition: isReturning.value ? 'transform 120ms ease-out' : 'none'
    };
  }

  return {
    transform: `translate(${offset.value.x}%, ${offset.value.y}%)`
  };
});

const archStyle = computed(() => ({
  transform: isPhysicsActive.value
    ? 'translate(0, 0)'
    : `translate(${-offset.value.x * OPPOSITE_RATIO}%, ${-offset.value.y * OPPOSITE_RATIO}%)`
}));

const gearRotationStyle = computed(() => ({
  transform: `rotate(${isPhysicsActive.value ? physicsAngle.value : rotationDeg.value}deg)`
}));
</script>

<template>
  <div
    class="logo-shapes"
    :class="{
      'toy-active': isPlaying,
      'toy-returning': isReturning,
      'heart-flipping': isHeartFlipping,
      'heart-initial': showInitialUpright
    }"
    @mouseenter="handleHoverEnter"
    @mouseleave="handleHoverLeave"
    @click.capture="event => console.log('[gear-toy] root click', event.target)"
  >
    <div
      ref="gearWrapper"
      class="shape-wrapper gear-wrapper"
      :style="gearStyle"
      :class="{ 'is-detached': isPhysicsActive, 'is-returning': isReturning }"
      role="button"
      tabindex="0"
      aria-label="Play with the gear"
      @click.stop.prevent="handleGearTap"
      @keydown.enter.prevent="handleGearTap"
    >
      <svg
        ref="gearSvg"
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
      <div v-if="hintVisible" class="gear-hint">
        You found the toy. Tilt to roll.
      </div>
    </div>
    <div class="shape-wrapper" :style="archStyle">
      <div
        ref="archEl"
        class="shape arch"
        :class="{ 'arch--glow': archGlowing }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.logo-shapes {
  position: relative;
  top: 0;
  left: 0;
  pointer-events: auto;
  aspect-ratio: 1;
  transform-origin: 50% 50%;
  transition: transform 900ms cubic-bezier(0.65, 0, 0.35, 1);
}

.logo-shapes.heart-flipping {
  animation: heart-upright 2.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

.logo-shapes.heart-initial {
  transform: translateY(-20%) rotate(-45deg) scale(1.05);
}

.logo-shapes.toy-active,
.logo-shapes.toy-returning {
  animation: none;
  transform: rotate(0deg);
}

@media (prefers-reduced-motion: reduce) {
  .logo-shapes.heart-flipping {
    animation: none;
  }
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

.gear-wrapper {
  cursor: pointer;
  touch-action: manipulation;
  pointer-events: auto;
  z-index: 1;
}

.gear-wrapper.is-detached {
  transition: none;
}

.gear-wrapper.is-returning {
  transition: transform 180ms ease-out;
}

.gear {
  width: 66%;
  height: 66%;
  bottom: 0;
  right: 0;
  transform-origin: center;
  color: var(--gear-color, #C8553D);
  display: block;
  opacity: 0.8;
  will-change: transform;
}

.gear:focus {
  outline: none;
}

.gear-wrapper:focus-visible .gear {
  outline: 2px solid rgba(17, 17, 17, 0.35);
  outline-offset: 4px;
}

.gear path {
  fill: currentColor;
}

.gear-hint {
  position: absolute;
  top: -1.75rem;
  right: 0;
  background: var(--ink, #111);
  color: var(--bg, #F2F0E9);
  font-family: var(--font-mono, monospace);
  font-size: 0.7rem;
  padding: 0.35rem 0.55rem;
  border-radius: 12px;
  letter-spacing: 0.02em;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
  white-space: nowrap;
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
  transition: box-shadow 220ms ease;
}

.toy-active .arch {
  animation-play-state: paused;
}

.arch--glow {
  box-shadow: 0 0 0 10px rgba(200, 85, 61, 0.16), 0 0 25px rgba(200, 85, 61, 0.28);
}

@keyframes heart-upright {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  18% {
    transform: translateY(-5%) rotate(16deg) scale(1.02);
  }
  36% {
    transform: translateY(-10%) rotate(-70deg) scale(1.05);
  }
  52%,
  62% {
    transform: translateY(-20%) rotate(-45deg) scale(1.05);
  }
  72% {
    transform: translateY(-14%) rotate(-55deg) scale(1.03);
  }
  86% {
    transform: translateY(-4%) rotate(6deg) scale(1.01);
  }
  100% {
    transform: translateY(0) rotate(0deg) scale(1);
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
