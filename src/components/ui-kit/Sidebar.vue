<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 sidebar">
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
      <li>
        <router-link to="/wheelgames" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">games</span>
          Wheel
        </router-link>
      </li>
      <li>
        <router-link to="/coinflipgames" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">monetization_on</span>
          Coinflip
        </router-link>
      </li>
      <li>
        <router-link to="/wheeltest/3" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">games</span>
          Test Wheel
        </router-link>
      </li>
      <li>
        <router-link to="/coinfliptest/3" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">monetization_on</span>
          Test Coinflip
        </router-link>
      </li>
    </ul>
    <div class="admin-card dropdown">
      <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
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
import { useAuth } from "@/composables/admin/useLogout.js";

const { logout } = useAuth();
</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  overflow-y: auto;
  width: 15rem;
  left: 0;
  top: 0;
  background: var(--Surface-Surface-2, #1a1c25);
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-link {
  display: flex;
  align-items: center;
  color: #a8abba;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #21232F;
  }
}

.nav-link .material-icons {
  font-size: 24px;
}

.admin-card {
  a {
    color: #fff;
  }

  .dropdown-menu {
    background-color: #21232f;

    .dropdown-item {
      transition: all 0.3s ease-in-out;
      &:hover {
        background: var(--surface-surface-4, #2a2c3b);
      }
    }
  }
}
</style>
