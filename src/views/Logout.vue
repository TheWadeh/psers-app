<template>
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen">
        <div class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Are you sure you want to log out?
            </h1>
  
            <div class="flex justify-center gap-4 mt-6">
              <button
                @click="handleLogout"
                class="w-1/2 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                :disabled="loading"
              >
                <span v-if="loading">Logging out...</span>
                <span v-else>Yes, Log Out</span>
              </button>
  
              <router-link
                to="/"
                class="w-1/2 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Cancel
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/auth'
  import { ref } from 'vue'
  
  const router = useRouter()
  const authStore = useAuthStore()
  const loading = ref(false)
  
  const handleLogout = async () => {
    try {
      loading.value = true
      authStore.logout()
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      loading.value = false
    }
  }
  </script>
  