<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const error = ref(null)
const loading = ref(false)
const showPassword = ref(false) // Add this line for password visibility toggle

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = null

    if (!form.value.email || !form.value.password) {
      throw new Error('Please fill in all fields')
    }

    await authStore.login(form.value)

    if (!authStore.user) {
      throw new Error('No user returned after login')
    }

    const roleRoutes = {
      admin: '/admin',
      commander: '/commander',
      user: '/user',
      police: 'police'
    }

    const redirectPath = roleRoutes[authStore.user.role] || '/user'
    router.push(redirectPath)
  } catch (err) {
    error.value = err.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 h-screen">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 pt-10">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img src="/SafeEthio.png" class="mr-4 h-14 sm:h-20" alt="Flowbite Logo" />
        PSERS - LOGIN
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Log in to your account
          </h1>

          <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email" name="email" id="email" v-model="form.email"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="you@example.com" required>
            </div>
            <div class="relative">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input :type="showPassword ? 'text' : 'password'" name="password" id="password" v-model="form.password"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="••••••••" required>
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-2.5 bottom-2.5 p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>

            <button type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :disabled="loading">
              <span v-if="loading">Logging in...</span>
              <span v-else>Log in</span>
            </button>

            <div v-if="error"
              class="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
              {{ error }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>