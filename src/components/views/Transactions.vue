<template>
  <div class="transactions-container container mt-4">
    <el-row :gutter="20" class="controls-row">
      <el-col :span="8">
        <el-input
            v-model="searchPlayer"
            placeholder="Поиск по Steam ID"
            class="search-input"
            clearable
        ></el-input>
      </el-col>
      <el-col :span="8">
        <el-date-picker
            v-model="searchDateRange"
            type="daterange"
            range-separator="до"
            start-placeholder="Начальная дата"
            end-placeholder="Конечная дата"
            class="date-picker"
            clearable
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-table :data="pagedTransactions" style="width: 100%" class="transactions-table" stripe border>
      <el-table-column prop="id" label="ID транзакции"></el-table-column>
      <el-table-column prop="date" label="Дата"></el-table-column>
      <el-table-column prop="type" label="Тип транзакции"></el-table-column>
      <el-table-column prop="steamID" label="Steam ID">
        <template #default="scope">
          <router-link
              :to="{ name: 'UserCard', params: { id: 2 } }"
              class="steam-link"
          >
          <span class="steam-id-text" :title="scope.row.steamID">
            {{ scope.row.steamID }}
          </span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Перейти">
        <template #default="scope">
          <router-link :to="{ name: 'TransactionDetail', params: { id: scope.row.id } }">
            <el-button type="primary">Детали</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        :total="filteredTransactions.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
        class="pagination"
    ></el-pagination>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { transactions } from '@/data/Transactions.js';

const searchPlayer = ref('');
const searchDateRange = ref(null);
const currentPage = ref(1);
const pageSize = ref(5);

const filteredTransactions = computed(() => {
  return transactions.filter(transaction => {
    const matchesPlayer = transaction.steamID.toLowerCase().includes(searchPlayer.value.toLowerCase());
    const matchesDate = searchDateRange.value
        ? new Date(transaction.date) >= new Date(searchDateRange.value[0]) &&
        new Date(transaction.date) <= new Date(searchDateRange.value[1])
        : true;
    return matchesPlayer && matchesDate;
  });
});

const pagedTransactions = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredTransactions.value.slice(start, end);
});

function handlePageChange(page) {
  currentPage.value = page;
}
</script>

<style scoped>
.transactions-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.controls-row {
  margin-bottom: 20px;
  justify-content: center;
}

.search-input,
.date-picker {
  width: 100%;
}

.transactions-table {
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
