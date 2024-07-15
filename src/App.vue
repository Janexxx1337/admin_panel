<template>
  <div class="main h-100">
    <Sidebar v-if="isAuthenticated" />

    <div class="content">
      <div class="content__main">
        <router-view></router-view>
      </div>
    </div>
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

<style lang="scss">
@import "./assets/sass/app";

.main {
  display: flex;
}

.content {
  width: 100%;
  margin-top: 5rem;
  padding-left: 15rem;
  padding-bottom: 4rem;

  &__main {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    max-width: 80.25rem;
  }
}
</style>
