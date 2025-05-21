<template>

  
  <div class="p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen pb-24 md:pb-6">
    <h1 class="text-3xl font-bold mb-6">🚔 Police Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Incidents List -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-semibold">Assigned Incidents</h2>
          <button @click="loadAssignedIncidents" class="p-2 text-blue-600 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        <div v-if="loading" class="text-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        </div>

        <div v-else-if="assignedIncidents.length === 0" class="bg-white dark:bg-gray-800 rounded p-4 shadow text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">No incidents assigned to you</p>
        </div>

        <div v-for="incident in assignedIncidents" :key="incident.id" class="bg-white dark:bg-gray-800 rounded p-4 shadow hover:shadow-lg transition">
          <h3 class="text-lg font-bold">{{ incident.title }}</h3>
          <div class="flex items-center mt-1">
            <span class="inline-block w-3 h-3 rounded-full mr-2"
              :class="{
                'bg-red-500': incident.status === 'open',
                'bg-yellow-500': incident.status === 'accepted',
                'bg-orange-500': incident.status === 'in_progress',
                'bg-green-500': incident.status === 'resolved'
              }"></span>
            <p class="capitalize">{{ incident.status.replace('_', ' ') }}</p>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Reported by: {{ incident.userName || 'Unknown' }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(incident.createdAt) }}</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <button @click="showIncidentOnMap(incident)"
              class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition">
              Show on Map
            </button>
            <button v-if="incident.status === 'open'" @click="updateStatus(incident.id, 'accepted')"
              class="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition">
              Accept
            </button>
            <button v-if="['open', 'accepted'].includes(incident.status)" @click="updateStatus(incident.id, 'in_progress')"
              class="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 transition">
              Start Progress
            </button>
            <button v-if="['in_progress', 'accepted'].includes(incident.status)" @click="updateStatus(incident.id, 'resolved')"
              class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition">
              Resolve
            </button>
          </div>
        </div>
      </div>

      <!-- Map View -->
      <div class="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <h2 class="text-xl font-semibold mb-2">🗺️ Incident Location</h2>
        <div id="map" class="w-full h-96 rounded border border-gray-200 dark:border-gray-700"></div>
        <div v-if="selectedIncident" class="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
          <h3 class="font-medium">{{ selectedIncident.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-300">{{ selectedIncident.description || 'No description' }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ selectedIncident.location?.address || 'Address not specified' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Navigation (Only visible on mobile) -->
    <!-- <MobileNav /> -->
<div class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
    <!--
        <router-link 
          to="/dashboard" 
          class="flex flex-col items-center p-2 text-blue-600 dark:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400"
          exact-active-class="text-blue-600 dark:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span class="text-xs mt-1">Dashboard</span>
        </router-link>
        
        <router-link 
          to="/incidents" 
          class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <span class="text-xs mt-1">Incidents</span>
        </router-link>
        
        <router-link 
          to="/map" 
          class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="text-xs mt-1">Map</span>
        </router-link>
        
        <router-link 
          to="/profile" 
          class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="text-xs mt-1">Profile</span>
        </router-link>
      </div>  -->
      
  
    <div class="flex justify-around items-center p-2">
      <router-link 
        to="/dashboard" 
        class="flex flex-col items-center p-2"
        :class="{
          'text-blue-600 dark:text-blue-400': $route.path === '/dashboard',
          'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400': $route.path !== '/dashboard'
        }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <span class="text-xs mt-1">Dashboard</span>
      </router-link>
      
      <router-link 
        to="/incidents" 
        class="flex flex-col items-center p-2"
        :class="{
          'text-blue-600 dark:text-blue-400': $route.path === '/incidents',
          'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400': $route.path !== '/incidents'
        }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <span class="text-xs mt-1">Incidents</span>
      </router-link>
      
      <router-link 
        to="/map" 
        class="flex flex-col items-center p-2"
        :class="{
          'text-blue-600 dark:text-blue-400': $route.path === '/map',
          'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400': $route.path !== '/map'
        }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span class="text-xs mt-1">Map</span>
      </router-link>
      
      <router-link 
        to="/profile" 
        class="flex flex-col items-center p-2"
        :class="{
          'text-blue-600 dark:text-blue-400': $route.path === '/profile',
          'text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400': $route.path !== '/profile'
        }"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
        <span class="text-xs mt-1">Profile</span>
      </router-link>
    </div>
  </div>

</div>
  
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { db } from '../services/firebase'
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MobileNav from '../components/MobileNav.vue';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
})

const user = ref(JSON.parse(localStorage.getItem('psers_user')))
const assignedIncidents = ref([])
const selectedIncident = ref(null)
const map = ref(null)
const marker = ref(null)
const loading = ref(true)

const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown'
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleString()
  } catch (e) {
    return 'Invalid date'
  }
}

const initMap = () => {
  const defaultLat = 9.145
  const defaultLng = 40.4897
  map.value = L.map('map').setView([defaultLat, defaultLng], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value)
}

const showIncidentOnMap = (incident) => {
  if (!incident?.location?.lat || !incident?.location?.lng) {
    alert('No location data for this incident')
    return
  }

  selectedIncident.value = incident
  const latLng = [incident.location.lat, incident.location.lng]

  if (map.value) {
    map.value.setView(latLng, 15)

    if (marker.value) {
      map.value.removeLayer(marker.value)
    }

    marker.value = L.marker(latLng).addTo(map.value)
      .bindPopup(`<b>${incident.title}</b><br>Status: ${incident.status}`)
      .openPopup()
  }
}

const updateStatus = async (incidentId, newStatus) => {
  loading.value = true
  try {
    await updateDoc(doc(db, 'incidents', incidentId), {
      status: newStatus,
      updatedAt: new Date()
    })
  } catch (err) {
    console.error('Status update failed:', err)
  } finally {
    loading.value = false
  }
}

const loadAssignedIncidents = () => {
  const q = query(
    collection(db, 'incidents'),
    where('assignedTo', '==', user.value?.uid || '')
  )

  const unsubscribe = onSnapshot(q, (snapshot) => {
    assignedIncidents.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    if (assignedIncidents.value.length && !selectedIncident.value) {
      showIncidentOnMap(assignedIncidents.value[0])
    }
    loading.value = false
  }, (error) => {
    console.error('Error loading incidents:', error)
    loading.value = false
  })

  return unsubscribe
}

let unsubscribeListener = null

onMounted(() => {
  initMap()
  unsubscribeListener = loadAssignedIncidents()
})

onBeforeUnmount(() => {
  if (unsubscribeListener) unsubscribeListener()
  if (map.value) map.value.remove()
})
</script>

<style>
.leaflet-container {
  background-color: #f9fafb;
}
.dark .leaflet-container {
  background-color: #1f2937;
}
</style>