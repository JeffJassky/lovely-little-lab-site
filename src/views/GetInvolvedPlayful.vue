<template>
  <section class="playful">
    <header class="hero">
      <div class="pill">Lovely Little Lab</div>
      <h1>Get involved, stay curious.</h1>
      <p class="lede">
        A friendly, low-pressure way to plug into the Lab. Pick what feels good, skip what doesn’t.
      </p>
    </header>

    <section class="cards">
      <article class="card">
        <h3>Come hang</h3>
        <p>Drop into a meetup. Bring a sketchbook, laptop, or nothing. Just be here.</p>
      </article>
      <article class="card">
        <h3>Share a spark</h3>
        <p>Show a work-in-progress, a moodboard, a poem, a circuit, or a weird obsession.</p>
      </article>
      <article class="card">
        <h3>Boost the vibe</h3>
        <p>Snacks, photos, welcoming new folks, sharing space ideas—light, easy contributions.</p>
      </article>
    </section>

    <section class="list-block">
      <div class="list-head">
        <h2>Bring your flavor</h2>
        <p>We love all mediums: code, craft, sound, visuals, words, motion, robotics, research.</p>
      </div>
      <div class="tags">
        <span class="tag">Show & Tell</span>
        <span class="tag">Idea Lab</span>
        <span class="tag">Build Nights</span>
        <span class="tag">Playtesting</span>
        <span class="tag">Zine Swaps</span>
        <span class="tag">Micro Jams</span>
      </div>
    </section>

    <section class="future">
      <h2>Possible futures</h2>
      <p class="lede small">We’ll grow at the pace of the group. Here are seeds we’re holding lightly.</p>
      <div class="future-grid">
        <div class="chip">Founding members</div>
        <div class="chip">A shared studio</div>
        <div class="chip">Workshops + teach-ins</div>
        <div class="chip">Tool donations</div>
        <div class="chip">Partner projects</div>
        <div class="chip">Micro-grants</div>
      </div>
    </section>

    <section class="cta">
      <div class="cta-card">
        <h2>Stay in the loop</h2>
        <p>Sign up for event drops and project invites. Low noise, high signal.</p>
        <div class="actions">
          <a class="button primary" href="/#join">Join the mailing list</a>
          <a class="button ghost" href="mailto:hello@lovelylittlelab.com">Email the lab</a>
        </div>
      </div>
      <div class="heart" aria-hidden="true">♥</div>
    </section>
  </section>
</template>

<style scoped>
.playful {
  padding: 140px 2rem 5rem;
  max-width: 1100px;
  margin: 0 auto;
  color: var(--ink);
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
}

.hero {
  background: linear-gradient(135deg, #f2f0e9 0%, #fff 40%, #f8f4ec 100%);
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 2.4rem;
  border-radius: 14px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
}

.pill {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  background: #111;
  color: #f2f0e9;
  font-family: var(--font-mono, monospace);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 0.8rem;
  border-radius: 999px;
}

.hero h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(3rem, 6vw, 4.8rem);
  margin: 0.6rem 0 0.6rem 0;
}

.lede {
  font-size: 1.1rem;
  max-width: 760px;
  margin: 0;
  line-height: 1.6;
  color: #333;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.4rem;
  margin-top: 2.2rem;
}

.card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  padding: 1.4rem;
  border-radius: 12px;
  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.card h3 {
  margin: 0;
  font-family: var(--font-display, sans-serif);
  letter-spacing: 0.5px;
}

.card p {
  margin: 0;
  line-height: 1.5;
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

.future {
  margin-top: 3rem;
}

.future h2 {
  margin: 0 0 0.3rem 0;
  font-family: var(--font-display, sans-serif);
}

.future .small {
  color: #333;
  margin: 0;
}

.future-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;
}

.chip {
  padding: 0.9rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  font-family: var(--font-mono, monospace);
  font-size: 0.95rem;
}

.cta {
  margin-top: 3.2rem;
  text-align: center;
}

.cta-card {
  background: linear-gradient(145deg, #111, #1f1a19);
  color: #f2f0e9;
  padding: 2.2rem;
  border-radius: 14px;
  box-shadow: 0 18px 36px rgba(0, 0, 0, 0.12);
}

.cta-card h2 {
  margin: 0 0 0.5rem 0;
  font-family: var(--font-display, sans-serif);
}

.cta-card p {
  margin: 0;
  color: rgba(242, 240, 233, 0.9);
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.button {
  text-decoration: none;
  font-family: var(--font-mono, monospace);
  letter-spacing: 1px;
  text-transform: uppercase;
  padding: 0.85rem 1.3rem;
  border: 1px solid #f2f0e9;
  color: #f2f0e9;
  font-size: 0.9rem;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.button.primary {
  background: #f2f0e9;
  color: #111;
  border-color: #f2f0e9;
}

.button.primary:hover {
  background: #c8553d;
  border-color: #c8553d;
  color: #fff;
}

.button.ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}

.heart {
  margin-top: 1.2rem;
  color: #c8553d;
  font-size: 1.8rem;
  letter-spacing: 2px;
}

@media (max-width: 720px) {
  .playful {
    padding-top: 120px;
  }
}
</style>
