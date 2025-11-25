<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app-shell">
    <nav class="nav">
      <RouterLink to="/" class="logo"> LLL_ST.PETE </RouterLink>
      <div class="nav-menu">
        <RouterLink to="/get-involved" class="nav-link">
          Get Involved
        </RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/#events" class="nav-link">Events</RouterLink>
      </div>
      <RouterLink to="/get-involved" class="cta-link">Join the Lab</RouterLink>
    </nav>

    <RouterView />
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
  z-index: 100;
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  backdrop-filter: blur(10px);
  background: rgba(242, 240, 233, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
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

@media (max-width: 900px) {
  .nav {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .nav-menu {
    order: 3;
    flex-wrap: wrap;
    justify-content: center;
  }

  .cta-link {
    order: 2;
  }
}
</style>
