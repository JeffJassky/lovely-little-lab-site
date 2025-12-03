<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

declare global {
  interface Window {
    google?: any;
  }
}

type GoogleMaps = any;

const API_KEY = 'AIzaSyC393yvAdmVptYjha1xfv4s15Gcesz-0A0';

const ST_PETE_CENTER = {
  lat: 27.768,
  lng: -82.639
};

const MAP_ZOOM = 10;

const CUSTOM_MAP_STYLES = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#F2F0E9' }]
  },
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#111111' }]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      { color: '#F2F0E9' },
      { weight: 3 }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [{ visibility: 'off' }]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#E8E6DE' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#757575' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#E0DED7' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [{ color: '#FFFFFF' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#E0DED7' },
      { weight: 1 }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#C8553D' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      { color: '#111111' },
      { weight: 0.5 }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#111111' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9e9e9e' }]
  }
];

const mapElement = ref<HTMLDivElement | null>(null);
const status = ref<'loading' | 'ready' | 'error'>('loading');
const errorMessage = ref('');

let mapInstance: any = null;
let apiPromise: Promise<GoogleMaps> | null = null;

const overlayMessage = computed(() => {
  if (status.value === 'error') {
    return errorMessage.value || 'Map unavailable right now.';
  }

  return 'Loading map…';
});

const ensureMapsApi = (): Promise<GoogleMaps> => {
  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (apiPromise) return apiPromise;

  apiPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-google-maps]');

    if (existing) {
      existing.addEventListener('load', () => resolve(window.google!.maps));
      existing.addEventListener('error', () =>
        reject(new Error('Google Maps failed to load'))
      );
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'true';
    script.onload = () => resolve(window.google!.maps);
    script.onerror = () => reject(new Error('Google Maps failed to load'));
    document.head.appendChild(script);
  });

  return apiPromise;
};

const initMap = (maps: GoogleMaps) => {
  if (!mapElement.value) return;

  mapInstance = new maps.Map(mapElement.value, {
    center: ST_PETE_CENTER,
    zoom: MAP_ZOOM,
    minZoom: MAP_ZOOM,
    maxZoom: MAP_ZOOM,
    styles: CUSTOM_MAP_STYLES,
    disableDefaultUI: true,
    clickableIcons: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    gestureHandling: 'none',
    disableDoubleClickZoom: true,
    scrollwheel: false
  });
};

onMounted(async () => {
  if (!API_KEY) {
    status.value = 'error';
    errorMessage.value = 'Google Maps API key required.';
    return;
  }

  try {
    const maps = await ensureMapsApi();
    initMap(maps);
    status.value = 'ready';
  } catch (error) {
    status.value = 'error';
    errorMessage.value = 'Google Maps failed to load.';
    console.error(error);
  }
});

onBeforeUnmount(() => {
  mapInstance = null;
});
</script>

<template>
  <div class="google-map">
    <div ref="mapElement" class="google-map__canvas"></div>

    <div v-if="status !== 'ready'" class="google-map__overlay">
      <div class="google-map__badge">
        {{ status === 'error' ? 'MAP_UNAVAILABLE' : 'MAP_LOADING' }}
      </div>
      <p class="google-map__message">
        {{ overlayMessage }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">
.google-map {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: #f4f1e8;
}

.google-map__canvas {
  width: 100%;
  height: 100%;
  filter: saturate(0.8);
}

.google-map__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: radial-gradient(
      circle at 20% 20%,
      rgba(242, 240, 233, 0.75),
      rgba(242, 240, 233, 0.35)
    ),
    linear-gradient(90deg, rgba(242, 240, 233, 0.65), rgba(242, 240, 233, 0.45));
  color: #111;
  font-family: var(--font-mono, monospace);
  text-align: center;
  padding: 1.5rem;
  z-index: 3;
}

.google-map__badge {
  background: #111;
  color: #f2f0e9;
  padding: 0.35rem 0.75rem;
  letter-spacing: 0.08em;
  font-size: 0.75rem;
}

.google-map__message {
  margin: 0;
  max-width: 280px;
  line-height: 1.4;
}
</style>
