<template>
  <div class="container mt-4">
    <h1 class="mb-4">Выводы</h1>
    <input v-model="search" @input="filterWithdrawals" class="form-control mb-3" placeholder="Поиск по имени пользователя или предмету...">
    <table class="table table-hover table-striped">
      <thead class="thead-dark">
      <tr>
        <th scope="col" @click="changeSort('id')">
          ID
          <span class="material-icons">
            {{ getSortIcon('id') }}
          </span>
        </th>
        <th scope="col" @click="changeSort('item_name')">
          Предмет
          <span class="material-icons">
            {{ getSortIcon('item_name') }}
          </span>
        </th>
        <th scope="col" @click="changeSort('status')">
          Статус
          <span class="material-icons">
            {{ getSortIcon('status') }}
          </span>
        </th>
        <th scope="col" @click="changeSort('request_date')">
          Дата запроса
          <span class="material-icons">
            {{ getSortIcon('request_date') }}
          </span>
        </th>
        <th scope="col" @click="changeSort('user_nickname')">
          Пользователь
          <span class="material-icons">
            {{ getSortIcon('user_nickname') }}
          </span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="withdrawal in paginatedWithdrawals" :key="withdrawal.id">
        <td>{{ withdrawal.id }}</td>
        <td>{{ withdrawal.item_name }}</td>
        <td>{{ withdrawal.status }}</td>
        <td>{{ new Date(withdrawal.request_date).toLocaleDateString() }}</td>
        <td>{{ withdrawal.user_nickname }}</td>
      </tr>
      </tbody>
    </table>
    <pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="fetchWithdrawals"
    ></pagination>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Pagination from '@/components/ui-kit/Pagination.vue';

const withdrawals = ref([]);
const filteredWithdrawals = ref([]);
const paginatedWithdrawals = ref([]);
const search = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = ref(0);
const sortBy = ref('id');
const sortOrder = ref('asc');

const fetchWithdrawals = async (page = 1) => {
  currentPage.value = page;
  try {
    const response = await fetch(`http://localhost:8000/withdrawals?page=${page}&limit=${itemsPerPage}`);
    if (response.ok) {
      const data = await response.json();
      withdrawals.value = data.withdrawals;
      totalPages.value = Math.ceil(data.total / itemsPerPage);
      filterWithdrawals();
      sortWithdrawals();
    } else {
      console.error('Failed to fetch withdrawals:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching withdrawals:', error);
  }
};

const filterWithdrawals = () => {
  const query = search.value.toLowerCase();
  filteredWithdrawals.value = withdrawals.value.filter(withdrawal =>
      withdrawal.item_name.toLowerCase().includes(query) ||
      withdrawal.user_nickname.toLowerCase().includes(query)
  );
  sortWithdrawals();
};

const sortWithdrawals = () => {
  filteredWithdrawals.value.sort((a, b) => {
    let modifier = sortOrder.value === 'asc' ? 1 : -1;
    if (a[sortBy.value] < b[sortBy.value]) return -1 * modifier;
    if (a[sortBy.value] > b[sortBy.value]) return 1 * modifier;
    return 0;
  });
  updatePaginatedWithdrawals();
};

const updatePaginatedWithdrawals = () => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  paginatedWithdrawals.value = filteredWithdrawals.value.slice(start, end);
};

const changeSort = (column) => {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortOrder.value = 'asc';
  }
  sortWithdrawals();
};

const getSortIcon = (column) => {
  if (sortBy.value !== column) return 'sort';
  return sortOrder.value === 'asc' ? 'arrow_drop_down' : 'arrow_drop_up';
};

onMounted(() => {
  fetchWithdrawals();
});

watch([sortBy, sortOrder], () => {
  sortWithdrawals();
});
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
}

.table th {
  border-bottom: 2px solid #dee2e6;
}

.table th .material-icons {
  font-size: 18px;
  margin-left: 5px;
  vertical-align: middle;
}

.collapse:not(.show) {
  display: block;
  height: 0;
  overflow: hidden;
  transition: height 0.35s ease;
}

.collapse.show {
  height: auto;
}
</style>
