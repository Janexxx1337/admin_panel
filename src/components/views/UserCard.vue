<template>
  <div class="container mt-4">
    <div v-if="user" class="card shadow-sm">
      <div class="card-header bg-light text-center">
        <div class="user-info">
          <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="#e8eaed"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
          <h2 class="card-title mt-3">{{ user.nickname }}</h2>
        </div>
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

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
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
