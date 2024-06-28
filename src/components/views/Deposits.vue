<template>
  <div class="container mt-4">
    <h1 class="mb-4">Депозиты</h1>
    <!-- Поле поиска и фильтрации -->
    <div class="mb-3 d-flex justify-content-between">
      <input
          v-model="searchQuery"
          type="text"
          class="form-control w-25"
          placeholder="Поиск по пользователю"
      >
      <select v-model="filterProvider" class="form-select w-25">
        <option value="">Все провайдеры</option>
        <option v-for="provider in uniqueProviders" :key="provider" :value="provider">{{ provider }}</option>
      </select>
    </div>

    <table class="table table-hover">
      <thead class="thead-dark">
      <tr>
        <th scope="col">Сумма</th>
        <th scope="col">Провайдер</th>
        <th scope="col">Дата</th>
        <th scope="col">Пользователь</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="deposit in filteredDeposits" :key="deposit.id">
        <td>
          <span class="badge bg-info text-dark">{{ deposit.amount }}$</span>
        </td>
        <td>{{ deposit.provider }}</td>
        <td>{{ new Date(deposit.date).toLocaleDateString() }}</td>
        <td>{{ deposit.user_nickname }}</td>
      </tr>
      </tbody>
    </table>
    <pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="fetchDeposits"
    ></pagination>
  </div>
</template>

<script setup>
import Pagination from '@/components/ui-kit/Pagination.vue';
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
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
}

.badge {
  font-size: 1rem;
}
</style>
