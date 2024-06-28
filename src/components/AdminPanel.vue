<template>
  <div class="d-flex justify-content-center align-items-center vh-100 position-absolute log-form">
    <div class="card p-4" style="width: 400px;">
      <div class="card-body">
        <h1 class="card-title text-center mb-4">Вход</h1>
        <div class="mb-3">
          <label for="username" class="form-label">Логин</label>
          <input v-model="username" id="username" class="form-control" type="text" placeholder="Введите имя">
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Пароль</label>
          <input v-model="password" id="password" class="form-control" type="password" placeholder="Введите пароль">
        </div>
        <button @click="login" class="btn btn-primary w-100">Вход</button>
        <p v-if="error" class="text-danger mt-3">{{ error }}</p>
        <p v-if="successMessage" class="text-success mt-3">{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminLogin } from '@/composables/admin/useAdminLogin';

const { username, password, error, successMessage, login } = useAdminLogin();
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.log-form {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
