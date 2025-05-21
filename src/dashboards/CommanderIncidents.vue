<template>
  <div class="p-4 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    <h1 class="text-2xl font-bold mb-4">📋 Incidents Management</h1>

    <!-- Table -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Title</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Status</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Reported By</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Date</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="incident in incidents" :key="incident.id">
              <td class="px-6 py-4 text-sm font-medium">{{ incident.title }}</td>
              <td class="px-6 py-4 text-sm">
                <span
                  :class="`px-2 inline-flex text-xs font-semibold rounded-full
                    ${incident.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                    incident.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'}`">
                  {{ incident.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">{{ incident.userName }}</td>
              <td class="px-6 py-4 text-sm">{{ formatDate(incident.createdAt) }}</td>
              <td class="px-6 py-4 text-sm font-medium space-x-2">
                <button @click="openAssignModal(incident)" class="text-blue-600 hover:text-blue-900">Assign</button>
                <button @click="openViewModal(incident)" class="text-green-600 hover:text-green-900">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Assign Modal -->
    <div v-if="showAssign" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">Assign Incident</h2>
        <label class="block mb-2">Select Police</label>
        <select v-model="selectedOfficer" class="w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white">
          <option disabled value="">-- Select Officer --</option>
          <option v-for="police in policeUsers" :key="police.id" :value="police.id">{{ police.name }}</option>
        </select>
        <div class="mt-4 flex justify-end space-x-2">
          <button @click="assignIncident" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Assign</button>
          <button @click="closeAssignModal" class="text-gray-600 dark:text-gray-300">Cancel</button>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showView" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md">
        <h2 class="text-xl font-bold mb-2">{{ selectedIncident.title }}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Reported by: {{ selectedIncident.userName }}</p>
        <p class="text-sm">{{ selectedIncident.description || 'No description available.' }}</p>
        <p class="text-xs mt-2 text-gray-500">Date: {{ formatDate(selectedIncident.createdAt) }}</p>
        <div class="mt-4 text-right">
          <button @click="closeViewModal" class="text-gray-600 dark:text-gray-300 hover:underline">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from '../services/firebase'
import { collection, getDocs, query, orderBy, updateDoc, doc, where } from 'firebase/firestore'

const incidents = ref([])
const policeUsers = ref([])
const selectedIncident = ref(null)
const selectedOfficer = ref('')
const showAssign = ref(false)
const showView = ref(false)

const fetchIncidents = async () => {
  const q = query(collection(db, 'incidents'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  incidents.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate()
  }))
}

const fetchPoliceUsers = async () => {
  const q = query(collection(db, 'users'), where('role', '==', 'police'))
  const snapshot = await getDocs(q)
  policeUsers.value = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

const formatDate = (date) => {
  return date ? new Date(date).toLocaleString() : 'N/A'
}

const openAssignModal = (incident) => {
  selectedIncident.value = incident
  selectedOfficer.value = ''
  showAssign.value = true
  fetchPoliceUsers()
}

const assignIncident = async () => {
  if (!selectedOfficer.value) {
    alert('Please select a police officer.')
    return
  }
  try {
    await updateDoc(doc(db, 'incidents', selectedIncident.value.id), {
      assignedTo: selectedOfficer.value,
      status: 'assigned'
    })
    alert('Incident assigned successfully!')
    showAssign.value = false
    fetchIncidents()
  } catch (error) {
    console.error('Assignment failed:', error)
    alert('Failed to assign incident.')
  }
}

const closeAssignModal = () => {
  showAssign.value = false
}

const openViewModal = (incident) => {
  selectedIncident.value = incident
  showView.value = true
}

const closeViewModal = () => {
  showView.value = false
}

onMounted(() => {
  fetchIncidents()
})
</script>
