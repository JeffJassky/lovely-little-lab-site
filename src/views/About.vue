<script setup lang="ts">
import { RouterLink } from 'vue-router';
import jeffPortrait from '../public/images/jeff-jassky.jpg';
</script>

<template>
  <main class="about">
    <header class="intro">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">About</p>
          <h1>Lovely Lab</h1>
          <p class="lede">
            Lovely Lab is a volunteer-run creative group in St. Petersburg,
            Florida that comes together to connect, share ideas, and make
            progress things we care about. Just people sharing space to make
            things.
          </p>
          <div class="pill-row">
            <span class="pill">St. Petersburg, FL</span>
            <span class="pill">Bi-weekly gatherings</span>
            <span class="pill">Volunteer-led</span>
          </div>
        </div>
        <aside class="origin-card">
          <p class="label">Why LL exists</p>
          <h3>A space for art + tech to intersect.</h3>
          <p>
            St. Pete is full of creative energy - but it can be hard to find a
            low-structure environment where everyone can get together regularly
            to just hang and work on stuff.
          </p>
          <p class="note">
            No pretension. No gatekeeping. Just creative people doing what we
            love.
          </p>
        </aside>
      </div>
    </header>

    <section class="story-arc">
      <div class="arc-grid">
        <article class="arc-card">
          <h3>How we gather</h3>
          <p>
            We meet every two weeks for nights built around making stuff. This
            can include inspiration to start a new project, making progress on a
            stagnant project, share ideas and WIPs, explore concepts and
            creative process, make friends and community.
          </p>
        </article>
        <article class="arc-card">
          <h3>Where we meet</h3>
          <p>
            We have rotating meetups around St. Pete — often in coworking
            spaces, creative hubs, or public locations.
          </p>
          <p class="muted">Event details are always shared in advance.</p>
        </article>
        <article class="arc-card">
          <h3>What the future holds</h3>
          <p class="muted">
            Long-term, the goal is to register as a 501c3 non-profit and grow
            into a permanent shared community workshop and makerspace — but for
            now, Lovely Lab is wherever we gather.
          </p>
        </article>
      </div>
    </section>

    <section class="experience">
      <div class="section-head">
        <p class="eyebrow">What's it like?</p>
        <h2>The arc of a Lab night.</h2>
        <p>Each event is a bit different, but you'll always get a mix of:</p>
      </div>
      <div class="timeline">
        <div class="timeline-line"></div>
        <div class="step">
          <div class="marker">Meet</div>
          <div class="step-body">
            <h4>Meet & greet</h4>
            <p>
              Say hey, get to know each other, and find a space to work in. Show
              works-in-progress, obsessions, or ideas that need a sounding
              board.
            </p>
          </div>
        </div>
        <div class="step">
          <div class="marker">Make</div>
          <div class="step-body">
            <h4>Co-work and build</h4>
            <p>
              Grab a desk, table, or cozy corner to post up and get things done
              alongside other makers.
            </p>
          </div>
        </div>
        <div class="step">
          <div class="marker">Connect</div>
          <div class="step-body">
            <h4>Get inspired</h4>
            <p>
              Chat tools, process, inspiration and experiments across
              disciplines — Make friends, find collaborators, learn cool stuff.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="founder">
      <article class="founder-card">
        <div class="founder-photo">
          <div class="photo-frame">
            <span class="photo-halo"></span>
            <img
              :src="jeffPortrait"
              alt="Portrait of Jeff Jassky"
              loading="lazy"
            />
          </div>
        </div>
        <div class="founder-copy">
          <p class="label">Meet the organizer</p>
          <h3>Art lover + tech nerd</h3>
          <p>
            Jeff Jassky is a creative technologist who works across code,
            photography, film, music, electronics, robotics, industrial design,
            fabrication and anything that needs a dose of creative or technical
            whimsy.
          </p>
          <p>
            As someone who's passionate about interdisciplinary thinking,
            creative workflows and community, I wanted to co-create space with
            other creatives and technical people to meet, work, innovate, and
            grow together.
          </p>
        </div>
      </article>
    </section>

    <section class="join">
      <div class="join-content">
        <p class="eyebrow">How to join</p>
        <h2>Pull up a chair.</h2>
        <p>The easiest way to get involved is simple: come to an event.</p>
        <p>
          If you want updates on upcoming sessions, join our mailing list or
          follow us on Instagram.
        </p>
        <p>
          Lovely Lab is growing in real time — slowly, intentionally, and
          collaboratively.
        </p>
        <div class="cta-row">
          <RouterLink class="button primary" to="/#join">
            Join the mailing list
          </RouterLink>
          <a
            class="button ghost"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            Follow on Instagram
          </a>
          <RouterLink class="button" to="/get-involved"
            >See ways to get involved</RouterLink
          >
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about {
  max-width: 1100px;
  margin: 0 auto;
  padding: 140px 2rem 6rem;
  color: var(--ink);
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
}

.intro h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.9rem, 6vw, 4.8rem);
  margin: 0.3rem 0 0.8rem 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 2.2rem;
  align-items: end;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.lede {
  font-size: 1.15rem;
  line-height: 1.65;
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

.pill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
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

.label {
  font-family: var(--font-mono, monospace);
  letter-spacing: 1.8px;
  text-transform: uppercase;
  font-size: 0.82rem;
  margin: 0;
  color: var(--accent);
}

.origin-card {
  background: radial-gradient(circle at 20% 20%, rgba(200, 85, 61, 0.14), transparent 55%),
    #111;
  color: var(--bg);
  padding: 1.6rem;
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.origin-card h3 {
  margin: 0.4rem 0 0.6rem 0;
  font-family: var(--font-display, sans-serif);
}

.origin-card p {
  margin: 0 0 0.7rem 0;
  line-height: 1.6;
  color: rgba(242, 240, 233, 0.9);
}

.note {
  color: #444;
  margin: 0.6rem 0 0 0;
  font-size: 0.95rem;
}

.section-head {
  margin-top: 1.5rem;
}

.section-head h2 {
  margin: 0.2rem 0 0.5rem 0;
  font-family: var(--font-display, sans-serif);
}

.section-sub {
  margin: 0;
  color: #333;
  line-height: 1.6;
  max-width: 780px;
}

.story-arc {
  margin-top: 2.6rem;
}

.arc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-top: 1.6rem;
}

.arc-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 1.7rem 1.5rem 1.4rem;
  border-radius: 14px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.arc-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(200, 85, 61, 0.07), transparent 45%);
  pointer-events: none;
}

.arc-card .node {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--accent);
  position: absolute;
  top: 1.1rem;
  right: 1.1rem;
  box-shadow: 0 0 0 6px rgba(200, 85, 61, 0.1);
}

.arc-card h3 {
  margin: 0 0 0.6rem 0;
  font-family: var(--font-display, sans-serif);
  font-size: 1.4rem;
}

.arc-card p {
  margin: 0 0 0.6rem 0;
  line-height: 1.65;
  color: #2f2f2f;
}

.arc-card .muted {
  color: #4a4a4a;
}

.experience {
  margin-top: 3rem;
  padding: 2.1rem 1.8rem;
  border-radius: 14px;
  background: #fffdf8;
  border: 1px dashed rgba(0, 0, 0, 0.12);
}

.timeline {
  margin-top: 1.6rem;
  position: relative;
  display: grid;
  gap: 1.3rem;
}

.timeline-line {
  position: absolute;
  top: 0.4rem;
  left: 32px;
  bottom: 0.4rem;
  width: 2px;
  background: rgba(17, 17, 17, 0.1);
}

.step {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 1rem;
  align-items: center;
}

.marker {
  width: 70px;
  height: 70px;
  border-radius: 14px;
  background: var(--ink);
  color: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono, monospace);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 0.75rem;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.step-body h4 {
  margin: 0 0 0.35rem 0;
  font-family: var(--font-display, sans-serif);
}

.step-body p {
  margin: 0;
  line-height: 1.6;
  color: #2f2f2f;
}

.people {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.4rem;
  align-items: stretch;
}

.people-card {
  padding: 1.8rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 14px 24px rgba(0, 0, 0, 0.04);
}

.chip-grid {
  margin: 1.2rem 0 0.6rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.7rem;
}

.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.75rem;
  background: rgba(17, 17, 17, 0.05);
  border-radius: 12px;
  font-size: 0.97rem;
  line-height: 1.4;
}

.vibe-card {
  padding: 1.6rem;
  border-radius: 14px;
  background: #111;
  color: var(--bg);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 30px rgba(0, 0, 0, 0.18);
}

.vibe-card ul {
  list-style: none;
  padding: 0;
  margin: 0.9rem 0 0 0;
  display: grid;
  gap: 0.5rem;
  line-height: 1.6;
  color: rgba(242, 240, 233, 0.9);
}

.founder {
  margin-top: 2.8rem;
}

.founder-card {
  display: grid;
  grid-template-columns: minmax(200px, 250px) 1fr;
  gap: 1.4rem;
  align-items: center;
  background: #fffdf8;
  border: 1px dashed rgba(0, 0, 0, 0.12);
  border-radius: 14px;
  padding: 1.7rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.04);
}

.founder-photo {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
}

.photo-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
}

.photo-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 1;
}

.photo-halo {
  position: absolute;
  inset: -8%;
  background: radial-gradient(circle at 30% 20%, rgba(200, 85, 61, 0.22), transparent 55%),
    radial-gradient(circle at 70% 80%, rgba(17, 17, 17, 0.08), transparent 60%);
  filter: blur(10px);
  border-radius: 18px;
}

.photo-caption {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0;
  padding: 0.45rem 0.75rem;
  background: rgba(17, 17, 17, 0.06);
  border-radius: 999px;
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.photo-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 6px rgba(200, 85, 61, 0.16);
}

.photo-name {
  text-transform: uppercase;
}

.founder-copy {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.founder-card h3 {
  margin: 0.3rem 0 0.6rem 0;
  font-family: var(--font-display, sans-serif);
}

.founder-card p {
  margin: 0 0 0.7rem 0;
  line-height: 1.6;
  color: #2f2f2f;
}

.join {
  margin-top: 3.4rem;
  background: #111;
  color: var(--bg);
  padding: 2.4rem;
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.join h2 {
  margin: 0.3rem 0 0.8rem 0;
  font-family: var(--font-display, sans-serif);
}

.join p {
  margin: 0 0 0.6rem 0;
  line-height: 1.6;
  color: rgba(242, 240, 233, 0.9);
}

.cta-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.3rem;
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
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

.button.primary:hover {
  background: var(--ink);
  color: var(--bg);
  border-color: var(--ink);
}

.button.ghost {
  background: transparent;
}

.button.ghost:hover {
  background: rgba(255, 255, 255, 0.08);
}

.join .button {
  border-color: var(--bg);
  color: var(--bg);
}

.join .button.primary {
  background: var(--bg);
  color: var(--ink);
  border-color: var(--bg);
}

.join .button.primary:hover {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}

.join .button:hover {
  background: rgba(255, 255, 255, 0.08);
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .people {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .about {
    padding-top: 120px;
  }

  .timeline-line {
    left: 22px;
  }

  .step {
    grid-template-columns: 54px 1fr;
  }

  .marker {
    width: 54px;
    height: 54px;
    border-radius: 12px;
    font-size: 0.82rem;
  }

  .founder-card {
    grid-template-columns: 1fr;
  }

  .founder-photo {
    order: -1;
  }

  .join {
    padding: 2rem 1.6rem;
  }
}
</style>
