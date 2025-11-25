<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const disciplines = [
'Fashion',
'Jewelry',
'Industrial Design',
'Painting',
'Coding',
'Robotics',
'Poetry',
'Woodworking',
'Metalworking',
'Ceramics',
'Sound & Light',
'Game Design',
'Electronics',
'Photography',
'Film',
'Music',
'Sculpture',
'Animation',
'UI / UX'
];

const categories = [
  {
    title: 'SHARE',
    subtitle: 'Creative Expression',
    events: [
      { name: 'Show & Tell Salon', desc: 'Works in progress. No polish required.' },
      { name: 'Process Night', desc: 'How you make what you make.' },
      { name: 'Inspo Share', desc: 'Moodboards, obsessions, and rabbit holes.' }
    ]
  },
  {
    title: 'MAKE',
    subtitle: 'Build Solo or Together',
    events: [
      { name: 'Body Doubling', desc: 'Co-working night. Get shit done.' },
      { name: '3-Hour Sprint', desc: 'High intensity creative jam.' },
      { name: 'Micro-Hackathon', desc: 'Open to all mediums, not just code.' }
    ]
  },
  {
    title: 'THINK',
    subtitle: 'Explore & Learn',
    events: [
      { name: 'The Idea Lab', desc: 'Concept jam and brainstorming.' },
      { name: 'Mind Meld', desc: 'Artists + Engineers collision.' },
      { name: 'Design + Emotion', desc: 'Roundtable discussions.' }
    ]
  },
  {
    title: 'CONNECT',
    subtitle: 'Find your Tribe',
    events: [
      { name: 'Social Hour', desc: 'Creative mixer.' },
      { name: 'Speed Friending', desc: 'Surprisingly effective.' },
      { name: 'Art Walk', desc: 'Field trips to galleries & museums.' }
    ]
  }
];

const email = ref('');
const subscribed = ref(false);
const observer = ref<IntersectionObserver | null>(null);

const handleSubscribe = () => {
  if (email.value) {
    subscribed.value = true;
    setTimeout(() => {
      email.value = '';
      subscribed.value = false;
    }, 3000);
  }
};

onMounted(() => {
  observer.value = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    observer.value?.observe(el);
  });
});

onUnmounted(() => {
  observer.value?.disconnect();
});
</script>

<template>
  <main class="lab-container">
    <header class="hero">
      <div class="hero-content">
        <h1 class="hero-title reveal">
          <span class="block">LOVELY</span>
          <span class="block indent">LITTLE</span>
          <span class="block">LAB</span>
        </h1>
        <div class="hero-shapes">
          <div class="shape circle"></div>
          <div class="shape arch"></div>
        </div>
        <p class="hero-tagline reveal">
          meetups, workshops, and creative sprints<br />
          in <span class="invert">st. petersburg, fl</span>
        </p>
      </div>
    </header>

    <section id="vibe" class="manifesto reveal">
      <div class="grid-layout">
        <div class="manifesto-header">
          <h2>WHAT'S LLL?</h2>
        </div>
        <div class="manifesto-text">
          <p class="lead">
            community meetups, workshops, and creative sprints for st. pete
            artists, engineers and makers.
          </p>
          <div class="vibe-list">
            <span>Get shi* done.</span>
            <span>Make friends.</span>
            <span>Stay inspired.</span>
          </div>
        </div>
      </div>
    </section>

    <div class="marquee-container">
      <div class="marquee">
        <span
          v-for="(item, index) in [...disciplines, ...disciplines]"
          :key="index"
        >
          {{ item }} <span class="separator">✦</span>
        </span>
      </div>
    </div>

    <section id="events" class="program reveal">
      <div class="section-label">UPCOMING EVENTS</div>
      <div class="program-grid">
        <div v-for="cat in categories" :key="cat.title" class="category-card">
          <h3 class="cat-title">{{ cat.title }}</h3>
          <p class="cat-sub">{{ cat.subtitle }}</p>
          <ul class="event-list">
            <li v-for="event in cat.events" :key="event.name">
              <strong>{{ event.name }}</strong>
              <span class="event-desc">{{ event.desc }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="logistics reveal">
      <div class="grid-layout">
        <div class="logistics-visual">
          <div class="map-graphic">
            <div class="pin"></div>
            <div class="radar"></div>
          </div>
        </div>
        <div class="logistics-info">
          <div class="info-block">
            <span class="label">WHERE</span>
            <h4>St. Petersburg, FL</h4>
            <p>The Sunshine City</p>
          </div>
          <div class="info-block">
            <span class="label">WHEN</span>
            <h4>Bi-Weekly Meetups</h4>
            <p>1st & 3rd Thursday each month, 6-9pm</p>
          </div>
        </div>
      </div>
    </section>

    <footer id="join" class="footer reveal">
      <div class="footer-content">
        <h2>PULL UP A CHAIR.</h2>
        <p>Join the mailing list for event dates and location drops.</p>

        <form @submit.prevent="handleSubscribe" class="signup-form">
          <input
            v-model="email"
            type="email"
            placeholder="YOUR@EMAIL.COM"
            required
            :disabled="subscribed"
          />
          <button type="submit" :class="{ success: subscribed }">
            {{ subscribed ? 'WELCOME' : 'SUBSCRIBE' }}
          </button>
        </form>

        <div class="footer-meta">
          <span>© LOVELY LITTLE LAB</span>
          <span>EST. 2024</span>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.lab-container {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  background-color: var(--bg, #F2F0E9);
  min-height: 100vh;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

@media (min-width: 768px) {
  .grid-layout {
    grid-template-columns: 1fr 2fr;
  }
}

.manifesto,
.program,
.logistics {
  scroll-margin-top: 140px;
}

.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.hero-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.hero-title {
  font-family: var(--font-display, sans-serif);
  font-weight: 800;
  font-size: clamp(3rem, 12vw, 10rem);
  line-height: 0.85;
  text-transform: uppercase;
  color: var(--ink, #111);
  margin: 0;
}

.hero-title .block {
  display: block;
}

.hero-title .indent {
  margin-left: 1.5ch;
  color: transparent;
  -webkit-text-stroke: 2px var(--ink, #111);
}

.hero-tagline {
  margin-top: 2rem;
  font-family: var(--font-mono, monospace);
  font-size: 1.1rem;
  line-height: 1.5;
  opacity: 0;
}

.hero-content .invert{

}

.hero-shapes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  opacity: 0.8;
}

.circle {
  width: 30vw;
  height: 30vw;
  border: 1px solid var(--ink, #111);
  border-radius: 50%;
  top: 10%;
  right: -5%;
  animation: rotate 60s linear infinite;
}

.arch {
  width: 20vw;
  height: 40vw;
  background-color: #C8553D;
  border-radius: 20vw 20vw 0 0;
  bottom: -10%;
  left: 10%;
  mix-blend-mode: multiply;
  animation: float 6s ease-in-out infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.manifesto {
  padding: 8rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.manifesto-header h2 {
  font-family: var(--font-mono, monospace);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
}

.manifesto-text .lead {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 3rem;
  max-width: 800px;
}

.vibe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.vibe-list span {
  font-family: var(--font-mono, monospace);
  background: #111;
  color: #F2F0E9;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.marquee-container {
  padding: 3rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  white-space: nowrap;
  background: #111;
  color: #F2F0E9;
}

.marquee {
  display: inline-block;
  animation: scroll 30s linear infinite;
}

.marquee span {
  font-family: var(--font-display, sans-serif);
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-right: 2rem;
}

.separator {
  color: #C8553D;
  font-weight: 400;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.program {
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-label {
  font-family: var(--font-mono, monospace);
  margin-bottom: 4rem;
  border-top: 1px solid #111;
  padding-top: 1rem;
  display: inline-block;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 4rem 2rem;
}

.category-card {
  border-left: 2px solid #C8553D;
  padding-left: 1.5rem;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateX(10px);
}

.cat-title {
  font-family: var(--font-display, sans-serif);
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
}

.cat-sub {
  font-family: var(--font-mono, monospace);
  font-style: italic;
  margin-bottom: 2rem;
  color: #555;
}

.event-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.event-list li {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
}

.event-list strong {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.event-desc {
  font-size: 0.95rem;
  color: #444;
}

.logistics {
  padding: 6rem 0;
  background: #EAE8E0;
}

.map-graphic {
  width: 100%;
  height: 300px;
  border: 1px solid #111;
  position: relative;
  background: linear-gradient(#111 1px, transparent 1px),
    linear-gradient(90deg, #111 1px, transparent 1px);
  background-size: 40px 40px;
  background-color: #F2F0E9;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pin {
  width: 20px;
  height: 20px;
  background: #C8553D;
  border-radius: 50%;
  z-index: 2;
}

.radar {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid #C8553D;
  border-radius: 50%;
  animation: radar 2s infinite;
}

@keyframes radar {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(5);
    opacity: 0;
  }
}

.logistics-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
}

.info-block h4 {
  font-family: var(--font-display, sans-serif);
  font-size: 2.5rem;
  margin: 0.5rem 0;
}

.label {
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: #111;
  color: #fff;
  padding: 2px 8px;
}

.footer {
  padding: 6rem 2rem;
  background: #111;
  color: #F2F0E9;
  text-align: center;
  position: relative;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
}

.footer h2 {
  font-family: var(--font-display, sans-serif);
  font-size: clamp(3rem, 6vw, 6rem);
  margin: 0 0 1rem 0;
  line-height: 1;
}

.footer p {
  font-size: 1.2rem;
  margin-bottom: 3rem;
  font-family: var(--font-mono, monospace);
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto 4rem;
}

@media (min-width: 600px) {
  .signup-form {
    flex-direction: row;
  }
}

.signup-form input {
  flex: 1;
  padding: 1rem;
  background: transparent;
  border: 1px solid #444;
  color: #fff;
  font-family: var(--font-mono, monospace);
  font-size: 1rem;
  border-radius: 0;
}

.signup-form input:focus {
  outline: none;
  border-color: #C8553D;
}

.signup-form button {
  padding: 1rem 2rem;
  background: #F2F0E9;
  color: #111;
  border: none;
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s;
}

.signup-form button:hover {
  background: #C8553D;
  color: #fff;
}

.signup-form button.success {
  background: #4CAF50;
  color: #fff;
}

.footer-meta {
  border-top: 1px solid #333;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  color: #666;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
