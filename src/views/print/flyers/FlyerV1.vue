<script setup lang="ts">
import PrintLayout8x10 from '../templates/PrintLayout8x10.vue';
import TheFullLogo from '../../../components/TheGearLogo.vue';
</script>

<template>
  <PrintLayout8x10>
    <div class="flyer-container">
      <header class="header">
        <TheFullLogo class="logo" />
        <div class="location-badge">ST. PETE<br />FLORIDA</div>
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
            <p class="value">1ST & 3RD THURS</p>
          </div>
          <div class="spec-block">
            <span class="label">TIME</span>
            <p class="value">6:00PM - 9:00PM</p>
          </div>
        </div>

        <div class="body-copy">
          <p class="statement">
            Bi-weekly creative nights for
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
        </div>
      </main>

      <footer class="footer">
        <div class="cta-text">
          <h2>JOIN THE NEXT ONE →</h2>
          <div class="links">
            <span>LovelyLittleLab.com</span>
            <span><span class="handle-at">@</span>LovelyLittleLab</span>
          </div>
        </div>
        <div class="qr-placeholder">
          <span>JOIN<br />US</span>
        </div>
      </footer>
    </div>
  </PrintLayout8x10>
</template>

<style scoped>
/* --- VARS & BASE --- */
.flyer-container {
  /* Using a warm off-white for paper feel, or you can go stark white */
  --bg-color: #F4F1EA;
  --ink-color: #111;
  /* Rust color pulled from logo vibe */
  --accent-color: #CD5D40;

  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  color: var(--ink-color);
  display: flex;
  flex-direction: column;
  border: 4px solid var(--ink-color);
  box-sizing: border-box;
  overflow: hidden; /* Safety for print bleeds */
}

/* --- HEADER --- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 4px solid var(--ink-color);
}

.logo {
  width: .6in;
}

.location-badge {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-weight: bold;
  text-align: right;
  line-height: 1.2;
  border: 2px solid var(--ink-color);
  padding: 0.25rem 0.5rem;
  box-shadow: 4px 4px 0 var(--ink-color);
  transform: rotate(-2deg); /* Slight organic tilt */
}

/* --- MAIN GRID --- */
.grid-layout {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* --- HERO TYPOGRAPHY --- */
.hero-section {
  padding: 1rem 1.5rem;
}

.headline {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-weight: 800; /* Assuming bold weight is available */
  font-size: 5.5cqw; /* Container query units relative to print size */
  /* Fallback size if container queries fail in print context */
  line-height: 0.85;
  text-transform: uppercase;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.line {
  letter-spacing: -0.04em;
}

/* Indenting "MAKERS" creates visual rhythm */
.indent {
  color: var(--accent-color); /* Pop of color */
}

/* --- SPECS ROW --- */
.specs-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-top: 4px solid var(--ink-color);
  border-bottom: 4px solid var(--ink-color);
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
}

.value {
  margin: 0;
  font-family: var(--font-display, 'Syne', sans-serif);
  font-weight: 700;
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
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0;
  max-width: 28ch;
}

.highlight {
  font-weight: 700;
  background: linear-gradient(120deg, rgba(205, 93, 64, 0.2) 0%, rgba(205, 93, 64, 0.2) 100%);
  box-shadow: inset 0 -0.4em 0 rgba(205, 93, 64, 0.2);
}

.venue-block {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-weight: 700;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 1.1rem;
  margin-top: auto;
}

/* --- FOOTER --- */
.footer {
  margin-top: auto; /* Push to bottom */
  background-color: var(--ink-color);
  color: var(--bg-color);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cta-text h2 {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-size: 2.5rem;
  margin: 0 0 0.25rem 0;
  line-height: 1;
  text-transform: uppercase;
}

.links {
  font-family: var(--font-mono, 'Space Mono', monospace);
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  opacity: 0.9;
}

.handle-at {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  letter-spacing: 0;
}

.qr-placeholder {
  background-color: var(--bg-color);
  color: var(--ink-color);
  width: 4rem;
  height: 4rem;
  display: grid;
  place-content: center;
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-weight: bold;
  font-size: 0.7rem;
  text-align: center;
  border: 2px dashed var(--ink-color); /* Dashed implies "Paste sticker here" */
}

/* --- PRINT OPTIMIZATIONS --- */
@media print {
  .flyer-container {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
