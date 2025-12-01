<script setup lang="ts">
import { RouterLink } from 'vue-router';

const links = [
  { label: 'Upcoming Events', href: '/#events', type: 'router' },
  { label: 'About LL', href: '/about', type: 'router' },
  { label: 'Follow @LovelyLittleLab', href: 'https://www.instagram.com/lovelylittlelab/', type: 'external' }
];
</script>

<template>
  <main class="links-shell">
    <div class="card">
      <div class="link-list">
        <component
          v-for="link in links"
          :key="link.label"
          :is="link.type === 'router' ? RouterLink : 'a'"
          :to="link.type === 'router' ? link.href : undefined"
          :href="link.type === 'external' ? link.href : undefined"
          class="link-pill"
          :class="{ 'link-pill--accent': link.accent }"
          :target="link.type === 'external' ? '_blank' : undefined"
          rel="noopener"
        >
          <span>{{ link.label }}</span>
          <span class="arrow">→</span>
        </component>
      </div>
    </div>
  </main>
</template>

<style scoped>
.links-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: var(--bg, #f2f0e9);
  color: var(--ink, #111);
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
}

.card {
  width: min(520px, 100%);
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 1rem;
}

.link-list {
  display: grid;
  gap: 0.65rem;
}

.link-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.95rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(17, 17, 17, 0.12);
  background: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  color: var(--ink, #111);
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.link-pill:hover {
  transform: translateY(-2px);
  border-color: rgba(17, 17, 17, 0.25);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.link-pill--accent {
  background: var(--ink, #111);
  color: var(--bg, #f2f0e9);
}

.link-pill--accent:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}

.arrow {
  font-family: var(--font-mono, 'Space Mono', monospace);
  letter-spacing: 0.08em;
}

@media (max-width: 640px) {
  .links-shell {
    padding: 1rem;
  }

  .card {
    padding: 1rem;
    border-radius: 16px;
  }
}
</style>
