<script setup>
import { onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

// ✅ Import Flowbite initializer
import { initFlowbite } from 'flowbite'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  initFlowbite()

  // Force dark mode
  document.documentElement.classList.add('dark')
  localStorage.setItem('flowbite-theme-mode', 'dark')
})

// ✅ Re-initialize Flowbite on route changes
watch(route, () => {
  setTimeout(() => initFlowbite(), 50)
})
</script>

<template>
  <div>
    <Navbar v-if="route.meta.showNavbar !== false" />
    <router-view />
    <Footer />
  </div>
</template>
