<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="full-page">
    <header class="intro">
      <p class="eyebrow">Lovely Little Lab — Get Involved</p>
      <h1>Plug in at your own speed.</h1>
      <p class="lede">
        Lovely Little Lab is a cozy interdisciplinary community. We’re building a spot for artists,
        engineers, designers, writers, and curious minds to share ideas and make things. If you want
        to help shape the Lab as it grows, here are light, low-pressure ways to jump in.
      </p>
    </header>

    <section class="levels">
      <div class="levels-header">
        <p class="eyebrow">The Three Levels of Engagement</p>
        <h2>Choose a level.</h2>
      </div>
      <div class="level-grid">
        <article class="card">
          <p class="pill">Level 1 — No Pressure</p>
          <h3>Come to an event</h3>
          <p>Show up with a sketchbook, a laptop, or nothing at all. Hang out, meet people, feel the vibe.</p>
        </article>
        <article class="card">
          <p class="pill">Level 2 — Share</p>
          <h3>Share something you’re making</h3>
          <p>Bring a project, moodboard, robot, poem, circuit, idea, or weird obsession to Show & Tell or Idea Lab.</p>
        </article>
        <article class="card">
          <p class="pill">Level 3 — Light Contribution</p>
          <h3>Help shape the Lab</h3>
          <p>Soft ways to help. Nothing formal. Nothing intense:</p>
          <ul>
            <li>Bring snacks to a meetup</li>
            <li>Suggest event ideas</li>
            <li>Take photos at an event</li>
            <li>Help welcome new people</li>
            <li>Scout interesting spaces to meet</li>
            <li>Share the Lab with a friend</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="future">
      <div>
        <p class="eyebrow">Future ways to get involved</p>
        <h2>What might come next.</h2>
        <p class="lede">We’ll move at the pace of the group. If these light you up, stick around.</p>
      </div>
      <div class="future-list">
        <div class="future-item">Founding Members</div>
        <div class="future-item">Studio Space / A Permanent Home</div>
        <div class="future-item">Tool Donations</div>
        <div class="future-item">Event Hosting</div>
        <div class="future-item">Workshops + Teach-Ins</div>
        <div class="future-item">Partnerships with local arts + tech orgs</div>
        <div class="future-item">Micro-grants + collaborative projects</div>
      </div>
    </section>

    <section class="cta">
      <div class="cta-card">
        <p class="eyebrow">Stay close</p>
        <h2>Want updates as we grow?</h2>
        <p>Get event announcements, studio news, and creative opportunities. Low volume, high quality.</p>
        <div class="cta-actions">
          <RouterLink class="button primary" to="/#join">Join the mailing list</RouterLink>
          <RouterLink class="button ghost" to="/get-involved">See the quick version</RouterLink>
        </div>
      </div>
      <div class="heart-mark" aria-hidden="true">&#9829;</div>
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

.card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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

.future {
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

.cta {
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
  margin-top: 1.5rem;
  font-size: 2rem;
  color: var(--accent);
  opacity: 0.8;
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
