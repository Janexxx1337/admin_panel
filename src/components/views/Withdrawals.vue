<template>
  <div class="container mt-4">
    <h1 class="mb-4">Выводы</h1>
    <el-input
        v-model="search"
        placeholder="Поиск по имени пользователя или предмету..."
        clearable
        class="mb-3"
    ></el-input>

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
      <el-table-column prop="user_nickname" label="Пользователь" sortable>
        <template #header="scope">
          <div @click="changeSort('user_nickname')">
            Пользователь
            <el-icon>
              <span class="material-icons">{{ getSortIcon('user_nickname') }}</span>
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
import { ref, onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';

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
      ElMessage.error('Не удалось загрузить выводы');
      console.error('Failed to fetch withdrawals:', response.statusText);
    }
  } catch (error) {
    ElMessage.error('Ошибка загрузки выводов');
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

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchWithdrawals(page);
};

onMounted(() => {
  fetchWithdrawals();
});

watch([sortBy, sortOrder], () => {
  sortWithdrawals();
});
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.el-input {
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
