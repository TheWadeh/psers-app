<template>
  <header>
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-4 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <router-link to="/" class="flex items-center">
          <img
            src="/SafeEthio.png"
            class="mr-4 h-14 sm:h-20"
            alt="Flowbite Logo"
          />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            PSERS
          </span>
        </router-link>

        <div class="flex items-center lg:order-2">
          <template v-if="authStore.user">
            <router-link
              :to="getDashboardRoute()"
              class="text-gray-800 dark:text-white mr-4 text-sm font-medium hover:underline cursor-pointer"
            >
              {{ authStore.user.name || authStore.user.role }}
            </router-link>
            <router-link
              to="/logout"
              class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Logout
            </router-link>
          </template>

          <template v-else>
            <router-link
              to="/login"
              class="text-gray-800 border-2 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-4 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Log in
            </router-link>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const getDashboardRoute = () => {
  // Assuming your user object in the authStore has a 'role' property
  // that determines which dashboard to navigate to.
  if (authStore.user && authStore.user.role) {
    switch (authStore.user.role.toLowerCase()) {
      case 'admin':
        return '/admin/dashboard';
      case 'user':
        return '/user';
      case 'commander':
        return '/commander';
      case 'police':
        return '/police';
      // Add more cases for different roles and their dashboard routes
      default:
        return '/'; // Or some default dashboard
    }
  }
  return '/'; // Default if no user or role is available
}
</script>