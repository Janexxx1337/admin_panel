<template>
  <div id="app">
    <Sidebar v-if="isAuthenticated" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar from '@/components/ui-kit/Sidebar.vue';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false);
const router = useRouter();

const checkAuth = async () => {
  const response = await fetch('http://localhost:8000/admin/me', {
    method: 'GET',
    credentials: 'include', // This will include the cookies in the request
  });

  isAuthenticated.value = response.ok;

  if (!isAuthenticated.value) {
    router.push('/admin');
  }
};

onMounted(() => {
  checkAuth();
});
</script>

<style scoped>
#app {
  display: flex;
}
</style>
