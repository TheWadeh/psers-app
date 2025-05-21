<template>
    <div id="map" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  
  export default {
    mounted() {
      const latitude = 9.145; // Replace with dynamic data if needed
      const longitude = 40.489673; // Replace with dynamic data if needed
  
      const map = L.map('map').setView([latitude, longitude], 15);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);
  
      L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Emergency Location')
        .openPopup();
    },
  };
  </script>
  
  <style scoped>
  #map {
    width: 100%;
    height: 400px;
  }
  </style>
  