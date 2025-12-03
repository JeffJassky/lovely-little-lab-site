<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import TheFullLogo from '../components/TheFullLogo.vue';
import TheMarquee from '../components/TheMarquee.vue';
import GoogleMap from '../components/GoogleMap.vue';

const disciplines = [
  'Design & Craft',
  'Ceramics',
  'Art & Illustration',
  'Fashion & Jewelry',
  'Code & Creative Tech',
  'Robotics & Electronics',
  'Wood & Metal',
  'Photography & Film',
  'Music & Sound',
  'Animation & Games',
  'UI/UX'
];


const categories = [
  {
    title: 'MAKE',
    subtitle: 'Build Solo or Together',
    events: [
      { name: 'Co-working Nights', desc: 'Get shit done in a shared space.' },
      { name: '3-Hour Sprint', desc: 'High intensity work jam.' },
      { name: 'Hackathons', desc: 'Open to all mediums, not just code.' }
    ]
  },
  {
    title: 'SHARE',
    subtitle: 'Creative Expression',
    events: [
      { name: 'Work Share Night', desc: 'Share completed projects or WIPs. No polish required.' },
      { name: 'Process Night', desc: 'Share how you make your stuff.' },
      { name: 'Inspiration Night', desc: 'Moodboards, obsessions, and rabbit holes.' }
    ]
  },
  {
    title: 'CONNECT',
    subtitle: 'Explore & Learn',
    events: [
      { name: 'Workshops', desc: 'Teach your stuff. Learn from others.' },
      { name: 'Creative Tech Nite', desc: 'Art with code + electronics' }
    ]
  }
];

const observer = ref<IntersectionObserver | null>(null);

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
      <div class="hero-content reveal">
        <the-full-logo />
        <p class="hero-tagline">
          Creative nights for people who make things <br />
          <span class="invert">Every Tuesday, 6-9pm, in St. Pete, FL</span>
        </p>
      </div>
    </header>

    <section id="next-session" class="next-session reveal">
      <div class="next-session-grid">
        <div class="next-label">
          <div class="next-label-text">NEXT SESSION</div>
          <span class="label-shadow"></span>
        </div>
        <div class="next-details">
          <p class="next-date">Tuesday · December 16 · 6–9pm</p>
          <p class="next-location">Location TBD (near DTSP)</p>
          <p class="next-note">
            Open table vibes. Bring a project or just come hang,<br />meet
            makers, and get inspired.
          </p>
        </div>
      </div>
    </section>

    <section id="vibe" class="manifesto reveal">
      <div class="grid-layout">
        <div class="manifesto-header">
          <h2>HOW'S LL WORK?</h2>
        </div>
        <div class="manifesto-text">
          <p class="lead">
            Show up with your project, an idea, a half-finished thing, or
            nothing at all. Meet great people, work on your stuff and stay
            inspired.
          </p>
          <div class="vibe-list">
            <span>Make stuff.</span>
            <span>Make friends.</span>
            <span>Stay inspired.</span>
          </div>
        </div>
      </div>
    </section>

    <the-marquee :items="disciplines" />

    <section id="events" class="program reveal">
      <div class="section-label">EVENT CONCEPTS (TBD)</div>
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

    <section id="vibe" class="manifesto reveal">
      <div class="grid-layout">
        <div class="manifesto-header">
          <h2>WHY'S LL EXIST?</h2>
        </div>
        <div class="manifesto-text">
          <p class="lead">
            LL is for makers, craftspeople, designers, artists and engineers to
            coexist, work on stuff solo or collaboratively, and make progress on
            the things they care about.
          </p>
          <p class="lead">
            It’s a home base for people who love making physical and digital
            things and want a space where inspiration and good energy are always
            in the room.
          </p>
        </div>
      </div>
    </section>

    <section class="logistics reveal">
      <div class="flex-layout">
        <div class="logistics-visual">
          <div class="map-graphic">
            <GoogleMap />
            <div class="radar"></div>
          </div>
        </div>
        <div class="logistics-info">
          <div class="info-block">
            <span class="label">WHERE</span>
            <h4>St. Petersburg, FL</h4>
            <p>Location TBD</p>
          </div>
          <div class="info-block">
            <span class="label">WHEN</span>
            <h4>Tuedays Nights</h4>
            <p>Every Tuesday - 6:00 - 9:00pm</p>
          </div>
        </div>
      </div>
    </section>

    <footer id="join" class="footer reveal">
      <div class="footer-content">
        <h2>PULL UP A CHAIR.</h2>
        <p>Join the mailing list for event dates and location details.</p>

        <div class="signup-shell">
          <div
            id="mlb2-34140237"
            class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-34140237"
          >
            <div class="ml-form-align-center ">
              <div class="ml-form-embedWrapper embedForm">
                <div
                  class="ml-form-embedBody ml-form-embedBodyDefault row-form"
                >
                  <div
                    class="ml-form-embedContent"
                    style="margin-bottom: 0px; "
                  ></div>

                  <form
                    class="ml-block-form signup-form"
                    action="https://assets.mailerlite.com/jsonp/449716/forms/172703619663005083/subscribe"
                    data-code=""
                    method="post"
                    target="_blank"
                  >
                    <div class="ml-form-formContent">
                      <div class="ml-form-fieldRow ml-last-item">
                        <div
                          class="ml-field-group ml-field-email ml-validate-email ml-validate-required"
                        >
                          <!-- input -->
                          <input
                            aria-label="email"
                            aria-required="true"
                            type="email"
                            class="form-control"
                            data-inputmask=""
                            name="fields[email]"
                            placeholder="you@email.com"
                            autocomplete="email"
                          />
                        </div>
                      </div>
                    </div>

                    <input type="hidden" name="ml-submit" value="1" />

                    <div class="ml-form-embedSubmit">
                      <button type="submit" class="primary">
                        Join the List
                      </button>

                      <button
                        disabled="true"
                        style="display: none;"
                        type="button"
                        class="loading"
                      >
                        <div class="ml-form-embedSubmitLoad"></div>
                        <span class="sr-only">Loading...</span>
                      </button>
                    </div>

                    <input type="hidden" name="anticsrf" value="true" />
                  </form>
                </div>

                <div
                  class="ml-form-successBody row-success"
                  style="display: none"
                >
                  <div class="ml-form-successContent">
                    <h4>Thank you!</h4>

                    <p>
                      You've joined the list. We'll email you with info soon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-meta">
          <span>© LOVELY LAB</span>
          <RouterLink to="/print" class="footer-link">PRINTS</RouterLink>
          <span>EST. 2025</span>
        </div>
      </div>
    </footer>
  </main>
</template>

<style scoped lang="less">
.lab-container {
  width: 100%;
  max-width: 100vw;
  overflow: hidden;
  background-color: var(--bg, #F2F0E9);
  min-height: 100vh;
  padding-top: 83px;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.flex-layout {
  display: flex;
  flex-direction: column;
  gap: 4rem;
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

.next-session {
  padding: 5rem 1rem 4rem 1rem;
  margin: 0 auto;
  max-width: 700px;
  width: 80%;
  border:2px solid var(--ink);
  position: relative;
  background: white;
  box-shadow: 0.3em 0.3em 0 #c8553d;
  margin-bottom: 3rem;
}

.next-session-grid {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

.next-label {
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  gap: 0.75rem;
  position: absolute;
  top: 0;
  left: 0;
}

.next-label-text {
  font-family: var(--font-mono, monospace);
  font-size: 1rem;
  letter-spacing: 0.12em;
  background: #111;
  color: #f2f0e9;
  padding: 0.5rem 1rem;
  white-space: nowrap;
  font-weight: 600;
}

.label-shadow {
  display: block;
  width: 12px;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    #111,
    #111 4px,
    transparent 4px,
    transparent 8px
  );
  opacity: 0.4;
}

.next-details {
  display: grid;
  gap: 0.85rem;
  align-content: start;
}

.next-date,
.next-location {
  font-family: var(--font-mono, monospace);
  margin: 0;
  font-size: clamp(1.2rem, 2.3vw, 1.8rem);
  letter-spacing: 0.04em;
}

.next-date{
	font-weight: 600;
}

.next-location {
  color: #c8553d;
  font-size: clamp(1rem, 2.3vw, 1.25rem);
}

.next-note {
  margin: 0.5rem 0 0;
  font-size: 1.05rem;
  line-height: 1.5;
  max-width: 52ch;
}

.next-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  margin-top: 0.5rem;
  font-family: var(--font-mono, monospace);
  font-weight: 700;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.75rem 1.5rem;
  border: 2px solid #111;
  background: #f2f0e9;
  color: #111;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0.25em 0.25em 0 #c8553d;
}

.next-cta:hover {
  transform: translate(-4px, -4px);
  box-shadow: 0.45em 0.45em 0 #111;
  background: #fff;
}

@media (max-width: 767px) {
  .next-label {
    justify-content: center;
  }

  .next-details {
    text-align: center;
    align-items: center;
  }
}

.hero {
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.hero-content{
	width: 80vw;
	max-width: 800px;
	text-align: center;
	opacity: 0;
}

.hero-tagline {
  margin-top: 4rem;
  font-family: var(--font-mono, monospace);
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  line-height: 1.5;
  font-weight: 500;
  .invert {
	color: var(--accent);
  }
}


.manifesto {
  margin: 5rem 0;
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
  margin-top: 0;
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

.logistics-visual,
.logistics-info {
  flex: 1;
}

.logistics-visual {
  display: flex;
  justify-content: center;
}

.map-graphic {
  height: 40vh;
  border: 4px solid #111;
  position: relative;
  background-color: #F4F1E8;
  aspect-ratio: 5 / 6;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1em 1em 0 #d7d4cb;
  overflow: hidden;
}

.map-graphic::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(#111 1px, transparent 1px),
    linear-gradient(90deg, #111 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: center;
  opacity: 0.1;
  mix-blend-mode: multiply;
  pointer-events: none;
  z-index: 2;
}

.radar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 1px solid #C8553D;
  border-radius: 50%;
  animation: radar 2s infinite;
  z-index: 3;
  pointer-events: none;
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

.signup-shell {
  max-width: 600px;
  margin: 0 auto 4rem;
}

.signup-shell .ml-form-embedContainer {
  width: 100%;
  max-width: 100% !important;
}

.signup-shell .ml-form-embedWrapper {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  box-shadow: none;
  width: 100%;
  max-width: 100% !important;
  display: block !important;
}

.signup-shell .ml-form-embedBody,
.signup-shell .ml-form-successBody {
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  background: transparent !important;
}

.signup-shell .ml-form-embedContent {
  display: none;
}

@media (min-width: 900px) {
  .flex-layout {
    flex-direction: row;
    align-items: center;
  }
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: stretch;
}

.signup-form .ml-form-formContent {
  flex: 1;
  margin: 0;
  align-items: stretch;
}

.signup-form .ml-form-fieldRow,
.signup-form .ml-field-group {
  margin: 0;
  width: 100%;
}

.signup-form .ml-form-embedSubmit {
  display: flex;
  align-items: stretch;
  width: auto !important;
  margin: 0 !important;
  float: none !important;
}

.signup-form .ml-form-embedSubmit button {
  height: 100%;
}

@media (min-width: 600px) {
  .signup-form {
    flex-direction: row;
  }

  .signup-form .ml-form-formContent {
    display: flex;
  }
}

.signup-form input {
  flex: 1;
  width: 100%;
  padding: 1rem !important;
  background: transparent !important;
  border: 1px solid #444 !important;
  color: #fff !important;
  font-family: var(--font-mono, monospace) !important;
  font-size: 1rem !important;
  border-radius: 0 !important;
}

.signup-form input::placeholder {
  color: #bbbbbb !important;
  opacity: 1;
}

.signup-form input:focus {
  outline: none;
  border-color: #C8553D !important;
}

.signup-form button {
  padding: 1rem 2rem !important;
  background: #F2F0E9 !important;
  color: #111 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  font-family: var(--font-mono, monospace) !important;
  font-weight: 700 !important;
  cursor: pointer;
  transition: background 0.3s;
  width: auto !important;
}

.signup-form button:hover {
  background: #C8553D !important;
  color: #fff !important;
}

.signup-form button.success {
  background: #4CAF50 !important;
  color: #fff !important;
}

.signup-shell .ml-form-successBody {
  text-align: center;
}

.signup-shell .ml-form-successContent h4 {
  margin: 0 0 0.5rem;
  font-family: var(--font-display, sans-serif);
  color: #F2F0E9;
}

.signup-shell .ml-form-successContent p {
  margin: 0;
  font-family: var(--font-mono, monospace);
  color: #F2F0E9;
  font-size: 1rem;
}

.form-success {
  margin-top: 0.75rem;
  color: #4CAF50;
  font-family: var(--font-mono, monospace);
  font-size: 0.95rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.footer-meta {
  border-top: 1px solid #333;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  font-family: var(--font-mono, monospace);
  font-size: 0.8rem;
  color: #666;
}

.footer-link {
  color: #F2F0E9;
  text-decoration: none;
  border: 1px solid #333;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  letter-spacing: 0.08em;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.footer-link:hover {
  background: #C8553D;
  color: #F2F0E9;
  border-color: #C8553D;
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
