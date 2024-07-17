<template>
  <div class="container">
    <el-container>
      <el-aside width="300px">
        <div class="inventory">
          <el-button @click="goBack" class="back-button">
            <span class="material-symbols-outlined">arrow_back</span>
            <span>Назад</span>
          </el-button>
          <div class="inventory_bets">
            <h1>Ставки</h1>
            <ul>
              <li
                  v-for="bet in bets"
                  :key="bet"
                  @click="selectBet(bet)"
                  :class="{ active: bet === winningBet }"
              >
                {{ bet }}
              </li>
            </ul>
          </div>
          <h2>Поставленные предметы</h2>
          <div class="inventory_items">
            <img
                v-for="(item, index) in pagedInventoryItems"
                :key="index"
                :src="item.image"
                alt="item"
            />
          </div>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="selectedItems.length"
              :page-size="pageSize"
              v-if="selectedItems.length > pageSize"
              @current-change="handleInventoryPageChange"
          ></el-pagination>
        </div>
      </el-aside>

      <el-main>
        <el-tabs v-model="activeTab" type="border-card">
          <div class="game_details">
            <div class="game_details-cards">
              <el-card class="game-card">
                <div class="game-card-content">
                  <span class="game-card-title">Игра</span>
                  <span>#2299292</span>
                </div>
              </el-card>
              <el-card class="game-card">
                <div class="game-card-content">
                  <span class="game-card-title">БАНК</span>
                  <span>150000044$</span>
                </div>
              </el-card>
              <el-card class="game-card">
                <div class="game-card-content">
                  <span class="game-card-title">Айтемы</span>
                  <span>34</span>
                </div>
              </el-card>
              <el-card class="game-card">
                <div class="game-card-content">
                  <span class="game-card-title">Игроки</span>
                  <span>15</span>
                </div>
              </el-card>
              <el-card class="game-card">
                <div class="game-card-content">
                  <span class="game-card-title">Выиграшнная ставка</span>
                  <span>{{ winningBet }}</span>
                </div>
              </el-card>
              <el-card class="game-card">
                <div class="game-card-content">
                  <span class="game-card-title">Выиграшнный билет</span>
                  <span>150000044$</span>
                </div>
              </el-card>
              <el-card class="game-card">
                <div class="game-card-content">
                  <span class="game-card-title">Хеш игры</span>
                  <span>423434394939BFjdfnfdjdfi992</span>
                </div>
              </el-card>
            </div>
          </div>
          <el-tab-pane label="Таблица ставок" name="bets">

            <el-divider></el-divider>
            <h2>Таблица ставок</h2>
            <el-collapse>
              <el-collapse-item
                  v-for="(betGroup, index) in pagedGroupedBets"
                  :title="`Ставка ${betGroup.bet} - Игрок: ${betGroup.items[0]?.playerName}`"
                  :name="index"
                  :key="index"
              >
                <el-table
                    :data="betGroup.items || []"
                    style="width: 100%"
                    @row-click="selectRow"
                    :row-class-name="getRowClassName"
                    stripe border
                >
                  <el-table-column prop="weapon_id" label="ID предмета" width="150"></el-table-column>
                  <el-table-column prop="weapon_img" label="Предмет" width="150">
                    <template v-slot="scope">
                      <img :src="scope.row.weapon_img" alt="item" class="table-item-image"/>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="Стоимость предмета ($)" width="150"></el-table-column>
                  <el-table-column prop="time" label="Время ставки" width="200"></el-table-column>
                </el-table>
                <div class="table-footer">
                  <strong>Общая стоимость: {{ calculateTotalAmount(betGroup.items) }}$</strong>
                </div>
              </el-collapse-item>
            </el-collapse>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="groupedBets.length"
                :page-size="pageSize"
                v-if="groupedBets.length > pageSize"
                @current-change="handlePageChange"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="Выигрышные ставки" name="winning-bets">
            <h2>Выигрышные ставки</h2>
            <el-collapse>
              <el-collapse-item
                  v-for="(betGroup, index) in pagedWinningGroupedBets"
                  :title="`Ставка ${betGroup.bet} - Игрок: ${betGroup.items[0]?.playerName}`"
                  :name="index"
                  :key="index"
              >
                <el-table
                    :data="betGroup.items || []"
                    style="width: 100%"
                    @row-click="selectRow"
                    :row-class-name="getRowClassName"
                    stripe border
                >
                  <el-table-column prop="weapon_id" label="ID предмета" width="150"></el-table-column>
                  <el-table-column prop="weapon_img" label="Предмет" width="150">
                    <template v-slot="scope">
                      <img :src="scope.row.weapon_img" alt="item" class="table-item-image"/>
                    </template>
                  </el-table-column>
                  <el-table-column prop="amount" label="Стоимость предмета ($)" width="150"></el-table-column>
                  <el-table-column prop="time" label="Время ставки" width="200"></el-table-column>
                </el-table>
                <div class="table-footer">
                  <strong>Общая стоимость: {{ calculateTotalAmount(betGroup.items) }}$</strong>
                </div>
              </el-collapse-item>
            </el-collapse>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="winningGroupedBets.length"
                :page-size="pageSize"
                v-if="winningGroupedBets.length > pageSize"
                @current-change="handleWinningPageChange"
            ></el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { items } from '@/data/WheelDetails.js';
import { winningItems } from '@/data/WheelDetails.js';

const selectedItems = ref([]);
const selectedRow = ref(null);
const winningPage = ref(1);

const bets = ['X2', 'X3', 'X5', 'X50'];

const currentPage = ref(1);
const pageSize = ref(5);
const inventoryPage = ref(1);
const winningBet = ref('X3');
const activeTab = ref('bets');

const pagedInventoryItems = computed(() => {
  const start = (inventoryPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return selectedItems.value.slice(start, end);
});

const groupedBets = computed(() => {
  return items;
});

const winningGroupedBets = computed(() => {
  const groups = winningItems.reduce((acc, item) => {
    if (!acc[item.bet]) {
      acc[item.bet] = { bet: item.bet, items: [] };
    }
    acc[item.bet].items.push(item);
    return acc;
  }, {});
  return Object.values(groups);
});

const pagedWinningGroupedBets = computed(() => {
  const start = (winningPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return winningGroupedBets.value.slice(start, end);
});

const pagedGroupedBets = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return groupedBets.value.slice(start, end);
});

const winningBets = computed(() => {
  return items.flatMap(group => group.items.filter(item => item.status === 'won'));
});

function handlePageChange(page) {
  currentPage.value = page;
}

function handleInventoryPageChange(page) {
  inventoryPage.value = page;
}

function selectBet(bet) {
  winningBet.value = bet;
}

function selectRow(row) {
  selectedRow.value = row;
  selectedItems.value = Array(row.quantity).fill().map((_, index) => ({
    image: row.weapon_img,
    index
  }));
}

function getRowClassName({ row }) {
  return row === selectedRow.value ? 'row-active' : '';
}

function calculateTotalAmount(items) {
  return items.reduce((total, item) => total + item.amount, 0);
}

const router = useRouter();

function goBack() {
  router.back();
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inventory_items {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.inventory_items img {
  width: 25%;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem;
}

.game_details-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

ul {
  display: flex;
  gap: 0.5rem;
  padding: 0;
}

ul li {
  list-style: none;
  border: 1px solid goldenrod;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

ul li.active {
  background-color: #f0c674;
  color: white;
}

.table-item-image {
  width: 30px;
  height: 30px;
  margin: 0 5px;
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

:deep(.row-active) {
  background-color: #f0f8ff;
}

:deep(.el-table__row) {
  cursor: pointer;
}

.table-footer {
  text-align: right;
  margin-top: 10px;
  font-weight: bold;
}
</style>
