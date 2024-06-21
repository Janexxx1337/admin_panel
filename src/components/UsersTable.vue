<template>
  <div class="d-flex">
    <!-- Включение Sidebar -->
    <Sidebar />
    <!-- Основное содержимое -->
    <div class="container mt-4">
      <h1>Пользователи CaseStore</h1>
      <table class="table table-hover">
        <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Никнейм</th>
          <th scope="col">Баланс</th>
          <th scope="col">Статус оплаты</th>
          <th scope="col">Действия</th>
          <th scope="col">Транзакции</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.nickname }}</td>
          <td>{{ user.balance }}</td>
          <td :class="{'text-success':
           user.payment_status === 'completed',
           'text-danger':
            user.payment_status === 'pending'}">
            {{ user.payment_status }}
          </td>
          <td>
            <select v-model="user.payment_status" @change="updateStatus(user)">
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </td>
          <td>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                    :data-bs-target="'#transactions-' + user.id" aria-expanded="false"
                    :aria-controls="'transactions-' + user.id">
              Показать транзакции
            </button>
            <div :id="'transactions-' + user.id" class="collapse mt-2">
              <ul class="list-group">
                <li v-for="transaction in user.transactions" :key="transaction.id" class="list-group-item">
                  <span class="badge bg-info text-dark mr-2">{{ transaction.amount }}$</span>
                  <small class="text-muted">{{ transaction.transaction_date }}</small>
                  <p>{{ transaction.description }}</p>
                </li>
              </ul>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useUsers } from '@/composables/admin/useUsers';
import Sidebar from '@/components/Sidebar.vue';

const { users, updateStatus } = useUsers();
</script>

<style scoped>
.table th {
  vertical-align: top;
  border-bottom: 2px solid #dee2e6;
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
