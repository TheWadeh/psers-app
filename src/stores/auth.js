// src/stores/auth.js
import { defineStore } from 'pinia'
import { registerUser, loginUser, logoutUser } from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null
  }),
  actions: {
    async login(data) {
      const user = await loginUser(data)
      this.setUser(user)
    },
    async register(data) {
      const user = await registerUser(data)
      this.setUser(user)
    },
    logout() {
      logoutUser()
      this.user = null
      localStorage.removeItem('user')
    },
    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  }
})

const getDashboardRoute = (role) => {
  switch (role) {
    case 'admin':
      return '/admin'
    case 'commander':
      return '/commander'
    case 'police':
      return '/police'
    case 'user':
      return '/user'
    default:
      return '/'
  }
}
