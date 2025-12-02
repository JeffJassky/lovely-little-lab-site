<script setup lang="ts">
import { RouterLink } from 'vue-router';

const printAssets = [
  {
    size: '4x6',
    title: 'Flyer V1',
    to: '/print/4x6/postcard-v1-vertical',
    note: 'Postcard-sized handout; great as a small flyer.'
  },
  {
    size: '8x10',
    title: 'Flyer V1',
    to: '/print/8x10/flyer-v1',
    note: 'Full-page flyer for letter or tabloid paper.'
  }
];
</script>

<template>
  <main class="print-shell">
    <div class="card">
      <header class="card-head">
        <p class="eyebrow">Print</p>
        <h1>Print-ready flyers</h1>
        <p class="lede">
          Open a template and print directly from your browser. Use system print
          settings for exact sizing.
        </p>
      </header>

      <div class="print-grid">
        <RouterLink
          v-for="asset in printAssets"
          :key="asset.to"
          :to="asset.to"
          class="print-card"
        >
          <div class="card-top">
            <span class="pill">{{ asset.size }}</span>
            <span class="arrow">→</span>
          </div>
          <h3>{{ asset.title }}</h3>
          <p class="note">{{ asset.note }}</p>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.print-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 140px 1.5rem 3rem;
  background: var(--bg, #f2f0e9);
  color: var(--ink, #111);
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
}

.card {
  width: min(860px, 100%);
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 1.5rem;
}

.card-head h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.4rem, 5vw, 3.2rem);
  margin: 0.1rem 0 0.6rem;
}

.card-head .lede {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(17, 17, 17, 0.75);
}

.eyebrow {
  font-family: var(--font-mono, monospace);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.8rem;
  margin: 0;
  color: rgba(17, 17, 17, 0.8);
}

.print-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.print-card {
  border: 1px solid rgba(17, 17, 17, 0.12);
  border-radius: 18px;
  padding: 1.2rem 1.4rem;
  text-decoration: none;
  color: inherit;
  background: rgba(255, 255, 255, 0.9);
  display: grid;
  gap: 0.35rem;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.print-card:hover {
  transform: translateY(-2px);
  border-color: rgba(17, 17, 17, 0.28);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pill {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: var(--ink, #111);
  color: var(--bg, #f2f0e9);
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  letter-spacing: 0.06em;
}

.arrow {
  font-family: var(--font-mono, monospace);
  letter-spacing: 0.08em;
}

.print-card h3 {
  margin: 0;
  font-size: 1.4rem;
  font-family: var(--font-display, sans-serif);
}

.note {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(17, 17, 17, 0.7);
}

@media (max-width: 640px) {
  .card {
    padding: 1.5rem;
    border-radius: 18px;
  }
}
</style>
