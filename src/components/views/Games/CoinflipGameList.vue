<template>
  <el-container class="mt-4 container">
    <el-header>
      <h1>Coinflip Games</h1>
    </el-header>

    <el-tabs v-model="currentTab">
      <el-tab-pane label="Completed Games" name="completed">
        <div v-if="loading" class="text-center">
          <el-loading :fullscreen="true" lock>
            <span>Loading...</span>
          </el-loading>
        </div>
        <div v-else>
          <h2>Completed Games</h2>
          <el-table :data="paginatedCompletedGames" style="width: 100%" stripe border>
            <el-table-column prop="date" label="Date" sortable>
              <template #default="scope">
                {{ new Date(scope.row.date).toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column prop="players" label="Players" sortable></el-table-column>
            <el-table-column label="Items">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.items.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.items.length > 2" class="item-more">
                    +{{ scope.row.items.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.items) }}$</div>
              </template>
            </el-table-column>
            <el-table-column prop="bank" label="Bank" sortable>
              <template #default="scope">
                {{ calculateTotalPrice(scope.row.items) }}$
              </template>
            </el-table-column>
            <el-table-column prop="winner" label="Winner" sortable>
              <template #default="scope">
                {{ scope.row.winner || 'N/A' }}
              </template>
            </el-table-column>
            <el-table-column prop="winner_ticket" label="Winner Ticket" sortable></el-table-column>
            <el-table-column prop="game_value" label="Game Value" sortable></el-table-column>
            <el-table-column label="Actions">
              <template #default="scope">
                <router-link :to="{ name: 'CoinflipGameDetail', params: { id: scope.row.id } }">
                  <el-button type="primary">Details</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="games.length"
              :page-size="pageSize"
              @current-change="handleCurrentChangeCompleted"
          ></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Active Games" name="active">
        <div v-if="loading" class="text-center">
          <el-loading :fullscreen="true" lock>
            <span>Loading...</span>
          </el-loading>
        </div>
        <div v-else>
          <h2>Active Games</h2>
          <el-table :data="paginatedActiveGames" style="width: 100%" stripe border>
            <el-table-column prop="date" label="Date" sortable>
              <template #default="scope">
                {{ new Date(scope.row.date).toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column prop="players" label="Players" sortable></el-table-column>
            <el-table-column label="Items">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.items.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.items.length > 2" class="item-more">
                    +{{ scope.row.items.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.items) }}$</div>
              </template>
            </el-table-column>
            <el-table-column prop="bank" label="Bank" sortable>
              <template #default="scope">
                {{ calculateTotalPrice(scope.row.items) }}$
              </template>
            </el-table-column>
            <el-table-column prop="winner_ticket" label="Winner Ticket" sortable></el-table-column>
            <el-table-column prop="game_value" label="Game Value" sortable></el-table-column>
            <el-table-column label="Actions">
              <template #default="scope">
                <router-link :to="{ name: 'CoinflipGameDetail', params: { id: scope.row.id } }">
                  <el-button type="primary">Details</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="activeGames.length"
              :page-size="pageSize"
              @current-change="handleCurrentChangeActive"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';

const games = ref([]);
const activeGames = ref([]);
const loading = ref(false);
const currentTab = ref('completed');
const pageSize = ref(2);
const currentPageCompleted = ref(1);
const currentPageActive = ref(1);

const paginatedCompletedGames = computed(() => {
  const start = (currentPageCompleted.value - 1) * pageSize.value;
  return games.value.slice(start, start + pageSize.value);
});

const paginatedActiveGames = computed(() => {
  const start = (currentPageActive.value - 1) * pageSize.value;
  return activeGames.value.slice(start, start + pageSize.value);
});

const fetchGames = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:8000/coinflipgame/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    games.value = data.game_details;
  } catch (error) {
    console.error('Error fetching games:', error);
  } finally {
    loading.value = false;
  }
};

const fetchActiveGames = async () => {
  try {
    loading.value = true;
    const response = await fetch('http://localhost:8000/coinflipgame/activegames/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    activeGames.value = data.active_games;
  } catch (error) {
    console.error('Error fetching active games:', error);
  } finally {
    loading.value = false;
  }
};

const imageError = (event) => {
  event.target.src = 'https://via.placeholder.com/100x50?text=No+Image';
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

const handleCurrentChangeCompleted = (page) => {
  currentPageCompleted.value = page;
};

const handleCurrentChangeActive = (page) => {
  currentPageActive.value = page;
};

onMounted(() => {
  fetchGames();
  fetchActiveGames();
});
</script>
<style scoped>
.el-table {
  margin-top: 20px;
}

.item-list {
  display: flex;
  flex-direction: column;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.item-image {
  width: 100px;
  height: 50px;
  object-fit: cover;
  margin-right: 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.item-image:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.item span {
  font-size: 14px;
}

.item-more {
  font-size: 14px;
  color: #007bff;
  cursor: pointer;
  margin-top: 8px;
}

.item-more:hover {
  text-decoration: underline;
}

.total-price {
  font-weight: bold;
  margin-top: 5px;
}
</style>
