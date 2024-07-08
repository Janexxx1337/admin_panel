<template>
  <div class="container mt-4">
    <h1>Wheel Games</h1>

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
        <th>Details</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in completedGames" :key="game.id">
        <td>{{ game.game_id }}</td>
        <td>{{ new Date(game.date).toLocaleString() }}</td>
        <td>{{ game.bank }}</td>
        <td>{{ game.players }}</td>
        <td>
          <div v-for="(item, index) in game.x2_wins.slice(0, 2)" :key="index" class="item">
            <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
            <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
          </div>
          <div v-if="game.x2_wins.length > 2" class="item-more">
            +{{ game.x2_wins.length - 2 }} more
          </div>
        </td>
        <td>
          <div v-for="(item, index) in game.x3_wins.slice(0, 2)" :key="index" class="item">
            <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
            <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
          </div>
          <div v-if="game.x3_wins.length > 2" class="item-more">
            +{{ game.x3_wins.length - 2 }} more
          </div>
        </td>
        <td>
          <div v-for="(item, index) in game.x5_wins.slice(0, 2)" :key="index" class="item">
            <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
            <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
          </div>
          <div v-if="game.x5_wins.length > 2" class="item-more">
            +{{ game.x5_wins.length - 2 }} more
          </div>
        </td>
        <td>
          <div v-for="(item, index) in game.x50_wins.slice(0, 2)" :key="index" class="item">
            <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
            <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
          </div>
          <div v-if="game.x50_wins.length > 2" class="item-more">
            +{{ game.x50_wins.length - 2 }} more
          </div>
        </td>
        <td>
          <button @click="openModal(game)" class="btn btn-primary">
            Детали
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <h2 class="mt-5">Active Games</h2>
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
        <td>{{ game.bank }}</td>
        <td>{{ game.players }}</td>
        <td>
          <div v-for="(item, index) in game.x2_wins.slice(0, 2)" :key="index" class="item">
            <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
            <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
          </div>
          <div v-if="game.x2_wins.length > 2" class="item-more">
            +{{ game.x2_wins.length - 2 }} more
          </div>
        </td>
        <td>
          <div v-for="(item, index) in game.x3_wins.slice(0, 2)" :key="index" class="item">
            <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
            <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
          </div>
          <div v-if="game.x3_wins.length > 2" class="item-more">
            +{{ game.x3_wins.length - 2 }} more
          </div>
        </td>
        <td>
          <div v-for="(item, index) in game.x5_wins.slice(0, 2)" :key="index" class="item">
            <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
            <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
          </div>
          <div v-if="game.x5_wins.length > 2" class="item-more">
            +{{ game.x5_wins.length - 2 }} more
          </div>
        </td>
        <td>
          <div v-for="(item, index) in game.x50_wins.slice(0, 2)" :key="index" class="item">
            <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
            <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
          </div>
          <div v-if="game.x50_wins.length > 2" class="item-more">
            +{{ game.x50_wins.length - 2 }} more
          </div>
        </td>
        <td>
          <button @click="openModal(game)" class="btn btn-primary">
            Детали
          </button>
        </td>
      </tr>
      </tbody>
    </table>

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
            <p><strong>Bank:</strong> {{ selectedGame.bank }}</p>
            <div class="item-list">
              <div v-for="(item, index) in selectedGame.x2_wins" :key="index" class="item">
                <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
              </div>
              <div v-for="(item, index) in selectedGame.x3_wins" :key="index" class="item">
                <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
              </div>
              <div v-for="(item, index) in selectedGame.x5_wins" :key="index" class="item">
                <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
              </div>
              <div v-for="(item, index) in selectedGame.x50_wins" :key="index" class="item">
                <img :src="item.image_url" :alt="item.name" class="item-image" @error="imageError" />
                <span>{{ item.name }} ({{ item.rarity }}) - {{ item.price }}$</span>
              </div>
            </div>
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

const completedGames = ref([]);
const activeGames = ref([]);
const selectedGame = ref(null);
const showModal = ref(false);

const fetchGames = async () => {
  try {
    const response = await fetch('http://localhost:8000/wheelgame/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const games = data.wheel_games;
    completedGames.value = games.filter(game => !game.is_active);
    activeGames.value = games.filter(game => game.is_active);
  } catch (error) {
    console.error('Error fetching games:', error);
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

onMounted(() => {
  fetchGames();
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
</style>
