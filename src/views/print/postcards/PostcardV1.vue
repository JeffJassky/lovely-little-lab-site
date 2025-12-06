<script setup lang="ts">
import PrintLayout4x6 from '../templates/PrintLayout4x6.vue';
/* Using the Full Logo to match the flyer, ensure this import path is correct */
import TheFullLogo from '../../../components/TheGearLogo.vue';
</script>

<template>
  <PrintLayout4x6>
    <div class="postcard">
      <aside class="col-visual">
        <header>
          <TheFullLogo class="logo" style="color: var(--ink-color);" />
        </header>

        <div class="hero-center">
          <h1 class="headline">
            <div class="line">ARTISTS</div>
            <div class="line indent">MAKERS</div>
            <div class="line">ENGINEERS</div>
          </h1>
        </div>

        <div class="badge-container">
          <div class="location-badge">JOIN US IN ST. PETE</div>
        </div>
      </aside>

      <main class="col-info">
        <div class="specs-container">
          <div class="spec-item">
            <span class="label">WHEN</span>
            <div class="value">Tuesdays</div>
            <div class="value">6:00PM - 9:00PM</div>
          </div>
          <div class="spec-item">
            <span class="label">WHERE</span>
            <div class="value">BLACK CROW EAST</div>
          </div>
        </div>

        <div class="body-copy">
          <p class="statement">
            Weekly creative nights for
            <span class="highlight">artists, makers, & coders</span>.
          </p>
          <p class="sub-statement">
            Show up with an idea, a project, or nothing at all. Meet great
            people and get sh*t done.
          </p>
        </div>

        <footer class="footer">
          <div class="cta-text">
            <h2>JOIN THE<br />NEXT ONE</h2>
            <div class="links">
              <span>LovelyLab.org</span>
            </div>
          </div>
          <div class="qr-placeholder">
            <img src="/qr-code-links.png" alt="QR Code" />
          </div>
        </footer>
      </main>
    </div>
  </PrintLayout4x6>
</template>

<style scoped>
/* --- BASE & VARS --- */
.postcard {
  --bg-color: #FAF9F6;
  --ink-color: #333333;
  --accent-color: #D97B66;

  width: 100%;
  height: 100%;
  display: flex;
  /* User defined split */
  background-color: var(--bg-color);
  color: var(--ink-color);
  /* Outer border */
  border: 3px solid var(--ink-color);
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
}

/* --- LEFT COLUMN (VISUAL) --- */
.col-visual {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border-right: 3px solid var(--ink-color);
  position: relative;
}

.logo {
  width: 0.35in;
}

.hero-center {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.headline {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-weight: 700;
  /* Scaled for the 4x6 width */
  font-size: 2.8rem;
  line-height: 0.85;
  text-transform: uppercase;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.line {
  letter-spacing: -0.02em;
}

.indent {
  color: var(--accent-color);
  padding-left: 0.25rem;
}

.badge-container {
    display: flex;
    justify-content: flex-start;
    padding-bottom: 0.25rem;
}

.location-badge {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-weight: bold;
  font-size: 0.65rem;
  border: 2px solid var(--ink-color);
  padding: 0.25rem 0.5rem;
  box-shadow: 2px 2px 6px rgba(0,0,0,0.08);
  transform: rotate(-2deg);
  background: var(--bg-color);
  border-radius: 4px;
  white-space: nowrap;
}

/* --- RIGHT COLUMN (INFO) --- */
.col-info {
  display: flex;
  flex-direction: column;
}

/* Specs Row */
.specs-container {
  display: flex;
  border-bottom: 3px solid var(--ink-color);
}

.spec-item {
  flex: 1;
  padding: 0.6rem;
  border-right: 2px solid var(--ink-color);
}

.spec-item:last-child {
  border-right: none;
}

.label {
  display: block;
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.55rem;
  opacity: 0.7;
  margin-bottom: 0.15rem;
  letter-spacing: 0.05em;
}

.value {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-weight: 700;
  font-size: 0.8rem;
  line-height: 1.1;
  text-transform: uppercase;
}

/* Body Copy */
.body-copy {
  padding: 1rem 0.75rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.statement {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  font-size: 1.1rem;
  line-height: 1.2;
  margin: 0;
  font-weight: 500;
}

.highlight {
  font-weight: 700;
  background: linear-gradient(120deg, rgba(217, 123, 102, 0.25) 0%, rgba(217, 123, 102, 0.25) 100%);
  box-shadow: inset 0 -0.4em 0 rgba(217, 123, 102, 0.25);
}

.sub-statement {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  font-size: 0.8rem;
  line-height: 1.35;
  opacity: 0.85;
  margin: 0;
}

/* Footer */
.footer {
  background-color: var(--ink-color);
  color: var(--bg-color);
  padding: 0.6rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cta-text h2 {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  line-height: 0.9;
  text-transform: uppercase;
}

.links {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.65rem;
  opacity: 0.9;
}

.qr-placeholder {
  background-color: var(--bg-color);
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 4px;
  overflow: hidden;
  padding: 2px;
}

.qr-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
