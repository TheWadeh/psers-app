<template>
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 dark:text-white">Reports & Analytics</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 dark:text-white">User Roles Distribution</h3>
          <canvas id="rolesChart" class="w-full h-32"></canvas>
        </div>
        <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 class="text-lg font-semibold mb-2 dark:text-white">Incident Status Distribution</h3>
          <canvas id="incidentsChart" class="w-full h-64"></canvas>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { collection, getDocs } from 'firebase/firestore'
  import { db } from '../services/firebase'
  import Chart from 'chart.js/auto'
  
  let rolesChartInstance = null
  let incidentsChartInstance = null
  
  const drawRoleChart = async () => {
    const rolesCount = {}
  
    const usersSnapshot = await getDocs(collection(db, 'users'))
    usersSnapshot.forEach(doc => {
      const role = doc.data().role || 'unknown'
      rolesCount[role] = (rolesCount[role] || 0) + 1
    })
  
    if (rolesChartInstance) rolesChartInstance.destroy()
  
    const ctx = document.getElementById('rolesChart')
    rolesChartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(rolesCount),
        datasets: [{
          label: 'Users by Role',
          data: Object.values(rolesCount),
          backgroundColor: ['#3b82f6', '#f97316', '#10b981', '#f43f5e', '#a855f7']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    })
  }
  
  const drawIncidentsChart = async () => {
    const statusCount = {}
  
    const incidentsSnapshot = await getDocs(collection(db, 'incidents'))
    incidentsSnapshot.forEach(doc => {
      const status = doc.data().status || 'unknown'
      statusCount[status] = (statusCount[status] || 0) + 1
    })
  
    if (incidentsChartInstance) incidentsChartInstance.destroy()
  
    const ctx = document.getElementById('incidentsChart')
    incidentsChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(statusCount),
        datasets: [{
          label: 'Incidents by Status',
          data: Object.values(statusCount),
          backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444', '#10b981']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    })
  }
  
  onMounted(() => {
    setTimeout(() => {
      drawRoleChart()
      drawIncidentsChart()
    }, 200)
  })
  </script>
  