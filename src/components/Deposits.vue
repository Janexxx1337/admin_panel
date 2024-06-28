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
import {ref, computed, onMounted} from 'vue';
import Pagination from '@/components/Pagination.vue';

const deposits = ref([]);
const paginatedDeposits = ref([]);
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = ref(0);
const searchQuery = ref('');
const filterProvider = ref('');

const fetchDeposits = async (page = 1) => {
  currentPage.value = page;
  try {
    const response = await fetch(`http://localhost:8000/deposits?page=${page}&limit=${itemsPerPage}`);
    if (response.ok) {
      const data = await response.json();
      deposits.value = data.deposits;
      totalPages.value = Math.ceil(data.total / itemsPerPage);
      updatePaginatedDeposits();
    } else {
      console.error('Failed to fetch deposits:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching deposits:', error);
  }
};

const updatePaginatedDeposits = () => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  paginatedDeposits.value = deposits.value.slice(start, end);
};

const uniqueProviders = computed(() => {
  const providers = deposits.value.map(deposit => deposit.provider);
  return [...new Set(providers)];
});

const filteredDeposits = computed(() => {
  return paginatedDeposits.value.filter(deposit => {
    return (
        deposit.user_nickname.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
        (filterProvider.value === '' || deposit.provider === filterProvider.value)
    );
  });
});

onMounted(() => {
  fetchDeposits();
});
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
}

.badge {
  font-size: 1rem;
}
</style>
