<template>
  <el-container class="mt-4 container">
    <el-header>
      <h1>Wheel Games</h1>
    </el-header>

    <el-tabs v-model="currentTab" type="border-card">
      <el-tab-pane label="Completed Games" name="completed">
        <div v-if="loading" class="text-center">
          <el-loading :fullscreen="true" lock>
            <span>Loading...</span>
          </el-loading>
        </div>
        <div v-else>
          <h2>Completed Games</h2>
          <el-table :data="paginatedCompletedGames" style="width: 100%" stripe border>
            <el-table-column prop="game_id" label="Game ID" sortable></el-table-column>
            <el-table-column prop="date" label="Date" sortable>
              <template #default="scope">
                {{ new Date(scope.row.date).toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column prop="bank" label="Bank">
              <template #default="scope">
                {{ calculateTotalPrice([...scope.row.x2_wins, ...scope.row.x3_wins, ...scope.row.x5_wins, ...scope.row.x50_wins]) }}$
              </template>
            </el-table-column>
            <el-table-column prop="players" label="Players" sortable></el-table-column>
            <el-table-column label="X2 Amount">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.x2_wins.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.x2_wins.length > 2" class="item-more">
                    +{{ scope.row.x2_wins.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.x2_wins) }}$</div>
              </template>
            </el-table-column>
            <el-table-column label="X3 Amount">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.x3_wins.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.x3_wins.length > 2" class="item-more">
                    +{{ scope.row.x3_wins.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.x3_wins) }}$</div>
              </template>
            </el-table-column>
            <el-table-column label="X5 Amount">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.x5_wins.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.x5_wins.length > 2" class="item-more">
                    +{{ scope.row.x5_wins.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.x5_wins) }}$</div>
              </template>
            </el-table-column>
            <el-table-column label="X50 Amount">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.x50_wins.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.x50_wins.length > 2" class="item-more">
                    +{{ scope.row.x50_wins.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.x50_wins) }}$</div>
              </template>
            </el-table-column>
            <el-table-column prop="winner" label="Winner" sortable>
              <template #default="scope">
                {{ scope.row.winner || 'N/A' }}
              </template>
            </el-table-column>
            <el-table-column label="Actions">
              <template #default="scope">
                <router-link :to="{ name: 'WheelGameDetail', params: { id: scope.row.game_id } }">
                  <el-button type="primary">Детали</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="filteredCompletedGames.length"
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
            <el-table-column prop="game_id" label="Game ID" sortable></el-table-column>
            <el-table-column prop="date" label="Date" sortable>
              <template #default="scope">
                {{ new Date(scope.row.date).toLocaleString() }}
              </template>
            </el-table-column>
            <el-table-column prop="bank" label="Bank">
              <template #default="scope">
                {{ calculateTotalPrice([...scope.row.x2_wins, ...scope.row.x3_wins, ...scope.row.x5_wins, ...scope.row.x50_wins]) }}$
              </template>
            </el-table-column>
            <el-table-column prop="players" label="Players" sortable></el-table-column>
            <el-table-column label="X2 Amount">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.x2_wins.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.x2_wins.length > 2" class="item-more">
                    +{{ scope.row.x2_wins.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.x2_wins) }}$</div>
              </template>
            </el-table-column>
            <el-table-column label="X3 Amount">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.x3_wins.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.x3_wins.length > 2" class="item-more">
                    +{{ scope.row.x3_wins.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.x3_wins) }}$</div>
              </template>
            </el-table-column>
            <el-table-column label="X5 Amount">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.x5_wins.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.x5_wins.length > 2" class="item-more">
                    +{{ scope.row.x5_wins.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.x5_wins) }}$</div>
              </template>
            </el-table-column>
            <el-table-column label="X50 Amount">
              <template #default="scope">
                <div class="item-list">
                  <div v-for="(item, index) in scope.row.x50_wins.slice(0, 2)" :key="index" class="item">
                    <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                    <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                  </div>
                  <div v-if="scope.row.x50_wins.length > 2" class="item-more">
                    +{{ scope.row.x50_wins.length - 2 }} more
                  </div>
                </div>
                <div class="total-price">Total: {{ calculateTotalPrice(scope.row.x50_wins) }}$</div>
              </template>
            </el-table-column>
            <el-table-column prop="winner" label="Winner" sortable>
              <template #default="scope">
                {{ scope.row.winner || 'N/A' }}
              </template>
            </el-table-column>
            <el-table-column label="Actions">
              <template #default="scope">
                <router-link :to="{ name: 'WheelGameDetail', params: { id: scope.row.game_id } }">
                  <el-button type="primary">Детали</el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="filteredActiveGames.length"
              :page-size="pageSize"
              @current-change="handleCurrentChangeActive"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { wheelGamesData } from '@/data/WheelGames';

const completedGames = ref(wheelGamesData.completedGames);
const activeGames = ref(wheelGamesData.activeGames);
const loading = ref(false);
const currentTab = ref('completed');
const pageSize = ref(2);
const currentPageCompleted = ref(1);
const currentPageActive = ref(1);

const paginatedCompletedGames = computed(() => {
  const start = (currentPageCompleted.value - 1) * pageSize.value;
  return filteredCompletedGames.value.slice(start, start + pageSize.value);
});

const paginatedActiveGames = computed(() => {
  const start = (currentPageActive.value - 1) * pageSize.value;
  return filteredActiveGames.value.slice(start, start + pageSize.value);
});

const filteredCompletedGames = computed(() => {
  return completedGames.value;
});

const filteredActiveGames = computed(() => {
  return activeGames.value;
});

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
