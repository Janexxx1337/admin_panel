<template>
  <div class="transaction-detail-container container mt-4">
    <el-button @click="goBack" class="back-button">
      <span class="material-symbols-outlined">arrow_back</span>
      <span>Назад</span>
    </el-button>
    <el-card shadow="hover" class="card">
      <div v-if="transaction">
        <el-row class="transaction-info">
          <el-col :span="12"><p><strong>ID транзакции:</strong> {{ transaction.id }}</p></el-col>
          <el-col :span="12"><p><strong>Дата:</strong> {{ formattedDate }}</p></el-col>
          <el-col :span="12"><p><strong>Тип транзакции:</strong> {{ transaction.type }}</p></el-col>
          <el-col :span="12"><p><strong>Steam ID:</strong> {{ transaction.steamID }}</p></el-col>
        </el-row>
        <el-divider></el-divider>
        <h2>Содержимое транзакции</h2>
        <el-collapse>
          <el-collapse-item title="Предметы и Деньги" name="1">
            <el-table :data="transaction.items" style="width: 100%" stripe border>
              <el-table-column prop="name" label="Название"></el-table-column>
              <el-table-column prop="rarity" label="Редкость"></el-table-column>
              <el-table-column prop="price" label="Цена"></el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div v-else>
        <el-empty description="Loading..."></el-empty>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { transactions } from '@/data/Transactions.js';

const route = useRoute();
const router = useRouter();
const transaction = ref(null);

const fetchTransactionDetails = (transactionId) => {
  transaction.value = transactions.find(t => t.id === transactionId) || null;
};

const formattedDate = computed(() => {
  return transaction.value ? new Date(transaction.value.date).toLocaleString() : '';
});

const goBack = () => {
  router.back();
};

onMounted(() => {
  const { id } = route.params;
  fetchTransactionDetails(id);
});
</script>

<style scoped>
.transaction-detail-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-button {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #409eff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #66b1ff;
}

.back-button .material-symbols-outlined {
  margin-right: 8px;
}

.card {
  background: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 100%;
  max-width: 1200px;
  text-align: center;
}

.transaction-info p {
  margin: 5px 0;
  font-size: 1.2rem;
  color: #333;
}

h1, h2 {
  text-align: center;
  color: #333;
}
</style>
