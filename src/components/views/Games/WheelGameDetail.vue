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
        <el-divider></el-divider>
        <h2>Таблица с предметами</h2>
        <el-collapse>
          <el-collapse-item
              v-for="(betGroup, index) in pagedGroupedBets"
              :title="`Ставка ${betGroup.bet}`"
              :name="index"
              :key="index"
          >
            <el-table :data="betGroup.items || []" style="width: 100%" @row-click="selectRow">
              <el-table-column prop="playerName" label="Имя игрока" width="150"></el-table-column>
              <el-table-column prop="weapon_id" label="ID предмета" width="150"></el-table-column>
              <el-table-column prop="weapon_img" label="Предмет" width="150">
                <template v-slot="scope">
                  <img :src="scope.row.weapon_img" alt="item" class="table-item-image" />
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="Стоимость предмета ($)" width="150"></el-table-column>
              <el-table-column prop="time" label="Время ставки" width="200"></el-table-column>
            </el-table>
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
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useRouter} from 'vue-router';
import {items} from '@/data/data.js';

const selectedItems = ref([]);

const bets = ['X2', 'X3', 'X5', 'X50', 'X50', 'X50'];

const currentPage = ref(1);
const pageSize = ref(5);
const inventoryPage = ref(1);
const winningBet = ref('X3');

const pagedInventoryItems = computed(() => {
  const start = (inventoryPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return selectedItems.value.slice(start, end);
});

const groupedBets = computed(() => {
  console.log('Computing groupedBets');
  const groups = items.reduce((acc, item) => {
    acc.push({bet: item.bet, items: [item]});
    return acc;
  }, []);
  return groups;
});

const pagedGroupedBets = computed(() => {
  console.log('Computing pagedGroupedBets');
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return groupedBets.value.slice(start, end);
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
  selectedItems.value = Array(row.quantity).fill().map((_, index) => ({
    image: row.weapon_img,
    index
  }));
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
</style>
