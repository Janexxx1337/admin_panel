<template>
  <el-aside width="240px" class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      router
      background-color="#f9fafc"
      text-color="#333"
      active-text-color="#409EFF"
    >
      <template v-for="item in menuItems" :key="item.index">
        <el-menu-item v-if="!item.children" :index="item.index">
          <template #title>
            <span :class="item.class">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </template>
        </el-menu-item>
        <el-submenu v-else :index="item.index" :opened="isSubmenuOpened(item.index)" @open="handleOpen(item.index)" @close="handleClose(item.index)">
          <template #title>
            <span :class="item.class">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.index" :index="subItem.index">
            <template #title>
              <span :class="subItem.class">{{ subItem.icon }}</span>
              <span>{{ subItem.label }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </template>
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
import { ref, onMounted, watch } from 'vue';
import { useAuth } from "@/composables/admin/useLogout.js";

const { logout } = useAuth();

const menuItems = ref([
  { index: "/users", label: "Пользователи", icon: "people", class: "material-icons" },
  { index: "/deposits", label: "Депозиты", icon: "account_balance_wallet", class: "material-icons" },
  { index: "/withdrawals", label: "Выводы", icon: "credit_card", class: "material-icons" },
  { index: "/transactions", label: "Транзакции", icon: "bar_chart", class: "material-icons" },
  {
    index: "games",
    label: "Игры",
    icon: "sports_esports",
    class: "material-icons",
    children: [
      { index: "/wheelgames", label: "Wheel", icon: "attractions", class: "material-symbols-rounded" },
      { index: "/coinflipgames", label: "Coinflip", icon: "monetization_on", class: "material-icons" },
      { index: "/classicgames", label: "Classic", icon: "casino", class: "material-icons" },
      { index: "/crashgames", label: "Crash", icon: "flash_on", class: "material-icons" },
    ]
  },
]);

const openedSubmenus = ref(JSON.parse(localStorage.getItem('openedSubmenus')) || []);

const handleOpen = (submenu) => {
  if (!openedSubmenus.value.includes(submenu)) {
    openedSubmenus.value.push(submenu);
  }
};

const handleClose = (submenu) => {
  const index = openedSubmenus.value.indexOf(submenu);
  if (index !== -1) {
    openedSubmenus.value.splice(index, 1);
  }
};

const isSubmenuOpened = (submenu) => {
  return openedSubmenus.value.includes(submenu);
};

watch(openedSubmenus, (newVal) => {
  localStorage.setItem('openedSubmenus', JSON.stringify(newVal));
}, { deep: true });

onMounted(() => {
  // Sync opened submenus on initial load
  openedSubmenus.value = JSON.parse(localStorage.getItem('openedSubmenus')) || [];
});
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
.el-sub-menu .material-icons,.material-symbols-rounded {
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
