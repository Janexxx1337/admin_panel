<template>
  <div class="container mt-4">
    <h1>Coinflip Games</h1>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a class="nav-link" :class="{ active: currentTab === 'completed' }" @click="currentTab = 'completed'">Completed Games</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" :class="{ active: currentTab === 'active' }" @click="currentTab = 'active'">Active Games</a>
      </li>
    </ul>

    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div v-else>
      <div v-if="currentTab === 'completed'">
        <h2>Completed Games</h2>
        <table class="table table-bordered table-striped">
          <thead>
          <tr>
            <th>Date</th>
            <th>Players</th>
            <th>Items</th>
            <th>Bank</th>
            <th>Winner</th>
            <th>Winner Ticket</th>
            <th>Game Value</th>
            <th>Details</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="game in games" :key="game.id">
            <td>{{ new Date(game.date).toLocaleString() }}</td>
            <td>{{ game.players }}</td>
            <td>
              <div class="item-list">
                <div v-for="(item, index) in game.items.slice(0, 2)" :key="index" class="item">
                  <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                  <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                </div>
                <div v-if="game.items.length > 2" class="item-more">
                  +{{ game.items.length - 2 }} more
                </div>
              </div>
              <div class="total-price">Total: {{ calculateTotalPrice(game.items) }}$</div>
            </td>
            <td>{{ calculateTotalPrice(game.items) }}$</td>
            <td>{{ game.winner || 'N/A' }}</td>
            <td>{{ game.winner_ticket }}</td>
            <td>{{ game.game_value }}</td>
            <td>
              <router-link :to="{ name: 'CoinflipGameDetail', params: { id: game.id } }" class="btn btn-primary">Детали</router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-else>
        <h2>Active Games</h2>
        <table class="table table-bordered table-striped">
          <thead>
          <tr>
            <th>Date</th>
            <th>Players</th>
            <th>Items</th>
            <th>Bank</th>
            <th>Winner Ticket</th>
            <th>Game Value</th>
            <th>Details</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="game in activeGames" :key="game.id">
            <td>{{ new Date(game.date).toLocaleString() }}</td>
            <td>{{ game.players }}</td>
            <td>
              <div class="item-list">
                <div v-for="(item, index) in game.items.slice(0, 2)" :key="index" class="item">
                  <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                  <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
                </div>
                <div v-if="game.items.length > 2" class="item-more">
                  +{{ game.items.length - 2 }} more
                </div>
              </div>
              <div class="total-price">Total: {{ calculateTotalPrice(game.items) }}$</div>
            </td>
            <td>{{ calculateTotalPrice(game.items) }}$</td>
            <td>{{ game.winner_ticket }}</td>
            <td>{{ game.game_value }}</td>
            <td>
              <router-link :to="{ name: 'CoinflipGameDetail', params: { id: game.id } }" class="btn btn-primary">Детали</router-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const games = ref([]);
const activeGames = ref([]);
const loading = ref(false);
const currentTab = ref('completed');

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
  event.target.src = 'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8j3KqnUjlRd4cJ5nqfC9Inz3VHtrRJrNmj6d4XEdlBqZw7R-VTqxr-6hJS-uJjAm3FnsnQi-z-DyGAd0sdD';
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price, 0);
};

onMounted(() => {
  fetchGames();
  fetchActiveGames();
});
</script>

<style scoped>
.table {
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

.spinner-border {
  width: 3rem;
  height: 3rem;
}

.spinner-border .sr-only {
  display: none;
}

.nav-tabs {
  margin-top: 20px;
}

.nav-item {
  cursor: pointer;
}
</style>
