<template>
  <div class="logo-shapes">
    <div class="shape circle"></div>
    <div class="shape arch"></div>
  </div>
</template>

<style scoped>
.logo-shapes {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  aspect-ratio: 1;
}

.shape {
  position: absolute;
  opacity: 0.8;
}

.circle {
  width: 66%;
  height: 66%;
  border: 1px dashed var(--ink, #111);
  border-radius: 50%;
  bottom: 0%;
  right: 0%;
  animation: rotate 60s linear infinite;
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
    transform: translateY(-20px);
  }
}
</style>
