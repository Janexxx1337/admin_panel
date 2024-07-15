<template>
  <div class="container">
    <el-container>
      <el-aside width="300px">
        <div class="inventory">
          <div class="inventory_bets">
            <h1>Ставки</h1>
            <ul>
              <li @click="selectBet('X2')">X2</li>
              <li @click="selectBet('X3')">X3</li>
              <li @click="selectBet('X5')">X5</li>
              <li @click="selectBet('X50')">X50</li>
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
              :total="inventoryItems.length"
              :page-size="pageSize"
              @current-change="handleInventoryPageChange"
          ></el-pagination>
        </div>
      </el-aside>

      <el-main>
        <div class="game_details">
          <div class="game_details-cards">
            <el-card>
              <span>Игра #2299292</span>
            </el-card>
            <el-card>
              <span>БАНК</span>
              <span>150000044$</span>
            </el-card>
            <el-card>
              <span>Айтемы</span>
              <span>34</span>
            </el-card>
            <el-card>
              <span>Игроки</span>
              <span>15</span>
            </el-card>
            <el-card>
              <span>Выиграшнная ставка</span>
              <br/>
              <span>{{ winningBet }}</span>
            </el-card>
            <el-card>
              <span>Выиграшнный билет</span>
              <span>150000044$</span>
            </el-card>
            <el-card>
              <span>Хеш игры</span>
              <span>423434394939BFjdfnfdjdfi992</span>
            </el-card>
          </div>
        </div>
        <el-divider></el-divider>
        <h2>Таблица с предметами</h2>
        <el-table :data="pagedItems" style="width: 100%">
          <el-table-column prop="playerName" label="Имя игрока" width="150"></el-table-column>
          <el-table-column prop="quantity" label="Кол-во предметов" width="180">
            <template v-slot="scope">
              <div @click="showDetails(scope.row)" class="item-details">
                <img v-for="(img, index) in scope.row.images" :key="index" :src="img" alt="item" class="table-item-image"/>
                {{ scope.row.quantity > 2 ? scope.row.quantity + " +" : scope.row.quantity }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="bet" label="Ставка" width="120"></el-table-column>
          <el-table-column prop="status" label="Статус" width="150">
            <template v-slot="scope">
              <el-tag :type="scope.row.bet === winningBet ? 'success' : 'danger'">
                {{ scope.row.bet === winningBet ? 'Выиграно' : 'Проиграно' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="Время" width="180"></el-table-column>
          <el-table-column prop="total" label="Сумма ($)" width="150"></el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="items.length"
            :page-size="pageSize"
            @current-change="handlePageChange"
        ></el-pagination>
      </el-main>
    </el-container>

    <el-dialog :visible.sync="dialogVisible" title="Детали предметов">
      <div v-if="selectedItem">
        <p><strong>Игрок:</strong> {{ selectedItem.playerName }}</p>
        <p><strong>Ставка:</strong> {{ selectedItem.bet }}</p>
        <p><strong>Сумма:</strong> {{ selectedItem.total }}$</p>
        <div class="item-images">
          <img v-for="(img, index) in selectedItem.images" :key="index" :src="img" alt="item" class="dialog-item-image"/>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const items = ref([
  {
    playerName: 'Игрок 1',
    quantity: 2,
    bet: 'X2',
    status: 'won',
    time: '2023-07-15 12:34:56',
    total: 200,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  },
  {
    playerName: 'Игрок 2',
    quantity: 3,
    bet: 'X3',
    status: 'placed',
    time: '2023-07-15 13:00:00',
    total: 400,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  },
  {
    playerName: 'Игрок 3',
    quantity: 1,
    bet: 'X5',
    status: 'won',
    time: '2023-07-15 14:15:30',
    total: 600,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  },
  {
    playerName: 'Игрок 4',
    quantity: 5,
    bet: 'X50',
    status: 'placed',
    time: '2023-07-15 15:45:00',
    total: 800,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  },
  {
    playerName: 'Игрок 5',
    quantity: 2,
    bet: 'X3',
    status: 'won',
    time: '2023-07-15 16:20:15',
    total: 1000,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  },
  {
    playerName: 'Игрок 6',
    quantity: 4,
    bet: 'X2',
    status: 'placed',
    time: '2023-07-15 17:30:00',
    total: 1200,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  },
  {
    playerName: 'Игрок 7',
    quantity: 6,
    bet: 'X3',
    status: 'won',
    time: '2023-07-15 18:45:30',
    total: 1400,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  },
  {
    playerName: 'Игрок 8',
    quantity: 2,
    bet: 'X5',
    status: 'placed',
    time: '2023-07-15 19:00:00',
    total: 1600,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  },
  {
    playerName: 'Игрок 9',
    quantity: 1,
    bet: 'X50',
    status: 'won',
    time: '2023-07-15 20:15:45',
    total: 1800,
    images: ['https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg']
  }
]);

const inventoryItems = ref([
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
  { image: 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PXJZzhO7eO3g5C0m_7zO6-fwjgDscYh3r7E9N2t0Q2y-EtoZTjydY6UdwU3MwnSq1O5x-jq1JO46YOJlyV_32xwKg' },
]);

const dialogVisible = ref(false);
const selectedItem = ref(null);
const currentPage = ref(1);
const pageSize = ref(5);
const inventoryPage = ref(1);
const winningBet = ref('X3');

const pagedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return items.value.slice(start, end);
});
const pagedInventoryItems = computed(() => {
  const start = (inventoryPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return inventoryItems.value.slice(start, end);
});

function handlePageChange(page) {
  currentPage.value = page;
}

function handleInventoryPageChange(page) {
  inventoryPage.value = page;
}

function showDetails(item) {
  selectedItem.value = item;
  dialogVisible.value = true;
}

function selectBet(bet) {
  winningBet.value = bet;
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

.table-item-image {
  width: 30px;
  height: 30px;
  margin: 0 5px;
}

.item-details {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.dialog-item-image {
  width: 50px;
  height: 50px;
  margin: 5px;
}
</style>
