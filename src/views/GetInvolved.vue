<script setup lang="ts">
import { RouterLink } from 'vue-router';
import TheGearLogo from '../components/TheGearLogo.vue';
</script>

<template>
  <section class="full-page">
    <header class="intro">
      <p class="eyebrow">Get Involved</p>
      <h1>Become a labmate.</h1>
      <p class="lede">
        LL is great because creative, curious people like you show up and make
        it that way.
      </p>
    </header>

    <section class="levels">
      <div class="level-grid">
        <article class="card">
          <span class="pill">Join us</span>
          <h3>Hang out</h3>
          <p>
            Bring a sketchbook, laptop, notebook, a half-finished thing, or
            nothing at all. Work solo, meet people, or just come scope out the
            energy.
          </p>
        </article>
        <article class="card">
          <span class="pill">Share</span>
          <h3>Share your work</h3>
          <p>
            Bring a WIP, moodboard, robot, craft, idea, or weird obsession. You
            never have to present - just sharing the space is enough.
          </p>
        </article>
        <article class="card highlight">
          <span class="pill">Get Involved</span>
          <h3>Help Out</h3>
          <p>
            Bring snacks, take a few photos, welcome new folks, invite friends,
            help set up or break down. Nothing formal - just community energy.
          </p>
        </article>
      </div>
    </section>

    <div v-if="false">
      <br />
      <h2>Looking for more?</h2>
      <div class="card-grid">
        <article class="card">
          <span class="pill">Events</span>
          <h3>Host or co-host</h3>
          <p>Run a workshop or sprint. We’ll help produce and promote it.</p>
        </article>

        <article class="card">
          <span class="pill">Community</span>
          <h3>Join the crew</h3>
          <p>
            Help with programming, vibes, and operations. Light lift, high
            impact.
          </p>
        </article>

        <article class="card">
          <span class="pill">Space</span>
          <h3>Offer a venue</h3>
          <p>
            Have a studio, shop, or warehouse? Let’s use it for a pop-up lab
            night.
          </p>
        </article>

        <article class="card highlight">
          <h3>Just curious?</h3>
          <p>Come hang. Meet people. Make something cool. You’re invited.</p>
          <a class="cta inline" href="mailto:hello@lovelylittlelab.com"
            >Say hi</a
          >
        </article>
      </div>
    </div>

    <section class="future">
      <div>
        <p class="eyebrow">Future ways to get involved</p>
        <h2>What might come next.</h2>
        <p class="lede">
          We’ll move at the pace of the group. If these light you up, stick
          around.
        </p>
      </div>
      <div class="future-list">
        <div class="future-item">Shared Workshop Space / A Permanent Home</div>
        <div class="future-item">Tool & Equipment Donations</div>
        <div class="future-item">Workshop + Event Hosting</div>
        <div class="future-item">Micro-grants + collaborative projects</div>
        <div class="future-item">Partnerships with local arts + tech orgs</div>
      </div>
    </section>

    <section class="cta">
      <div class="cta-card">
        <p class="eyebrow">Stay close</p>
        <h2>Want updates?</h2>
        <p>
          Get event announcements, and creative opportunities. Low volume, high
          quality.
        </p>
        <div class="cta-actions">
          <RouterLink class="button primary" to="/#join"
            >Join the mailing list</RouterLink
          >
        </div>
      </div>
      <div class="heart-mark" aria-hidden="true">
        <TheGearLogo style="width: 40px; left: 50%; margin-left: -20px" />
      </div>
    </section>
  </section>
</template>

<style scoped>
.full-page {
  padding: 140px 2rem 5rem;
  max-width: 1100px;
  margin: 0 auto;
  color: var(--ink);
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
}

.intro h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.8rem, 6vw, 4.8rem);
  margin: 0.3rem 0 1rem 0;
}

.lede {
  font-size: 1.15rem;
  line-height: 1.6;
  color: #2f2f2f;
  max-width: 900px;
  margin: 0;
}

.eyebrow {
  font-family: var(--font-mono, monospace);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin: 0;
}

.levels {
  margin-top: 3.5rem;
}

.levels-header h2 {
  margin: 0.4rem 0 1rem 0;
  font-size: 2rem;
}

.level-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
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
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.8rem;
}

.card-grid .card {
  min-height: 180px;
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.05);
}

.card.highlight {
  background: var(--ink);
  color: var(--bg);
}

.card h3 {
  margin: 0;
  font-family: var(--font-display, sans-serif);
  font-size: 1.5rem;
}

.card p {
  margin: 0;
  line-height: 1.6;
}

.card-grid .card h3 {
  margin: 0.5rem 0;
  letter-spacing: 0.5px;
}

.card-grid .card p {
  margin: 0;
  line-height: 1.5;
}

.card ul {
  padding-left: 1.1rem;
  margin: 0;
  line-height: 1.6;
}

.pill {
  display: inline-block;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.35rem 0.7rem;
  background: rgba(17, 17, 17, 0.08);
  border-radius: 999px;
  margin: 0;
}

.card.highlight .pill {
  background: rgba(255, 255, 255, 0.12);
}

.list-block {
  margin-top: 2.6rem;
  padding: 1.8rem;
  border: 1px dashed rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  background: #fffdf8;
}

.list-head h2 {
  margin: 0 0 0.4rem 0;
  font-family: var(--font-display, sans-serif);
}

.list-head p {
  margin: 0;
  color: #333;
  line-height: 1.5;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1rem;
}

.tag {
  padding: 0.5rem 0.8rem;
  background: #111;
  color: #f2f0e9;
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

a.cta {
  text-decoration: none;
  font-family: var(--font-mono, monospace);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.9rem 1.4rem;
  border: 1px solid var(--ink);
  color: var(--ink);
  transition: background 0.25s, color 0.25s, border-color 0.25s;
  font-size: 0.9rem;
}

.cta.ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}

.inline {
  display: inline-block;
  margin-top: 1.25rem;
  color: inherit;
  border-color: currentColor;
}

.future {
	display: none;
  margin-top: 4rem;
  background: #111;
  color: var(--bg);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.future h2 {
  margin: 0.3rem 0 0.8rem 0;
  font-family: var(--font-display, sans-serif);
}

.future .lede {
  color: rgba(242, 240, 233, 0.85);
}

.future-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.future-item {
  padding: 0.9rem 1rem;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  font-family: var(--font-mono, monospace);
  font-size: 0.95rem;
}

section.cta {
  margin-top: 3.5rem;
  text-align: center;
  position: relative;
}

.cta-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 2.2rem;
  box-shadow: 0 18px 35px rgba(0, 0, 0, 0.08);
}

.cta-card h2 {
  font-family: var(--font-display, sans-serif);
  margin: 0.5rem 0 0.75rem 0;
}

.cta-card p {
  margin: 0;
  line-height: 1.6;
  color: #333;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

.button {
  text-decoration: none;
  font-family: var(--font-mono, monospace);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.9rem 1.4rem;
  border: 1px solid var(--ink);
  color: var(--ink);
  transition: background 0.25s, color 0.25s, border-color 0.25s;
  font-size: 0.9rem;
}

.button.primary {
  background: var(--ink);
  color: var(--bg);
}

.button.primary:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.button.ghost:hover {
  background: rgba(0, 0, 0, 0.05);
}

.heart-mark {
  margin-top: 2rem;
  display: flex;
  align-items: center;
}

@media (max-width: 720px) {
  .full-page {
    padding-top: 120px;
  }

  .future {
    padding: 2rem 1.5rem;
  }
}
</style>
