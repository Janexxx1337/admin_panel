<template>
  <div class="container mt-4">
    <h1>Wheel Games</h1>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'completed' }" @click="activeTab = 'completed'">Completed Games</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: activeTab === 'active' }" @click="activeTab = 'active'">Active Games</a>
      </li>
    </ul>

    <div v-if="activeTab === 'completed'" class="tab">
      <h2>Completed Games</h2>
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
        <tr>
          <th>Game ID</th>
          <th>Date</th>
          <th>Bank</th>
          <th>Players</th>
          <th>X2 Amount</th>
          <th>X3 Amount</th>
          <th>X5 Amount</th>
          <th>X50 Amount</th>
          <th>Winner</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in completedGames" :key="game.id">
          <td>{{ game.game_id }}</td>
          <td>{{ new Date(game.date).toLocaleString() }}</td>
          <td>{{ calculateTotalPrice([...game.x2_wins, ...game.x3_wins, ...game.x5_wins, ...game.x50_wins]) }}$</td>
          <td>{{ game.players }}</td>
          <td>
            <div v-for="(item, index) in game.x2_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x2_wins.length > 2" class="item-more">
              +{{ game.x2_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x2_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x3_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x3_wins.length > 2" class="item-more">
              +{{ game.x3_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x3_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x5_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x5_wins.length > 2" class="item-more">
              +{{ game.x5_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x5_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x50_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x50_wins.length > 2" class="item-more">
              +{{ game.x50_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x50_wins) }}$</div>
          </td>
          <td>{{ game.winner || 'N/A' }}</td>
          <td>
            <router-link :to="{ name: 'WheelGameDetail', params: { id: game.id } }" class="btn btn-primary">
              Детали
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-else-if="activeTab === 'active'" class="tab">
      <h2>Active Games</h2>
      <table class="table table-striped table-hover table-bordered">
        <thead class="thead-dark">
        <tr>
          <th>Game ID</th>
          <th>Date</th>
          <th>Bank</th>
          <th>Players</th>
          <th>X2 Amount</th>
          <th>X3 Amount</th>
          <th>X5 Amount</th>
          <th>X50 Amount</th>
          <th>Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="game in activeGames" :key="game.id">
          <td>{{ game.game_id }}</td>
          <td>{{ new Date(game.date).toLocaleString() }}</td>
          <td>{{ calculateTotalPrice([...game.x2_wins, ...game.x3_wins, ...game.x5_wins, ...game.x50_wins]) }}$</td>
          <td>{{ game.players }}</td>
          <td>
            <div v-for="(item, index) in game.x2_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x2_wins.length > 2" class="item-more">
              +{{ game.x2_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x2_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x3_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x3_wins.length > 2" class="item-more">
              +{{ game.x3_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x3_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x5_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x5_wins.length > 2" class="item-more">
              +{{ game.x5_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x5_wins) }}$</div>
          </td>
          <td>
            <div v-for="(item, index) in game.x50_wins.slice(0, 2)" :key="index" class="item">
              <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
              <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
            </div>
            <div v-if="game.x50_wins.length > 2" class="item-more">
              +{{ game.x50_wins.length - 2 }} more
            </div>
            <div class="total-price">Total: {{ calculateTotalPrice(game.x50_wins) }}$</div>
          </td>
          <td>
            <router-link :to="{ name: 'WheelGameDetail', params: { id: game.id } }" class="btn btn-primary">
              Детали
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const completedGames = ref([]);
const activeGames = ref([]);
const activeTab = ref('completed');  // Для управления активной вкладкой

const fetchCompletedGames = async () => {
  try {
    const response = await fetch('http://localhost:8000/wheelgame/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const games = data.wheel_games;
    completedGames.value = games.filter(game => !game.is_active);
  } catch (error) {
    console.error('Error fetching completed games:', error);
  }
};

const fetchActiveGames = async () => {
  try {
    const response = await fetch('http://localhost:8000/wheelgame/activegames/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    activeGames.value = data.active_wheel_games;
  } catch (error) {
    console.error('Error fetching active games:', error);
  }
};

const imageError = (event) => {
  event.target.src = 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3KqnUjlRd4cJ5nqfC9Inz3VHtrRJrNmj6d4XEdlBqZw7R-VTqxr-6hJS-uJjAm3FnsnQi-z-DyGAd0sdD';
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

onMounted(() => {
  fetchCompletedGames();
  fetchActiveGames();
});
</script>

<style scoped>
.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table-hover tbody tr:hover {
  background-color: #f5f5f5;
}

.table thead th {
  background-color: #343a40;
  color: white;
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

.nav-link {
  cursor: pointer;
}
</style>
