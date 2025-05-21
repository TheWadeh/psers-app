<template>
    <div class="p-4 h-screen">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 class="text-2xl font-bold mb-4 md:mb-0">Police Officers Management</h1>
        <div class="flex space-x-2">
          <button
            @click="refreshOfficers"
            class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
            </svg>
            Refresh
          </button>
        </div>
      </div>
  
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Officer</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Assigned Incident</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="officer in officers" :key="officer.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full" :src="officer.photoURL || 'https://ui-avatars.com/api/?name='+officer.name" :alt="officer.name">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ officer.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400">{{ officer.badgeNumber || 'No badge' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-white">{{ officer.email }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ officer.phone || 'No phone' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${officer.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                     officer.status === 'assigned' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                     'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'}`">
                    {{ officer.status || 'unknown' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {{ officer.assignedIncident ? 'Incident #' + officer.assignedIncident : 'None' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="viewOfficer(officer.id)"
                    class="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                  >
                    View
                  </button>
                  <button 
                    @click="messageOfficer(officer.id)"
                    class="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                  >
                    Message
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="officers.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No police officers found</h3>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by adding new police officers to the system.</p>
        </div>
      </div>
    </div>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue'
  import { collection, getDocs, query, where, orderBy, doc, getDoc } from 'firebase/firestore'
  import { db } from '../services/firebase'
  
  const officers = ref([])
  
  const fetchOfficers = async () => {
    try {
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'police'),
        orderBy('name', 'asc')
      )
      const querySnapshot = await getDocs(q)
  
      const officerList = []
  
      for (const officerDoc of querySnapshot.docs) {
        const officerData = officerDoc.data()
        const officer = {
          id: officerDoc.id,
          name: officerData.name || officerData.email.split('@')[0],
          email: officerData.email,
          phone: officerData.phone || '',
          photoURL: officerData.photoURL,
          badgeNumber: officerData.badgeNumber,
          status: officerData.status || 'available',
          assignedIncident: null,
          createdAt: officerData.createdAt?.toDate() || null
        }
  
        if (officerData.assignedIncident) {
          const incidentRef = doc(db, 'incidents', officerData.assignedIncident)
          const incidentSnap = await getDoc(incidentRef)
          if (incidentSnap.exists()) {
            officer.assignedIncident = {
              id: incidentSnap.id,
              title: incidentSnap.data().title || 'Untitled'
            }
          } else {
            officer.assignedIncident = {
              id: officerData.assignedIncident,
              title: 'Unknown Incident'
            }
          }
        }
  
        officerList.push(officer)
      }
  
      officers.value = officerList
    } catch (error) {
      console.error('Error fetching officers:', error)
    }
  }
  
  const refreshOfficers = () => {
    fetchOfficers()
  }
  
  const viewOfficer = (officerId) => {
    // Extend later with modal/view logic
    console.log('View officer:', officerId)
  }
  
  const messageOfficer = (officerId) => {
    // Extend later with messaging logic
    console.log('Message officer:', officerId)
  }
  
  onMounted(() => {
    fetchOfficers()
  })
  </script>
  