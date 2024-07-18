<template>
  <div class="container mt-4">
    <h1 class="mb-4">Депозиты</h1>
    <!-- Поле поиска и фильтрации -->
    <div class="mb-3 d-flex justify-content-between">
      <el-input
          v-model="searchQuery"
          placeholder="Поиск по пользователю"
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

    <el-table :data="filteredDeposits" stripe style="width: 100%">
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
      <el-table-column prop="user_nickname" label="Пользователь"></el-table-column>
    </el-table>

    <el-pagination
        layout="prev, pager, next"
        :total="totalPages * 10"
        :page-size="10"
        :current-page="currentPage"
        @current-change="fetchDeposits"
        background
        class="mt-4"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useDeposits } from '@/composables/users/deposits/useDeposits.js';

const {
  currentPage,
  totalPages,
  searchQuery,
  filterProvider,
  fetchDeposits,
  uniqueProviders,
  filteredDeposits
} = useDeposits();

onMounted(() => {
  fetchDeposits();
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
