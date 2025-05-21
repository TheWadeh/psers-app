<template>
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
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
  </template>
  
  <script setup>
  // No script needed for this component
  </script>