<script setup lang="ts">
import PrintLayout8x10 from '../templates/PrintLayout8x10.vue';
/* Ensure you are using a logo version that works well with the new color palette.
   If the SVG has hardcoded black fills, you might need to update them to currentColor
   so they inherit the new charcoal var(--ink-color). */
import TheFullLogo from '../../../components/TheGearLogo.vue';
</script>

<template>
  <PrintLayout8x10>
    <div class="flyer-container">
      <header class="header">
        <TheFullLogo class="logo" style="color: var(--ink-color);" />
        <div class="location-badge">JOIN US IN ST. PETE</div>
      </header>

      <main class="grid-layout">
        <div class="hero-section">
          <h1 class="headline">
            <div class="line">ARTISTS</div>
            <div class="line indent">MAKERS</div>
            <div class="line">ENGINEERS</div>
          </h1>
        </div>

        <div class="specs-container">
          <div class="spec-block accent-bg">
            <span class="label">FORMAT</span>
            <p class="value">SOCIAL LAB</p>
          </div>
          <div class="spec-block">
            <span class="label">SCHEDULE</span>
            <p class="value">Tuesdays</p>
          </div>
          <div class="spec-block">
            <span class="label">TIME</span>
            <p class="value">6:00PM - 9:00PM</p>
          </div>
        </div>

        <div class="body-copy">
          <p class="statement">
            Weekly creative nights for
            <span class="highlight">artists, makers, coders and engineers</span
            >. Show up with your idea, project, or nothing at all.
          </p>
          <p class="sub-statement">
            Meet great people, get sh*t done,<br />have fun and stay inspired.
          </p>

          <div class="venue-block">
            <span class="arrow">↓</span>
            LOCATION: BLACK CROW EAST
          </div>
          <div class="disciplines">
            Code / Ceramics / Glass / Robotics / Textiles / Game Dev /
            Illustration / Wood / Metal / AI / Music / Photo / Film / UX /
            Product / Industrial / Security / Rabbit Holes / Weird Obesessions
          </div>
        </div>
      </main>

      <footer class="footer">
        <div class="cta-text">
          <h2>JOIN THE NEXT ONE →</h2>
          <div class="links">
            <span>LovelyLab.org</span>
            <span><span class="handle-at">@</span>LovelyLittleLab</span>
          </div>
        </div>
        <div class="qr-placeholder">
          <img src="/qr-code-links.png" alt="QR Code" />
        </div>
      </footer>
    </div>
  </PrintLayout8x10>
</template>

<style>

html{
	/* Set the base font size (1rem) to 14.75px */
	/* Adjust this to scale everything simply */
	font-size: 14.75px;
}
/* --- VARS & BASE --- */
.flyer-container {
  /* Brighter off-white for a cleaner, modern feel */
  --bg-color: #FAF9F6;
  /* Softened from start black #111 to deep charcoal */
  --ink-color: #333333;
  /* Shifted rust towards a warmer, rosier terracotta */
  --accent-color: #D97B66;

  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  color: var(--ink-color);
  display: flex;
  flex-direction: column;
  /* Thinner borders (3px vs 4px) reduce heaviness */
  border: 3px solid var(--ink-color);
  /* Introducing subtle rounding to soften the overall shape */
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;
}

/* --- HEADER --- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1em 1.5rem;
  border-bottom: 3px solid var(--ink-color);
}

.logo {
  width: .4in;
}

.location-badge {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-weight: bold;
  text-align: right;
  line-height: 1.2;
  border: 2px solid var(--ink-color);
  padding: 0.25rem 0.6rem;
  /* Replaced hard block shadow with a softer blur shadow */
  box-shadow: 3px 3px 10px rgba(0,0,0,0.08);
  transform: rotate(2deg);
  background: var(--bg-color);
  /* Rounded corners on the badge */
  border-radius: 6px;
}

/* --- MAIN GRID --- */
.grid-layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* --- HERO TYPOGRAPHY --- */
.hero-section {
  padding: 1.25rem 1.5rem;
}

.headline {
  font-family: var(--font-display, 'Syne', sans-serif);
  /* Reduced weight from 800/900 to 700 for less aggression */
  font-weight: 700;
  font-size: 6.7rem;
  line-height: 0.85;
  text-transform: uppercase;
  margin: 0;
  display: flex;
  flex-direction: column;
  -webkit-text-stroke: .02em currentColor;
}

.line {
  letter-spacing: -0.02em; /* Slightly opened up tracking */
}

.indent {
  color: var(--accent-color);
}

/* --- SPECS ROW --- */
.specs-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 3px solid var(--ink-color);
  border-bottom: 3px solid var(--ink-color);
}

.spec-block {
  padding: 0.75rem;
  border-right: 2px solid var(--ink-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.spec-block:last-child {
  border-right: none;
}

.label {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.7rem;
  opacity: 0.7;
  margin-bottom: 0.25rem;
  letter-spacing: 0.05em;
}

.value {
  margin: 0;
  font-family: var(--font-display, 'Syne', sans-serif);
  /* Paired down weight here too */
  font-weight: 600;
  font-size: 1.1rem;
  line-height: 1;
  text-transform: uppercase;
}

/* --- BODY COPY --- */
.body-copy {
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.statement {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  font-size: 1.75rem;
  line-height: 1.3; /* Slightly looser leading for breathability */
  margin: 0;
  max-width: 28ch;
}

/* Adjusted highlight color to match new accent */
.highlight {
  font-weight: 700;
  background: linear-gradient(120deg, rgba(217, 123, 102, 0.25) 0%, rgba(217, 123, 102, 0.25) 100%);
  box-shadow: inset 0 -0.4em 0 rgba(217, 123, 102, 0.25);
}

.sub-statement {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  font-size: 1.1rem;
  line-height: 1.4;
  opacity: 0.85;
  margin: 0;
}

.venue-block {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-weight: 700;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
  margin-top: auto;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.disciplines{
	font-family: var(--font-mono, 'Space Grotesk', sans-serif);
	text-transform: capitalize;
	font-size: 0.7rem;
}

/* --- FOOTER --- */
.footer {
  margin-top: auto;
  background-color: var(--ink-color);
  color: var(--bg-color);
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cta-text h2 {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-size: 2.2rem; /* Slightly smaller */
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  line-height: 1;
  text-transform: uppercase;
}

.links {
  font-family: var(--font-mono, 'Space Mono', monospace);
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  opacity: 0.9;
  letter-spacing: 0.03em;
}

.handle-at {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  letter-spacing: 0;
}

.qr-placeholder {
  background-color: var(--bg-color);
  color: var(--ink-color);
  width: 6rem;
  aspect-ratio: 1 / 1;
  display: grid;
  place-content: center;
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-weight: bold;
  font-size: 0.7rem;
  text-align: center;
  /* Switched from dashed to solid, added rounding */
  border: 2px solid var(--ink-color);
  border-radius: 8px;
  overflow: hidden;
  padding: 4px;
}

.qr-placeholder img {
	max-width: 100%;
	max-height: 100%;
}

@media print {
  .flyer-container {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
