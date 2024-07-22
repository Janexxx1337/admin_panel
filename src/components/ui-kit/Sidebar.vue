<template>
  <el-aside width="240px" class="sidebar">
    <el-menu
        class="el-menu-vertical-demo"
        router
        background-color="#f9fafc"
        text-color="#333"
        active-text-color="#409EFF"
    >
      <el-menu-item index="/users">
        <template #title>
          <span class="material-icons me-2">people</span>
          <span>Пользователи</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/deposits">
        <template #title>
          <span class="material-icons me-2">account_balance_wallet</span>
          <span>Депозиты</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/withdrawals">
        <template #title>
          <span class="material-icons me-2">credit_card</span>
          <span>Выводы</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/transactions">
        <template #title>
          <span class="material-icons me-2">bar_chart</span>
          <span>Транзакции</span>
        </template>
      </el-menu-item>
      <el-submenu index="games">
        <template #title>
          <span class="material-icons me-2">sports_esports</span>
          <span>Игры</span>
        </template>
        <el-menu-item index="/wheelgames">
          <template #title>
            <span class="material-symbols-rounded me-2">attractions</span>
            <span>Wheel</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/coinflipgames">
          <template #title>
            <span class="material-icons me-2">monetization_on</span>
            <span>Coinflip</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/classicgames">
          <template #title>
            <span class="material-icons me-2">casino</span>
            <span>Classic</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <el-avatar src="https://github.com/mdo.png" class="avatar" />
        <strong>Админ</strong>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">Профиль</a></li>
        <li><a class="dropdown-item" href="#">Настройки</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#" @click="logout">Выход</a></li>
      </ul>
    </div>
  </el-aside>
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
  background-color: #f9fafc;
  padding: 20px 0;
}

.el-menu-vertical-demo {
  border-right: none;
}

.el-menu-item,
.el-sub-menu {
  padding: 0 20px;
}

.el-menu-item .material-icons,
.el-menu-item .material-symbols-rounded,
.el-sub-menu .material-icons {
  font-size: 24px;
  margin-right: 10px;
}

.avatar {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.dropdown {
  padding: 20px;
  background-color: #f9fafc;
}
</style>
