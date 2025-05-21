import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  { 
    path: '/', 
    component: () => import('../views/Home.vue'),
    meta: { public: true }
  },
  { 
    path: '/login', 
    component: () => import('../views/Login.vue'),
    meta: { public: true, guestOnly: true }
  },
  { 
    path: '/register', 
    component: () => import('../views/Register.vue'),
    meta: { public: true, guestOnly: true }
  },
  { 
    path: '/logout', 
    component: () => import('../views/Logout.vue'),
    meta: { requiresAuth: true }
  },

  {
    path: '/police',
    component: () => import('../dashboards/PoliceDashboard.vue'),
    meta: { requiresAuth: true, role: 'police' }
  },  
  // Admin dashboard

  // {
  //   path: '/admin',
  //   redirect: '/commander'
  // },

  // Commander Dashboard - all routes use the same layout component
  { 
    path: '/commander', 
    component: () => import('../dashboards/CommanderDashboard.vue'),
    meta: { requiresAuth: true, role: 'commander' }
  },
  { 
    path: '/commander/incidents', 
    component: () => import('../dashboards/CommanderDashboard.vue'),
    meta: { requiresAuth: true, role: 'commander' }
  },
  { 
    path: '/commander/polices', 
    component: () => import('../dashboards/CommanderDashboard.vue'),
    meta: { requiresAuth: true, role: 'commander' }
  },

  // User Emergency Dashboard
  { 
    path: '/user', 
    component: () => import('../dashboards/UserEmergency.vue'),
    meta: { requiresAuth: true, role: 'user', showNavbar:false }
  },

  // Admin sub-routes
  // { 
  //   path: '/admin', 
  //   component: () => import('../dashboards/AdminDashboard.vue'),
  //   meta: { requiresAuth: true, role: 'admin' }
  // },
  // { 
  //   path: '/user-accounts', 
  //   component: () => import('../dashboards/AdminDashboard.vue'),
  //   meta: { requiresAuth: true, role: 'admin' }
  // },
  // { 
  //   path: '/commander-accounts', 
  //   component: () => import('../dashboards/AdminDashboard.vue'),
  //   meta: { requiresAuth: true, role: 'admin' }
  // },
  // { 
  //   path: '/system-settings', 
  //   component: () => import('../views/SystemSettings.vue'),
  //   meta: { requiresAuth: true, role: 'admin' }
  // }

  {
    path: '/admin',
    component: () => import('../dashboards/AdminDashboard.vue'),
    meta: { requiresAuth: true, role: 'admin', showNavbar:false },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', component: () => import('../dashboards/AdminDashboard.vue') },
      { path: 'users', component: () => import('../dashboards/AdminDashboard.vue') },
      { path: 'police', component: () => import('../dashboards/AdminDashboard.vue') },
      { path: 'incidents', component: () => import('../dashboards/AdminDashboard.vue') },
      { path: 'settings', component: () => import('../dashboards/AdminDashboard.vue') },
      { path: 'reports', component: () => import('../dashboards/AdminDashboard.vue') }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const user = authStore.user

  if (to.meta.requiresAuth && !user) {
    return '/login'
  }

  if (to.meta.guestOnly && user) {
    return user.role === 'admin' ? '/admin'
         : user.role === 'commander' ? '/commander'
         : '/user'
  }

  if (to.meta.requiresAuth && to.meta.role && user?.role !== to.meta.role) {
    return user.role === 'admin' ? '/admin'
         : user.role === 'commander' ? '/commander'
         : '/user'
  }
})

export default router