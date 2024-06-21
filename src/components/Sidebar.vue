<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light" style="width: 25%;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span class="fs-4">Меню</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <i class="bi bi-house"></i>
          Пользователи
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <i class="bi bi-people"></i>
          Пользователи
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <i class="bi bi-card-checklist"></i>
          Транзакции
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          <i class="bi bi-bar-chart"></i>
          Статистика
        </a>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
        <strong>Админ</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">Профиль</a></li>
        <li><a class="dropdown-item" href="#">Настройки</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#" @click="logout">Выход</a></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function logout() {
  router.push('/');
}
</script>

<style scoped>
</style>
