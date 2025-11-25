<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="get-involved">
    <div class="intro">
      <p class="eyebrow">Get Involved</p>
      <h1>Become a labmate.</h1>
      <p class="lede">
        We’re building a creative playground in St. Pete. Pick how you want to plug in.
      </p>
      <div class="cta-row">
        <a class="cta primary" href="mailto:hello@lovelylittlelab.com">Email the Lab</a>
        <a class="cta ghost" href="https://instagram.com" target="_blank" rel="noreferrer"
          >Follow along</a
        >
      </div>
      <RouterLink class="cta inline" to="/get-involved/guide">Read the full involvement guide</RouterLink>
      <RouterLink class="cta inline" to="/get-involved/playful">See the playful version</RouterLink>
    </div>

    <div class="card-grid">
      <article class="card">
        <span class="pill">Events</span>
        <h3>Host or co-host</h3>
        <p>Run a workshop, salon, or sprint. We’ll help produce and promote it.</p>
      </article>

      <article class="card">
        <span class="pill">Community</span>
        <h3>Join the crew</h3>
        <p>Help with programming, vibes, and operations. Light lift, high impact.</p>
      </article>

      <article class="card">
        <span class="pill">Space</span>
        <h3>Offer a venue</h3>
        <p>Have a studio, shop, or warehouse? Let’s use it for a pop-up lab night.</p>
      </article>

      <article class="card highlight">
        <h3>Just curious?</h3>
        <p>Come hang. Meet people. Make something weird. You’re invited.</p>
        <a class="cta inline" href="mailto:hello@lovelylittlelab.com">Say hi</a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.get-involved {
  padding: 140px 2rem 6rem;
  max-width: 1100px;
  margin: 0 auto;
  color: var(--ink);
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
}

.intro h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.8rem, 6vw, 4.6rem);
  margin: 0.25rem 0 0.75rem 0;
}

.lede {
  font-size: 1.2rem;
  max-width: 680px;
  line-height: 1.5;
  color: #333;
}

.eyebrow {
  font-family: var(--font-mono, monospace);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin: 0;
}

.cta-row {
  display: flex;
  gap: 1rem;
  margin: 2rem 0 0;
  flex-wrap: wrap;
}

.cta {
  text-decoration: none;
  font-family: var(--font-mono, monospace);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.9rem 1.4rem;
  border: 1px solid var(--ink);
  color: var(--ink);
  transition: background 0.25s, color 0.25s;
  font-size: 0.9rem;
}

.cta.primary {
  background: var(--ink);
  color: var(--bg);
}

.cta.primary:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.cta.ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  min-height: 180px;
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.05);
}

.card.highlight {
  background: var(--ink);
  color: var(--bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card h3 {
  margin: 0.5rem 0;
  font-family: var(--font-display, sans-serif);
  letter-spacing: 0.5px;
}

.card p {
  margin: 0;
  line-height: 1.5;
  color: inherit;
}

.pill {
  display: inline-block;
  font-family: var(--font-mono, monospace);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 0.3rem 0.6rem;
  background: rgba(17, 17, 17, 0.08);
  border-radius: 99px;
}

.card.highlight .pill {
  background: rgba(255, 255, 255, 0.12);
}

.inline {
  display: inline-block;
  margin-top: 1.25rem;
  color: inherit;
  border-color: currentColor;
}

@media (max-width: 700px) {
  .get-involved {
    padding-top: 120px;
  }
}
</style>
