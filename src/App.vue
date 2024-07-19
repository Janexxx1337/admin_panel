<template>
  <div id="app">
    <Sidebar v-if="showSidebar" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from '@/components/ui-kit/Sidebar.vue';

const route = useRoute();

const showSidebar = computed(() => route.path !== '/admin');
</script>

<style scoped>
#app {
  display: flex;
}
</style>
