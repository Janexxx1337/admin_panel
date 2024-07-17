<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light sidebar">
    <ul class="nav nav-pills flex-column mb-auto  container">
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
        <router-link to="/transactions" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">bar_chart</span>
          Транзакции
        </router-link>
      </li>
      <li>
        <router-link to="/wheelgames" class="nav-link d-flex align-items-center" active-class="active">
         <span class="material-symbols-rounded me-2">
attractions
</span>
          Wheel
        </router-link>
      </li>
      <li>
        <router-link to="/coinflipgames" class="nav-link d-flex align-items-center" active-class="active">
          <span class="material-icons me-2">monetization_on</span>
          Coinflip
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
import { useAuth } from "@/composables/admin/useLogout.js";

const { logout } = useAuth();
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
