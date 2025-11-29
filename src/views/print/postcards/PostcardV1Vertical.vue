<script setup lang="ts">
import PrintLayout4x6 from '../templates/PrintLayout4x6.vue';
import TheFullLogo from '../../../components/TheGearLogo.vue';
</script>

<template>
  <PrintLayout4x6 orientation="portrait">
    <div class="postcard-vertical">
      <section class="section-visual">
        <header class="header-row">
          <TheFullLogo class="logo" style="color: var(--ink-color);" />
          <div class="badge-container">
            <div class="location-badge">COME MAKE WITH US</div>
          </div>
        </header>

        <div class="hero-center">
          <h1 class="headline">
            <div class="line">ARTISTS</div>
            <div class="line indent">MAKERS</div>
            <div class="line">ENGINEERS</div>
          </h1>
        </div>
      </section>

      <section class="section-info">
        <div class="specs-container">
          <div class="spec-item">
            <span class="label">WHEN</span>
            <div class="value">1ST & 3RD THURS</div>
            <div class="value">6:00PM - 9:00PM</div>
          </div>
          <div class="spec-item">
            <span class="label">WHERE</span>
            <div class="value">BLACK CROW EAST</div>
          </div>
        </div>

        <div class="body-copy">
          <p class="statement">
            Bi-weekly social make nights <BR />for
            <span class="highlight">people who make stuff</span>.
          </p>
          <p class="sub-statement">
            Show up with an idea, a project, or nothing at all. Connect with
            other creators and work on the stuff you care about - totally solo
            or together.
          </p>
        </div>

        <footer class="footer">
          <div class="cta-text">
            <h2>JOIN THE NEXT ONE</h2>
            <div class="links">
              <span class="handle"
                ><span class="at-symbol">@</span>LovelyLittleLab</span
              ><br /><span>LovelyLittleLab.com</span><br />
            </div>
          </div>
          <div class="qr-placeholder">
            <img src="/qr-code-links.png" alt="QR Code" />
          </div>
        </footer>
      </section>
    </div>
  </PrintLayout4x6>
</template>

<style scoped>
/* --- BASE & VARS --- */
.postcard-vertical {
  --bg-color: #FAF9F6;
  --ink-color: #333333;
  --accent-color: #D97B66;

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column; /* Stack vertically */
  background-color: var(--bg-color);
  color: var(--ink-color);
  border: 3px solid var(--ink-color);
  border-radius: 12px;
  box-sizing: border-box;
}

/* --- TOP SECTION (VISUAL) --- */
.section-visual {
  /* Takes up roughly 45% of vertical space */
  flex: 0.9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 3px solid var(--ink-color);
  position: relative;
}

.header-row {
    width: 100%;
    display: flex;
    justify-content: space-between;
	align-items: center;
}

.logo {
  width: 0.45in; /* Slightly larger since we have room */
}

.hero-center {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Center text in the full width */
}

.headline {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-weight: 700;
  /* Massive font size since we have full width now */
  font-size: 3.25rem;
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
  /* Removed padding-left since we are centering */
}

.badge-container {
    display: flex;
    justify-content: flex-end; /* Align badge to right */
    padding-bottom: 0.25rem;
}

.location-badge {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-weight: bold;
  font-size: 0.7rem;
  background: var(--ink-color);
  padding: 0.25rem 0.6rem;
  transform: rotate(5deg);
  color: var(--bg-color);
  border-radius: 4px;
  position: absolute;
  margin-top: -1em;
}

/* --- BOTTOM SECTION (INFO) --- */
.section-info {
  /* Takes up remaining space */
  flex: 1;
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
  padding: 0.75rem 1rem;
  border-right: 2px solid var(--ink-color);
}

.spec-item:last-child {
  border-right: none;
}

.label {
  display: block;
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.6rem;
  opacity: 0.7;
  margin-bottom: 0.25rem;
  letter-spacing: 0.05em;
}

.value {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.1;
  text-transform: uppercase;
}

/* Body Copy */
.body-copy {
  padding: 1.25rem 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-content: center;
}

.statement {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
  font-size: 1.3rem;
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
  font-size: 0.9rem;
  line-height: 1.35;
  opacity: 0.85;
  margin: 0;
}

/* Footer */
.footer {
  background-color: var(--ink-color);
  color: var(--bg-color);
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cta-text h2 {
  font-family: var(--font-display, 'Syne', sans-serif);
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  line-height: 1;
  text-transform: uppercase;
}

.links {
  font-family: var(--font-mono, 'Space Mono', monospace);
  font-size: 0.85rem;
  opacity: 0.9;
}

.links .at-symbol {
  font-family: var(--font-body, 'Space Grotesk', sans-serif);
}

.qr-placeholder {
  background-color: var(--bg-color);
  width: 5rem;
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  overflow: hidden;
  padding: 2px;
}

.qr-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
