<script setup lang="ts">
const phoneNumber = '917-704-7519';
const email = 'jeff@jeffjassky.com';
</script>

<template>
  <main class="contact">
    <header class="intro">
      <p class="eyebrow">Contact</p>
      <h1>Say hi to Lovely Lab.</h1>
      <p class="lede">
        Want to host an event, ask a question, or share an idea? Reach out
        directly — text is best for quick replies.
      </p>
    </header>

    <section class="card-grid">
      <article class="card">
        <p class="label">Organizer</p>
        <h3>Jeff Jassky</h3>
        <p class="muted">
          Creative technologist and organizer of Lovely Lab St. Pete.
        </p>
      </article>
      <article class="card">
        <p class="label">Call or text</p>
        <a class="main-link" :href="`tel:${phoneNumber}`">
          {{ phoneNumber }}
        </a>
        <p class="note">Text is best — quick responses.</p>
      </article>
      <article class="card">
        <p class="label">Email</p>
        <a class="main-link" :href="`mailto:${email}`">
          {{ email }}
        </a>
        <p class="note">Happy to talk collaborations, venues, and ideas.</p>
      </article>
    </section>

    <section class="cta">
      <div class="cta-card">
        <div>
          <p class="eyebrow">Stay in the loop</p>
          <h3>Prefer to keep it async?</h3>
          <p>
            Join the mailing list for meetup details, or follow along on
            Instagram to see what the Lab is making.
          </p>
        </div>
        <div class="cta-actions">
          <a class="button primary" href="/#join">Join the mailing list</a>
          <a
            class="button ghost"
            href="http://instagram.com/lovelylabstpete"
            target="_blank"
            rel="noreferrer"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.contact {
  max-width: 1100px;
  margin: 0 auto;
  padding: 140px 2rem 6rem;
  color: var(--ink);
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
}

.intro {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.75rem;
}

.eyebrow {
  font-family: var(--font-mono, monospace);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.9rem;
  margin: 0;
}

h1 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin: 0 0 0.25rem 0;
}

.lede {
  font-size: 1.15rem;
  line-height: 1.6;
  margin: 0;
  max-width: 750px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.card {
  background: rgba(17, 17, 17, 0.03);
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 14px;
  padding: 1.25rem 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.label {
  font-family: var(--font-mono, monospace);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 0;
  color: #4a4a4a;
}

h3 {
  font-family: var(--font-display, sans-serif);
  margin: 0 0 0.15rem 0;
}

.muted {
  color: #414141;
  margin: 0;
  line-height: 1.5;
}

.note {
  margin: 0;
  font-family: var(--font-mono, monospace);
  font-size: 0.85rem;
  color: #3a3a3a;
}

.main-link {
  color: var(--ink);
  text-decoration: none;
  font-family: var(--font-mono, monospace);
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  border-bottom: 1px solid transparent;
  width: fit-content;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.main-link:hover {
  border-bottom-color: currentColor;
  color: var(--accent);
}

.cta {
  margin-top: 3rem;
}

.cta-card {
  display: grid;
  grid-template-columns: 1.4fr auto;
  gap: 1.5rem;
  align-items: center;
  background: #fff;
  border: 1px solid rgba(17, 17, 17, 0.08);
  border-radius: 16px;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
}

.cta-card h3 {
  margin-top: 0.1rem;
}

.cta-card p {
  margin: 0.35rem 0 0 0;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: flex-end;
}

.button {
  font-family: var(--font-mono, monospace);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.82rem;
  padding: 0.7rem 1.1rem;
  border-radius: 10px;
  border: 1px solid var(--ink);
  text-decoration: none;
  color: var(--ink);
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.button.primary {
  background: var(--ink);
  color: var(--bg);
}

.button.ghost {
  background: transparent;
}

.button:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

@media (max-width: 800px) {
  .contact {
    padding-top: 120px;
  }

  .cta-card {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .cta-actions {
    justify-content: flex-start;
  }
}
</style>
