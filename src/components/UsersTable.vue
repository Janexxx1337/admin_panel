<template>
  <div class="d-flex">
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
          <th scope="col">Статус бана</th>
          <th scope="col">Действия</th>
          <th scope="col">Транзакции</th>
          <th scope="col">Перейти</th> <!-- Новая колонка -->
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.nickname }}</td>
          <td>{{ user.balance }}</td>
          <td :class="{'text-success': user.payment_status === 'completed', 'text-danger': user.payment_status === 'pending'}">
            {{ user.payment_status }}
          </td>
          <td>
              <span :class="{'badge bg-danger': user.banned, 'badge bg-success': !user.banned}">
                {{ user.banned ? 'Забанен' : 'Активен' }}
              </span>
          </td>
          <td @click.stop>
            <select v-model="user.payment_status" @change="updateStatus(user)" class="form-select form-select-sm">
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </td>
          <td @click.stop>
            <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse"
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
          <td>
            <button class="btn btn-secondary btn-sm" @click="goToUser(user.id)">
              Перейти <i class="bi bi-arrow-right"></i> <!-- Стрелка -->
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUsers } from '@/composables/admin/useUsers';

const { users, updateStatus } = useUsers();
const router = useRouter();

const goToUser = (userId) => {
  router.push(`/user/${userId}`);
};
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
  text-align: center;
}

.table th {
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
