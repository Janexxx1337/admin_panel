<template>
  <div class="container mt-4">
    <h1>Coinflip Games</h1>
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
              <img
                  :src="item.image_url"
                  :alt="item.name"
                  class="item-image"
                  @error="imageError"
              />
              <span>{{ item.name }} ({{ item.rarity }})</span>
            </div>
            <div v-if="game.items.length > 2" class="item-more">
              +{{ game.items.length - 2 }} more
            </div>
          </div>
        </td>
        <td>{{ game.bank }}</td>
        <td>{{ game.winner }}</td>
        <td>{{ game.winner_ticket }}</td>
        <td>{{ game.game_value }}</td>
        <td>
          <button
              @click="openModal(game)"
              class="btn btn-primary"
          >
            Детали
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <h2 class="mt-5">Active Games</h2>
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
              <img
                  :src="item.image_url"
                  :alt="item.name"
                  class="item-image"
                  @error="imageError"
              />
              <span>{{ item.name }} ({{ item.rarity }})</span>
            </div>
            <div v-if="game.items.length > 2" class="item-more">
              +{{ game.items.length - 2 }} more
            </div>
          </div>
        </td>
        <td>{{ game.bank }}</td>
        <td>{{ game.winner_ticket }}</td>
        <td>{{ game.game_value }}</td>
        <td>
          <button
              @click="openModal(game)"
              class="btn btn-primary"
          >
            Детали
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
        v-if="showModal"
        class="modal"
        tabindex="-1"
        role="dialog"
        style="display: block; background: rgba(0, 0, 0, 0.5);"
    >
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
              <div v-for="(item, index) in selectedGame.items" :key="index" class="item">
                <img
                    :src="item.image_url"
                    :alt="item.name"
                    class="item-image"
                    @error="imageError"
                />
                <span>{{ item.name }} ({{ item.rarity }})</span>
              </div>
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

const fetchGames = async () => {
  try {
    const response = await fetch('http://localhost:8000/coinflipgame');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    games.value = data.game_details;
  } catch (error) {
    console.error('Error fetching games:', error);
  }
};

const fetchActiveGames = async () => {
  try {
    const response = await fetch('http://localhost:8000/coinflipgame/activegames/');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    activeGames.value = data.active_games;
  } catch (error) {
    console.error('Error fetching active games:', error);
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
  fetchActiveGames();
});
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #f2f2f2;
  text-align: center;
}

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
