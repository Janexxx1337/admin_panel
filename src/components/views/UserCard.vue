<template>
  <div class="container mt-4">
    <el-card v-if="user" shadow="hover">
      <div slot="header" class="card-header">
        <div class="user-info">
          <el-avatar :size="100" :src="user.avatar || 'https://via.placeholder.com/100'"></el-avatar>
          <h2 class="card-title mt-3">{{ user.nickname }}</h2>
        </div>
      </div>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <h5 class="card-title">Информация о пользователе</h5>
            <p><strong>ID:</strong> {{ user.id }}</p>
            <p><strong>Баланс:</strong> {{ user.balance }}</p>
            <p><strong>Статус оплаты:</strong>
              <el-tag :type="user.payment_status === 'completed' ? 'success' : 'warning'">
                {{ user.payment_status }}
              </el-tag>
            </p>
            <p><strong>Статус бана:</strong>
              <el-tag :type="user.banned ? 'danger' : 'success'">
                {{ user.banned ? 'Забанен' : 'Активен' }}
              </el-tag>
            </p>
            <div class="text-center">
              <el-button v-if="!user.banned" type="danger" @click="banUser">Забанить пользователя</el-button>
              <el-button v-if="user.banned" type="success" @click="unbanUser">Разбанить пользователя</el-button>
            </div>
          </el-card>
          <el-card>
            <h5 class="card-title">Управление балансом</h5>
            <el-input-number v-model="balanceAmount" placeholder="Сумма" class="w-100"></el-input-number>
            <div class="mt-3">
              <el-button type="success" @click="updateBalance('credit')">Начислить баланс</el-button>
              <el-button type="warning" @click="updateBalance('debit')">Списать с баланса</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-collapse>
            <el-collapse-item title="Депозиты" name="1">
              <el-table :data="user.deposits" stripe border style="width: 100%">
                <el-table-column prop="amount" label="Сумма"></el-table-column>
                <el-table-column prop="date" label="Дата">
                  <template #default="scope">
                    {{ new Date(scope.row.date).toLocaleDateString() }}
                  </template>
                </el-table-column>
                <el-table-column prop="provider" label="Провайдер"></el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="Выводы предметов" name="2">
              <el-table :data="user.withdrawals" stripe border style="width: 100%">
                <el-table-column prop="item_name" label="Предмет"></el-table-column>
                <el-table-column prop="status" label="Статус"></el-table-column>
                <el-table-column prop="request_date" label="Дата запроса">
                  <template #default="scope">
                    {{ new Date(scope.row.request_date).toLocaleDateString() }}
                  </template>
                </el-table-column>
              </el-table>
            </el-collapse-item>
            <el-collapse-item title="Ставки" name="3">
              <el-table :data="user.bets" stripe border style="width: 100%">
                <el-table-column prop="game_name" label="Игра"></el-table-column>
                <el-table-column prop="outcome" label="Исход"></el-table-column>
                <el-table-column prop="amount" label="Сумма"></el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
    </el-card>
    <el-alert v-else title="Пользователь не найден" type="warning" show-icon></el-alert>

    <!-- Toast Notification -->
    <el-notification
        v-if="showNotification"
        :title="notificationTitle"
        :message="notificationMessage"
        type="success"
        :duration="3000"
        position="bottom-right"
        @close="showNotification = false"
    />
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

.card-title {
  margin: 0;
  font-weight: 500;
  color: #333;
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem;
}
</style>
