<script setup lang="ts">
import PrintLayout4x6 from '../templates/PrintLayout4x6.vue';
import TheLogo from '../../../components/TheLogo.vue';

const highlights = [
  'Creative tech and analog makers in the same room.',
  'Show and tell nights, inspo swaps, and idea labs.',
  'Body doubling and focused sprints to push projects forward.'
];

const details = [
  { label: 'When', value: '1st and 3rd Thursdays, 6-9p' },
  { label: 'Where', value: 'St. Petersburg, FL' }
];
</script>

<template>
  <PrintLayout4x6>
    <div class="postcard">
      <div class="panel panel--light">
        <div class="micro-label">Lovely Little Lab</div>
        <h2>Creative nights for people who make things</h2>
        <ul class="highlight-list">
          <li v-for="item in highlights" :key="item">{{ item }}</li>
        </ul>
        <div class="cta">lovelylittlelab.com</div>
      </div>

      <div class="panel panel--dark">
        <div class="logo-wrap">
          <TheLogo class="logo" />
        </div>
        <div class="detail-grid">
          <div v-for="item in details" :key="item.label" class="detail">
            <span class="detail-label">{{ item.label }}</span>
            <span class="detail-value">{{ item.value }}</span>
          </div>
        </div>
        <div class="tag">St. Pete, FL</div>
      </div>
    </div>
  </PrintLayout4x6>
</template>

<style scoped>
.postcard {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 0.5rem;
}

.panel {
  position: relative;
  border-radius: 12px;
  padding: 0.55in 0.5in;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  overflow: hidden;
  border: 1px solid rgba(17, 17, 17, 0.08);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.panel::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at 20% 25%, rgba(200, 85, 61, 0.14), transparent 45%),
    radial-gradient(circle at 90% 15%, rgba(17, 17, 17, 0.1), transparent 30%);
}

.panel--light {
  background: rgba(255, 255, 255, 0.92);
}

.panel--dark {
  background: var(--ink, #111);
  color: var(--bg, #f2f0e9);
}

.micro-label {
  font-family: var(--font-mono, 'Space Mono', monospace);
  letter-spacing: 0.05em;
  font-size: 0.82rem;
  text-transform: uppercase;
  color: rgba(17, 17, 17, 0.8);
}

h2 {
  margin: 0;
  font-family: var(--font-display, 'Syne', sans-serif);
  font-size: 1.6rem;
  letter-spacing: 0.02em;
}

.highlight-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.35rem;
  font-size: 0.98rem;
  line-height: 1.4;
}

.highlight-list li {
  position: relative;
  padding-left: 1.1rem;
}

.highlight-list li::before {
  content: '*';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--accent, #c8553d);
  font-size: 0.9rem;
}

.cta {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 0.9rem;
  border-radius: 10px;
  background: var(--ink, #111);
  color: var(--bg, #f2f0e9);
  font-family: var(--font-mono, 'Space Mono', monospace);
  letter-spacing: 0.04em;
  align-self: flex-start;
}

.panel--dark .cta {
  background: var(--bg, #f2f0e9);
  color: var(--ink, #111);
}

.logo-wrap {
  position: absolute;
  inset: 0.32in auto auto 0.32in;
  width: 1.8in;
  aspect-ratio: 1;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.25));
}

.logo {
  width: 100%;
  height: 100%;
}

.panel--dark .logo {
  --ink: #f2f0e9;
}

.detail-grid {
  margin-top: 1.8rem;
  display: grid;
  gap: 0.4rem;
}

.detail {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.4rem;
  align-items: baseline;
}

.detail-label {
  font-family: var(--font-mono, 'Space Mono', monospace);
  letter-spacing: 0.04em;
  font-size: 0.88rem;
  color: rgba(242, 240, 233, 0.8);
}

.detail-value {
  font-size: 1rem;
  line-height: 1.3;
}

.tag {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(242, 240, 233, 0.4);
  font-family: var(--font-mono, 'Space Mono', monospace);
  letter-spacing: 0.05em;
  align-self: flex-start;
  background: rgba(242, 240, 233, 0.08);
}

@media screen and (max-width: 720px) {
  .postcard {
    grid-template-columns: 1fr;
  }

  .logo-wrap {
    position: relative;
    inset: 0;
    margin-bottom: 0.5rem;
  }
}

@media print {
  .panel {
    box-shadow: none;
  }
}
</style>
