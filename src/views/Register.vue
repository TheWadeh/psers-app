<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
        PSERS - REGISTER
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create an account
          </h1>

          <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-6">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
              <input v-model="form.name" type="text" id="name" required
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input v-model="form.email" type="email" id="email" required
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
              <input v-model="form.location" type="text" id="location" required
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input v-model="form.password" type="password" id="password" required
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <label for="role" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
              <select v-model="form.role" id="role"
                class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="user">User</option>
                <option value="commander">Commander</option>
                <option value="police">Police</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button :disabled="loading" type="submit"
              class="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-sm px-5 py-2.5">
              <span v-if="loading">Creating account...</span>
              <span v-else>Create account</span>
            </button>

            <div v-if="error" class="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">
              {{ error }}
            </div>

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link to="/login" class="font-medium text-primary-600 hover:underline dark:text-blue-500">
                Login here
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  location: '',
  role: 'user' // default role
})

const error = ref(null)
const loading = ref(false)

const handleRegister = async () => {
  try {
    loading.value = true
    error.value = null

    const userPayload = { ...form.value }

    await authStore.register(userPayload)

    const roleRoutes = {
      admin: '/admin',
      commander: '/commander',
      police: '/police', // Addded police
      user: '/user'
    }

    const redirectPath = roleRoutes[authStore.user.role] || '/user'
    router.push(redirectPath)
  } catch (err) {
    error.value = err.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
