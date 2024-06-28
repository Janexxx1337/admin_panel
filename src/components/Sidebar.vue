<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar">
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/users" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">people</span>
          Пользователи
        </router-link>
      </li>
      <li>
        <router-link to="/deposits" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">account_balance_wallet</span>
          Депозиты
        </router-link>
      </li>
      <li>
        <router-link to="/withdrawals" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">credit_card</span>
          Выводы
        </router-link>
      </li>
      <li>
        <router-link to="/statistics" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">bar_chart</span>
          Статистика
        </router-link>
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

async function logout() {
  try {
    const response = await fetch('http://localhost:8000/admin/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      router.push('/admin');
    } else {
      console.error('Failed to logout');
    }
  } catch (err) {
    console.error('Error during logout:', err);
  }
}
</script>

<style scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  width: 15%;
}

.nav-link {
  display: flex;
  align-items: center;
}

.nav-link .material-icons {
  font-size: 24px;
}

.nav-link.active {
  background-color: #e9ecef;
}
</style>
