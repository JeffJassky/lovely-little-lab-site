<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import TheLogo from './components/TheGearLogo.vue';

const scrolled = ref(false);
const menuOpen = ref(false);
const initialBodyOverflow = ref('');
const showFontBar = ref(true);
const fontBarDone = ref(false);
const fontBarProgress = ref(0.08);
const fontsReady = ref(false);
let fontReadyFallback: number | undefined;

const handleScroll = () => {
  scrolled.value = window.scrollY > 0;
};

const setBodyScrollLock = (locked: boolean) => {
  if (typeof document === 'undefined') return;

  if (locked) {
    initialBodyOverflow.value = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = initialBodyOverflow.value;
  }
};

const closeMenu = () => {
  if (!menuOpen.value) return;
  menuOpen.value = false;
  setBodyScrollLock(false);
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  setBodyScrollLock(menuOpen.value);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
};

const finishFontBar = () => {
  if (fontBarDone.value) return;
  fontBarProgress.value = 1;
  fontBarDone.value = true;
  fontsReady.value = true;
  window.setTimeout(() => {
    showFontBar.value = false;
  }, 450);
};

onMounted(() => {
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('keydown', handleKeydown);

  requestAnimationFrame(() => {
    fontBarProgress.value = 0.65;
  });

  const fontReady = document.fonts?.ready;
  fontReadyFallback = window.setTimeout(finishFontBar, 1800);

  if (fontReady?.then) {
    fontReady
      .then(() => {
        window.clearTimeout(fontReadyFallback);
        finishFontBar();
      })
      .catch(finishFontBar);
  } else {
    finishFontBar();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKeydown);
  setBodyScrollLock(false);
  if (fontReadyFallback !== undefined) {
    window.clearTimeout(fontReadyFallback);
  }
});
</script>

<template>
  <div class="app-shell">
    <div
      v-if="showFontBar"
      class="font-progress"
      :class="{ 'font-progress--done': fontBarDone }"
      :style="{ transform: 'scaleX(' + fontBarProgress + ')' }"
      aria-hidden="true"
    ></div>
    <template v-if="fontsReady">
      <nav :class="['nav', { 'nav--scrolled': scrolled }]">
        <RouterLink
          to="/"
          class="logo"
          style="display: flex; align-items: center; gap: 0.5em;"
        >
          <TheLogo style="width: 20px" />
          LL_ST.PETE
        </RouterLink>
        <div class="nav-menu">
          <RouterLink to="/#events" class="nav-link">Events</RouterLink>
          <RouterLink to="/get-involved" class="nav-link">
            Get Involved
          </RouterLink>
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </div>
        <div class="nav-actions">
          <div class="social-icons">
            <a
              class="social-icon"
              href="http://instagram.com/lovelylabstpete"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Lovely Lab on Instagram"
              v-tooltip="`Follow @LovelyLabStPete`"
            >
              <img src="/instagram-glyph-seeklogo.svg" alt="" />
            </a>
            <a
              v-if="false"
              class="social-icon social-icon--facebook"
              href="https://www.facebook.com/people/Lovely-Lab-St-Pete-Makers/61584700285261/"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Lovely Lab on Facebook"
            >
              <img src="/2023_Facebook_icon.svg" alt="" />
            </a>
            <a
              class="social-icon social-icon--meetup"
              href="https://www.meetup.com/lovely-lab"
              target="_blank"
              rel="noreferrer"
              aria-label="Join the Lovely Lab meetup"
              v-tooltip="`Join us on Meetup`"
            ></a>
          </div>
          <RouterLink to="/#join" class="cta-link">Join the Lab</RouterLink>
        </div>
        <button
          type="button"
          class="menu-toggle"
          :class="{ 'menu-toggle--open': menuOpen }"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
          @click="toggleMenu"
        >
          <span
            class="menu-toggle__line menu-toggle__line--top"
            aria-hidden="true"
          ></span>
          <span
            class="menu-toggle__line menu-toggle__line--mid"
            aria-hidden="true"
          ></span>
          <span
            class="menu-toggle__line menu-toggle__line--bottom"
            aria-hidden="true"
          ></span>
        </button>
      </nav>

      <div
        :class="['mobile-menu', { 'mobile-menu--open': menuOpen }]"
        @click.self="closeMenu"
      >
        <div class="mobile-menu__content">
          <RouterLink to="/#events" class="nav-link" @click="closeMenu">
            Events
          </RouterLink>
          <RouterLink
            to="/get-involved"
            class="cta-link mobile-cta"
            @click="closeMenu"
          >
            Join the Lab
          </RouterLink>
          <RouterLink to="/get-involved" class="nav-link" @click="closeMenu">
            Get Involved
          </RouterLink>
          <RouterLink to="/about" class="nav-link" @click="closeMenu">
            About
          </RouterLink>
          <div class="mobile-social">
            <a
              class="social-icon"
              href="http://instagram.com/lovelylabstpete"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Lovely Lab on Instagram"
              v-tooltip="`Follow @LovelyLabStPete`"
            >
              <img src="/instagram-glyph-seeklogo.svg" alt="" />
            </a>
            <a
              v-if="false"
              class="social-icon social-icon--facebook"
              href="https://www.facebook.com/people/Lovely-Lab-St-Pete-Makers/61584700285261/"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Lovely Lab on Facebook"
            >
              <img src="/2023_Facebook_icon.svg" alt="" />
            </a>
            <a
              class="social-icon social-icon--meetup"
              href="https://www.meetup.com/lovely-lab"
              target="_blank"
              rel="noreferrer"
              aria-label="Join the Lovely Lab meetup"
              v-tooltip="`Join us on Meetup`"
            ></a>
          </div>
        </div>
      </div>

      <RouterView />
    </template>
    <div v-else class="font-waiter" aria-live="polite">
      <span class="font-waiter__dot"></span>
      <span class="font-waiter__text">Loading type…</span>
    </div>
  </div>
</template>

<style>
:root {
  --bg: #F2F0E9;
  --ink: #111111;
  --accent: #C8553D;
  --grid-line: rgba(17, 17, 17, 0.1);
  --font-display: 'Syne', sans-serif;
  --font-body: 'Space Grotesk', sans-serif;
  --font-mono: 'Space Mono', monospace;
}

.app-shell {
  background-color: var(--bg);
  min-height: 100vh;
}

.font-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--ink);
  transform-origin: left center;
  opacity: 0.9;
  transition: transform 0.9s ease, opacity 0.4s ease 0.4s;
  z-index: 220;
  pointer-events: none;
}

.font-progress::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 80px;
  background: linear-gradient(90deg, transparent, rgba(17, 17, 17, 0.35));
}

.font-progress--done {
  opacity: 0;
}

.font-waiter {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-mono, monospace);
  letter-spacing: 1px;
  color: var(--ink);
}

.font-waiter__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--ink);
  animation: pulse 1s ease-in-out infinite;
}

.font-waiter__text {
  font-size: 0.9rem;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.35);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
}

.nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.25rem 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.5rem;
  z-index: 200;
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  backdrop-filter: none;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease;
}

.nav--scrolled {
  backdrop-filter: blur(4px);
  background: rgba(242, 240, 233, 0.85);
  border-bottom-color: rgba(0, 0, 0, 0.06);
}

.logo {
  color: var(--ink);
  text-decoration: none;
  letter-spacing: 1px;
}

.nav-menu {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.social-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: auto;
  color: var(--ink);
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.85;
}

.social-icon:hover {
  transform: translateY(-1px);
  opacity: 1;
}

.social-icon img {
  height: 1.5rem;
  width: auto;
  display: block;
}

.social-icon--meetup {
  height: 1.5rem;
  width: auto;
  aspect-ratio: 125 / 34;
  background-color: currentColor;
  mask-image: url('/meetup-seeklogo.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: url('/meetup-seeklogo.svg');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}

.nav-link {
  color: var(--ink);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s, color 0.3s;
  font-size: 0.9rem;
}

.nav-link:hover {
  border-bottom-color: currentColor;
}

.cta-link {
  text-decoration: none;
  color: var(--bg);
  background: var(--ink);
  padding: 0.7rem 1.25rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 0.85rem;
  transition: background 0.3s, color 0.3s;
}

.cta-link:hover {
  background: var(--accent);
  color: #fff;
}

.menu-toggle {
  display: none;
  position: relative;
  width: 3rem;
  height: 3rem;
  z-index: 150;
  border: none;
  background: transparent;
  cursor: pointer;
  overflow: visible;
  transition: transform 0.3s ease;
}

.menu-toggle:hover {
  transform: translateY(-1px);
}

.menu-toggle__line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  height: 2px;
  background: var(--ink);
  border-radius: 999px;
  transition: transform 0.55s cubic-bezier(0.83, 0, 0.17, 1), width 0.35s ease,
    opacity 0.3s ease;
  transform-origin: center;
  transform: translate(-50%, -50%);
}

.menu-toggle__line--top {
  transform: translate(-50%, -50%) translateY(-7px);
}

.menu-toggle__line--mid {
  transform: translate(-50%, -50%);
}

.menu-toggle__line--bottom {
  transform: translate(-50%, -50%) translateY(7px);
}

.menu-toggle--open .menu-toggle__line {
  background: var(--ink);
  width: 24px;
}

.menu-toggle--open .menu-toggle__line--top {
  transform: translate(-50%, -50%) rotate(60deg);
}

.menu-toggle--open .menu-toggle__line--mid {
  transform: translate(-50%, -50%) rotate(-60deg);
}

.menu-toggle--open .menu-toggle__line--bottom {
  transform: translate(-50%, -50%) rotate(0deg) scaleX(0.9);
}

.mobile-menu {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 5rem 1.5rem 3rem;
  background: var(--bg);
  color: var(--ink);
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity 0.35s ease, transform 0.45s cubic-bezier(0.33, 1, 0.68, 1);
  pointer-events: none;
  z-index: 130;
}

.mobile-menu--open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.mobile-menu__content {
  width: min(480px, 90vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  text-align: center;
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  min-height: calc(100vh - 8rem);
}

.mobile-menu .nav-link {
  color: var(--ink);
  font-size: 1.1rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-bottom: 1px solid transparent;
}

.mobile-menu .nav-link:hover {
  border-bottom-color: rgba(17, 17, 17, 0.25);
}

.mobile-cta {
  color: var(--bg);
  background: var(--ink);
  border: 1px solid var(--ink);
  margin-top: 0.5rem;
}

.mobile-cta:hover {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.mobile-social {
  margin-top: auto;
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.v-popper--theme-tooltip .v-popper__inner {
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
}

@media (min-width: 901px) {
  .menu-toggle,
  .mobile-menu {
    display: none;
  }
}

@media (max-width: 900px) {
  .nav {
    grid-template-columns: auto 1fr auto;
    align-items: center;
    justify-items: start;
    text-align: left;
    padding: 1rem 1.25rem;
  }

  .nav-menu {
    display: none;
  }

  .nav-actions {
    display: none;
  }

  .logo {
    justify-self: start;
  }

  .menu-toggle {
    display: inline-flex;
    grid-column: 3;
    justify-self: end;
  }

  .mobile-menu {
    display: flex;
  }
}
</style>
