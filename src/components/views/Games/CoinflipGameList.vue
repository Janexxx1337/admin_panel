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
              <button @click="openModal(game)" class="btn btn-primary">Детали</button>
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
              <button @click="openModal(game)" class="btn btn-primary">Details</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal" tabindex="-1" role="dialog" style="display: block; background: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Game Details</h5>
            <button type="button" class="close" @click="closeModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><strong>Date:</strong> {{ new Date(selectedGame.date).toLocaleString() }}</p>
            <p><strong>Players:</strong> {{ selectedGame.players }}</p>
            <p><strong>Bank:</strong> {{ calculateTotalPrice(selectedGame.items) }}$</p>
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div v-for="(item, index) in selectedGame.items" :key="index" :class="['carousel-item', { active: index === 0 }]">
                  <img :src="item.image_url" :alt="item.name" class="d-block w-100" @error="imageError" />
                  <div class="carousel-caption d-none d-md-block">
                    <h5>{{ item.name }}</h5>
                    <p>{{ item.rarity }} - {{ item.price }}$</p>
                  </div>
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
            <p><strong>Winner:</strong> {{ selectedGame.winner }}</p>
            <p><strong>Winner Ticket:</strong> {{ selectedGame.winner_ticket }}</p>
            <p><strong>Game Value:</strong> {{ selectedGame.game_value }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const games = ref([]);
const activeGames = ref([]);
const selectedGame = ref(null);
const showModal = ref(false);
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

const openModal = (game) => {
  selectedGame.value = game;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
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

.modal-content {
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
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

.carousel-inner .carousel-item {
  transition: transform 0.6s ease-in-out;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1);
}

</style>
