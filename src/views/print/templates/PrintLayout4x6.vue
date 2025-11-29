<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const STYLE_ID = 'print-page-4x6';
const PAGE_RULE = '@page { size: 6in 4in; margin: 0; } body.print-mode { margin: 0; padding: 0; background: var(--bg, #f2f0e9); } body.print-mode .nav, body.print-mode .mobile-menu, body.print-mode .font-progress, body.print-mode .font-waiter { display: none !important; }';
const BODY_CLASS = 'print-mode';

onMounted(() => {
  if (typeof document === 'undefined') return;
  let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = PAGE_RULE;
  document.body.classList.add(BODY_CLASS);
});

onUnmounted(() => {
  if (typeof document === 'undefined') return;
  const existing = document.getElementById(STYLE_ID);
  if (existing?.parentNode) {
    existing.parentNode.removeChild(existing);
  }
  document.body.classList.remove(BODY_CLASS);
});
</script>

<template>
  <div class="print-preview">
    <div class="print-page">
      <div class="print-safe">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.print-preview {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.25rem;
  background: linear-gradient(135deg, #efede6, #f7f5f0);
  overflow: auto;
}

.print-page {
  width: 6in;
  height: 4in;
  background: var(--bg, #f2f0e9);
  color: var(--ink, #111);
  border: none;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.14);
  position: relative;
  overflow: hidden;
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact;
}

.print-page::after {
  content: '';
  position: absolute;
  inset: 0.28in;
  border: 1px dashed rgba(17, 17, 17, 0.06);
  pointer-events: none;
}

.print-safe {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0.45in;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

@media print {
  .print-preview {
    padding: 0;
    background: transparent;
    min-height: auto;
  }

  .print-page {
    box-shadow: none;
    border: none;
    overflow: visible;
  }

  .print-page::after {
    display: none;
  }

  :global(body) {
    margin: 0;
    background: var(--bg, #f2f0e9);
  }

  :global(.nav),
  :global(.mobile-menu),
  :global(.font-progress),
  :global(.font-waiter) {
    display: none !important;
  }
}
</style>
