<template>
  <div class="container mt-4">
    <h1 class="mb-4">Депозиты</h1>
    <!-- Поле поиска и фильтрации -->
    <div class="mb-3 d-flex justify-content-between">
      <el-input
          v-model="searchQuery"
          placeholder="Поиск по Steam ID"
          clearable
          class="w-25"
      ></el-input>
      <el-select v-model="filterProvider" placeholder="Все провайдеры" clearable class="w-25">
        <el-option value="" label="Все провайдеры"></el-option>
        <el-option
            v-for="provider in uniqueProviders"
            :key="provider"
            :label="provider"
            :value="provider"
        ></el-option>
      </el-select>
    </div>

    <el-table :data="filteredDeposits"
              stripe border
              style="width: 100%">
      <el-table-column prop="amount" label="Сумма">
        <template #default="scope">
          <el-tag type="info">{{ scope.row.amount }}$</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="provider" label="Провайдер"></el-table-column>
      <el-table-column prop="date" label="Дата">
        <template #default="scope">
          {{ new Date(scope.row.date).toLocaleDateString() }}
        </template>
      </el-table-column>
      <el-table-column prop="user_steam_id" label="Steam ID">
        <template #default="scope">
          <router-link
              :to="{ name: 'UserCard', params: { id: 2} }"
              class="steam-link"
          >
          <span class="steam-id-text" :title="scope.row.user_steam_id">
            {{ scope.row.user_steam_id }}
          </span>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        layout="prev, pager, next"
        :total="totalPages * itemsPerPage"
        :page-size="itemsPerPage"
        :current-page="currentPage"
        @current-change="handlePageChange"
        background
        class="mt-4"
    ></el-pagination>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {depositsData} from '@/data/Deposits.js';

const deposits = ref(depositsData);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const searchQuery = ref('');
const filterProvider = ref('');

const totalPages = computed(() => {
  return Math.ceil(filteredDeposits.value.length / itemsPerPage.value);
});

const uniqueProviders = computed(() => {
  const providers = deposits.value.map(deposit => deposit.provider);
  return [...new Set(providers)];
});

const filteredDeposits = computed(() => {
  return deposits.value.filter(deposit => {
    return (
        deposit.user_steam_id.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (filterProvider.value === '' || deposit.provider === filterProvider.value)
    );
  }).slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

onMounted(() => {
  currentPage.value = 1;
});
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.el-input, .el-select {
  margin-bottom: 10px;
}

.el-tag {
  font-size: 1rem;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
