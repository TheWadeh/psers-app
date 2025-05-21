<template>
  <div class="antialiased bg-gray-50 dark:bg-gray-900">
    <!-- Navbar -->
    <nav
      class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50"
    >
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            @click="toggleSidebar"
          >
            <svg
              v-if="!isSidebarOpen"
              aria-label="Menu"
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
            <svg
              v-else
              aria-label="Close"
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
            <span class="sr-only">Toggle sidebar</span>
          </button>
          <router-link to="/admin" class="flex items-center justify-between mr-4 ">
            <img 
            src="/SafeEthio.png" 
             class="mr-4 h-14 sm:h-12"
            alt="Flowbite Logo" 
          />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PSERS Admin</span>
          </router-link>
          <form @submit.prevent class="hidden md:block md:pl-2">
            <label for="topbar-search" class="sr-only">Search</label>
            <div class="relative md:w-64">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                @input="searchItems"
                type="text"
                id="topbar-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search users or police..."
              />
            </div>
          </form>
        </div>
        <div class="flex items-center lg:order-2">
          <button
            type="button"
            class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            @click="toggleDropdown"
          >
          
            <span class="sr-only">Open user menu</span>
            <img
              class="w-8 h-8 rounded-full"
              src="https://placehold.co/32"
              alt="user photo"
            />
          </button>
          <div
            v-if="showDropdown"
            class="absolute top-12 right-4 z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
          >
            <div class="py-3 px-4">
              
              <span class="block text-sm font-semibold text-gray-900 dark:text-white">{{ user.name || 'Admin' }}</span>
              <span class="block text-sm text-gray-900 truncate dark:text-white">{{ user.email }}</span>
            </div>
            <ul class="py-1 text-gray-700 dark:text-gray-300">
              <li>
                <router-link
                  to="/admin/users"
                  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    class="mr-2 w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Users List
                </router-link>
              </li>
              <li>
                <router-link
                  to="/admin/police"
                  class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    class="mr-2 w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                    ></path>
                  </svg>
                  Police List>
                </router-link>
              </li>
              <li>
                <router-link to="/logout">
                  <button
                  class="block w-full text-left py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                  </button>
              </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar -->
    <aside
      :class="{
        'fixed left-0 z-40 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700': true,
        '-translate-x-full': !isSidebarOpen,
        'md:translate-x-0': true
      }"
      style="top: 60px;"
      id="drawer-navigation"
    >
      <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800 z-auto">
        <ul class="space-y-2">
          <li>
            <router-link
              to="/admin/dashboard"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-500"
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
              to="/admin/users"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-3">Users</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/police"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                ></path>
              </svg>
              <span class="ml-3">Police</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/incidents"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-500"
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
              to="/admin/settings"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-500"
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
              <span class="ml-3">Settings</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/reports"
              class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              active-class="bg-gray-100 dark:bg-gray-700"
            >
              <svg
                class="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                ></path>
                <path
                  d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"
                ></path>
              </svg>
              <span class="ml-3">Reports</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="p-4 md:ml-64 pt-20 min-h-screen">
      <!-- Dashboard Overview -->
      <section v-if="$route.path === '/admin/dashboard'" class="mb-8">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Admin Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
            <svg class="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Total Users</h3>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ stats.totalUsers }}</p>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
            <svg class="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Total Police</h3>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ stats.totalPolices }}</p>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex items-center">
            <svg class="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a1 1 0 010 2H4a1 1 0 110-2zm9 0h3a1 1 0 010 2h-3a1 1 0 110-2zm-9 3h3a1 1 0 010 2H4a1 1 0 110-2zm9 0h3a1 1 0 010 2h-3a1 1 0 110-2zm-9 3h3a1 1 0 010 2H4a1 1 0 110-2zm9 0h3a1 1 0 010 2h-3a1 1 0 110-2zm-9 3h3a1 1 0 010 2H4a1 1 0 110-2zm9 0h3a1 1 0 010 2h-3a1 1 0 110-2z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <h3 class="text-sm font-medium text-gray-900 dark:text-white">Total Incidents</h3>
              <p class="text-lg font-bold text-gray-900 dark:text-white">{{ stats.totalIncidents }}</p>
            </div>
          </div>
        </div>
        <ReportAnalytics/>
      </section>

      <!-- Users Management -->
      <section v-if="$route.path === '/admin/users'" class="mb-8">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Manage Users</h2>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
          <h3 class="text-lg font-semibold mb-2 dark:text-white">Add User</h3>
          <form @submit.prevent="addUser" class="space-y-4">
            <input v-model="newUser.name" placeholder="Name" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            <input v-model="newUser.email" type="email" placeholder="Email" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            <select v-model="newUser.role" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
              <option value="user">User</option>
              <option value="commander">Commander</option>
            </select>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add User</button>
          </form>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 dark:text-white">Users List</h3>
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="u in filteredUsers" :key="u.id" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td class="px-4 py-3">{{ u.name }}</td>
                <td class="px-4 py-3">{{ u.email }}</td>
                <td class="px-4 py-3">{{ u.role }}</td>
                <td class="px-4 py-3 text-right">
                  <button @click="openEditUserModal(u)" class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button @click="deleteUser(u.id)" class="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Police Management -->
      <section v-if="$route.path === '/admin/police'" class="mb-8">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Manage Police</h2>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
          <h3 class="text-lg font-semibold mb-2 dark:text-white">Add Police Officer</h3>
          <form @submit.prevent="addPolice" class="space-y-4">
            <input v-model="newPolice.name" placeholder="Name" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            <input v-model="newPolice.email" type="email" placeholder="Email" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            <input v-model="newPolice.phone" type="tel" placeholder="Phone (optional)" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Police</button>
          </form>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 dark:text-white">Police List</h3>
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="p in filteredPolices" :key="p.id" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td class="px-4 py-3">{{ p.name }}</td>
                <td class="px-4 py-3">{{ p.email }}</td>
                <td class="px-4 py-3">{{ p.phone || '-' }}</td>
                <td class="px-4 py-3">{{ p.status || 'available' }}</td>
                <td class="px-4 py-3 text-right">
                  <button @click="openEditPoliceModal(p)" class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                  <button @click="deletePolice(p.id)" class="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Incidents Oversight -->
      <section v-if="$route.path === '/admin/incidents'" class="mb-8">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">Incidents Overview</h2>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reported By</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="incident in incidents" :key="incident.id" class="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td class="px-4 py-3">{{ incident.title }}</td>
                <td class="px-4 py-3">{{ incident.userName || 'Unknown' }}</td>
                <td class="px-4 py-3">{{ incident.status }}</td>
                <td class="px-4 py-3">{{ formatDate(incident.createdAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- System Settings -->
      <section v-if="$route.path === '/admin/settings'" class="mb-8">
        <h2 class="text-2xl font-bold mb-4 dark:text-white">System Settings</h2>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <form @submit.prevent="updateSettings" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Emergency Contact Number</label>
              <input
                v-model="settings.emergencyContact"
                type="tel"
                class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., 911"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Default Location Address</label>
              <input
                v-model="settings.defaultLocation.address"
                type="text"
                class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Default location address"
              />
            </div>
            <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save Settings</button>
          </form>
        </div>
      </section>

      <!-- Reports -->
      <section v-if="$route.path === '/admin/reports'"  class="mb-8">
        <ReportAnalytics />
        <!-- <h2 class="text-2xl font-bold mb-4 dark:text-white">Reports & Analytics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2 dark:t<ReportAnalytics v-if="$route.path === '/admin/reports'" />ext-white">User Roles Distribution</h3>
            <canvas id="rolesChart" class="w-full h-64"></canvas>
          </div>
          <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold mb-2 dark:text-white">Incident Status Distribution</h3>
            <canvas id="incidentsChart" class="w-full h-64"></canvas>
          </div>
        </div> -->
      </section>

      <!-- Edit User Modal -->
      <div
        v-if="showEditUserModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        @click.self="closeEditUserModal"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <h3 class="text-lg font-semibold mb-4 dark:text-white">Edit User</h3>
          <form @submit.prevent="saveUserEdits" class="space-y-4">
            <input v-model="editUserData.name" placeholder="Name" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            <input v-model="editUserData.email" type="email" placeholder="Email" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            <select v-model="editUserData.role" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
              <option value="user">User</option>
              <option value="commander">Commander</option>
            </select>
            <div class="flex justify-end space-x-2">
              <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save</button>
              <button type="button" @click="closeEditUserModal" class="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">Cancel</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Edit Police Modal -->
      <div
        v-if="showEditPoliceModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        @click.self="closeEditPoliceModal"
      >
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
          <h3 class="text-lg font-semibold mb-4 dark:text-white">Edit Police Officer</h3>
          <form @submit.prevent="savePoliceEdits" class="space-y-4">
            <input v-model="editPoliceData.name" placeholder="Name" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            <input v-model="editPoliceData.email" type="email" placeholder="Email" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" required />
            <input v-model="editPoliceData.phone" type="tel" placeholder="Phone (optional)" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <select v-model="editPoliceData.status" class="border p-2 rounded w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
            </select>
            <div class="flex justify-end space-x-2">
              <button type="submit" class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save</button>
              <button type="button" @click="closeEditPoliceModal" class="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { 
  collection, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc, onSnapshot, query, where, serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { Chart, PieController, ArcElement, Legend, Tooltip } from 'chart.js';
import ReportAnalytics from '../components/ReportAnalytics.vue';

// Register Chart.js components
Chart.register(PieController, ArcElement, Legend, Tooltip);

// Router
const router = useRouter();

// State
const user = ref({ name: '', email: '', role: '', photoURL: '' });
const users = ref([]);
const polices = ref([]);
const incidents = ref([]);
const settings = ref({ emergencyContact: '911', defaultLocation: { address: '' } });
const searchQuery = ref('');
const isSidebarOpen = ref(false);
const showDropdown = ref(false);
const showEditUserModal = ref(false);
const showEditPoliceModal = ref(false);
const editUserData = ref({});
const editPoliceData = ref({});
const newUser = ref({ name: '', email: '', role: 'user' });
const newPolice = ref({ name: '', email: '', phone: '' });

// Computed Stats
const stats = computed(() => ({
  totalUsers: users.value.length,
  totalPolices: polices.value.length,
  totalIncidents: incidents.value.length
}));

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter(u =>
    u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const filteredPolices = computed(() => {
  if (!searchQuery.value) return polices.value;
  return polices.value.filter(p =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const logout = async () => {
  try {
    await firebaseSignOut(auth);
    localStorage.removeItem('psers_admin');
    router.push('/login');
  } catch (error) {
    console.error('Error signing out:', error);
    alert('Failed to sign out.');
  }
};

const searchItems = () => {
  // Search is handled by computed properties
};

const addUser = async () => {
  try {
    await addDoc(collection(db, 'users'), {
      name: newUser.value.name,
      email: newUser.value.email,
      role: newUser.value.role,
      createdAt: serverTimestamp()
    });
    alert('User added successfully!');
    newUser.value = { name: '', email: '', role: 'user' };
  } catch (error) {
    console.error('Error adding user:', error);
    alert('Failed to add user.');
  }
};

const addPolice = async () => {
  try {
    await addDoc(collection(db, 'users'), {
      name: newPolice.value.name,
      email: newPolice.value.email,
      phone: newPolice.value.phone,
      role: 'police',
      status: 'available',
      createdAt: serverTimestamp()
    });
    alert('Police officer added successfully!');
    newPolice.value = { name: '', email: '', phone: '' };
  } catch (error) {
    console.error('Error adding police:', error);
    alert('Failed to add police.');
  }
};

const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return;
  try {
    await deleteDoc(doc(db, 'users', id));
    alert('User deleted successfully!');
  } catch (error) {
    console.error('Error deleting user:', error);
    alert('Failed to delete user.');
  }
};

const deletePolice = async (id) => {
  if (!confirm('Are you sure you want to delete this police officer?')) return;
  try {
    await deleteDoc(doc(db, 'users', id));
    alert('Police officer deleted successfully!');
  } catch (error) {
    console.error('Error deleting police:', error);
    alert('Failed to delete police.');
  }
};

const openEditUserModal = (userData) => {
  editUserData.value = { ...userData };
  showEditUserModal.value = true;
};

const closeEditUserModal = () => {
  showEditUserModal.value = false;
  editUserData.value = {};
};

const saveUserEdits = async () => {
  try {
    const userRef = doc(db, 'users', editUserData.value.id);
    await updateDoc(userRef, {
      name: editUserData.value.name,
      email: editUserData.value.email,
      role: editUserData.value.role
    });
    alert('User updated successfully!');
    closeEditUserModal();
  } catch (error) {
    console.error('Error updating user:', error);
    alert('Failed to update user.');
  }
};

const openEditPoliceModal = (policeData) => {
  editPoliceData.value = { ...policeData };
  showEditPoliceModal.value = true;
};

const closeEditPoliceModal = () => {
  showEditPoliceModal.value = false;
  editPoliceData.value = {};
};

const savePoliceEdits = async () => {
  try {
    const policeRef = doc(db, 'users', editPoliceData.value.id);
    await updateDoc(policeRef, {
      name: editPoliceData.value.name,
      email: editPoliceData.value.email,
      phone: editPoliceData.value.phone,
      status: editPoliceData.value.status
    });
    alert('Police officer updated successfully!');
    closeEditPoliceModal();
  } catch (error) {
    console.error('Error updating police:', error);
    alert('Failed to update police.');
  }
};

const updateSettings = async () => {
  try {
    const settingsRef = doc(db, 'settings', 'general');
    await setDoc(settingsRef, settings.value, { merge: true });
    alert('Settings updated successfully!');
  } catch (error) {
    console.error('Error updating settings:', error);
    alert('Failed to update settings.');
  }
};

const formatDate = (date) => {
  if (!date) return 'Unknown';
  return new Date(date).toLocaleString();
};

const initializeCharts = () => {
  // User Roles Chart
  const rolesCtx = document.getElementById('rolesChart')?.getContext('2d');
  if (rolesCtx) {
    const roleCounts = {
      user: users.value.filter(u => u.role === 'user').length,
      commander: users.value.filter(u => u.role === 'commander').length,
      police: polices.value.length
    };
    new Chart(rolesCtx, {
      type: 'pie',
      data: {
        labels: ['Users', 'Commanders', 'Police'],
        datasets: [{
          data: [roleCounts.user, roleCounts.commander, roleCounts.police],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }

  // Incident Status Chart
  const incidentsCtx = document.getElementById('incidentsChart')?.getContext('2d');
  if (incidentsCtx) {
    const statusCounts = {
      open: incidents.value.filter(i => i.status === 'open').length,
      inProgress: incidents.value.filter(i => i.status === 'in-progress').length,
      resolved: incidents.value.filter(i => i.status === 'resolved').length
    };
    new Chart(incidentsCtx, {
      type: 'pie',
      data: {
        labels: ['Open', 'In Progress', 'Resolved'],
        datasets: [{
          data: [statusCounts.open, statusCounts.inProgress, statusCounts.resolved],
          backgroundColor: ['#f59e0b', '#3b82f6', '#10b981']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }
};

// Lifecycle Hooks
onMounted(() => {
  const authInstance = getAuth();
  onAuthStateChanged(authInstance, async (firebaseUser) => {
    if (firebaseUser) {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        user.value = { id: firebaseUser.uid, ...userDoc.data(), photoURL: firebaseUser.photoURL };
        localStorage.setItem('psers_admin', JSON.stringify(user.value));
        if (user.value.role !== 'admin') {
          router.push('/unauthorized');
          return;
        }
      } else {
        router.push('/login');
        return;
      }
    } else {
      router.push('/login');
      return;
    }

    // Fetch users
    const usersQuery = query(collection(db, 'users'), where('role', 'in', ['user', 'commander']));
    onSnapshot(usersQuery, (snapshot) => {
      users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }, (error) => {
      console.error('Failed to fetch users:', error);
    });

    // Fetch police
    const policeQuery = query(collection(db, 'users'), where('role', '==', 'police'));
    onSnapshot(policeQuery, (snapshot) => {
      polices.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }, (error) => {
      console.error('Failed to fetch police:', error);
    });

    // Fetch incidents
    onSnapshot(collection(db, 'incidents'), (snapshot) => {
      incidents.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      initializeCharts(); // Update charts when data changes
    }, (error) => {
      console.error('Failed to fetch incidents:', error);
    });

    // Fetch settings
    const settingsDoc = await getDoc(doc(db, 'settings', 'general'));
    if (settingsDoc.exists()) {
      settings.value = settingsDoc.data();
    }
  });

  // Handle click outside for dropdown
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});

const handleClickOutside = (e) => {
  if (showDropdown.value && !e.target.closest('.flex.mx-3.text-sm.bg-gray-800.rounded-full')) {
    showDropdown.value = false;
  }
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>