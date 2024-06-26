<template>
  <div class="container mt-4">
    <div v-if="user" class="card shadow-sm">
      <div class="card-header bg-light text-center">
        <h2 class="card-title mt-3">{{ user.nickname }}</h2>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-4 text-right font-weight-bold">ID:</div>
          <div class="col-8">{{ user.id }}</div>
        </div>
        <div class="row mb-3">
          <div class="col-4 text-right font-weight-bold">Баланс:</div>
          <div class="col-8">{{ user.balance }}</div>
        </div>
        <div class="row mb-3">
          <div class="col-4 text-right font-weight-bold">Статус оплаты:</div>
          <div class="col-8">
            <span :class="{'badge bg-success': user.payment_status === 'completed', 'badge bg-warning': user.payment_status === 'pending'}">
              {{ user.payment_status }}
            </span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-4 text-right font-weight-bold">Статус бана:</div>
          <div class="col-8">
            <span :class="{'badge bg-danger': user.banned, 'badge bg-success': !user.banned}">
              {{ user.banned ? 'Забанен' : 'Активен' }}
            </span>
          </div>
        </div>
        <h3 class="mt-4">Депозиты</h3>
        <table class="table table-hover mt-3">
          <thead class="thead-light">
          <tr>
            <th scope="col">Сумма</th>
            <th scope="col">Дата</th>
            <th scope="col">Провайдер</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="deposit in user.deposits" :key="deposit.id">
            <td>{{ deposit.amount }}$</td>
            <td>{{ new Date(deposit.date).toLocaleDateString() }}</td>
            <td>{{ deposit.provider }}</td>
          </tr>
          </tbody>
        </table>
        <h3 class="mt-4">Выводы предметов</h3>
        <table class="table table-hover mt-3">
          <thead class="thead-light">
          <tr>
            <th scope="col">Предмет</th>
            <th scope="col">Статус</th>
            <th scope="col">Дата запроса</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="withdrawal in user.withdrawals" :key="withdrawal.id">
            <td>{{ withdrawal.item_name }}</td>
            <td>{{ withdrawal.status }}</td>
            <td>{{ new Date(withdrawal.request_date).toLocaleDateString() }}</td>
          </tr>
          </tbody>
        </table>
        <div class="balance-management">
          <h3 class="mt-4">Управление балансом</h3>
          <div class="input-group mb-3">
            <input type="number" v-model="balanceAmount" class="form-control" placeholder="Сумма" aria-label="Сумма">
            <div class="input-group-append">
              <button class="btn btn-success" @click="updateBalance('credit')">Начислить баланс</button>
              <button class="btn btn-warning" @click="updateBalance('debit')">Списать с баланса</button>
            </div>
          </div>
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-danger mb-3" @click="banUser">Забанить пользователя</button>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning">
      <p>Пользователь не найден</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const user = ref(null);
const balanceAmount = ref(0);

const fetchUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    user.value = await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

const banUser = async () => {
  try {
    const response = await fetch(`http://localhost:8000/users/${user.value.id}/ban`, {
      method: 'PUT'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    alert(`User ${user.value.nickname} has been banned.`);
    router.push('/users');
  } catch (error) {
    console.error('Error banning user:', error);
  }
};

const updateBalance = async (action) => {
  try {
    const response = await fetch(`http://localhost:8000/users/${user.value.id}/balance`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: parseFloat(balanceAmount.value), action })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updatedUser = await response.json();
    user.value.balance = updatedUser.balance;
  } catch (error) {
    console.error('Error updating balance:', error);
  }
};

onMounted(() => {
  const userId = route.params.id;
  fetchUser(userId);
});
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.card {
  border-radius: 10px;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background-color: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.card-title {
  margin: 0;
  font-weight: 500;
  color: #333;
}

.card-body {
  padding: 20px;
}

.badge {
  font-size: 1rem;
}

.table {
  margin-top: 20px;
  background-color: white;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.thead-light th {
  background-color: #f8f9fa;
  color: #333;
}

.text-right {
  text-align: right;
}

.btn {
  margin-top: 20px;
}

.font-weight-bold {
  font-weight: bold;
}

.balance-management .input-group {
  margin-top: 20px;
}

.balance-management .input-group-append button {
  margin-left: 10px;
}
</style>
