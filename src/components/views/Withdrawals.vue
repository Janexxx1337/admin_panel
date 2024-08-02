<template>
  <div class="container mt-4">
    <h1 class="mb-4">Выводы</h1>
    <!-- Поле поиска и фильтрации -->
    <div class="mb-3 d-flex justify-content-between">
      <el-input
          v-model="searchQuery"
          placeholder="Поиск по Steam ID или предмету"
          clearable
          class="w-25"
      ></el-input>
      <el-date-picker
          v-model="filterDateRange"
          type="daterange"
          range-separator="до"
          start-placeholder="Начальная дата"
          end-placeholder="Конечная дата"
          class="w-25"
          clearable
      ></el-date-picker>
      <el-select v-model="filterStatus" placeholder="Все статусы" clearable class="w-25">
        <el-option value="" label="Все статусы"></el-option>
        <el-option value="completed" label="Completed"></el-option>
        <el-option value="pending" label="Pending"></el-option>
      </el-select>
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

    <el-table :data="paginatedWithdrawals" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" sortable>
        <template #header="scope">
          <div @click="changeSort('id')">
            ID
            <el-icon>
              <span class="material-icons">{{ getSortIcon('id') }}</span>
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="item_name" label="Предмет" sortable>
        <template #header="scope">
          <div @click="changeSort('item_name')">
            Предмет
            <el-icon>
              <span class="material-icons">{{ getSortIcon('item_name') }}</span>
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Статус" sortable>
        <template #header="scope">
          <div @click="changeSort('status')">
            Статус
            <el-icon>
              <span class="material-icons">{{ getSortIcon('status') }}</span>
            </el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="request_date" label="Дата запроса" sortable>
        <template #header="scope">
          <div @click="changeSort('request_date')">
            Дата запроса
            <el-icon>
              <span class="material-icons">{{ getSortIcon('request_date') }}</span>
            </el-icon>
          </div>
        </template>
        <template #default="scope">
          {{ new Date(scope.row.request_date).toLocaleDateString() }}
        </template>
      </el-table-column>
      <el-table-column prop="user_steam_id" label="Steam ID" sortable>
        <template #header="scope">
          <div @click="changeSort('user_steam_id')">
            Steam ID
            <el-icon>
              <span class="material-icons">{{ getSortIcon('user_steam_id') }}</span>
            </el-icon>
          </div>
        </template>
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
      <el-table-column prop="provider" label="Провайдер" sortable>
        <template #header="scope">
          <div @click="changeSort('provider')">
            Провайдер
            <el-icon>
              <span class="material-icons">{{ getSortIcon('provider') }}</span>
            </el-icon>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        :current-page="currentPage"
        :page-size="itemsPerPage"
        :total="totalPages * itemsPerPage"
        @current-change="handlePageChange"
        layout="prev, pager, next"
        background
        class="mt-4"
    ></el-pagination>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue';
import {withdrawalsData} from '@/data/Withdrawals.js';

const withdrawals = ref(withdrawalsData);
const filteredWithdrawals = ref([]);
const paginatedWithdrawals = ref([]);
const searchQuery = ref('');
const filterDateRange = ref(null);
const filterStatus = ref('');
const filterProvider = ref('');
const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = ref(Math.ceil(withdrawalsData.length / itemsPerPage));
const sortBy = ref('id');
const sortOrder = ref('asc');

const uniqueProviders = computed(() => {
  const providers = withdrawals.value.map(withdrawal => withdrawal.provider);
  return [...new Set(providers)];
});

const filterWithdrawals = () => {
  const query = searchQuery.value.toLowerCase();
  filteredWithdrawals.value = withdrawals.value.filter(withdrawal => {
    const matchesQuery = withdrawal.item_name.toLowerCase().includes(query) ||
        withdrawal.user_steam_id.toLowerCase().includes(query);
    const matchesDate = filterDateRange.value ?
        (new Date(withdrawal.request_date) >= new Date(filterDateRange.value[0]) &&
            new Date(withdrawal.request_date) <= new Date(filterDateRange.value[1])) :
        true;
    const matchesStatus = filterStatus.value === '' || withdrawal.status === filterStatus.value;
    const matchesProvider = filterProvider.value === '' || withdrawal.provider === filterProvider.value;
    return matchesQuery && matchesDate && matchesStatus && matchesProvider;
  });
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

const handlePageChange = (page) => {
  currentPage.value = page;
  updatePaginatedWithdrawals();
};

onMounted(() => {
  filterWithdrawals();
});

watch([sortBy, sortOrder, searchQuery, filterDateRange, filterStatus, filterProvider], () => {
  filterWithdrawals();
});
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.el-input, .el-select, .el-date-picker {
  margin-bottom: 10px;
}

.el-table th, .el-table td {
  text-align: center;
}

.el-table th {
  cursor: pointer;
}

.el-icon {
  vertical-align: middle;
  margin-left: 5px;
}
</style>
