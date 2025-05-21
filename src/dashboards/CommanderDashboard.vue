<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <router-link to="/" class="flex items-center justify-between mr-4">
            <img 
              src="/SafeEthio.png" 
              class="mr-4 h-14 sm:h-20" 
              alt="Flowbite Logo" 
            />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Commander</span>
          </router-link>
        </div>
        <div class="flex items-center lg:order-2">
          <button
            v-if="user.role === 'Commander'"
            type="button"
            class="flex mx-3 text-sm bg-blue-700 text-white rounded-lg px-4 py-2 md:mr-0 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-600"
            @click="openAssignModal"
          >
            Assign Incident
          </button>
          <div class="relative">
            <button
              type="button"
              class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              @click="toggleProfileDropdown"
              aria-expanded="false"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="w-8 h-8 rounded-full"
                :src="user.photoURL || 'https://placehold.co/400'"
                alt="user photo"
              />
            </button>
            <div
              v-show="showProfileDropdown"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 dark:bg-gray-700"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <div class="px-4 py-2">
                <p class="text-sm text-gray-700 dark:text-gray-200">Logged in as</p>
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">{{ user.displayName || user.email }}</p>
              </div>
              <div class="border-t border-gray-200 dark:border-gray-600"></div>
              <router-link to="/logout">
              <button
                
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                role="menuitem"
              >
                Sign out
              </button>
            </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <aside
      class="fixed left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      style="top: 80px;"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/commander"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              active-class="bg-gray-100 dark:bg-gray-700"
              exact-active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
              <span class="ml-3">Dashboard</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/commander/incidents"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a1 1 0 010 2H4a1 1 0 110-2zm9 0h3a1 1 0 010 2h-3a1 1 0 110-2zm-9 3h3a1 1 0 010 2H4a1 1 0 110-2zm9 0h3a1 1 0 010 2h-3a1 1 0 110-2zm-9 3h3a1 1 0 010 2H4a1 1 0 110-2zm9 0h3a1 1 0 010 2h-3a1 1 0 110-2zm-9 3h3a1 1 0 010 2H4a1 1 0 110-2zm9 0h3a1 1 0 010 2h-3a1 1 0 110-2z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3">Incidents</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/commander/polices"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                aria-hidden="true"
                class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.792.832 1.846.832 2.946a1.532 1.532 0 01-.948 2.286c-1.56.38-1.56 2.6 0 2.98a1.532 1.532 0 01.948 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.946.832c.792.54 1.846.832 2.946.832a1.532 1.532 0 012.287-.948c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.832-2.946c1.56-.38 1.56-2.6 0-2.98a1.532 1.532 0 01-.948-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.946-.832c-.792-.54-1.846-.832-2.946-.832zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3">Polices</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>

    <main class="pb-4 md:ml-64 h-auto pt-20">
      <!-- <router-view v-if="$route.path !== '/commander'"></router-view> -->
      
      
      <template v-if="$route.path === '/commander'">
        <section class="py-4 px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
              <svg class="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Open Incidents</h3>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ incidentStatuses.open }}</p>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
              <svg class="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Assigned Officers</h3>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ assignedOfficers }}</p>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
              <svg class="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Units on Map</h3>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ activeUnits }}</p>
              </div>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
              <svg class="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              <div>
                <h3 class="text-sm font-medium text-gray-900 dark:text-white">Completed Incidents</h3>
                <p class="text-lg font-bold text-gray-900 dark:text-white">{{ incidentStatuses.resolved }}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="py-4 px-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Incidents</h3>
              <router-link to="/commander/incidents" class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">View All</router-link>
            </div>
            <div v-for="incident in recentIncidents" :key="incident.id" class="mb-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg
                    v-if="incident.status === 'open'"
                    class="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="incident.status === 'in-progress'"
                    class="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    v-else-if="incident.status === 'resolved'"
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3 3a1 1 0 00-1.414-1.414L10 9.586l-1.293-1.293a1 1 0 001.414-1.414l3 3a1 1 0 001.414 1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div class="ml-3 flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ incident.title }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Reported by: {{ incident.userName || 'Unknown' }}</p>
                </div>
                <div class="flex space-x-2">
                  <button 
                    @click="openAssignModal(incident.id)"
                    class="text-xs bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded transition-colors"
                  >
                    Assign
                  </button>
                  <button 
                    @click="discardIncident(incident.id)"
                    class="text-xs bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded transition-colors"
                  >
                    Discard
                  </button>
                </div>
              </div>
              <div class="mt-1 ml-8 text-xs text-gray-500 dark:text-gray-400">
                {{ formatDate(incident.createdAt) }}
                <span v-if="incident.location" class="ml-2">
                  <svg class="w-3 h-3 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                  </svg>
                  {{ incident.location.address || 'Location available' }}
                </span>
              </div>
            </div>
            <div v-if="recentIncidents.length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
              No recent incidents
            </div>
          </div>

          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Available Polices</h3>
              <router-link to="/commander/polices" class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">View All</router-link>
            </div>
            <div v-for="officer in availableOfficers" :key="officer.id" class="mb-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <img class="w-8 h-8 rounded-full" :src="officer.photoURL || 'https://ui-avatars.com/api/?name='+officer.name" :alt="officer.name">
                </div>
                <div class="ml-3 flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ officer.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ officer.email }}</p>
                </div>
                <div>
                  <span class="text-xs px-2 py-1 rounded-full" 
                        :class="{
                          'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200': officer.status === 'available',
                          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200': officer.status === 'assigned',
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300': !officer.status
                        }">
                    {{ officer.status || 'unknown' }}
                  </span>
                </div>
              </div>
            </div>
            <div v-if="availableOfficers.length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
              No available officers
            </div>
          </div>
        </section>

        <section class="py-8 md:py-16 px-4">
          <div class="mx-auto grid max-w-screen-xl pb-8 md:grid-cols-12 lg:gap-12 lg:pb-16 xl:gap-0">
            <div class="content-center justify-self-start md:col-span-7">
              <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">
                Emergency Alert<br />
                <span class="text-3xl">
                  <span class="text-blue-600" v-if="emergencyUser">{{ emergencyUser.name }}</span> is in trouble.
                </span>
              </h1>
              <p class="mb-4 max-w-2xl text-gray-500 dark:text-gray-400 md:mb-12 md:text-lg lg:mb-5 lg:text-xl">
                <span class="text-blue-500" v-if="emergencyUser">{{ emergencyUser.name }}</span> has triggered an emergency alert at {{ emergencyLocation?.address || 'unknown location' }}. Immediate assistance is required.
              </p>
              <div class="flex flex-wrap gap-4">
                <a
                  :href="`tel:${assignedOfficerPhone}`"
                  class="inline-flex items-center rounded-lg bg-blue-700 px-6 py-3.5 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                  Call {{ assignedOfficerPhone ? 'Assigned Police' : 'Emergency' }} ({{ assignedOfficerPhone || '-' }})
                </a>
                <button
                  @click="refreshMap"
                  class="inline-flex items-center rounded-lg bg-gray-700 px-6 py-3.5 text-center font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
                  </svg>
                  Refresh Map
                </button>
              </div>
            </div>
            <div class="md:col-span-5">
              <div id="map" class="w-full h-[300px] rounded-lg border border-gray-200 dark:border-gray-600 shadow-md"></div>
            </div>
          </div>
        </section>

        <section class="py-4 px-4">
          <div class="flex flex-wrap gap-4">
            <button
              v-if="user.role === 'Commander'"
              @click="openCreateIncidentModal"
              class="inline-flex items-center rounded-lg bg-blue-700 px-6 py-3.5 text-center font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
              </svg>
              Create Incident
            </button>
            <router-link 
              to="/commander/incidents"
              class="inline-flex items-center rounded-lg bg-gray-700 px-6 py-3.5 text-center font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
              </svg>
              View All Incidents
            </router-link>
          </div>
        </section>
      </template>

      <template v-else-if="$route.path === '/commander/incidents'">
        <CommanderIncidents/>
      </template>

      <template v-else-if="$route.path === '/commander/polices'">
       <CommanderPolices/>
      </template>
    </main>

    <div
      v-if="showAssignModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      id="assign-incident-modal"
      @click.self="closeAssignModal"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Assign Incident</h3>
          <button
            @click="closeAssignModal"
            class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <form>
          <div class="mb-4">
            <label for="incident-select" class="block text-sm font-medium text-gray-900 dark:text-white">
              Select Incident
            </label>
            <select
              id="incident-select"
              v-model="selectedIncident"
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select an incident</option>
              <option v-for="incident in unassignedIncidents" :key="incident.id" :value="incident.id">
                {{ incident.title }} ({{ incident.userName || 'Unknown' }})
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="officer-select" class="block text-sm font-medium text-gray-900 dark:text-white">
              Select Officer
            </label>
            <select
              id="officer-select"
              v-model="selectedOfficer"
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select an officer</option>
              <option v-for="officer in availableOfficers" :key="officer.id" :value="officer.id">
                {{ officer.name }} ({{ officer.status }})
              </option>
            </select>
          </div>
          <button
            type="button"
            @click="assignIncident"
            class="w-full rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Assign Incident
          </button>
        </form>
      </div>
    </div>

    <div
      v-if="showCreateIncidentModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      id="create-incident-modal"
      @click.self="closeCreateIncidentModal"
    >
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Create Incident</h3>
          <button
            @click="closeCreateIncidentModal"
            class="text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              class="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <form @submit.prevent="createIncident">
          <div class="mb-4">
            <label for="incident-title" class="block text-sm font-medium text-gray-900 dark:text-white">
              Incident Title
            </label>
            <input
              id="incident-title"
              v-model="incidentTitle"
              type="text"
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter incident title"
              required
            />
          </div>
          <div class="mb-4">
            <label for="incident-description" class="block text-sm font-medium text-gray-900 dark:text-white">
              Description (Optional)
            </label>
            <textarea
              id="incident-description"
              v-model="incidentDescription"
              rows="3"
              class="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter incident description"
            ></textarea>
          </div>
          <button
            type="submit"
            class="w-full rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Create Incident
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Chart, PieController, ArcElement, Legend, Tooltip } from 'chart.js'
import { 
  collection, 
  doc, 
  getDocs, 
  onSnapshot, 
  addDoc, 
  updateDoc,
  deleteDoc,
  serverTimestamp, 
  query, 
  where,
  orderBy,
  limit
} from 'firebase/firestore'
import { db } from '../services/firebase'
import { getAuth, signOut as firebaseSignOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import CommanderIncidents from '../dashboards/CommanderIncidents.vue'
import CommanderPolices from '../dashboards/CommanderPolices.vue'

// Chart.js registration
Chart.register(PieController, ArcElement, Legend, Tooltip)

// Leaflet icon fix
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Router
const router = useRouter()

// Refs
const map = ref(null)
const mapMarkers = ref([])
const auth = getAuth()
const user = ref({
  uid: auth.currentUser?.uid,
  email: auth.currentUser?.email,
  displayName: auth.currentUser?.displayName,
  photoURL: auth.currentUser?.photoURL,
  role: 'Commander' // This should come from your user data in Firestore
})

const emergencyUser = ref(null)
const emergencyLocation = ref(null)
const assignedOfficerPhone = ref('911')

const officers = ref([])
const incidents = ref([])
const recentIncidents = ref([])
const policeOffices = ref([])

const showProfileDropdown = ref(false)
const showAssignModal = ref(false)
const showCreateIncidentModal = ref(false)

const selectedOfficer = ref('')
const selectedIncident = ref('')
const selectedOffice = ref('')
const incidentTitle = ref('')
const incidentDescription = ref('')

// Computed properties
const totalIncidents = computed(() => incidents.value.length)
const assignedOfficers = computed(() => officers.value.filter(o => o.status === 'assigned').length)
const activeUnits = computed(() => officers.value.filter(o => o.status === 'assigned').length)
const availableOfficers = computed(() => officers.value.filter(o => o.status === 'available'))
const unassignedIncidents = computed(() => incidents.value.filter(i => i.status === 'open' && !i.assignedTo))
const incidentStatuses = computed(() => {
  return {
    open: incidents.value.filter(i => i.status === 'open').length,
    inProgress: incidents.value.filter(i => i.status === 'in-progress').length,
    resolved: incidents.value.filter(i => i.status === 'resolved').length,
  }
})

const isDarkMode = computed(() => document.documentElement.classList.contains('dark'))

// Methods
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value
}

const signOut = async () => {
  try {
    await firebaseSignOut(auth)
    router.push('/')
  } catch (error) {
    console.error('Error signing out:', error)
  }
}

const fetchDynamicData = async () => {
  try {
    // Fetch officers with role 'police'
    const officersQuery = query(collection(db, 'users'), where('role', '==', 'police'))
    const officersSnap = await getDocs(officersQuery)
    officers.value = officersSnap.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      status: doc.data().status || 'available'
    }))

    // Fetch police offices (if needed)
    const officesSnap = await getDocs(collection(db, 'policeOffices'))
    policeOffices.value = officesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (err) {
    console.error('Failed to fetch data:', err)
  }
}

const listenForIncidents = () => {
  const incidentsQuery = query(
    collection(db, 'incidents'),
    orderBy('createdAt', 'desc'),
    limit(10)
  )
  
  onSnapshot(incidentsQuery, (snapshot) => {
    const fetchedIncidents = []
    snapshot.forEach((doc) => {
      fetchedIncidents.push({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })
    })
    
    incidents.value = fetchedIncidents
    recentIncidents.value = fetchedIncidents.slice(0, 5) // Get most recent 5
    
    // Check for emergency incidents
    const emergencyIncident = fetchedIncidents.find(i => i.isEmergency)
    if (emergencyIncident) {
      emergencyUser.value = {
        name: emergencyIncident.userName,
        id: emergencyIncident.userId,
        phone: emergencyIncident.userPhone
      }
      emergencyLocation.value = emergencyIncident.location
      
      // Find assigned officer if any
      if (emergencyIncident.assignedTo) {
        const officer = officers.value.find(o => o.id === emergencyIncident.assignedTo)
        if (officer) {
          assignedOfficerPhone.value = officer.phone || '911'
        }
      }
      
      updateMap(emergencyIncident.location)
    }
  })
}

const updateMap = (location) => {
  if (!map.value) return
  
  // Clear existing markers
  mapMarkers.value.forEach(marker => {
    map.value.removeLayer(marker)
  })
  mapMarkers.value = []
  
  if (location && location.lat && location.lng) {
    // Set view to emergency location
    map.value.setView([location.lat, location.lng], 15)
    
    // Add marker for emergency location
    const marker = L.marker([location.lat, location.lng])
      .addTo(map.value)
      .bindPopup('Emergency Location')
      .openPopup()
    
    mapMarkers.value.push(marker)
  } else {
    // Default view if no emergency location
    const defaultLat = 9.1450 // Example default latitude (Adama)
    const defaultLon = 40.4897 // Example default longitude (Adama)
    map.value.setView([defaultLat, defaultLon], 13)
  }
}

const initializeMap = () => {
  const defaultLat = 9.1450 // Example default latitude (Adama)
  const defaultLon = 40.4897 // Example default longitude (Adama)
  map.value = L.map('map').setView([defaultLat, defaultLon], 13)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(map.value)
}

const refreshMap = () => {
  if (emergencyLocation.value && emergencyLocation.value.lat && emergencyLocation.value.lng) {
    updateMap(emergencyLocation.value)
  } else {
    initializeMap()
  }
}

const openAssignModal = (incidentId = null) => {
  selectedIncident.value = incidentId || ''
  selectedOfficer.value = ''
  showAssignModal.value = true
}

const closeAssignModal = () => {
  showAssignModal.value = false
  selectedOfficer.value = ''
  selectedIncident.value = ''
}

const openCreateIncidentModal = () => {
  incidentTitle.value = ''
  incidentDescription.value = ''
  showCreateIncidentModal.value = true
}

const closeCreateIncidentModal = () => {
  showCreateIncidentModal.value = false
}

const assignIncident = async () => {
  if (!selectedIncident.value || !selectedOfficer.value) {
    console.error('Please select both incident and officer')
    return
  }

  try {
    // Update incident with assigned officer
    const incidentRef = doc(db, 'incidents', selectedIncident.value)
    await updateDoc(incidentRef, {
      assignedTo: selectedOfficer.value,
      status: 'in-progress',
      assignedAt: serverTimestamp()
    })

    // Update officer status
    const officerRef = doc(db, 'users', selectedOfficer.value)
    await updateDoc(officerRef, {
      status: 'assigned'
    })

    closeAssignModal()
  } catch (error) {
    console.error('Error assigning incident:', error)
  }
}

const discardIncident = async (incidentId) => {
  if (!confirm('Are you sure you want to discard this incident?')) return
  
  try {
    await deleteDoc(doc(db, 'incidents', incidentId))
  } catch (error) {
    console.error('Error discarding incident:', error)
  }
}

const createIncident = async () => {
  if (!incidentTitle.value) return

  try {
    await addDoc(collection(db, 'incidents'), {
      title: incidentTitle.value,
      description: incidentDescription.value,
      createdAt: serverTimestamp(),
      status: 'open',
      assignedTo: null,
      reportedBy: user.value.uid,
      userName: user.value.displayName || 'Commander',
      isEmergency: false
    })
    closeCreateIncidentModal()
  } catch (err) {
    console.error('Failed to create incident:', err)
  }
}

const formatDate = (date) => {
  if (!date) return 'Unknown time'
  return new Date(date).toLocaleString()
}

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    closeAssignModal()
    closeCreateIncidentModal()
    showProfileDropdown.value = false
  }
}

const handleClickOutside = (e) => {
  if (showProfileDropdown.value && !e.target.closest('#user-menu-button')) {
    showProfileDropdown.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await fetchDynamicData()
  initializeMap()
  listenForIncidents()
  window.addEventListener('keydown', handleEscape)
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  window.removeEventListener('click', handleClickOutside)
  
  // Clean up map markers
  if (map.value) {
    mapMarkers.value.forEach(marker => {
      map.value.removeLayer(marker)
    })
    map.value.remove()
  }
})
</script>