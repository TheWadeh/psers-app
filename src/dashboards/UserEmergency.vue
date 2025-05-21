<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <!-- Top Navigation Bar (Visible on all devices) -->
    <nav class="bg-white border-b border-gray-200 px-4 py-4 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
         
          <img src="/SafeEthio.png" class="mr-3 h-14 sm:h-12" alt="Flowbite Logo" />
          <router-link to="/" class="flex items-center justify-between mr-4">
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-gray-700" >PSERS</span>
          </router-link>
        </div>
        <div class="flex items-center lg:order-2">
          <button
            type="button"
            class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="https://placehold.co/400"
              alt="user photo"
            />
          </button>
          <div
            class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
            id="dropdown"
          >
            <div class="py-3 px-4">
              <span class="block text-sm font-semibold text-gray-900 dark:text-white">
                {{ authStore.user?.name || 'User' }}
              </span>
              <span class="block text-sm text-gray-900 truncate dark:text-white">
                {{ authStore.user?.email || 'No email' }}
              </span>
            </div>
            <ul class="py-1 text-gray-700 dark:text-gray-300" aria-labelledby="dropdown">
              <li>
                <button
                  @click="handleLogout"
                  class="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="pt-24 pb-20 px-4 mx-auto max-w-screen-xl text-center h-screen lg:py-16 lg:px-12 flex flex-col align-center justify-center">
      <!-- Mobile-only content (Register section) -->
     

      <!-- Emergency Help Section -->
      <h1 class="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        ⚠️ Emergency Legal Help
      </h1>
      <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        If you're facing an urgent legal issue (arrest, threat, or danger), click below to request immediate assistance.
      </p>
      <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <button
          @click="triggerEmergency"
          :disabled="loading"
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          {{ loading ? 'Sending Emergency...' : '🆘 Get Emergency Help Now' }}
        </button>
      </div>
    </div>

    <!-- Mobile Bottom Navigation (Only visible on mobile) -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
      <div class="flex justify-around items-center p-2">
        <router-link 
          to="/" 
          class="flex flex-col items-center p-2 text-blue-600 dark:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400"
          exact-active-class="text-blue-600 dark:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          <span class="text-xs mt-1">Home</span>
        </router-link>
        
        <router-link 
          to="/emergency" 
          class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <span class="text-xs mt-1">Reports</span>
        </router-link>
        
        <router-link 
          to="/services" 
          class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          active-class="text-blue-600 dark:text-blue-400"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <span class="text-xs mt-1">History</span>
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
      </div>
    </div>

    <!-- Confirmation Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 max-w-md w-full">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">🚨 Emergency Assistance Activated</h3>
        <p class="mb-4 text-gray-800 dark:text-gray-200">Help is on the way! We've alerted the local authorities and shared your location.</p>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">⚠️ Do not panic. Keep your phone accessible and stay in a safe place.</p>
        <button @click="showModal = false" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">I Understand</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../services/firebase'

const authStore = useAuthStore()
const router = useRouter()

const loading = ref(false)
const showModal = ref(false)

const triggerEmergency = async () => {
  loading.value = true
  try {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      await addDoc(collection(db, 'incidents'), {
        userId: authStore.user.uid,
        userName: authStore.user.name,
        location: {
          lat: latitude,
          lng: longitude,
        },
        status: 'open',
        assignedTo: null,
        reportedBy: authStore.user.uid,
        createdAt: serverTimestamp(),
      })
      loading.value = false
      showModal.value = true
    }, (error) => {
      console.error('Geolocation error:', error)
      loading.value = false
    })
  } catch (err) {
    console.error('Emergency failed:', err)
    loading.value = false
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>