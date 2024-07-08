<template>
  <div class="container mt-4">
    <div v-if="user" class="card shadow-sm">
      <div class="card-header bg-light text-center">
        <h2 class="card-title mt-3">{{ user.nickname }}</h2>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Информация о пользователе</h5>
                <p class="card-text"><strong>ID:</strong> {{ user.id }}</p>
                <p class="card-text"><strong>Баланс:</strong> {{ user.balance }}</p>
                <p class="card-text"><strong>Статус оплаты:</strong>
                  <span :class="{'badge bg-success': user.payment_status === 'completed', 'badge bg-warning': user.payment_status === 'pending'}">
                    {{ user.payment_status }}
                  </span>
                </p>
                <p class="card-text"><strong>Статус бана:</strong>
                  <span :class="{'badge bg-danger': user.banned, 'badge bg-success': !user.banned}">
                    {{ user.banned ? 'Забанен' : 'Активен' }}
                  </span>
                </p>
                <div class="text-center">
                  <button v-if="!user.banned" class="btn btn-danger mb-3" @click="banUser">Забанить пользователя</button>
                  <button v-if="user.banned" class="btn btn-success mb-3" @click="unbanUser">Разбанить пользователя</button>
                </div>
              </div>
            </div>
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Управление балансом</h5>
                <div class="input-group mb-3">
                  <input type="number" v-model="balanceAmount" class="form-control" placeholder="Сумма" aria-label="Сумма">
                  <div class="input-group-append">
                    <button class="btn btn-success" @click="updateBalance('credit')">Начислить баланс</button>
                    <button class="btn btn-warning" @click="updateBalance('debit')">Списать с баланса</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Депозиты</h5>
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
              </div>
            </div>
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Выводы предметов</h5>
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
              </div>
            </div>
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title">Ставки</h5>
                <table class="table table-hover mt-3">
                  <thead class="thead-light">
                  <tr>
                    <th scope="col">Игра</th>
                    <th scope="col">Исход</th>
                    <th scope="col">Сумма</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="bet in user.bets" :key="bet.id">
                    <td>{{ bet.game_name }}</td>
                    <td>{{ bet.outcome }}</td>
                    <td>{{ bet.amount }}$</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-warning">
      <p>Пользователь не найден</p>
    </div>

    <!-- Toast Notification -->
    <div v-if="showNotification" class="toast show align-items-center text-white bg-success border-0 position-fixed bottom-0 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          {{ notificationMessage }}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="showNotification = false"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useUser } from '@/composables/users/card/useUser';
import { useRoute } from 'vue-router';

const { user, balanceAmount, fetchUser, banUser, unbanUser, updateBalance, notificationMessage, showNotification } = useUser();
const route = useRoute();

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

.btn {
  margin-top: 20px;
}

.balance-management .input-group-append button {
  margin-left: 10px;
}

.toast {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1050;
}
</style>
