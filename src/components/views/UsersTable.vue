<template>
  <div class="container mt-4">
    <h1>Пользователи CaseStore</h1>

    <!-- Поле поиска и фильтрации -->
    <div class="mb-3 d-flex justify-content-between">
      <el-input
          v-model="searchQuery"
          placeholder="Поиск по никнейму"
          clearable
          class="w-25"
      ></el-input>
      <el-select v-model="filterStatus" placeholder="Все" class="w-25">
        <el-option label="Все" value=""></el-option>
        <el-option label="Completed" value="completed"></el-option>
        <el-option label="Pending" value="pending"></el-option>
      </el-select>
    </div>

    <el-table :data="filteredUsers" stripe border style="width: 100%">
      <el-table-column prop="id" label="#"></el-table-column>
      <el-table-column prop="nickname" label="Никнейм"></el-table-column>
      <el-table-column prop="balance" label="Баланс"></el-table-column>
      <el-table-column label="Статус оплаты">
        <template #default="scope">
          <el-tag :type="scope.row.payment_status === 'completed' ? 'success' : 'danger'">
            {{ scope.row.payment_status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Статус бана">
        <template #default="scope">
          <el-tag :type="scope.row.banned ? 'danger' : 'success'">
            {{ scope.row.banned ? 'Забанен' : 'Активен' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Действия">
        <template #default="scope">
          <el-select v-model="scope.row.payment_status" @change="updateStatus(scope.row)">
            <el-option label="Completed" value="completed"></el-option>
            <el-option label="Pending" value="pending"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Перейти">
        <template #default="scope">
          <el-button type="text" @click="goToUser(scope.row.id)">
            Перейти <span class="material-icons">arrow_forward</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUsers } from '@/composables/users/useUsers.js';

const { users, updateStatus } = useUsers();
const router = useRouter();
const searchQuery = ref('');
const filterStatus = ref('');
const visibleTransactions = ref({});

const goToUser = (userId) => {
  router.push(`/user/${userId}`);
};

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    return (
        user.nickname.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (filterStatus.value === '' || user.payment_status === filterStatus.value)
    );
  });
});


</script>

<style scoped>
.container {
  margin-top: 20px;
}

.el-input,
.el-select {
  margin-bottom: 10px;
}

.el-tag {
  font-size: 1rem;
}

.el-table th,
.el-table td {
  text-align: center;
}

.material-icons {
  vertical-align: middle;
}
</style>
