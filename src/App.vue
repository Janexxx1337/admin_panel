<template>
  <div id="app">
    <Sidebar />
    <router-view></router-view>
  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue';
</script>

<style scoped>
#app {
  display: flex;
}
</style>
